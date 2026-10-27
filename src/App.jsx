import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  ShoppingCart,
  ShoppingBag,
  ShieldCheck,
  Star,
  MapPin,
  Phone,
  Mail,
  Search,
  Sparkles,
  SlidersHorizontal,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  Truck,
  ChevronRight,
  X,
  Plus,
  Minus,
  CreditCard,
  QrCode,
  Building,
  Lock,
  FileText,
  Printer,
  Download,
  RefreshCw,
  BarChart3,
  Package,
  PackageCheck,
  AlertTriangle,
  Eye,
  Trash2,
  ArrowUpRight,
  Copy,
  Share2,
  Filter,
  Sun,
  Zap,
  Award,
  Layers,
  Radio,
  Home,
  Cpu,
  Check,
  ExternalLink,
  ChevronDown,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';

// ==========================================
// 1. EMBEDDED SEED DATA STRUCTURES
// ==========================================

export const STORE_PROFILE = {
  name: "Smart Home Design Group",
  shortName: "SHD Group",
  tagline: "Smart Automation Meets Architectural Luxury",
  subtitle: "Architectural Studio & Intelligent Living Solutions",
  address: "Civil Lines, Near Collectorate, Jaunpur, Uttar Pradesh - 222002",
  city: "Jaunpur",
  state: "Uttar Pradesh",
  pincode: "222002",
  rating: 4.9,
  reviewsCount: 128,
  mapsUrl: "https://maps.google.com/?q=Civil+Lines+Jaunpur+Uttar+Pradesh",
  phone: "+91 94152 87654",
  email: "concierge@smarthomedesign.in",
  workingHours: "Mon - Sat: 10:00 AM - 8:30 PM (Sun by Appointment)",
  gstin: "09AAKCS9481E1Z8",
  freeShippingThreshold: 1999,
  standardShippingFee: 150,
  merchantAccount: "Smart Home Design Group (HDFC Bank Jaunpur Main Branch A/C **4102)"
};

export const INITIAL_PRODUCTS = [
  {
    id: "shd-prod-101",
    name: "AuraPro Architectural Magnetic Track Light (48V Low-Voltage)",
    category: "Smart Lighting",
    price: 8499,
    originalPrice: 11999,
    stock: 14,
    rating: 4.9,
    tag: "Zigbee / WiFi",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
    description: "48V magnetic architectural linear profile with dual dim-to-warm CCT tuning (2700K - 6500K), CRI >97 museum-grade color rendering, and native Matter/Apple Home/Alexa mesh control.",
    specs: {
      "Mounting": "Recessed / Surface Magnetic Profile",
      "Voltage": "48V Safe Low-Voltage DC",
      "Control": "Zigbee 3.0 / Matter / Tuya",
      "Color Temp": "2700K - 6500K Tunable CCT"
    }
  },
  {
    id: "shd-prod-102",
    name: "Nordic Acoustic Fluted Oak Wall Paneling (Modular 2400x600mm)",
    category: "Wall Paneling",
    price: 6299,
    originalPrice: 8999,
    stock: 9,
    rating: 4.8,
    tag: "Solid Oak & Felt",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80",
    description: "Architectural sound-dampening natural European fluted oak veneer on high-density recycled acoustic PET felt backing. NRC 0.85 sound absorption for luxury residential suites.",
    specs: {
      "Dimensions": "2400 x 600 x 21 mm",
      "Material": "Natural White Oak & PET Felt",
      "Acoustic Rating": "NRC 0.85 Class A",
      "Fire Rating": "B1 Flame Retardant"
    }
  },
  {
    id: "shd-prod-103",
    name: "TouchVue 4-Gang Smart Knurled Metal Touch Panel & Thermostat",
    category: "Automation",
    price: 12499,
    originalPrice: 16999,
    stock: 6,
    rating: 5.0,
    tag: "Solid Brass",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=80",
    description: "Precision diamond-knurled brass faceplate with micro-OLED capacitive touch scenes, multi-zone HVAC temperature dial, motorized blind toggle, and gentle haptic feedback vibration.",
    specs: {
      "Faceplate": "Forged Solid Brass Champagne Gold",
      "Display": "Micro-OLED Interactive Screen",
      "Channels": "4-Gang Independent Relays",
      "Connectivity": "Dual-Band WiFi 6 & Zigbee Mesh"
    }
  },
  {
    id: "shd-prod-104",
    name: "Verona Luxury Knurled Solid Brass Door Pulls & Smart Lockset",
    category: "Hardware",
    price: 9899,
    originalPrice: 13499,
    stock: 11,
    rating: 4.9,
    tag: "Solid Brass",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80",
    description: "Heavyweight forged solid architectural brass entry handles with integrated 3D semiconductor fingerprint reader, anti-peep PIN keypad, RFID card access, and emergency mechanical key.",
    specs: {
      "Finish": "PVD Satin Brushed Gold & Matte Black",
      "Unlocking": "Biometric, PIN, Card, App, Key",
      "Battery": "12-Month Life (USB-C Emergency Boost)",
      "Door Thickness": "38mm - 90mm Standard"
    }
  },
  {
    id: "shd-prod-105",
    name: "Calacatta Gold Italian Marble Wireless Charging Smart Pedestal",
    category: "Luxury Accents",
    price: 15999,
    originalPrice: 21999,
    stock: 4,
    rating: 5.0,
    tag: "Italian Marble",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    description: "Hand-carved monolithic Calacatta gold-veined marble slab concealing dual 15W Qi wireless fast-charging induction pads, touch-dimmable warm halo base illumination.",
    specs: {
      "Stone": "Genuine Italian Calacatta Marble",
      "Charger": "Dual 15W Fast Qi Induction",
      "Underglow": "3000K Architectural Golden Glow",
      "Weight": "14.2 kg Solid Monolith"
    }
  },
  {
    id: "shd-prod-106",
    name: "SilentGlide Ultra-Quiet Somfy Motorized Drapery & Blind Track",
    category: "Automation",
    price: 18499,
    originalPrice: 24999,
    stock: 7,
    rating: 4.8,
    tag: "Motorized Somfy",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80",
    description: "Whisper-quiet <28dB heavy-duty motorized curtain track engineered for up to 50kg drapery. Supports sunrise/sunset astronomical sync, pull-to-start action, and Siri/Alexa integration.",
    specs: {
      "Motor": "Somfy Ultra-Quiet Core (<28 dB)",
      "Capacity": "Up to 50kg Heavy Drapery",
      "Track": "Extruded Architectural Aluminum",
      "Length": "Customizable 2.5m - 6.0m"
    }
  },
  {
    id: "shd-prod-107",
    name: "Crystalline Linear Chandelier with Smart Tunable Wave Optics",
    category: "Smart Lighting",
    price: 24999,
    originalPrice: 32000,
    stock: 5,
    rating: 4.9,
    tag: "Architectural Gold",
    image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=900&q=80",
    description: "Dining & island centerpiece crafted with precision laser-fluted crystal optics suspended on brushed architectural gold chassis. Supports circadian rhythm lighting synchronization.",
    specs: {
      "Length": "1250mm Suspended Profile",
      "Lumens": "4600 Lumens True Lumen Output",
      "Dimming": "0.1% Smooth Flicker-Free Curve",
      "Input": "220-240V AC 50Hz"
    }
  },
  {
    id: "shd-prod-108",
    name: "AromaPure Ultrasonic Smart Fragrance Diffuser with Ambient Flame",
    category: "Luxury Accents",
    price: 4899,
    originalPrice: 6999,
    stock: 18,
    rating: 4.7,
    tag: "Smoked Glass & Gold",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80",
    description: "Cold-air ultrasonic nebulizing diffuser encased in smoked borosilicate glass and spun brass base. Simulates a flickering golden hearth while diffusing pure essential oils.",
    specs: {
      "Coverage": "Up to 850 sq. ft.",
      "Capacity": "400ml Sealed Reservoir",
      "Features": "App Scheduler, Flame Simulation, Auto Cutoff",
      "Aroma System": "Cold Ultrasonic Micro-Vapor"
    }
  }
];

export const GOOGLE_REVIEWS = [
  {
    id: "rev-1",
    author: "Advocate Rajeshwar Singh",
    location: "Civil Lines, Jaunpur",
    rating: 5,
    date: "2 days ago",
    verified: true,
    content: "Upgraded our entire duplex in Civil Lines with Smart Home Design Group's touch panels and magnetic track lighting. Build quality is exceptional—solid brass and zero plastic feel. Ordered directly through their website and the items arrived at our doorstep in Jaunpur within 24 hours with professional packaging!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    project: "Full Home Automation & Lighting"
  },
  {
    id: "rev-2",
    author: "Dr. Shweta Srivastava",
    location: "Wazidpur Tiraha, Jaunpur",
    rating: 5,
    date: "1 week ago",
    verified: true,
    content: "Found them on Google while looking for premium acoustic wall paneling in Purvanchal. The oak panels transformed our clinic's consultation lounge acoustics completely. Online payment through UPI was buttery smooth with instant invoice and SMS tracking. Jaunpur truly needed a luxury studio like this!",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    project: "Acoustic Oak Paneling & Ambient Glow"
  },
  {
    id: "rev-3",
    author: "Er. Alok Upadhyay",
    location: "Olandganj, Jaunpur",
    rating: 5,
    date: "3 weeks ago",
    verified: true,
    content: "No more hassle of driving to Lucknow or Varanasi for luxury architectural hardware! The Verona knurled brass smart locks and Somfy curtain tracks integrated effortlessly with our Home Assistant server. Transparent pricing, direct merchant payment, and immediate dispatch. Highly recommended!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    project: "Biometric Smart Door Entry & Motorized Tracks"
  }
];

export const INITIAL_ORDERS = [
  {
    id: "SHD-9481",
    date: "2026-10-26T14:32:00Z",
    customer: {
      name: "Advocate Rajeshwar Singh",
      phone: "+91 94151 22890",
      email: "rajeshwar.singh@lawfirm.in",
      address: "House 14, Near Collectorate Colony, Civil Lines",
      city: "Jaunpur",
      pincode: "222002"
    },
    items: [
      { id: "shd-prod-101", name: "AuraPro Architectural Magnetic Track Light", price: 8499, quantity: 2 },
      { id: "shd-prod-103", name: "TouchVue 4-Gang Smart Knurled Metal Touch Panel", price: 12499, quantity: 1 }
    ],
    subtotal: 29497,
    shipping: 0,
    discount: 0,
    total: 29497,
    paymentMethod: "UPI (PhonePe)",
    paymentRef: "UPI/26102609481/HDFC",
    status: "Delivered",
    settled: true
  },
  {
    id: "SHD-9480",
    date: "2026-10-27T09:15:00Z",
    customer: {
      name: "Dr. Shweta Srivastava",
      phone: "+91 98380 44123",
      email: "dr.shweta@srivastavaclinic.com",
      address: "Plot 42, Green Park Avenue, Wazidpur Tiraha",
      city: "Jaunpur",
      pincode: "222002"
    },
    items: [
      { id: "shd-prod-102", name: "Nordic Acoustic Fluted Oak Wall Paneling", price: 6299, quantity: 4 }
    ],
    subtotal: 25196,
    shipping: 0,
    discount: 0,
    total: 25196,
    paymentMethod: "UPI (Google Pay)",
    paymentRef: "UPI/27102700412/SBI",
    status: "In Transit",
    settled: true
  },
  {
    id: "SHD-9479",
    date: "2026-10-27T18:40:00Z",
    customer: {
      name: "Anand Vikram Pathak",
      phone: "+91 99355 88912",
      email: "anand.pathak@gmail.com",
      address: "Shastri Nagar, Near Line Bazar",
      city: "Jaunpur",
      pincode: "222002"
    },
    items: [
      { id: "shd-prod-104", name: "Verona Luxury Knurled Solid Brass Door Pulls", price: 9899, quantity: 1 }
    ],
    subtotal: 9899,
    shipping: 0,
    discount: 0,
    total: 9899,
    paymentMethod: "Cards (Visa Platinum)",
    paymentRef: "TXN_CC_998124801",
    status: "Processing",
    settled: true
  }
];

// Helper to format currency
const formatINR = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

// ==========================================
// 2. MAIN APPLICATION COMPONENT
// ==========================================

export default function App() {
  // --- Persistent States from LocalStorage ---
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('shd_products_v2');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('shd_orders_v2');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('shd_cart_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('shd_products_v2', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('shd_orders_v2', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('shd_cart_v2', JSON.stringify(cart));
  }, [cart]);

  // --- Navigation & View States ---
  const [activeTab, setActiveTab] = useState('store'); // 'store' | 'admin'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-low', 'price-high', 'rating'

  // --- Modals & Drawers ---
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Info, 2: Payment, 3: Confirmation
  const [selectedProductQuickView, setSelectedProductQuickView] = useState(null);
  const [invoiceModalOrder, setInvoiceModalOrder] = useState(null);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [consultSubmitted, setConsultSubmitted] = useState(false);
  const [recentlyAddedId, setRecentlyAddedId] = useState(null);

  // --- Notification Toast ---
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  // --- Promo Code State ---
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');

  // --- Checkout Form State ---
  const [customerForm, setCustomerForm] = useState({
    name: 'Sanjeev Kumar Singh',
    phone: '9415287654',
    email: 'sanjeev.singh@gmail.com',
    address: 'Bungalow 7, Civil Lines (Near Collectorate)',
    city: 'Jaunpur',
    pincode: '222002',
    deliveryNotes: 'Please ring bell at front gate. Direct delivery to Jaunpur studio residence.'
  });

  // --- Payment Gateway State ---
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking'
  const [upiOption, setUpiOption] = useState('qr'); // 'qr' | 'apps' | 'id'
  const [upiIdInput, setUpiIdInput] = useState('');
  const [cardForm, setCardForm] = useState({
    number: '4532 8921 7840 9182',
    name: 'SANJEEV K SINGH',
    expiry: '08/29',
    cvv: '849'
  });
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [processingStatusText, setProcessingStatusText] = useState('');
  const [currentConfirmedOrder, setCurrentConfirmedOrder] = useState(null);

  // --- Cart Calculations ---
  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    if (appliedDiscount > 0) {
      return Math.round((cartSubtotal * appliedDiscount) / 100);
    }
    return 0;
  }, [cartSubtotal, appliedDiscount]);

  const shippingFee = useMemo(() => {
    if (cartSubtotal === 0) return 0;
    if (cartSubtotal >= STORE_PROFILE.freeShippingThreshold) return 0;
    return STORE_PROFILE.standardShippingFee;
  }, [cartSubtotal]);

  const cartTotal = useMemo(() => {
    return Math.max(0, cartSubtotal - discountAmount + shippingFee);
  }, [cartSubtotal, discountAmount, shippingFee]);

  const totalCartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  // --- Cart Operations ---
  const handleAddToCart = (product, quantity = 1, e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    if (product.stock <= 0) {
      showToast("Item is currently out of stock in Jaunpur studio");
      return;
    }
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        const newQty = Math.min(product.stock, existing.quantity + quantity);
        return prev.map((i) => (i.id === product.id ? { ...i, quantity: newQty } : i));
      } else {
        return [...prev, { ...product, quantity }];
      }
    });

    setRecentlyAddedId(product.id);
    setTimeout(() => {
      setRecentlyAddedId((curr) => (curr === product.id ? null : curr));
    }, 1500);

    showToast(`Added "${product.name.slice(0, 32)}..." to cart`);
  };

  const handleUpdateCartQty = (productId, delta) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === productId) {
            const productRef = products.find((p) => p.id === productId);
            const maxStock = productRef ? productRef.stock : 99;
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return { ...item, quantity: Math.min(newQty, maxStock) };
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prev) => prev.filter((i) => i.id !== productId));
    showToast("Item removed from cart");
  };

  const handleApplyPromo = () => {
    if (!promoCode.trim()) return;
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'JAUNPUR10' || clean === 'SMART10') {
      setAppliedDiscount(10);
      setPromoError('');
      showToast('10% Architectural Studio Discount Applied!');
    } else if (clean === 'LUXURY20' && cartSubtotal >= 20000) {
      setAppliedDiscount(20);
      setPromoError('');
      showToast('20% Grand Interior Suite Discount Applied!');
    } else {
      setPromoError('Invalid coupon. Try "JAUNPUR10" for 10% off');
    }
  };

  // --- Checkout Flow ---
  const handleProceedToPayment = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!customerForm.name || !customerForm.phone || !customerForm.address || !customerForm.pincode) {
      showToast("Please fill all required delivery details");
      return;
    }
    setCheckoutStep(2);
  };

  const handleSimulatePayment = () => {
    setIsProcessingPayment(true);
    setProcessingStatusText('Initializing 256-Bit SSL payment session...');

    setTimeout(() => {
      setProcessingStatusText('Contacting Jaunpur Merchant Gateway (HDFC/PhonePe)...');
    }, 700);

    setTimeout(() => {
      setProcessingStatusText('Authorizing direct bank settlement & generating invoice...');
    }, 1400);

    setTimeout(() => {
      // Create new order
      const newOrderId = `SHD-${Math.floor(1000 + Math.random() * 9000)}`;
      const completedOrder = {
        id: newOrderId,
        date: new Date().toISOString(),
        customer: { ...customerForm },
        items: [...cart],
        subtotal: cartSubtotal,
        discount: discountAmount,
        shipping: shippingFee,
        total: cartTotal,
        paymentMethod: paymentMethod === 'upi' ? `UPI (${upiOption.toUpperCase()})` : paymentMethod === 'card' ? 'Debit/Credit Card (256-Bit SSL)' : `NetBanking (${selectedBank})`,
        paymentRef: `SETTLED_${Date.now()}_MERCHANT`,
        status: 'Processing',
        settled: true
      };

      // Deduct inventory
      setProducts((prev) =>
        prev.map((prod) => {
          const inCart = cart.find((c) => c.id === prod.id);
          if (inCart) {
            return { ...prod, stock: Math.max(0, prod.stock - inCart.quantity) };
          }
          return prod;
        })
      );

      // Save order
      setOrders((prev) => [completedOrder, ...prev]);
      setCurrentConfirmedOrder(completedOrder);
      setCart([]);
      setIsProcessingPayment(false);
      setCheckoutStep(3);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C89D5C', '#00D2EE', '#FFFFFF', '#D4AF37']
        });
      } catch (err) {
        console.log("Confetti trigger skipped", err);
      }
    }, 2200);
  };

  // --- Filtered and Sorted Products ---
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // default featured
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  // Categories list
  const categories = ['All', 'Smart Lighting', 'Wall Paneling', 'Automation', 'Hardware', 'Luxury Accents'];

  // --- Admin Functions ---
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
    showToast(`Order #${orderId} marked as ${newStatus}`);
  };

  const handleAdjustStock = (productId, delta) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updatedStock = Math.max(0, p.stock + delta);
          return { ...p, stock: updatedStock };
        }
        return p;
      })
    );
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to remove this product from Jaunpur Studio catalog?")) {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      showToast("Product deleted successfully");
    }
  };

  const handleResetSeedData = () => {
    if (window.confirm("Reset catalog and orders to Jaunpur Studio seed data?")) {
      setProducts(INITIAL_PRODUCTS);
      setOrders(INITIAL_ORDERS);
      setCart([]);
      localStorage.removeItem('shd_products_v2');
      localStorage.removeItem('shd_orders_v2');
      localStorage.removeItem('shd_cart_v2');
      showToast("Data reset to studio defaults!");
    }
  };

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Smart Lighting',
    price: '',
    originalPrice: '',
    stock: '',
    tag: 'Architectural Grade',
    image: '',
    description: ''
  });

  const handleSaveNewProduct = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      showToast("Please fill all mandatory product fields");
      return;
    }
    const created = {
      id: `shd-prod-${Date.now()}`,
      name: newProduct.name,
      category: newProduct.category,
      price: Number(newProduct.price),
      originalPrice: Number(newProduct.originalPrice || newProduct.price * 1.25),
      stock: Number(newProduct.stock),
      rating: 5.0,
      tag: newProduct.tag || "Jaunpur Studio",
      image: newProduct.image || "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=80",
      description: newProduct.description || "High-end luxury architectural element crafted for refined interiors.",
      specs: { "Origin": "Smart Home Design Group Jaunpur Hub", "Warranty": "2 Years Official" }
    };
    setProducts((prev) => [created, ...prev]);
    setIsAddProductModalOpen(false);
    setNewProduct({
      name: '',
      category: 'Smart Lighting',
      price: '',
      originalPrice: '',
      stock: '',
      tag: 'Architectural Grade',
      image: '',
      description: ''
    });
    showToast("New product added to catalog!");
  };

  // KPI Metrics for Admin
  const adminMetrics = useMemo(() => {
    const totalRev = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const totalCount = orders.length;
    const pendingShip = orders.filter((o) => o.status === 'Processing' || o.status === 'Dispatched').length;
    const lowStockCount = products.filter((p) => p.stock <= 5).length;
    const avgOrder = totalCount > 0 ? Math.round(totalRev / totalCount) : 0;
    return { totalRev, totalCount, pendingShip, lowStockCount, avgOrder };
  }, [orders, products]);

  // Consultation submit
  const handleConsultSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setConsultSubmitted(true);
    setTimeout(() => {
      setConsultSubmitted(false);
      setIsConsultModalOpen(false);
      showToast("Consultation request confirmed! Studio architect will call you.");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0A1325] text-slate-100 flex flex-col font-sans selection:bg-[#C89D5C]/30 selection:text-[#00D2EE]">
      {/* Circuit background overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-40 circuit-pattern z-0"></div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-[#121E36] border border-[#00D2EE]/60 text-white px-5 py-3.5 rounded-xl shadow-cyan-glow animate-fade-in transition-all">
          <Sparkles className="w-5 h-5 text-[#00D2EE] animate-spin" />
          <span className="text-sm font-medium tracking-wide">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ==========================================
          HEADER & STICKY APP NAVIGATION
      ========================================== */}
      <header className="sticky top-0 z-40 bg-[#0A1325]/90 backdrop-blur-xl border-b border-[#1E3156]/80 transition-all">
        {/* Top Studio Broadcast Bar */}
        <div className="bg-gradient-to-r from-[#0F1A30] via-[#121E36] to-[#0F1A30] border-b border-[#1E3156]/50 py-1.5 px-4 text-xs text-slate-300">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#00D2EE]/10 text-[#00D2EE] border border-[#00D2EE]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D2EE] mr-1 animate-ping"></span>
                LIVE STUDIO & DISPATCH
              </span>
              <span className="text-slate-400 hidden sm:inline">|</span>
              <span className="flex items-center gap-1 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-[#C89D5C]" />
                Civil Lines, Jaunpur, UP • Express Doorstep Delivery
              </span>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-slate-300">
              <span className="hidden md:flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C89D5C]" />
                Direct Merchant Settlement (Zero Middleman Wall)
              </span>
              <span className="text-slate-500 hidden md:inline">•</span>
              <a
                href={STORE_PROFILE.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-[#C89D5C] hover:text-[#E5C384] transition-colors"
              >
                <Star className="w-3 h-3 fill-current" />
                4.9★ on Google (128+ Reviews)
                <ArrowUpRight className="w-3 h-3 ml-0.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center justify-between gap-4">
            {/* Brand Logo & Title */}
            <div
              onClick={() => setActiveTab('store')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              {/* Circuit House Brand Icon */}
              <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#121E36] to-[#0A1325] border border-[#C89D5C]/60 flex items-center justify-center p-1.5 shadow-gold-glow group-hover:border-[#00D2EE] transition-all duration-300">
                <img
                  src="/Smart_Home_Design.png"
                  alt="Smart Home Design Group Logo"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(200,157,92,0.5)]"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <Home className="w-6 h-6 text-[#C89D5C] group-hover:text-[#00D2EE] transition-colors hidden only:block" />
                {/* Glowing cyan node accent */}
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#00D2EE] shadow-cyan-sm"></div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-white transition-colors">
                    SMART HOME
                  </h1>
                  <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-[#C89D5C]/15 text-[#C89D5C] border border-[#C89D5C]/30 uppercase tracking-widest hidden sm:inline">
                    Jaunpur
                  </span>
                </div>
                <p className="text-[11px] font-medium tracking-widest uppercase text-[#C89D5C] group-hover:text-[#E6C687] transition-colors">
                  DESIGN GROUP • ARCHITECTURAL STUDIO
                </p>
              </div>
            </div>

            {/* Desktop Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-md mx-6">
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search smart lighting, acoustic panels, brass locks, automation..."
                  className="w-full pl-10 pr-9 py-2 bg-[#121E36]/90 border border-[#1E3156] rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#C89D5C] focus:ring-1 focus:ring-[#C89D5C] transition-all shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Action Buttons & Quick Controls */}
            <div className="flex items-center gap-2.5 sm:gap-4">
              {/* Consultation CTA */}
              <button
                onClick={() => setIsConsultModalOpen(true)}
                className="hidden md:flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-xl bg-[#121E36] border border-[#1E3156] hover:border-[#C89D5C]/60 text-slate-200 hover:text-[#C89D5C] transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C89D5C]" />
                Book Studio Consult
              </button>

              {/* Mode Toggle: Storefront vs Admin */}
              <button
                onClick={() => setActiveTab(activeTab === 'admin' ? 'store' : 'admin')}
                className={`flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl border transition-all ${
                  activeTab === 'admin'
                    ? 'bg-[#C89D5C] text-[#0A1325] border-[#C89D5C] shadow-gold-glow font-semibold'
                    : 'bg-[#121E36] text-slate-300 border-[#1E3156] hover:border-slate-500'
                }`}
                title="Toggle Store Owner Admin Dashboard"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{activeTab === 'admin' ? 'Exit Admin' : 'Admin Hub'}</span>
                {orders.filter((o) => o.status === 'Processing').length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-[#00D2EE] animate-pulse"></span>
                )}
              </button>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-[#121E36] border border-[#1E3156] hover:border-[#00D2EE]/70 text-white transition-all shadow-md group"
                aria-label="View Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5 text-slate-200 group-hover:text-[#00D2EE] transition-colors" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] px-1 rounded-full bg-[#00D2EE] text-[#0A1325] text-[11px] font-extrabold flex items-center justify-center shadow-cyan-sm animate-bounce">
                    {totalCartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="mt-3 lg:hidden">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search lighting, panels, smart locks, automation..."
                className="w-full pl-10 pr-9 py-2 bg-[#121E36] border border-[#1E3156] rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#C89D5C]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ==========================================
          MAIN BODY: SWITCHES BETWEEN STORE & ADMIN
      ========================================== */}
      <main className="flex-1 pb-24 md:pb-16 relative z-10">
        {activeTab === 'admin' ? (
          /* ==========================================
             E. STORE OWNER ADMIN DASHBOARD
          ========================================== */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
            {/* Admin Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1E3156]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#C89D5C]/20 text-[#C89D5C] border border-[#C89D5C]/40">
                    EXECUTIVE CONTROL SUITE
                  </span>
                  <span className="text-xs text-slate-400">Jaunpur Central Hub</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  Store Owner Command Dashboard
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Manage live orders, instant bank settlements, inventory levels, and product offerings.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleResetSeedData}
                  className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#121E36] border border-[#1E3156] text-slate-400 hover:text-white text-xs"
                  title="Reset to default seed data"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Defaults
                </button>
                <button
                  onClick={() => setIsAddProductModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C89D5C] text-[#0A1325] font-semibold text-xs shadow-gold-glow hover:brightness-110 transition-all"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  Add New Product
                </button>
                <button
                  onClick={() => setActiveTab('store')}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#121E36] border border-[#1E3156] text-slate-300 text-xs hover:border-slate-400 transition-all"
                >
                  <Eye className="w-4 h-4" />
                  View Storefront
                </button>
              </div>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 my-6">
              {/* Total Revenue */}
              <div className="bg-[#121E36] border border-[#1E3156] p-4 rounded-2xl shadow-card-elevated">
                <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                  <span>Gross Settled Revenue</span>
                  <div className="w-7 h-7 rounded-lg bg-[#C89D5C]/15 text-[#C89D5C] flex items-center justify-center">
                    ₹
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {formatINR(adminMetrics.totalRev)}
                </div>
                <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3 h-3" />
                  100% Direct Bank Settlement
                </div>
              </div>

              {/* Total Orders */}
              <div className="bg-[#121E36] border border-[#1E3156] p-4 rounded-2xl shadow-card-elevated">
                <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                  <span>Total Orders</span>
                  <Package className="w-4 h-4 text-[#00D2EE]" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {adminMetrics.totalCount}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Avg. {formatINR(adminMetrics.avgOrder)} / order
                </div>
              </div>

              {/* Pending Shipments */}
              <div className="bg-[#121E36] border border-[#1E3156] p-4 rounded-2xl shadow-card-elevated">
                <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                  <span>Pending Dispatch</span>
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {adminMetrics.pendingShip}
                </div>
                <div className="text-[11px] text-amber-300 mt-1">
                  Ready for Jaunpur courier
                </div>
              </div>

              {/* Low Stock Alerts */}
              <div className="bg-[#121E36] border border-[#1E3156] p-4 rounded-2xl shadow-card-elevated">
                <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                  <span>Low Stock Alert</span>
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-rose-400 mt-2">
                  {adminMetrics.lowStockCount} Items
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Re-order threshold &le; 5 units
                </div>
              </div>

              {/* Merchant Bank Info */}
              <div className="col-span-2 lg:col-span-1 bg-[#121E36] border border-[#C89D5C]/30 p-4 rounded-2xl shadow-card-elevated">
                <div className="flex items-center justify-between text-[#C89D5C] text-xs font-semibold">
                  <span>Direct Settlement</span>
                  <Building className="w-4 h-4" />
                </div>
                <div className="text-xs font-semibold text-white mt-2">
                  HDFC Bank Jaunpur
                </div>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">
                  A/C: **4102 | PhonePe / Razorpay
                </div>
                <div className="mt-2 inline-flex items-center gap-1 text-[10px] text-[#00D2EE]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D2EE] animate-ping"></span>
                  Automated Webhooks Active
                </div>
              </div>
            </div>

            {/* Live Orders Tracker Section */}
            <div className="bg-[#121E36] border border-[#1E3156] rounded-2xl p-5 mb-8 shadow-card-elevated">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1E3156]">
                <div className="flex items-center gap-2">
                  <PackageCheck className="w-5 h-5 text-[#C89D5C]" />
                  <h3 className="text-lg font-bold text-white">Live Orders & Fulfillment Tracker</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#1E3156] text-slate-300">
                    {orders.length} Records
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  Click status pill to simulate shipment lifecycle
                </div>
              </div>

              <div className="overflow-x-auto mt-4">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-400 border-b border-[#1E3156]/80 pb-3 uppercase tracking-wider">
                      <th className="py-3 px-3">Order ID & Date</th>
                      <th className="py-3 px-3">Customer & Location</th>
                      <th className="py-3 px-3">Purchased Items</th>
                      <th className="py-3 px-3">Amount Paid</th>
                      <th className="py-3 px-3">Payment Method</th>
                      <th className="py-3 px-3">Fulfillment Status</th>
                      <th className="py-3 px-3 text-right">Invoice</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E3156]/60">
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-400">
                          No orders placed yet. Place an order on the storefront to test!
                        </td>
                      </tr>
                    ) : (
                      orders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-[#162544]/60 transition-colors">
                          <td className="py-3.5 px-3">
                            <span className="font-mono font-bold text-[#00D2EE] block">#{ord.id}</span>
                            <span className="text-[10px] text-slate-400">
                              {new Date(ord.date).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </td>
                          <td className="py-3.5 px-3">
                            <div className="font-medium text-white">{ord.customer.name}</div>
                            <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-[#C89D5C]" />
                              {ord.customer.city || "Jaunpur"}, {ord.customer.pincode}
                            </div>
                            <div className="text-[10px] text-slate-400">{ord.customer.phone}</div>
                          </td>
                          <td className="py-3.5 px-3 max-w-[220px]">
                            <div className="text-slate-300 truncate">
                              {ord.items.map((i) => `${i.name} (x${i.quantity})`).join(', ')}
                            </div>
                            <span className="text-[10px] text-slate-400">
                              {ord.items.reduce((s, i) => s + i.quantity, 0)} items total
                            </span>
                          </td>
                          <td className="py-3.5 px-3 font-semibold text-white">
                            {formatINR(ord.total)}
                          </td>
                          <td className="py-3.5 px-3">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1E3156] text-slate-300 text-[10px]">
                              <ShieldCheck className="w-3 h-3 text-emerald-400" />
                              {ord.paymentMethod}
                            </span>
                          </td>
                          <td className="py-3.5 px-3">
                            <select
                              value={ord.status}
                              onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                              className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer transition-all ${
                                ord.status === 'Delivered'
                                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/60'
                                  : ord.status === 'In Transit'
                                  ? 'bg-indigo-950/60 text-indigo-300 border-indigo-700/60'
                                  : ord.status === 'Dispatched'
                                  ? 'bg-cyan-950/60 text-cyan-300 border-cyan-700/60'
                                  : 'bg-amber-950/60 text-amber-300 border-amber-700/60'
                              }`}
                            >
                              <option value="Processing" className="bg-[#121E36] text-amber-300">Processing</option>
                              <option value="Dispatched" className="bg-[#121E36] text-cyan-300">Dispatched</option>
                              <option value="In Transit" className="bg-[#121E36] text-indigo-300">In Transit</option>
                              <option value="Delivered" className="bg-[#121E36] text-emerald-300">Delivered</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-3 text-right">
                            <button
                              onClick={() => setInvoiceModalOrder(ord)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1E3156] hover:bg-[#C89D5C] hover:text-[#0A1325] text-slate-300 transition-colors text-[11px]"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              Invoice
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Product Catalog & Inventory Manager Section */}
            <div className="bg-[#121E36] border border-[#1E3156] rounded-2xl p-5 shadow-card-elevated">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1E3156]">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#00D2EE]" />
                  <h3 className="text-lg font-bold text-white">Jaunpur Studio Inventory & Catalog</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#1E3156] text-slate-300">
                    {products.length} Products
                  </span>
                </div>
                <button
                  onClick={() => setIsAddProductModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#C89D5C] text-[#0A1325] hover:brightness-110"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Product
                </button>
              </div>

              <div className="overflow-x-auto mt-4">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-400 border-b border-[#1E3156]/80 pb-3 uppercase tracking-wider">
                      <th className="py-3 px-3">Product</th>
                      <th className="py-3 px-3">Category</th>
                      <th className="py-3 px-3">Price / MRP</th>
                      <th className="py-3 px-3">Tag / Tech</th>
                      <th className="py-3 px-3 text-center">Stock Control</th>
                      <th className="py-3 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E3156]/60">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-[#162544]/60 transition-colors">
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-11 h-11 rounded-lg object-cover border border-[#1E3156]"
                            />
                            <div>
                              <div className="font-semibold text-white max-w-xs">{p.name}</div>
                              <div className="text-[10px] text-slate-400 font-mono">ID: {p.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-slate-300">
                          <span className="px-2 py-0.5 rounded bg-[#1E3156] text-[10px]">
                            {p.category}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-bold text-white">{formatINR(p.price)}</div>
                          <div className="text-[10px] text-slate-400 line-through">{formatINR(p.originalPrice)}</div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full bg-[#C89D5C]/15 text-[#C89D5C] border border-[#C89D5C]/30 text-[10px] font-medium">
                            {p.tag}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <div className="inline-flex items-center gap-2 bg-[#0F1A30] border border-[#1E3156] px-2 py-1 rounded-xl">
                            <button
                              onClick={() => handleAdjustStock(p.id, -1)}
                              className="w-5 h-5 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#1E3156]"
                              title="Decrease Stock"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span
                              className={`font-bold px-1.5 min-w-[24px] text-center ${
                                p.stock <= 3
                                  ? 'text-rose-400 animate-pulse'
                                  : p.stock <= 6
                                  ? 'text-amber-400'
                                  : 'text-emerald-300'
                              }`}
                            >
                              {p.stock}
                            </span>
                            <button
                              onClick={() => handleAdjustStock(p.id, 1)}
                              className="w-5 h-5 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#1E3156]"
                              title="Increase Stock"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          {p.stock <= 3 && (
                            <span className="block text-[9px] text-rose-400 mt-1 font-semibold">Low Stock</span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          /* ==========================================
             B. STOREFRONT & CATALOG
          ========================================== */
          <div>
            {/* HERO SECTION */}
            <section className="relative overflow-hidden pt-8 pb-14 border-b border-[#1E3156]/70">
              {/* Subtle ambient luxury light flares */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-[#C89D5C]/15 to-[#00D2EE]/10 blur-[120px] pointer-events-none rounded-full"></div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  {/* Left Column: Architectural statement & CTAs */}
                  <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121E36] border border-[#C89D5C]/40 text-xs text-[#C89D5C] shadow-gold-glow">
                      <Sparkles className="w-3.5 h-3.5 text-[#00D2EE]" />
                      <span className="font-semibold tracking-wide">
                        Purvanchal's Flagship Architectural & Smart Living Studio
                      </span>
                    </div>

                    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                      Smart Automation Meets{' '}
                      <span className="gold-gradient-text block mt-1">
                        Architectural Luxury.
                      </span>
                    </h2>

                    <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                      Immerse your residence in bespoke low-voltage magnetic track lighting, acoustic natural fluted oak paneling, diamond-knurled solid brass touch panels, and Somfy motorized drapery—curated and directly fulfilled from our studio in <strong className="text-white">Civil Lines, Jaunpur</strong>.
                    </p>

                    {/* Quick Action Buttons */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                      <a
                        href="#catalog-section"
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C89D5C] text-[#0A1325] font-bold text-xs sm:text-sm tracking-wide shadow-gold-glow hover:brightness-110 flex items-center gap-2 transition-all"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        Explore Studio Catalog
                        <ArrowRight className="w-4 h-4" />
                      </a>

                      <button
                        onClick={() => setIsConsultModalOpen(true)}
                        className="px-5 py-3 rounded-xl bg-[#121E36] hover:bg-[#162544] border border-[#1E3156] hover:border-[#C89D5C] text-slate-200 font-semibold text-xs sm:text-sm transition-all flex items-center gap-2"
                      >
                        <Phone className="w-4 h-4 text-[#C89D5C]" />
                        Book Studio Visit / Quote
                      </button>

                      <a
                        href={STORE_PROFILE.mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-3 rounded-xl bg-[#0F1A30] border border-[#00D2EE]/30 hover:border-[#00D2EE] text-[#00D2EE] font-medium text-xs sm:text-sm transition-all flex items-center gap-1.5"
                      >
                        <MapPin className="w-4 h-4" />
                        Jaunpur Studio Map
                      </a>
                    </div>

                    {/* Trust Badges Bar */}
                    <div className="pt-4 grid grid-cols-3 gap-3 border-t border-[#1E3156]/60 max-w-xl mx-auto lg:mx-0 text-left">
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00D2EE]" />
                          Automated
                        </div>
                        <div className="text-[11px] text-slate-400">Zero WhatsApp Wall Checkout</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5 text-[#C89D5C]" />
                          Jaunpur Express
                        </div>
                        <div className="text-[11px] text-slate-400">Doorstep 24-48h Delivery</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          Certified
                        </div>
                        <div className="text-[11px] text-slate-400">2-Year Studio Warranty</div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Hero Visual Card with Brand Logo & Feature Showcase */}
                  <div className="lg:col-span-5">
                    <div className="relative mx-auto max-w-md bg-gradient-to-b from-[#121E36] to-[#0F1A30] border border-[#1E3156] rounded-3xl p-6 shadow-card-elevated overflow-hidden group">
                      {/* Decorative circuit line elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D2EE]/10 rounded-full blur-2xl"></div>

                      <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="w-24 h-24 rounded-2xl bg-[#0A1325] border-2 border-[#C89D5C]/70 p-2 shadow-gold-glow flex items-center justify-center mb-4">
                          <img
                            src="/Smart_Home_Design.png"
                            alt="Smart Home Design Studio Logo"
                            className="w-full h-full object-contain"
                          />
                        </div>

                        <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-[#00D2EE]/15 text-[#00D2EE] border border-[#00D2EE]/40 mb-2">
                          STUDIO SHOWCASE • CIVIL LINES
                        </span>

                        <h3 className="text-lg font-bold text-white">
                          Smart Home Design Group
                        </h3>
                        <p className="text-xs text-[#C89D5C] font-serif tracking-wider uppercase mt-0.5">
                          Architectural Interiors & Automation
                        </p>

                        {/* Interactive Feature Highlights */}
                        <div className="w-full mt-5 space-y-2.5 text-left text-xs">
                          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0A1325]/70 border border-[#1E3156]">
                            <div className="flex items-center gap-2">
                              <Zap className="w-4 h-4 text-[#00D2EE]" />
                              <span className="text-slate-200">Smart Dim-to-Warm CCT Lighting</span>
                            </div>
                            <span className="text-[10px] text-emerald-400 font-semibold">In Stock</span>
                          </div>

                          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0A1325]/70 border border-[#1E3156]">
                            <div className="flex items-center gap-2">
                              <Layers className="w-4 h-4 text-[#C89D5C]" />
                              <span className="text-slate-200">Acoustic Fluted Oak Slats</span>
                            </div>
                            <span className="text-[10px] text-emerald-400 font-semibold">2.4m Panels</span>
                          </div>

                          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0A1325]/70 border border-[#1E3156]">
                            <div className="flex items-center gap-2">
                              <ShieldCheck className="w-4 h-4 text-[#00D2EE]" />
                              <span className="text-slate-200">Biometric Solid Brass Locks</span>
                            </div>
                            <span className="text-[10px] text-[#C89D5C] font-semibold">PVD Finish</span>
                          </div>
                        </div>

                        <div className="mt-5 pt-4 border-t border-[#1E3156] w-full flex items-center justify-between text-[11px] text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                            Direct Jaunpur Dispatch Active
                          </div>
                          <span className="text-white font-medium">Free Ship &gt; ₹1,999</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CATALOG & PRODUCT BROWSER SECTION */}
            <section id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              {/* Section Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00D2EE]"></span>
                    <span className="text-xs font-semibold text-[#00D2EE] uppercase tracking-wider">
                      Architectural Catalog
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    Engineered for Refined Spaces
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Select your architectural fixtures, review exact specifications, and checkout with zero WhatsApp delays.
                  </p>
                </div>

                {/* Sort dropdown */}
                <div className="flex items-center gap-2 self-start md:self-auto">
                  <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-400">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-[#121E36] border border-[#1E3156] text-xs text-white px-3 py-1.5 rounded-xl focus:outline-none focus:border-[#C89D5C]"
                  >
                    <option value="featured">Featured Collection</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs font-semibold px-4 py-2.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      selectedCategory === cat
                        ? 'bg-[#C89D5C] text-[#0A1325] shadow-gold-glow'
                        : 'bg-[#121E36] text-slate-300 hover:text-white hover:bg-[#162544] border border-[#1E3156]'
                    }`}
                  >
                    {cat === 'All' && <Sparkles className="w-3.5 h-3.5" />}
                    {cat === 'Smart Lighting' && <Sun className="w-3.5 h-3.5" />}
                    {cat === 'Wall Paneling' && <Layers className="w-3.5 h-3.5" />}
                    {cat === 'Automation' && <Cpu className="w-3.5 h-3.5" />}
                    {cat === 'Hardware' && <Lock className="w-3.5 h-3.5" />}
                    {cat === 'Luxury Accents' && <Award className="w-3.5 h-3.5" />}
                    {cat}
                  </button>
                ))}
              </div>

              {/* Product Cards Grid */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16 bg-[#121E36] border border-[#1E3156] rounded-2xl p-8">
                  <Search className="w-10 h-10 text-slate-500 mx-auto mb-3" />
                  <h4 className="text-lg font-bold text-white">No products match your criteria</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Try adjusting your search query or selecting "All" categories.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSearchQuery('');
                    }}
                    className="mt-4 px-4 py-2 rounded-xl bg-[#C89D5C] text-[#0A1325] text-xs font-bold"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-6">
                  {filteredProducts.map((product) => {
                    const savings = product.originalPrice - product.price;
                    const isLowStock = product.stock > 0 && product.stock <= 5;
                    const isJustAdded = recentlyAddedId === product.id;

                    return (
                      <div
                        key={product.id}
                        className="bg-[#121E36] border border-[#1E3156] hover:border-[#C89D5C]/60 rounded-2xl overflow-hidden shadow-card-elevated transition-all duration-300 flex flex-col group cursor-pointer"
                        onClick={() => setSelectedProductQuickView(product)}
                      >
                        {/* Image Container with Badges */}
                        <div className="relative aspect-[4/3] overflow-hidden bg-[#0A1325]">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />

                          {/* Top Badges */}
                          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 items-start">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0A1325]/80 backdrop-blur-md text-[#C89D5C] border border-[#C89D5C]/40">
                              {product.tag}
                            </span>
                            {savings > 0 && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                                Save {formatINR(savings)}
                              </span>
                            )}
                          </div>

                          {/* Stock pill */}
                          <div className="absolute bottom-2.5 right-2.5">
                            {product.stock <= 0 ? (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-950/80 text-rose-300 border border-rose-700/60 backdrop-blur-md">
                                Sold Out
                              </span>
                            ) : isLowStock ? (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-950/80 text-amber-300 border border-amber-600/60 backdrop-blur-md flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                                Only {product.stock} Left
                              </span>
                            ) : (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0A1325]/80 text-[#00D2EE] border border-[#00D2EE]/40 backdrop-blur-md flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00D2EE]"></span>
                                In Stock (Jaunpur)
                              </span>
                            )}
                          </div>

                          {/* Quick View Overlay Button */}
                          <div className="absolute inset-0 bg-[#0A1325]/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-semibold text-white gap-1.5">
                            <Eye className="w-4 h-4 text-[#C89D5C]" />
                            View Technical Specs
                          </div>
                        </div>

                        {/* Content Body */}
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                              <span className="uppercase tracking-wider">{product.category}</span>
                              <div className="flex items-center gap-1 text-[#C89D5C]">
                                <Star className="w-3 h-3 fill-current" />
                                <span className="font-semibold">{product.rating}</span>
                              </div>
                            </div>

                            <h4 className="font-bold text-white text-sm leading-snug line-clamp-2 group-hover:text-[#C89D5C] transition-colors">
                              {product.name}
                            </h4>

                            <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                              {product.description}
                            </p>
                          </div>

                          {/* Price & Action */}
                          <div className="mt-4 pt-3 border-t border-[#1E3156]/80 flex items-center justify-between gap-2">
                            <div>
                              <div className="text-xs text-slate-400 line-through">
                                {formatINR(product.originalPrice)}
                              </div>
                              <div className="text-lg font-extrabold text-white">
                                {formatINR(product.price)}
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={(e) => handleAddToCart(product, 1, e)}
                              disabled={product.stock <= 0}
                              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                                product.stock <= 0
                                  ? 'bg-[#1E3156] text-slate-500 cursor-not-allowed'
                                  : isJustAdded
                                  ? 'bg-[#00D2EE] text-[#0A1325] shadow-cyan-sm'
                                  : 'bg-gradient-to-r from-[#D4AF37] to-[#C89D5C] text-[#0A1325] hover:brightness-110 shadow-gold-glow active:scale-95'
                              }`}
                            >
                              {isJustAdded ? (
                                <>
                                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                  Added ✓
                                </>
                              ) : (
                                <>
                                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                                  Add to Cart
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* D. GOOGLE BUSINESS PROFILE & LOCAL TRUST SECTION */}
            <section className="bg-gradient-to-b from-[#0A1325] via-[#0F1A30] to-[#0A1325] border-t border-[#1E3156]/80 py-14">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Google Trust Banner Card */}
                <div className="bg-[#121E36] border border-[#C89D5C]/40 rounded-3xl p-6 sm:p-8 shadow-card-elevated relative overflow-hidden mb-10">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#C89D5C]/10 rounded-full blur-3xl pointer-events-none"></div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-8 space-y-3">
                      <div className="flex items-center gap-2">
                        {/* Google G logo simulation */}
                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs font-black text-[#4285F4]">
                          G
                        </div>
                        <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                          Official Google Business Profile • Jaunpur Hub
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          Verified Location
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                        Rated 4.9 / 5 Stars by 128+ Clients Across Jaunpur
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                        Experience tactile architectural luxury firsthand at our Civil Lines studio near Collectorate, or order online with guaranteed 24-48 hour delivery to your home or site across Jaunpur, Badlapur, Machhlishahr, and Varanasi.
                      </p>

                      <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                        <span className="text-slate-300 flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-[#C89D5C]" />
                          Civil Lines, Near Collectorate, Jaunpur, UP 222002
                        </span>
                        <span className="text-slate-500">•</span>
                        <span className="text-slate-300 flex items-center gap-1">
                          <Phone className="w-4 h-4 text-[#00D2EE]" />
                          +91 94152 87654
                        </span>
                      </div>
                    </div>

                    <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 justify-center">
                      <a
                        href={STORE_PROFILE.mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C89D5C] text-[#0A1325] font-bold text-xs sm:text-sm text-center shadow-gold-glow hover:brightness-110 flex items-center justify-center gap-2 transition-all"
                      >
                        <MapPin className="w-4 h-4" />
                        Get Google Maps Directions
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <button
                        onClick={() => setIsConsultModalOpen(true)}
                        className="px-5 py-3 rounded-xl bg-[#0A1325] border border-[#1E3156] hover:border-[#00D2EE] text-slate-200 hover:text-white text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2"
                      >
                        <Clock className="w-4 h-4 text-[#00D2EE]" />
                        Book Studio Architectural Walkthrough
                      </button>
                    </div>
                  </div>
                </div>

                {/* Local Customer Reviews Slider / Grid */}
                <div>
                  <div className="flex items-center justify-between pb-6">
                    <div>
                      <h4 className="text-xl font-bold text-white flex items-center gap-2">
                        <Star className="w-5 h-5 text-[#C89D5C] fill-current" />
                        Verified Client Reviews in Jaunpur
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Real experiences praising product craftsmanship, seamless online ordering, and prompt delivery.
                      </p>
                    </div>

                    <a
                      href={STORE_PROFILE.mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hidden sm:flex items-center gap-1 text-xs text-[#00D2EE] hover:underline"
                    >
                      Read all 128 Google Reviews
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {GOOGLE_REVIEWS.map((rev) => (
                      <div
                        key={rev.id}
                        className="bg-[#121E36] border border-[#1E3156] hover:border-[#C89D5C]/50 rounded-2xl p-5 shadow-card-elevated flex flex-col justify-between transition-all"
                      >
                        <div>
                          {/* Stars & Date */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-1 text-[#C89D5C]">
                              {[...Array(rev.rating)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-current" />
                              ))}
                            </div>
                            <span className="text-[11px] text-slate-400">{rev.date}</span>
                          </div>

                          {/* Review Content */}
                          <p className="text-xs text-slate-300 leading-relaxed italic">
                            "{rev.content}"
                          </p>
                        </div>

                        {/* Author Info */}
                        <div className="mt-5 pt-4 border-t border-[#1E3156]/80 flex items-center gap-3">
                          <img
                            src={rev.avatar}
                            alt={rev.author}
                            className="w-10 h-10 rounded-full object-cover border border-[#C89D5C]/40"
                          />
                          <div>
                            <div className="text-xs font-bold text-white flex items-center gap-1">
                              {rev.author}
                              {rev.verified && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#00D2EE]" />
                              )}
                            </div>
                            <div className="text-[11px] text-[#C89D5C]">
                              {rev.location}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              Project: {rev.project}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* ==========================================
          FOOTER
      ========================================== */}
      <footer className="bg-[#0A1325] border-t border-[#1E3156] py-10 relative z-10 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#121E36] border border-[#C89D5C] p-1 flex items-center justify-center">
                  <img src="/Smart_Home_Design.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">SMART HOME</div>
                  <div className="text-[9px] text-[#C89D5C] tracking-widest uppercase">DESIGN GROUP</div>
                </div>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Purvanchal’s premier architectural lighting and smart living studio. Handcrafted luxury fixtures with integrated Zigbee and Matter ecosystem support.
              </p>
            </div>

            <div>
              <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Studio Location</h5>
              <p className="text-[11px] leading-relaxed">
                {STORE_PROFILE.address}
              </p>
              <p className="mt-2 text-[11px] text-slate-300">
                Hours: {STORE_PROFILE.workingHours}
              </p>
              <p className="mt-1 text-[11px] text-[#00D2EE]">
                GSTIN: {STORE_PROFILE.gstin}
              </p>
            </div>

            <div>
              <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Concierge & Ordering</h5>
              <p className="text-[11px]">Phone: <a href="tel:+919415287654" className="text-white hover:text-[#C89D5C]">{STORE_PROFILE.phone}</a></p>
              <p className="mt-1 text-[11px]">Email: <a href="mailto:concierge@smarthomedesign.in" className="text-white hover:text-[#C89D5C]">{STORE_PROFILE.email}</a></p>
              <p className="mt-2 text-[11px] text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                No WhatsApp Wall • Instant Online Settlement
              </p>
            </div>

            <div>
              <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Security & Compliance</h5>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Lock className="w-3.5 h-3.5 text-[#00D2EE]" />
                  256-Bit SSL Encrypted Checkout
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Building className="w-3.5 h-3.5 text-[#C89D5C]" />
                  RBI & PCI-DSS Level 1 Compliant
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Truck className="w-3.5 h-3.5 text-indigo-300" />
                  Jaunpur Express Hub Dispatch
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#1E3156]/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
            <p>© {new Date().getFullYear()} Smart Home Design Group. All Rights Reserved. Jaunpur, Uttar Pradesh.</p>
            <div className="flex items-center gap-4">
              <button onClick={() => setActiveTab('admin')} className="text-[#C89D5C] hover:underline">
                Store Owner Portal
              </button>
              <a href={STORE_PROFILE.mapsUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white">
                Google Business Listing
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ==========================================
          MOBILE BOTTOM APP BAR
      ========================================== */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0F1A30]/95 backdrop-blur-xl border-t border-[#1E3156] md:hidden px-2 py-2">
        <div className="grid grid-cols-4 gap-1 text-center text-[10px]">
          <button
            onClick={() => setActiveTab('store')}
            className={`flex flex-col items-center py-1 rounded-xl transition-all ${
              activeTab === 'store' ? 'text-[#C89D5C] font-bold' : 'text-slate-400'
            }`}
          >
            <Home className="w-4 h-4 mb-0.5" />
            Store
          </button>

          <button
            onClick={() => {
              setActiveTab('store');
              const el = document.getElementById('catalog-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex flex-col items-center py-1 rounded-xl text-slate-400 hover:text-white"
          >
            <Layers className="w-4 h-4 mb-0.5" />
            Catalog
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex flex-col items-center py-1 rounded-xl text-slate-300 hover:text-white"
          >
            <ShoppingBag className="w-4 h-4 mb-0.5" />
            Cart
            {totalCartCount > 0 && (
              <span className="absolute top-0 right-5 w-4 h-4 rounded-full bg-[#00D2EE] text-[#0A1325] text-[9px] font-black flex items-center justify-center">
                {totalCartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab(activeTab === 'admin' ? 'store' : 'admin')}
            className={`flex flex-col items-center py-1 rounded-xl transition-all ${
              activeTab === 'admin' ? 'text-[#00D2EE] font-bold' : 'text-slate-400'
            }`}
          >
            <BarChart3 className="w-4 h-4 mb-0.5" />
            Admin
          </button>
        </div>
      </nav>

      {/* ==========================================
          C. SLIDE-OVER CART DRAWER
      ========================================== */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
          ></div>

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#121E36] border-l border-[#1E3156] shadow-2xl flex flex-col">
              {/* Drawer Header */}
              <div className="p-4 sm:p-5 border-b border-[#1E3156] flex items-center justify-between bg-[#0F1A30]">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#C89D5C]" />
                  <h3 className="font-bold text-white text-base">Your Architectural Cart</h3>
                  <span className="px-2 py-0.5 rounded-full text-xs bg-[#00D2EE]/20 text-[#00D2EE] font-bold">
                    {totalCartCount} items
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1E3156]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress */}
              <div className="px-5 py-3 bg-[#0A1325] border-b border-[#1E3156]/60 text-xs">
                {cartSubtotal >= STORE_PROFILE.freeShippingThreshold ? (
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>You've unlocked FREE Express Delivery to Jaunpur!</span>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between text-slate-300 mb-1.5">
                      <span>Add {formatINR(STORE_PROFILE.freeShippingThreshold - cartSubtotal)} more for Free Delivery</span>
                      <span className="text-[#C89D5C] font-semibold">
                        {Math.round((cartSubtotal / STORE_PROFILE.freeShippingThreshold) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-[#1E3156] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#D4AF37] to-[#00D2EE] h-full rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (cartSubtotal / STORE_PROFILE.freeShippingThreshold) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 divide-y divide-[#1E3156]/60">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <div className="w-16 h-16 rounded-full bg-[#1E3156] flex items-center justify-center mx-auto text-slate-400">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h4 className="font-bold text-white text-base">Your Cart is Empty</h4>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto">
                      Explore our architectural lighting, wall paneling, and smart automation modules.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-2 px-5 py-2.5 rounded-xl bg-[#C89D5C] text-[#0A1325] text-xs font-bold shadow-gold-glow"
                    >
                      Browse Catalog
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="pt-4 first:pt-0 flex gap-3.5 items-start">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover border border-[#1E3156] flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h5 className="font-bold text-white text-xs sm:text-sm line-clamp-1">
                            {item.name}
                          </h5>
                          <button
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="text-slate-400 hover:text-rose-400 p-0.5"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-[10px] text-[#C89D5C] font-medium mt-0.5">
                          {item.tag}
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                          <div className="text-sm font-extrabold text-white">
                            {formatINR(item.price * item.quantity)}
                          </div>

                          {/* Stepper */}
                          <div className="inline-flex items-center gap-2 bg-[#0A1325] border border-[#1E3156] px-2 py-0.5 rounded-lg">
                            <button
                              onClick={() => handleUpdateCartQty(item.id, -1)}
                              className="text-slate-400 hover:text-white"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-white min-w-[16px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateCartQty(item.id, 1)}
                              className="text-slate-400 hover:text-white"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer with Calculations & Checkout Button */}
              {cart.length > 0 && (
                <div className="p-4 sm:p-5 bg-[#0F1A30] border-t border-[#1E3156] space-y-3.5">
                  {/* Coupon Code Input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleApplyPromo();
                        }
                      }}
                      placeholder="Promo Code (e.g. JAUNPUR10)"
                      className="flex-1 bg-[#0A1325] border border-[#1E3156] rounded-xl px-3 py-1.5 text-xs text-white uppercase placeholder-slate-400 focus:outline-none focus:border-[#C89D5C]"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-3.5 py-1.5 rounded-xl bg-[#1E3156] hover:bg-[#C89D5C] hover:text-[#0A1325] text-xs font-semibold text-white transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && <p className="text-[10px] text-rose-400">{promoError}</p>}
                  {appliedDiscount > 0 && (
                    <p className="text-[10px] text-emerald-400 font-medium">
                      ✓ {appliedDiscount}% architectural studio discount active!
                    </p>
                  )}

                  {/* Price Breakdown */}
                  <div className="space-y-1.5 text-xs text-slate-300 pt-1">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-white font-medium">{formatINR(cartSubtotal)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Discount ({appliedDiscount}%)</span>
                        <span>-{formatINR(discountAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Express Shipping (Jaunpur Hub)</span>
                      <span>
                        {shippingFee === 0 ? (
                          <span className="text-emerald-400 font-semibold uppercase text-[10px]">FREE</span>
                        ) : (
                          formatINR(shippingFee)
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Estimated GST (18% inclusive)</span>
                      <span>{formatINR(Math.round((cartTotal * 0.18) / 1.18))}</span>
                    </div>
                    <div className="pt-2 border-t border-[#1E3156] flex justify-between text-base font-extrabold text-white">
                      <span>Total Amount</span>
                      <span className="gold-gradient-text">{formatINR(cartTotal)}</span>
                    </div>
                  </div>

                  {/* Proceed to Checkout CTA */}
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setCheckoutStep(1);
                      setIsCheckoutOpen(true);
                    }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C89D5C] text-[#0A1325] font-bold text-sm tracking-wide shadow-gold-glow hover:brightness-110 flex items-center justify-center gap-2 transition-all"
                  >
                    <Lock className="w-4 h-4" />
                    Proceed to Automated Checkout
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Zero WhatsApp Wall • Instant Direct Settlement</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          C. 2-STEP CHECKOUT & SETTLEMENT MODAL
      ========================================== */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
          <div className="bg-[#121E36] border border-[#1E3156] rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden animate-scale-up">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#0F1A30] border-b border-[#1E3156] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#C89D5C]/15 text-[#C89D5C] flex items-center justify-center font-bold text-xs border border-[#C89D5C]/30">
                  SHD
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm sm:text-base">
                    Automated Checkout Engine
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    Smart Home Design Group • Jaunpur Direct Gateway
                  </p>
                </div>
              </div>

              {checkoutStep !== 3 && (
                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Stepper Progress Bar */}
            <div className="px-6 py-3 bg-[#0A1325] border-b border-[#1E3156] flex items-center justify-between text-xs font-semibold">
              <div className={`flex items-center gap-1.5 ${checkoutStep >= 1 ? 'text-[#C89D5C]' : 'text-slate-500'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${checkoutStep >= 1 ? 'bg-[#C89D5C] text-[#0A1325]' : 'bg-[#1E3156] text-slate-400'}`}>
                  1
                </span>
                Shipping Details
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600" />
              <div className={`flex items-center gap-1.5 ${checkoutStep >= 2 ? 'text-[#00D2EE]' : 'text-slate-500'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${checkoutStep >= 2 ? 'bg-[#00D2EE] text-[#0A1325]' : 'bg-[#1E3156] text-slate-400'}`}>
                  2
                </span>
                Payment & Settlement
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600" />
              <div className={`flex items-center gap-1.5 ${checkoutStep === 3 ? 'text-emerald-400' : 'text-slate-500'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${checkoutStep === 3 ? 'bg-emerald-400 text-[#0A1325]' : 'bg-[#1E3156] text-slate-400'}`}>
                  3
                </span>
                Confirmation & Invoice
              </div>
            </div>

            {/* STEP 1: CUSTOMER DETAILS & SHIPPING FORM */}
            {checkoutStep === 1 && (
              <form onSubmit={handleProceedToPayment} className="p-6 space-y-4 text-xs">
                <div className="bg-[#0A1325] p-3 rounded-xl border border-[#00D2EE]/30 flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#00D2EE]" />
                    Hub: Civil Lines, Jaunpur Express Fulfillment
                  </span>
                  <span className="text-[#00D2EE] font-bold">24-48h Delivery</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={customerForm.name}
                      onChange={(e) => setCustomerForm({ ...customerForm, name: e.target.value })}
                      placeholder="e.g. Sanjeev Kumar"
                      className="w-full bg-[#0F1A30] border border-[#1E3156] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#C89D5C]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Phone Number (SMS Tracking) *</label>
                    <input
                      type="tel"
                      required
                      value={customerForm.phone}
                      onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })}
                      placeholder="+91 9415X XXXXX"
                      className="w-full bg-[#0F1A30] border border-[#1E3156] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#C89D5C]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Email Address (For Tax Invoice) *</label>
                    <input
                      type="email"
                      required
                      value={customerForm.email}
                      onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })}
                      placeholder="user@example.com"
                      className="w-full bg-[#0F1A30] border border-[#1E3156] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#C89D5C]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">City / Region *</label>
                    <input
                      type="text"
                      required
                      value={customerForm.city}
                      onChange={(e) => setCustomerForm({ ...customerForm, city: e.target.value })}
                      placeholder="Jaunpur"
                      className="w-full bg-[#0F1A30] border border-[#1E3156] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#C89D5C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Street Address / House / Landmark *</label>
                  <input
                    type="text"
                    required
                    value={customerForm.address}
                    onChange={(e) => setCustomerForm({ ...customerForm, address: e.target.value })}
                    placeholder="Bungalow / Plot No., Colony, Landmark in Jaunpur"
                    className="w-full bg-[#0F1A30] border border-[#1E3156] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#C89D5C]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">PIN Code (Jaunpur is 222002) *</label>
                    <input
                      type="text"
                      required
                      value={customerForm.pincode}
                      onChange={(e) => setCustomerForm({ ...customerForm, pincode: e.target.value })}
                      placeholder="222002"
                      className="w-full bg-[#0F1A30] border border-[#1E3156] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#C89D5C]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Site Delivery Notes</label>
                    <input
                      type="text"
                      value={customerForm.deliveryNotes}
                      onChange={(e) => setCustomerForm({ ...customerForm, deliveryNotes: e.target.value })}
                      placeholder="Call on arrival / site engineer"
                      className="w-full bg-[#0F1A30] border border-[#1E3156] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#C89D5C]"
                    />
                  </div>
                </div>

                {/* Summary Pill */}
                <div className="p-3 bg-[#0F1A30] rounded-xl border border-[#1E3156] flex items-center justify-between text-xs">
                  <span className="text-slate-300">{cart.length} Products in order</span>
                  <span className="font-bold text-white">Total: {formatINR(cartTotal)}</span>
                </div>

                {/* Step 1 Actions */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCheckoutOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-[#1E3156] text-slate-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C89D5C] text-[#0A1325] font-bold shadow-gold-glow hover:brightness-110 flex items-center gap-1.5"
                  >
                    Continue to Payment
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: PAYMENT GATEWAY SIMULATION (Razorpay / PhonePe Style) */}
            {checkoutStep === 2 && (
              <div className="p-6 space-y-5 text-xs">
                {/* Gateway Trust & Amount Bar */}
                <div className="bg-gradient-to-r from-[#0F1A30] to-[#162544] border border-[#00D2EE]/40 p-4 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block">PAYMENT TO MERCHANT</span>
                    <h5 className="font-bold text-white text-sm sm:text-base">{STORE_PROFILE.name}</h5>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Direct Bank Settlement to HDFC Jaunpur
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">TOTAL PAYABLE</span>
                    <span className="text-xl sm:text-2xl font-extrabold gold-gradient-text">
                      {formatINR(cartTotal)}
                    </span>
                  </div>
                </div>

                {/* Payment Option Tabs */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`py-2.5 px-3 rounded-xl border font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === 'upi'
                        ? 'bg-[#C89D5C] text-[#0A1325] border-[#C89D5C] shadow-gold-glow'
                        : 'bg-[#0F1A30] text-slate-300 border-[#1E3156]'
                    }`}
                  >
                    <QrCode className="w-4 h-4" />
                    UPI / QR Code
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2.5 px-3 rounded-xl border font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-[#C89D5C] text-[#0A1325] border-[#C89D5C] shadow-gold-glow'
                        : 'bg-[#0F1A30] text-slate-300 border-[#1E3156]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    Cards (Debit/Credit)
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`py-2.5 px-3 rounded-xl border font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === 'netbanking'
                        ? 'bg-[#C89D5C] text-[#0A1325] border-[#C89D5C] shadow-gold-glow'
                        : 'bg-[#0F1A30] text-slate-300 border-[#1E3156]'
                    }`}
                  >
                    <Building className="w-4 h-4" />
                    NetBanking
                  </button>
                </div>

                {/* TAB 1: UPI OPTION */}
                {paymentMethod === 'upi' && (
                  <div className="bg-[#0F1A30] border border-[#1E3156] p-4 rounded-2xl space-y-4">
                    <div className="flex gap-2 border-b border-[#1E3156] pb-3">
                      <button
                        type="button"
                        onClick={() => setUpiOption('qr')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                          upiOption === 'qr' ? 'bg-[#1E3156] text-[#00D2EE]' : 'text-slate-400'
                        }`}
                      >
                        Dynamic UPI QR Code
                      </button>
                      <button
                        type="button"
                        onClick={() => setUpiOption('apps')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                          upiOption === 'apps' ? 'bg-[#1E3156] text-[#00D2EE]' : 'text-slate-400'
                        }`}
                      >
                        GPay / PhonePe / Paytm
                      </button>
                      <button
                        type="button"
                        onClick={() => setUpiOption('id')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                          upiOption === 'id' ? 'bg-[#1E3156] text-[#00D2EE]' : 'text-slate-400'
                        }`}
                      >
                        UPI ID / VPA
                      </button>
                    </div>

                    {upiOption === 'qr' && (
                      <div className="flex flex-col sm:flex-row items-center gap-5 justify-center py-2">
                        {/* Dynamic Stylized QR Code */}
                        <div className="bg-white p-3 rounded-2xl shadow-cyan-sm border-2 border-[#00D2EE] flex flex-col items-center">
                          <div className="w-36 h-36 bg-[#0A1325] p-2 rounded-xl flex items-center justify-center relative">
                            {/* Stylized QR pattern visualization */}
                            <div className="grid grid-cols-6 gap-1 w-full h-full p-1">
                              {[...Array(36)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`rounded-sm ${
                                    i % 2 === 0 || i % 7 === 0 ? 'bg-[#C89D5C]' : 'bg-[#00D2EE]'
                                  }`}
                                ></div>
                              ))}
                            </div>
                            <div className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-[9px] text-[#0A1325] shadow">
                              SHD
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-slate-800 mt-2">
                            SCAN & PAY VIA ANY UPI APP
                          </span>
                        </div>

                        <div className="space-y-2 text-center sm:text-left">
                          <div className="text-xs text-slate-300">
                            Scan with PhonePe, Google Pay, Paytm, or BHIM.
                          </div>
                          <div className="text-[11px] text-[#00D2EE] font-mono">
                            VPA: smarthomedesign@hdfcbank
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center justify-center sm:justify-start gap-1">
                            <Clock className="w-3 h-3 text-amber-400" />
                            Session expires in 04:48 min
                          </div>
                        </div>
                      </div>
                    )}

                    {upiOption === 'apps' && (
                      <div className="grid grid-cols-3 gap-3 py-2">
                        {['PhonePe', 'Google Pay', 'Paytm'].map((app) => (
                          <div
                            key={app}
                            onClick={() => {
                              showToast(`Redirecting to ${app} secure checkout...`);
                            }}
                            className="p-3 rounded-xl bg-[#0A1325] border border-[#1E3156] hover:border-[#00D2EE] text-center cursor-pointer transition-colors"
                          >
                            <div className="w-8 h-8 rounded-full bg-[#1E3156] text-white font-bold text-xs flex items-center justify-center mx-auto mb-1">
                              {app[0]}
                            </div>
                            <div className="text-xs font-semibold text-white">{app}</div>
                            <div className="text-[9px] text-[#00D2EE] mt-0.5">Instant Pay</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {upiOption === 'id' && (
                      <div className="space-y-2 py-2">
                        <label className="block text-slate-300 font-medium">Enter Virtual Payment Address (UPI ID)</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={upiIdInput}
                            onChange={(e) => setUpiIdInput(e.target.value)}
                            placeholder="e.g. yourname@oksbi / 9415287654@ybl"
                            className="flex-1 bg-[#0A1325] border border-[#1E3156] rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#C89D5C]"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (upiIdInput.includes('@')) {
                                showToast(`VPA ${upiIdInput} verified! Ready to pay.`);
                              } else {
                                showToast("Please enter a valid UPI ID (e.g. name@bank)");
                              }
                            }}
                            className="px-4 py-2 rounded-xl bg-[#1E3156] text-slate-200 text-xs font-semibold hover:bg-[#C89D5C] hover:text-[#0A1325]"
                          >
                            Verify
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 2: CREDIT/DEBIT CARD OPTION */}
                {paymentMethod === 'card' && (
                  <div className="bg-[#0F1A30] border border-[#1E3156] p-4 rounded-2xl space-y-3">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Card Number (256-Bit SSL Encrypted)</label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          value={cardForm.number}
                          onChange={(e) => setCardForm({ ...cardForm, number: e.target.value })}
                          placeholder="4532 8921 7840 9182"
                          className="w-full bg-[#0A1325] border border-[#1E3156] rounded-xl pl-9 pr-3 py-2 text-white font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 font-medium mb-1">Cardholder Name</label>
                        <input
                          type="text"
                          value={cardForm.name}
                          onChange={(e) => setCardForm({ ...cardForm, name: e.target.value })}
                          className="w-full bg-[#0A1325] border border-[#1E3156] rounded-xl px-3 py-2 text-white uppercase"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-slate-300 font-medium mb-1">Expiry</label>
                          <input
                            type="text"
                            value={cardForm.expiry}
                            onChange={(e) => setCardForm({ ...cardForm, expiry: e.target.value })}
                            placeholder="MM/YY"
                            className="w-full bg-[#0A1325] border border-[#1E3156] rounded-xl px-3 py-2 text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-300 font-medium mb-1">CVV</label>
                          <input
                            type="password"
                            maxLength={4}
                            value={cardForm.cvv}
                            onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value })}
                            placeholder="***"
                            className="w-full bg-[#0A1325] border border-[#1E3156] rounded-xl px-3 py-2 text-white font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: NETBANKING */}
                {paymentMethod === 'netbanking' && (
                  <div className="bg-[#0F1A30] border border-[#1E3156] p-4 rounded-2xl space-y-3">
                    <label className="block text-slate-300 font-medium mb-1">Select Bank for Direct Debit</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank'].map((bank) => (
                        <button
                          key={bank}
                          type="button"
                          onClick={() => setSelectedBank(bank)}
                          className={`p-2.5 rounded-xl border text-center text-xs font-semibold transition-all ${
                            selectedBank === bank
                              ? 'bg-[#C89D5C] text-[#0A1325] border-[#C89D5C]'
                              : 'bg-[#0A1325] text-slate-300 border-[#1E3156]'
                          }`}
                        >
                          {bank}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Security Trust Badges */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] text-slate-400 border-t border-[#1E3156] pt-3">
                  <div className="flex items-center gap-1 text-emerald-400">
                    <Lock className="w-3 h-3" />
                    256-Bit SSL Encrypted
                  </div>
                  <div>PCI-DSS Certified Level 1</div>
                  <div>RBI Compliant Direct Settlement</div>
                </div>

                {/* Step 2 Actions & Processing State */}
                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep(1)}
                    disabled={isProcessingPayment}
                    className="px-4 py-2.5 rounded-xl border border-[#1E3156] text-slate-300 hover:text-white"
                  >
                    Back to Shipping
                  </button>

                  <button
                    type="button"
                    onClick={handleSimulatePayment}
                    disabled={isProcessingPayment}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C89D5C] text-[#0A1325] font-extrabold text-sm shadow-gold-glow hover:brightness-110 flex items-center gap-2 min-w-[200px] justify-center"
                  >
                    {isProcessingPayment ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        Authorize & Pay {formatINR(cartTotal)}
                      </>
                    )}
                  </button>
                </div>

                {/* Live Processing Status Banner */}
                {isProcessingPayment && (
                  <div className="p-3 rounded-xl bg-[#00D2EE]/10 border border-[#00D2EE]/40 text-center text-xs text-[#00D2EE] animate-pulse">
                    {processingStatusText}
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: INSTANT ORDER CONFIRMATION & SETTLEMENT SCREEN */}
            {checkoutStep === 3 && currentConfirmedOrder && (
              <div className="p-6 space-y-6 text-xs">
                {/* Success Banner */}
                <div className="text-center space-y-2 py-2">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 flex items-center justify-center mx-auto shadow-cyan-glow">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-extrabold text-white">
                    Order Confirmed & Payment Settled!
                  </h4>
                  <p className="text-slate-300 text-xs max-w-md mx-auto">
                    Your luxury fixtures have been reserved and routed to our fulfillment hub in Civil Lines, Jaunpur.
                  </p>
                </div>

                {/* Order Details Card */}
                <div className="bg-[#0F1A30] border border-[#1E3156] rounded-2xl p-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1E3156] pb-3">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase">ORDER ID</span>
                      <div className="text-base font-mono font-bold text-[#00D2EE]">
                        #{currentConfirmedOrder.id}
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase">PAYMENT MODE</span>
                      <div className="font-semibold text-white">
                        {currentConfirmedOrder.paymentMethod}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase">AMOUNT PAID</span>
                      <div className="text-base font-bold text-[#C89D5C]">
                        {formatINR(currentConfirmedOrder.total)}
                      </div>
                    </div>
                  </div>

                  {/* Direct Settlement Badge */}
                  <div className="p-2.5 rounded-xl bg-[#121E36] border border-[#C89D5C]/40 flex items-center gap-2 text-xs text-slate-200">
                    <Building className="w-4 h-4 text-[#C89D5C] flex-shrink-0" />
                    <span>
                      Direct settlement confirmed to <strong className="text-white">{STORE_PROFILE.name}</strong> merchant account via PhonePe/Razorpay.
                    </span>
                  </div>

                  {/* Simulated Dispatch Alerts */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2.5 rounded-xl bg-[#0A1325] border border-[#1E3156] flex items-center gap-2 text-slate-300">
                      <Phone className="w-4 h-4 text-[#00D2EE]" />
                      <span>SMS dispatch alert sent to <strong>{currentConfirmedOrder.customer.phone}</strong></span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0A1325] border border-[#1E3156] flex items-center gap-2 text-slate-300">
                      <Mail className="w-4 h-4 text-[#C89D5C]" />
                      <span>Tax invoice emailed to <strong>{currentConfirmedOrder.customer.email}</strong></span>
                    </div>
                  </div>

                  {/* Delivery Estimate */}
                  <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-700/60 flex items-center justify-between text-xs text-emerald-300">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-4 h-4" />
                      Expected Doorstep Delivery:
                    </span>
                    <strong className="text-white">Within 24 - 48 Hours (Jaunpur)</strong>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => {
                      setInvoiceModalOrder(currentConfirmedOrder);
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#1E3156] hover:bg-[#162544] text-white font-semibold flex items-center justify-center gap-2 border border-slate-500"
                  >
                    <Printer className="w-4 h-4 text-[#C89D5C]" />
                    View & Print Tax Invoice
                  </button>

                  <button
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setCheckoutStep(1);
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C89D5C] text-[#0A1325] font-bold shadow-gold-glow hover:brightness-110 flex items-center justify-center gap-1.5"
                  >
                    Back to Store
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==========================================
          PRINTABLE / DOWNLOADABLE TAX INVOICE MODAL
      ========================================== */}
      {invoiceModalOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
          <div className="bg-[#0A1325] border border-[#1E3156] rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden text-slate-100 animate-scale-up">
            {/* Modal Controls Bar */}
            <div className="p-4 bg-[#0F1A30] border-b border-[#1E3156] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <FileText className="w-4 h-4 text-[#C89D5C]" />
                Tax Invoice • #{invoiceModalOrder.id}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-lg bg-[#C89D5C] text-[#0A1325] text-xs font-bold flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print / PDF
                </button>
                <button
                  onClick={() => setInvoiceModalOrder(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Invoice Container */}
            <div id="printable-invoice" className="p-6 sm:p-8 space-y-6 text-xs bg-white text-slate-900 rounded-b-3xl">
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b pb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-950 uppercase tracking-tight">
                    {STORE_PROFILE.name}
                  </h3>
                  <p className="text-xs text-amber-700 font-semibold tracking-wide">
                    {STORE_PROFILE.subtitle}
                  </p>
                  <p className="text-[11px] text-slate-600 mt-1 max-w-xs">
                    {STORE_PROFILE.address}
                  </p>
                  <p className="text-[11px] text-slate-600">
                    GSTIN: <strong className="text-slate-900">{STORE_PROFILE.gstin}</strong> | State: Uttar Pradesh (09)
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-900 font-bold text-xs uppercase">
                    Tax Invoice
                  </span>
                  <div className="mt-2 text-xs text-slate-600">
                    Invoice No: <strong className="text-slate-950 font-mono">INV-{invoiceModalOrder.id}</strong>
                  </div>
                  <div className="text-xs text-slate-600">
                    Date: {new Date(invoiceModalOrder.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  <div className="text-xs text-emerald-700 font-bold mt-1">
                    Status: PAID IN FULL
                  </div>
                </div>
              </div>

              {/* Bill To & Ship To */}
              <div className="grid grid-cols-2 gap-4 border-b pb-4 text-xs">
                <div>
                  <h6 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider mb-1">
                    Billed & Shipped To:
                  </h6>
                  <p className="font-bold text-slate-950">{invoiceModalOrder.customer.name}</p>
                  <p className="text-slate-600">{invoiceModalOrder.customer.address}</p>
                  <p className="text-slate-600">{invoiceModalOrder.customer.city || "Jaunpur"}, UP - {invoiceModalOrder.customer.pincode}</p>
                  <p className="text-slate-600 mt-1">Phone: {invoiceModalOrder.customer.phone}</p>
                </div>

                <div>
                  <h6 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider mb-1">
                    Payment & Settlement Details:
                  </h6>
                  <p className="text-slate-700">Payment Gateway: <strong>{invoiceModalOrder.paymentMethod}</strong></p>
                  <p className="text-slate-700">Transaction Ref: <span className="font-mono text-[10px]">{invoiceModalOrder.paymentRef}</span></p>
                  <p className="text-slate-700">Settled Account: <strong>HDFC Bank Jaunpur Main Branch</strong></p>
                </div>
              </div>

              {/* Items Table */}
              <div>
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b-2 border-slate-900 text-slate-700 font-bold uppercase text-[10px]">
                      <th className="py-2">Item Description</th>
                      <th className="py-2 text-center">HSN</th>
                      <th className="py-2 text-center">Qty</th>
                      <th className="py-2 text-right">Rate</th>
                      <th className="py-2 text-right">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {invoiceModalOrder.items.map((it, idx) => (
                      <tr key={idx}>
                        <td className="py-2.5 font-medium text-slate-900">
                          {it.name}
                        </td>
                        <td className="py-2.5 text-center text-slate-500 font-mono text-[10px]">9405</td>
                        <td className="py-2.5 text-center font-bold text-slate-900">{it.quantity}</td>
                        <td className="py-2.5 text-right text-slate-600">{formatINR(it.price)}</td>
                        <td className="py-2.5 text-right font-bold text-slate-900">{formatINR(it.price * it.quantity)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Calculations */}
              <div className="flex justify-end pt-2 border-t">
                <div className="w-64 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span>{formatINR(invoiceModalOrder.subtotal)}</span>
                  </div>
                  {invoiceModalOrder.discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Discount</span>
                      <span>-{formatINR(invoiceModalOrder.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>Shipping Fee</span>
                    <span>{invoiceModalOrder.shipping === 0 ? 'FREE' : formatINR(invoiceModalOrder.shipping)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 text-[11px]">
                    <span>CGST (9%)</span>
                    <span>{formatINR(Math.round((invoiceModalOrder.total * 0.09) / 1.18))}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 text-[11px]">
                    <span>SGST (9%)</span>
                    <span>{formatINR(Math.round((invoiceModalOrder.total * 0.09) / 1.18))}</span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-slate-950 pt-2 border-t border-slate-900">
                    <span>Total Amount</span>
                    <span>{formatINR(invoiceModalOrder.total)}</span>
                  </div>
                </div>
              </div>

              {/* Authorized Signatory Stamp */}
              <div className="pt-6 border-t flex items-end justify-between text-[11px] text-slate-500">
                <div>
                  <p>Terms: 2-Year Studio Warranty against manufacturing defects.</p>
                  <p>Computer-generated digital invoice. No physical signature required.</p>
                </div>
                <div className="text-center">
                  <div className="border border-dashed border-amber-600 px-4 py-2 rounded bg-amber-50 text-amber-900 font-bold text-[10px] uppercase">
                    SMART HOME DESIGN GROUP<br />CIVIL LINES JAUNPUR
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-1">Authorized Hub Signatory</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          PRODUCT QUICK VIEW MODAL
      ========================================== */}
      {selectedProductQuickView && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
          <div className="bg-[#121E36] border border-[#1E3156] rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden animate-scale-up">
            <div className="p-4 bg-[#0F1A30] border-b border-[#1E3156] flex items-center justify-between">
              <span className="text-xs font-bold text-[#C89D5C] uppercase tracking-wider">
                Studio Specification Sheet
              </span>
              <button
                onClick={() => setSelectedProductQuickView(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="rounded-2xl overflow-hidden border border-[#1E3156] bg-[#0A1325] aspect-square">
                <img
                  src={selectedProductQuickView.image}
                  alt={selectedProductQuickView.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#C89D5C]/20 text-[#C89D5C] border border-[#C89D5C]/40">
                    {selectedProductQuickView.tag}
                  </span>
                  <h4 className="text-lg font-bold text-white mt-1.5 leading-snug">
                    {selectedProductQuickView.name}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-1 text-[#C89D5C]">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-bold">{selectedProductQuickView.rating} / 5</span>
                    <span className="text-slate-400">• Category: {selectedProductQuickView.category}</span>
                  </div>
                </div>

                <p className="text-slate-300 leading-relaxed text-xs">
                  {selectedProductQuickView.description}
                </p>

                {/* Technical Specifications */}
                {selectedProductQuickView.specs && (
                  <div className="bg-[#0F1A30] border border-[#1E3156] rounded-xl p-3 space-y-1.5 text-[11px]">
                    <div className="font-bold text-white mb-1 uppercase tracking-wider text-[10px]">
                      Architectural Specs:
                    </div>
                    {Object.entries(selectedProductQuickView.specs).map(([key, val]) => (
                      <div key={key} className="flex justify-between text-slate-300">
                        <span className="text-slate-400">{key}:</span>
                        <span className="font-medium text-white">{val}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-[#1E3156]">
                  <div>
                    <span className="text-[10px] text-slate-400 line-through">
                      {formatINR(selectedProductQuickView.originalPrice)}
                    </span>
                    <div className="text-xl font-extrabold text-white">
                      {formatINR(selectedProductQuickView.price)}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      handleAddToCart(selectedProductQuickView, 1, e);
                      setSelectedProductQuickView(null);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C89D5C] text-[#0A1325] font-bold shadow-gold-glow flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          ADD PRODUCT MODAL (ADMIN)
      ========================================== */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
          <div className="bg-[#121E36] border border-[#1E3156] rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden animate-scale-up">
            <div className="p-4 bg-[#0F1A30] border-b border-[#1E3156] flex items-center justify-between">
              <h4 className="font-bold text-white text-sm">Add New Product to Jaunpur Studio</h4>
              <button
                onClick={() => setIsAddProductModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNewProduct} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="e.g. Minimalist Knurled Brass Dimmer Switch"
                  className="w-full bg-[#0F1A30] border border-[#1E3156] rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Category *</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full bg-[#0F1A30] border border-[#1E3156] rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Smart Lighting">Smart Lighting</option>
                    <option value="Wall Paneling">Wall Paneling</option>
                    <option value="Automation">Automation</option>
                    <option value="Hardware">Hardware</option>
                    <option value="Luxury Accents">Luxury Accents</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Tag / Technology</label>
                  <input
                    type="text"
                    value={newProduct.tag}
                    onChange={(e) => setNewProduct({ ...newProduct, tag: e.target.value })}
                    placeholder="e.g. Zigbee / Solid Brass"
                    className="w-full bg-[#0F1A30] border border-[#1E3156] rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="7999"
                    className="w-full bg-[#0F1A30] border border-[#1E3156] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">MRP (₹)</label>
                  <input
                    type="number"
                    value={newProduct.originalPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, originalPrice: e.target.value })}
                    placeholder="10999"
                    className="w-full bg-[#0F1A30] border border-[#1E3156] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Initial Stock *</label>
                  <input
                    type="number"
                    required
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    placeholder="15"
                    className="w-full bg-[#0F1A30] border border-[#1E3156] rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Image URL (Unsplash or direct)</label>
                <input
                  type="url"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[#0F1A30] border border-[#1E3156] rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Description & Specs</label>
                <textarea
                  rows={2}
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Architectural details, material quality, automation protocols..."
                  className="w-full bg-[#0F1A30] border border-[#1E3156] rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#1E3156] text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C89D5C] text-[#0A1325] font-bold shadow-gold-glow"
                >
                  Save to Inventory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          CONSULTATION & STUDIO VISIT MODAL
      ========================================== */}
      {isConsultModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
          <div className="bg-[#121E36] border border-[#1E3156] rounded-3xl max-w-md w-full shadow-2xl overflow-hidden animate-scale-up">
            <div className="p-4 bg-[#0F1A30] border-b border-[#1E3156] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C89D5C]" />
                <h4 className="font-bold text-white text-sm">Book Studio Consultation</h4>
              </div>
              <button
                onClick={() => setIsConsultModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConsultSubmit} className="p-5 space-y-3.5 text-xs">
              <p className="text-slate-300 leading-relaxed text-xs">
                Meet our senior architectural lighting and automation designer at our <strong className="text-white">Civil Lines Studio</strong>, or schedule a residential site visit in Jaunpur.
              </p>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Er. Alok Sharma"
                  className="w-full bg-[#0F1A30] border border-[#1E3156] rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 9415X XXXXX"
                  className="w-full bg-[#0F1A30] border border-[#1E3156] rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Project Type</label>
                <select className="w-full bg-[#0F1A30] border border-[#1E3156] rounded-xl px-3 py-2 text-white">
                  <option>Full Home Automation (New Construction)</option>
                  <option>Architectural Lighting & Magnetic Tracks</option>
                  <option>Acoustic Fluted Oak Wall Paneling</option>
                  <option>Retrofit Smart Switches & Somfy Blinds</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Preferred Time / Studio Visit Date</label>
                <input
                  type="text"
                  placeholder="Tomorrow at 4:00 PM"
                  className="w-full bg-[#0F1A30] border border-[#1E3156] rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsConsultModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#1E3156] text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={consultSubmitted}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C89D5C] text-[#0A1325] font-bold shadow-gold-glow"
                >
                  {consultSubmitted ? "Requesting..." : "Confirm Appointment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
