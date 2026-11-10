import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, Shield, Wallet, CreditCard, User, LogOut, Search, 
  Plus, Edit, Trash2, CheckCircle, XCircle, Clock, Key, ArrowRight,
  TrendingUp, Users, DollarSign, Package, Settings, MessageSquare,
  Sparkles, RefreshCw, Layers, Bell, Check, X, Menu, Lock, Mail,
  Eye, EyeOff, ChevronRight, AlertCircle, Copy, Send, ExternalLink,
  Smartphone, Building, Gift, Filter, Tag, Zap, Award, Image as ImageIcon, Link as LinkIcon
} from 'lucide-react';

// ==========================================
// INITIAL MOCK DATA
// ==========================================
const INITIAL_CATEGORIES = [
  { id: 'cat-1', name: 'ROV', icon: '⚔️', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600' },
  { id: 'cat-2', name: 'Genshin Impact', icon: '✨', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=600' },
  { id: 'cat-3', name: 'Free Fire', icon: '🔥', image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=600' },
  { id: 'cat-4', name: 'PUBG Mobile', icon: '🪖', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600' },
  { id: 'cat-5', name: 'Roblox', icon: '🧱', image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&q=80&w=600' }
];

const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    title: 'ROV | All Skins Supreme God V.VIP Account',
    game: 'ROV',
    categoryId: 'cat-1',
    price: 1590,
    stock: 2,
    sold: 14,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600',
    description: 'ไอดีเทพ ROV สกินครบ 120+ รูนครบทุกสาย Rank Glorious Ruler มีตราวสล็อตทอง',
    credentials: [
      { username: 'rov_god_01', password: 'Password9981!' },
      { username: 'rov_god_02', password: 'Password9982!' }
    ]
  },
  {
    id: 'prod-2',
    title: 'Genshin Impact | C6 Raiden + C6 Yelan + Signature Weapon',
    game: 'Genshin Impact',
    categoryId: 'cat-2',
    price: 3200,
    stock: 1,
    sold: 8,
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=600',
    description: 'ไอดี Genshin Impact AR60 ตัวละคร 5 ดาวเพียบ C6 ไรเดน C6 เย่หลัน อาวุธประจำตัวขัด 5',
    credentials: [
      { username: 'genshin_c6_pro', password: 'GenshinPass2026!' }
    ]
  },
  {
    id: 'prod-3',
    title: 'Free Fire | Grandmaster ID + Old Season Skins',
    game: 'Free Fire',
    categoryId: 'cat-3',
    price: 490,
    stock: 5,
    sold: 29,
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=600',
    description: 'ไอดี Free Fire แร้งค์ GrandMaster ซีซั่นเก่า สกินปืนครบ ท่าทางหายากเยอะ',
    credentials: [
      { username: 'ff_pro_master1', password: 'FFpass111!' },
      { username: 'ff_pro_master2', password: 'FFpass222!' },
      { username: 'ff_pro_master3', password: 'FFpass333!' },
      { username: 'ff_pro_master4', password: 'FFpass444!' },
      { username: 'ff_pro_master5', password: 'FFpass555!' }
    ]
  }
];

const INITIAL_USERS = [
  { id: 'user-admin-1', username: 'Jao_fuse', email: 'admin@jaofuse.com', password: 'fiw1212fiw', role: 'admin', credit: 99999, status: 'active', totalSpent: 0 },
  { id: 'user-101', username: 'gamer_pro', email: 'gamer@gmail.com', password: 'user123', role: 'user', credit: 150, status: 'active', totalSpent: 350 },
  { id: 'user-102', username: 'somchai99', email: 'somchai@gmail.com', password: 'user123', role: 'user', credit: 0, status: 'active', totalSpent: 490 }
];

// ==========================================
// PRODUCT CARD COMPONENT
// ==========================================
function ProductCard({ product, onSelect, onBuy }) {
  return (
    <div className="bg-[#161226]/90 border border-purple-800/40 hover:border-purple-500/80 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 flex flex-col group">
      <div className="relative h-48 w-full overflow-hidden bg-purple-950/40 cursor-pointer" onClick={() => onSelect(product)}>
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          <span className="bg-purple-950/80 backdrop-blur-md text-purple-200 border border-purple-700/50 text-[10px] font-bold px-2.5 py-1 rounded-lg">
            {product.game}
          </span>
          {product.sold >= 10 && (
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-lg flex items-center space-x-1 shadow-md">
              <Sparkles className="w-3 h-3" />
              <span>BEST SELLER</span>
            </span>
          )}
        </div>
        <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-purple-700/50 text-[10px] font-mono text-purple-300">
          คงเหลือ: <span className={product.stock > 0 ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>{product.stock}</span> ชิ้น
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 
            onClick={() => onSelect(product)} 
            className="font-bold text-white text-base line-clamp-2 hover:text-purple-300 transition-colors cursor-pointer"
          >
            {product.title}
          </h3>
          <p className="text-purple-300/80 text-xs mt-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="pt-3 border-t border-purple-900/40 flex items-center justify-between">
          <div>
            <span className="block text-[10px] text-purple-400">ราคาสินค้า</span>
            <span className="text-xl font-black text-pink-400 font-mono">฿{product.price.toLocaleString()}</span>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => onSelect(product)}
              className="bg-purple-950 hover:bg-purple-900 border border-purple-700/50 text-purple-300 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
            >
              รายละเอียด
            </button>
            <button
              disabled={product.stock <= 0}
              onClick={() => onBuy(product)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                product.stock > 0 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-purple-600/20' 
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              {product.stock > 0 ? 'ซื้อสินค้า' : 'สินค้าหมด'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [isDemoMode, setIsDemoMode] = useState(true);

  // Authenticated user state (Default null to enforce sign in for buyers)
  const [user, setUser] = useState(INITIAL_USERS[0]); // Starts logged in as Jao_fuse (Admin)

  const [announcements, setAnnouncements] = useState([
    { id: 'ann-1', text: '⚡ ยินดีต้อนรับสู่ร้าน JAOFUSE บริการขายไอดีเกมออนไลน์ ปลอดภัย รวดเร็ว 24 ชม. ⚡', speed: 20, active: true, bg: '#2D1B4E', textCol: '#E9D5FF' }
  ]);

  const [banners, setBanners] = useState([
    { id: 'b-1', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1200', title: 'โปรโมชั่นเปิดร้านต้อนรับสมาชิกใหม่!', subtitle: 'เติมเงินรับโบนัสเครดิตเพิ่ม 10% ทุกช่องทาง', link: '/topup', active: true, order: 1 },
    { id: 'b-2', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200', title: 'ไอดีการันตีปลอดภัย 100% โดย JAOFUSE', subtitle: 'ส่งมอบรหัสผ่านระบบอัตโนมัติทันทีหลังชำระเงิน', link: '/products', active: true, order: 2 }
  ]);

  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [usersList, setUsersList] = useState(INITIAL_USERS);

  const [orders, setOrders] = useState([
    {
      id: 'ORD-98231',
      userId: 'user-101',
      username: 'gamer_pro',
      productId: 'prod-3',
      productTitle: 'Free Fire | Grandmaster ID + Old Season Skins',
      price: 490,
      deliveredAccount: { username: 'ff_pro_master1', password: 'FFpass111!' },
      createdAt: '2026-03-29 12:05:40',
      status: 'completed'
    }
  ]);

  const [topups, setTopups] = useState([]);
  const [adminLogs, setAdminLogs] = useState([
    { id: 'log-1', admin: 'Jao_fuse', action: 'ระบบเริ่มต้นเข้าสู่ระบบด้วยสิทธิ์ผู้ดูแลระบบ Jao_fuse', time: '2026-03-29 10:00:00' }
  ]);

  // Site & SlipOK Integration Settings
  const [siteSettings, setSiteSettings] = useState({
    siteName: 'JAOFUSE',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200',
    tagline: 'ร้านขายไอดีเกมออนไลน์อันดับ 1',
    primaryColor: '#8B5CF6',
    bankName: 'ธนาคารกสิกรไทย (KBANK)',
    bankAccountNo: '123-4-56789-0',
    bankAccountName: 'บจก. เจ้าฟิวส์ เกมมิ่ง ออนไลน์',
    qrCodeUrl: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=400',
    trueMoneyNo: '089-123-4567',
    contactFb: 'https://facebook.com/jaofuse',
    contactLine: '@jaofuse',
    contactDiscord: 'https://discord.gg/jaofuse',
    // SlipOK API Settings
    slipOkEnabled: true,
    slipOkApiKey: 'SOK_LIVE_API_KEY_EXAMPLE_JAOFUSE_2026',
    slipOkBranchId: 'BRANCH_01'
  });

  const [activeTab, setActiveTab] = useState('home');
  const [adminSubTab, setAdminSubTab] = useState('overview');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Notifications
  const [authModal, setAuthModal] = useState({ open: false, mode: 'login' });
  const [productDetailModal, setProductDetailModal] = useState(null);
  const [editProductModal, setEditProductModal] = useState(null);
  const [buyConfirmModal, setBuyConfirmModal] = useState(null);
  const [deliveredAccountModal, setDeliveredAccountModal] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const logAdminAction = (actionText) => {
    const newLog = {
      id: `log-${Date.now()}`,
      admin: user ? user.username : 'System',
      action: actionText,
      time: new Date().toLocaleString('th-TH')
    };
    setAdminLogs(prev => [newLog, ...prev]);
  };

  // SlipOK API Auto-Verification Simulator
  const handleTopupSubmit = (channel, payload) => {
    if (!user) {
      showToast('กรุณาเข้าสู่ระบบก่อนทำการเติมเครดิต', 'error');
      setAuthModal({ open: true, mode: 'login' });
      return;
    }

    const topupAmount = parseFloat(payload.amount);
    if (isNaN(topupAmount) || topupAmount <= 0) {
      showToast('กรุณาระบุจำนวนเงินให้ถูกต้อง', 'error');
      return;
    }

    const newReq = {
      id: `TOP-${Math.floor(100000 + Math.random() * 900000)}`,
      userId: user.id,
      username: user.username,
      amount: topupAmount,
      channel: channel,
      slipUrl: payload.slipUrl || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400',
      status: 'pending',
      createdAt: new Date().toLocaleString('th-TH')
    };

    // Auto verify via SlipOK if enabled or if Gift Link
    if (channel === 'TrueMoney Gift Link' || (siteSettings.slipOkEnabled && channel !== 'TrueMoney Direct Transfer')) {
      newReq.status = 'approved';
      setTopups(prev => [newReq, ...prev]);
      
      setUser(prev => ({ ...prev, credit: prev.credit + topupAmount }));
      setUsersList(prev => prev.map(u => u.id === user.id ? { ...u, credit: u.credit + topupAmount } : u));
      
      showToast(`[SlipOK Auto] อนุมัติการเติมเงินสำเร็จ +฿${topupAmount.toLocaleString()}`, 'success');
    } else {
      setTopups(prev => [newReq, ...prev]);
      showToast('ส่งคำขอเติมเงินสำเร็จ! สลิปเข้าสู่คิวรอแอดมินตรวจสอบ', 'info');
    }
  };

  // Enforce Purchase Gate (Must be logged in to purchase)
  const handleInitiatePurchase = (product) => {
    if (!user) {
      showToast('กรุณาสมัครสมาชิกหรือเข้าสู่ระบบก่อนซื้อสินค้า', 'error');
      setAuthModal({ open: true, mode: 'login' });
      return;
    }
    setBuyConfirmModal(product);
  };

  const handlePurchaseProduct = (product) => {
    if (!user) {
      setAuthModal({ open: true, mode: 'login' });
      return;
    }

    if (product.stock <= 0) {
      showToast('สินค้าชิ้นนี้หมดแล้ว!', 'error');
      return;
    }

    if (user.credit < product.price) {
      showToast('ยอดเงินคงเหลือไม่พอ กรุณาเติมเครดิต', 'error');
      setActiveTab('topup');
      return;
    }

    const deliveredAcc = product.credentials[0] || { username: 'jaofuse_id', password: 'Pass' + Math.floor(1000 + Math.random() * 9000) };
    
    // Update Product Stock securely
    setProducts(prev => prev.map(p => {
      if (p.id === product.id) {
        return {
          ...p,
          stock: Math.max(0, p.stock - 1),
          sold: p.sold + 1,
          credentials: p.credentials.slice(1)
        };
      }
      return p;
    }));

    // Update User Wallet Credit
    const updatedCredit = user.credit - product.price;
    setUser(prev => ({ ...prev, credit: updatedCredit }));
    setUsersList(prev => prev.map(u => u.id === user.id ? { ...u, credit: updatedCredit, totalSpent: (u.totalSpent || 0) + product.price } : u));

    // Create Order Record
    const newOrder = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      userId: user.id,
      username: user.username,
      productId: product.id,
      productTitle: product.title,
      price: product.price,
      deliveredAccount: deliveredAcc,
      createdAt: new Date().toLocaleString('th-TH'),
      status: 'completed'
    };

    setOrders(prev => [newOrder, ...prev]);
    setBuyConfirmModal(null);
    setDeliveredAccountModal(newOrder);
    showToast('ซื้อสินค้าสำเร็จ! ได้รับข้อมูลไอดีเรียบร้อยแล้ว', 'success');
  };

  const handleAdminApproveTopup = (topupId, approve) => {
    const targetTopup = topups.find(t => t.id === topupId);
    if (!targetTopup || targetTopup.status !== 'pending') return;

    if (approve) {
      setTopups(prev => prev.map(t => t.id === topupId ? { ...t, status: 'approved' } : t));
      setUsersList(prev => prev.map(u => u.id === targetTopup.userId ? { ...u, credit: u.credit + targetTopup.amount } : u));
      if (user && user.id === targetTopup.userId) {
        setUser(prev => ({ ...prev, credit: prev.credit + targetTopup.amount }));
      }
      logAdminAction(`อนุมัติสลิป #${topupId} จำนวน ฿${targetTopup.amount} ให้ผู้ใช้ ${targetTopup.username}`);
      showToast(`อนุมัติการเติมเงิน #${topupId} เรียบร้อย`, 'success');
    } else {
      setTopups(prev => prev.map(t => t.id === topupId ? { ...t, status: 'rejected' } : t));
      logAdminAction(`ปฏิเสธสลิป #${topupId} ของผู้ใช้ ${targetTopup.username}`);
      showToast(`ปฏิเสธสลิป #${topupId}`, 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0C1B] text-slate-100 font-sans selection:bg-purple-500 selection:text-white pb-16">
      
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center space-x-3 px-5 py-3 rounded-xl shadow-2xl backdrop-blur-md border animate-bounce ${
          toast.type === 'error' ? 'bg-rose-900/90 border-rose-500 text-rose-100' : 
          toast.type === 'info' ? 'bg-cyan-900/90 border-cyan-500 text-cyan-100' : 
          'bg-purple-900/90 border-purple-400 text-purple-100 shadow-purple-500/20'
        }`}>
          {toast.type === 'error' ? <AlertCircle className="w-5 h-5 text-rose-400" /> : <Sparkles className="w-5 h-5 text-purple-300" />}
          <span className="font-medium text-sm">{toast.message}</span>
        </div>
      )}

      {/* Marquee Announcement Bar */}
      {announcements.find(a => a.active) && (
        <div 
          style={{ backgroundColor: announcements[0].bg, color: announcements[0].textCol }} 
          className="py-2 px-4 text-xs md:text-sm font-medium overflow-hidden border-b border-purple-900/50 flex items-center shadow-inner"
        >
          <div className="flex space-x-2 items-center bg-purple-950/80 px-2 py-0.5 rounded text-[10px] uppercase font-bold text-purple-300 border border-purple-600/30 shrink-0 z-10">
            <Bell className="w-3 h-3 animate-pulse text-purple-400" /> ประกาศ
          </div>
          <div className="whitespace-nowrap overflow-hidden w-full relative ml-3">
            <div className="inline-block animate-marquee pl-full">
              {announcements[0].text}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#161226]/85 backdrop-blur-md border-b border-purple-900/40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Brand Logo */}
            <div onClick={() => setActiveTab('home')} className="flex items-center space-x-3 cursor-pointer group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30 border border-purple-300/30">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-300 to-purple-100 font-mono">
                  {siteSettings.siteName}
                </span>
                <span className="block text-[10px] text-purple-400 font-semibold tracking-widest uppercase">
                  Gaming Account Shop
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-purple-950/30 p-1.5 rounded-2xl border border-purple-800/30">
              <button onClick={() => setActiveTab('home')} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === 'home' ? 'bg-purple-600 text-white shadow-lg' : 'text-purple-200 hover:bg-purple-900/40'}`}>
                หน้าแรก
              </button>
              <button onClick={() => setActiveTab('products')} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === 'products' ? 'bg-purple-600 text-white shadow-lg' : 'text-purple-200 hover:bg-purple-900/40'}`}>
                สินค้าทั้งหมด
              </button>
              <button onClick={() => setActiveTab('categories')} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === 'categories' ? 'bg-purple-600 text-white shadow-lg' : 'text-purple-200 hover:bg-purple-900/40'}`}>
                หมวดหมู่
              </button>
              <button onClick={() => setActiveTab('topup')} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center space-x-1.5 ${activeTab === 'topup' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' : 'text-pink-300 hover:bg-purple-900/40'}`}>
                <Wallet className="w-4 h-4 text-pink-400" />
                <span>เติมเครดิต</span>
              </button>
              <button onClick={() => setActiveTab('history')} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === 'history' ? 'bg-purple-600 text-white shadow-lg' : 'text-purple-200 hover:bg-purple-900/40'}`}>
                ประวัติการซื้อ
              </button>
            </nav>

            {/* User Bar / Auth Controls */}
            <div className="flex items-center space-x-3">
              {user ? (
                <div className="flex items-center space-x-2">
                  <div onClick={() => setActiveTab('topup')} className="cursor-pointer bg-gradient-to-r from-purple-950/80 to-purple-900/80 hover:border-purple-400 border border-purple-700/50 px-3.5 py-1.5 rounded-2xl flex items-center space-x-2">
                    <Wallet className="w-4 h-4 text-purple-300" />
                    <div className="text-left">
                      <span className="block text-[10px] text-purple-400 leading-tight">เครดิต</span>
                      <span className="text-sm font-bold text-emerald-400 font-mono">฿{user.credit.toLocaleString()}</span>
                    </div>
                  </div>

                  <button onClick={() => setActiveTab('profile')} className="flex items-center space-x-2 bg-purple-900/40 hover:bg-purple-800/60 border border-purple-700/50 p-1.5 rounded-2xl">
                    <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center font-bold text-white text-xs">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden lg:inline text-xs font-semibold text-purple-200 pr-1">
                      {user.username}
                    </span>
                  </button>

                  {user.role === 'admin' && (
                    <button
                      onClick={() => setActiveTab(activeTab === 'admin' ? 'home' : 'admin')}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 border ${
                        activeTab === 'admin' 
                          ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-lg' 
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                      }`}
                    >
                      <Shield className="w-3.5 h-3.5" />
                      <span>{activeTab === 'admin' ? 'ออกจากหลังบ้าน' : 'ระบบหลังบ้าน'}</span>
                    </button>
                  )}

                  {/* Added Logout Button */}
                  <button
                    onClick={() => {
                      setUser(null);
                      setActiveTab('home');
                      showToast('ออกจากระบบเรียบร้อยแล้ว', 'info');
                    }}
                    title="ออกจากระบบ"
                    className="p-2.5 rounded-xl bg-rose-950/50 hover:bg-rose-900/80 border border-rose-700/40 text-rose-300 hover:text-rose-100 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setAuthModal({ open: true, mode: 'login' })}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-5 py-2.5 rounded-2xl text-sm font-bold shadow-lg transition-all"
                >
                  เข้าสู่ระบบ / สมัครสมาชิก
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Render */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">

        {/* HOME TAB */}
        {activeTab === 'home' && (
          <div className="space-y-10">
            {/* Banner Slider */}
            {banners.filter(b => b.active).length > 0 && (
              <div className="relative rounded-3xl overflow-hidden border border-purple-800/40 shadow-2xl bg-[#161226]">
                <div className="relative h-64 md:h-96 w-full">
                  <img src={banners[0].image} alt={banners[0].title} className="w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0C1B] via-purple-950/40 to-transparent flex flex-col justify-end p-6 md:p-12">
                    <span className="bg-purple-600/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-3 border border-purple-300/30">
                      🔥 ร้านขายไอดีเกมอันดับ 1
                    </span>
                    <h1 className="text-2xl md:text-5xl font-black text-white mb-2 leading-tight">
                      {banners[0].title}
                    </h1>
                    <p className="text-purple-200 text-sm md:text-base max-w-2xl mb-6">
                      {banners[0].subtitle}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button onClick={() => setActiveTab('products')} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 text-white font-bold px-6 py-3 rounded-2xl text-sm flex items-center space-x-2">
                        <span>เลือกซื้อไอดีเกม</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button onClick={() => setActiveTab('topup')} className="bg-purple-950/80 hover:bg-purple-900 border border-purple-600/50 text-purple-200 font-bold px-6 py-3 rounded-2xl text-sm flex items-center space-x-2">
                        <Wallet className="w-4 h-4 text-pink-400" />
                        <span>เติมเครดิต</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Products Catalog */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white flex items-center space-x-2">
                    <Sparkles className="w-6 h-6 text-pink-400" />
                    <span>สินค้าพร้อมจำหน่าย</span>
                  </h2>
                  <p className="text-purple-400 text-xs mt-1">ไอดีเกมพร้อมส่งมอบระบบอัตโนมัติ 24 ชั่วโมง</p>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-purple-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="ค้นหาไอดี หรือ เกม..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-purple-950/40 border border-purple-800/50 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-purple-400 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products
                  .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.game.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onSelect={(p) => setProductDetailModal(p)}
                      onBuy={handleInitiatePurchase}
                    />
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-black text-white">สินค้าทั้งหมดในร้าน</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onSelect={(p) => setProductDetailModal(p)}
                  onBuy={handleInitiatePurchase}
                />
              ))}
            </div>
          </div>
        )}

        {/* CATEGORIES TAB */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-black text-white">หมวดหมู่เกมทั้งหมด</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map(cat => (
                <div 
                  key={cat.id} 
                  onClick={() => { setSelectedCategory(cat.id); setActiveTab('products'); }}
                  className="bg-[#161226]/80 border border-purple-800/40 hover:border-purple-500 rounded-2xl p-4 cursor-pointer text-center group transition-all"
                >
                  <img src={cat.image} alt={cat.name} className="w-16 h-16 object-cover rounded-xl mx-auto mb-2 group-hover:scale-105 transition-all" />
                  <span className="font-bold text-xs text-purple-200 block">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROFILE TAB (Includes Logout & Account Info) */}
        {activeTab === 'profile' && user && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-[#161226]/90 border border-purple-800/40 rounded-3xl p-8 shadow-2xl space-y-6">
              <div className="flex items-center space-x-4 border-b border-purple-900/40 pb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center font-black text-2xl text-white shadow-lg">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">{user.username}</h2>
                  <span className="text-xs text-purple-300">{user.email}</span>
                  <div className="mt-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-purple-950 text-purple-300 border border-purple-700/40">
                      บทบาท: {user.role}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-950/50 p-4 rounded-2xl border border-purple-800/40">
                  <span className="text-xs text-purple-400 block">ยอดเครดิตสะสม</span>
                  <span className="text-xl font-bold font-mono text-emerald-400">฿{user.credit.toLocaleString()}</span>
                </div>
                <div className="bg-purple-950/50 p-4 rounded-2xl border border-purple-800/40">
                  <span className="text-xs text-purple-400 block">ยอดการใช้จ่ายทั้งหมด</span>
                  <span className="text-xl font-bold font-mono text-pink-400">฿{(user.totalSpent || 0).toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-purple-900/40 flex justify-end">
                <button
                  onClick={() => {
                    setUser(null);
                    setActiveTab('home');
                    showToast('ออกจากระบบเรียบร้อยแล้ว', 'info');
                  }}
                  className="bg-rose-900/80 hover:bg-rose-800 text-rose-100 border border-rose-500/50 font-bold px-6 py-2.5 rounded-2xl text-xs flex items-center space-x-2 transition-all shadow-lg"
                >
                  <LogOut className="w-4 h-4" />
                  <span>ออกจากระบบ (Logout)</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TOP UP TAB */}
        {activeTab === 'topup' && (
          <TopUpComponent 
            user={user} 
            siteSettings={siteSettings} 
            onSubmitTopup={handleTopupSubmit}
            topupHistory={topups.filter(t => t.userId === (user?.id || ''))}
          />
        )}

        {/* PURCHASE HISTORY TAB */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-black text-white">ประวัติการสั่งซื้อสินค้าของคุณ</h1>
            {user ? (
              orders.filter(o => o.userId === user.id).length > 0 ? (
                <div className="space-y-4">
                  {orders.filter(o => o.userId === user.id).map(order => (
                    <div key={order.id} className="bg-[#161226]/90 border border-purple-800/40 rounded-2xl p-6 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-purple-400 font-mono">#{order.id} | {order.createdAt}</span>
                        <h3 className="text-lg font-bold text-white">{order.productTitle}</h3>
                        <span className="text-emerald-400 font-bold font-mono">฿{order.price.toLocaleString()}</span>
                      </div>
                      <button onClick={() => setDeliveredAccountModal(order)} className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1">
                        <Key className="w-4 h-4" />
                        <span>ดูรหัสไอดีที่ได้รับ</span>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center bg-[#161226]/40 rounded-3xl text-purple-400">ยังไม่มีประวัติการสั่งซื้อ</div>
              )
            ) : (
              <div className="p-12 text-center bg-[#161226]/40 rounded-3xl text-purple-300">กรุณาเข้าสู่ระบบก่อนเพื่อดูประวัติการซื้อ</div>
            )}
          </div>
        )}

        {/* ADMIN BACKEND TAB */}
        {activeTab === 'admin' && user?.role === 'admin' && (
          <AdminDashboard
            subTab={adminSubTab}
            setSubTab={setAdminSubTab}
            products={products}
            setProducts={setProducts}
            categories={categories}
            setCategories={setCategories}
            banners={banners}
            setBanners={setBanners}
            usersList={usersList}
            setUsersList={setUsersList}
            topups={topups}
            orders={orders}
            announcements={announcements}
            setAnnouncements={setAnnouncements}
            siteSettings={siteSettings}
            setSiteSettings={setSiteSettings}
            adminLogs={adminLogs}
            onApproveTopup={handleAdminApproveTopup}
            onAdjustUserCredit={(targetId, amount, reason) => {
              const numAmt = parseFloat(amount);
              if (isNaN(numAmt)) return;
              setUsersList(prev => prev.map(u => u.id === targetId ? { ...u, credit: Math.max(0, u.credit + numAmt) } : u));
              if (user && user.id === targetId) setUser(prev => ({ ...prev, credit: Math.max(0, prev.credit + numAmt) }));
              logAdminAction(`ปรับเครดิต (${amount > 0 ? '+' : ''}${numAmt}) ให้ผู้ใช้ ID: ${targetId} เหตุผล: ${reason || 'N/A'}`);
              showToast('ปรับปรุงยอดเครดิตเรียบร้อย', 'success');
            }}
            showToast={showToast}
          />
        )}
      </main>

      {/* PRODUCT DETAIL MODAL */}
      {productDetailModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#161226] border border-purple-800/50 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setProductDetailModal(null)} 
              className="absolute top-4 right-4 text-purple-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={productDetailModal.image} alt={productDetailModal.title} className="w-full h-48 object-cover rounded-2xl mb-4 border border-purple-800/40" />
            <span className="text-[10px] font-bold uppercase bg-purple-950 text-purple-300 border border-purple-700/40 px-2.5 py-1 rounded-lg">
              {productDetailModal.game}
            </span>
            <h3 className="text-xl font-bold text-white mt-2">{productDetailModal.title}</h3>
            <p className="text-xs text-purple-300 mt-2 leading-relaxed">{productDetailModal.description}</p>
            <div className="mt-6 pt-4 border-t border-purple-900/40 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-purple-400 block">ราคา</span>
                <span className="text-2xl font-black text-pink-400 font-mono">฿{productDetailModal.price.toLocaleString()}</span>
              </div>
              <button
                disabled={productDetailModal.stock <= 0}
                onClick={() => {
                  const prod = productDetailModal;
                  setProductDetailModal(null);
                  handleInitiatePurchase(prod);
                }}
                className={`px-6 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  productDetailModal.stock > 0
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                {productDetailModal.stock > 0 ? 'ยืนยันการซื้อ' : 'สินค้าหมด'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AUTH MODAL WITH FIXED DEFAULT ADMIN Jao_fuse / fiw1212fiw */}
      {authModal.open && (
        <AuthModal 
          mode={authModal.mode} 
          setMode={(m) => setAuthModal({ open: true, mode: m })}
          onClose={() => setAuthModal({ open: false, mode: 'login' })}
          onLoginSuccess={(userData) => {
            setUser(userData);
            setAuthModal({ open: false, mode: 'login' });
            showToast(`เข้าสู่ระบบสำเร็จ! ยินดีต้อนรับ ${userData.username}`, 'success');
          }}
          usersList={usersList}
          setUsersList={setUsersList}
          showToast={showToast}
        />
      )}

      {/* DELIVERED ACCOUNT MODAL */}
      {deliveredAccountModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161226] border-2 border-emerald-500/50 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
            <h3 className="text-xl font-black text-white text-center mb-4">ข้อมูลไอดีเกมที่คุณได้รับ</h3>
            <div className="bg-purple-950/80 border border-purple-700/50 p-4 rounded-2xl space-y-3 font-mono text-xs mb-6">
              <div className="flex justify-between bg-purple-900/40 p-2.5 rounded-xl">
                <span className="text-purple-400">USERNAME / ID:</span>
                <span className="font-bold text-white">{deliveredAccountModal.deliveredAccount.username}</span>
              </div>
              <div className="flex justify-between bg-purple-900/40 p-2.5 rounded-xl">
                <span className="text-purple-400">PASSWORD:</span>
                <span className="font-bold text-pink-300">{deliveredAccountModal.deliveredAccount.password}</span>
              </div>
            </div>
            <button onClick={() => setDeliveredAccountModal(null)} className="w-full bg-purple-600 text-white font-bold py-3 rounded-xl text-xs">
              ปิดหน้าต่าง
            </button>
          </div>
        </div>
      )}

      {/* CONFIRM BUY MODAL */}
      {buyConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#161226] border border-purple-800/50 rounded-3xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-white mb-4">ยืนยันการสั่งซื้อสินค้า</h3>
            <div className="bg-purple-950/60 p-4 rounded-2xl mb-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-purple-300">สินค้า:</span>
                <span className="font-bold text-white">{buyConfirmModal.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-300">ราคา:</span>
                <span className="font-bold text-pink-400 font-mono">฿{buyConfirmModal.price.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button onClick={() => setBuyConfirmModal(null)} className="px-4 py-2 text-xs text-purple-300">ยกเลิก</button>
              <button onClick={() => handlePurchaseProduct(buyConfirmModal)} className="bg-emerald-600 text-white font-bold px-5 py-2 rounded-xl text-xs">
                ยืนยันการสั่งซื้อ
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// ===================================================
// TOP UP COMPONENT (WITH SLIP IMAGE ATTACHMENT & AUTOMATED VERIFICATION)
// ===================================================
function TopUpComponent({ user, siteSettings, onSubmitTopup, topupHistory }) {
  const [channel, setChannel] = useState('bank'); // bank, truemoney_gift, truemoney_wallet
  const [amount, setAmount] = useState(100);
  const [giftLink, setGiftLink] = useState('');
  const [slipFile, setSlipFile] = useState(null);
  const [slipPreview, setSlipPreview] = useState(null);

  const handleSlipUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSlipFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSlipPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeSlipImage = () => {
    setSlipFile(null);
    setSlipPreview(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="border-b border-purple-800/40 pb-4">
        <h1 className="text-2xl font-black text-white flex items-center space-x-2">
          <Wallet className="w-6 h-6 text-pink-400" />
          <span>ระบบเติมเครดิตสมาชิก</span>
        </h1>
        <p className="text-purple-300 text-xs mt-1">เลือกช่องทางชำระเงิน แนบรูปสลิปเพื่อยืนยันผ่านระบบ SlipOK อัตโนมัติ 24 ชม.</p>
      </div>

      {/* Channel Switcher */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => setChannel('bank')}
          className={`p-4 rounded-2xl border transition-all text-left flex items-center space-x-3 ${
            channel === 'bank' 
              ? 'bg-purple-900/60 border-purple-400 text-white shadow-xl shadow-purple-500/10' 
              : 'bg-[#161226]/80 border-purple-800/40 text-purple-300 hover:bg-purple-900/30'
          }`}
        >
          <Building className="w-6 h-6 text-blue-400 shrink-0" />
          <div>
            <h4 className="font-bold text-xs">โอนผ่านบัญชีธนาคาร / QR</h4>
            <span className="text-[10px] text-purple-400 block mt-0.5">แนบรูปสลิปตรวจอัตโนมัติ</span>
          </div>
        </button>

        <button
          onClick={() => setChannel('truemoney_gift')}
          className={`p-4 rounded-2xl border transition-all text-left flex items-center space-x-3 ${
            channel === 'truemoney_gift' 
              ? 'bg-purple-900/60 border-purple-400 text-white shadow-xl shadow-purple-500/10' 
              : 'bg-[#161226]/80 border-purple-800/40 text-purple-300 hover:bg-purple-900/30'
          }`}
        >
          <Gift className="w-6 h-6 text-amber-400 shrink-0" />
          <div>
            <h4 className="font-bold text-xs">ซองของขวัญ TrueMoney</h4>
            <span className="text-[10px] text-purple-400 block mt-0.5">รับเครดิตอัตโนมัติ</span>
          </div>
        </button>

        <button
          onClick={() => setChannel('truemoney_wallet')}
          className={`p-4 rounded-2xl border transition-all text-left flex items-center space-x-3 ${
            channel === 'truemoney_wallet' 
              ? 'bg-purple-900/60 border-purple-400 text-white shadow-xl shadow-purple-500/10' 
              : 'bg-[#161226]/80 border-purple-800/40 text-purple-300 hover:bg-purple-900/30'
          }`}
        >
          <Smartphone className="w-6 h-6 text-orange-400 shrink-0" />
          <div>
            <h4 className="font-bold text-xs">TrueMoney Wallet Direct</h4>
            <span className="text-[10px] text-purple-400 block mt-0.5">แนบรูปสลิปตรวจสอบ</span>
          </div>
        </button>
      </div>

      {/* FORM DETAILS BASED ON CHANNEL */}
      <div className="bg-[#161226]/90 border border-purple-800/40 rounded-3xl p-6 md:p-8 shadow-2xl">

        {/* CHANNEL 1: BANK TRANSFER */}
        {channel === 'bank' && (
          <div className="space-y-6">
            <div className="bg-purple-950/60 p-4 rounded-2xl border border-purple-800/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-purple-400 block">{siteSettings.bankName}</span>
                <h3 className="text-xl font-bold font-mono text-emerald-400">{siteSettings.bankAccountNo}</h3>
                <p className="text-xs text-purple-300 mt-1">ชื่อบัญชี: {siteSettings.bankAccountName}</p>
                <p className="text-[11px] text-purple-400/80 mt-2">สแกน QR Code เพื่อโอนเงินตามจำนวนที่ต้องการ</p>
              </div>
              <div className="bg-white p-2.5 rounded-2xl w-44 h-44 shrink-0 flex flex-col items-center justify-center border-2 border-purple-400/40 shadow-2xl shadow-purple-500/20">
                {siteSettings.qrCodeUrl ? (
                  <img 
                    src={siteSettings.qrCodeUrl} 
                    alt="PromptPay QR Code" 
                    className="w-full h-full object-contain rounded-xl"
                    onError={(e) => {
                      // Fallback QR code if URL image fails to load
                      e.target.onerror = null;
                      e.target.src = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PROMPTPAY_JAOFUSE";
                    }}
                  />
                ) : (
                  <div className="text-center p-2">
                    <QrCode className="w-10 h-10 text-purple-600 mx-auto mb-1" />
                    <span className="text-[10px] text-slate-700 font-bold block">พร้อมเพย์ QR Code</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-purple-300 font-semibold mb-2">ระบุจำนวนเงินที่โอน (บาท)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-purple-950/50 border border-purple-800/50 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Square Image Upload Box */}
              <div>
                <label className="block text-xs text-purple-300 font-semibold mb-2">
                  แนบรูปภาพสลิปการโอนเงิน (คลิกช่องสี่เหลี่ยมเพื่อเลือกรูปสลิป)
                </label>
                <div className="relative">
                  {!slipPreview ? (
                    <label className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-purple-600/50 hover:border-purple-400 rounded-3xl bg-purple-950/30 hover:bg-purple-900/40 cursor-pointer transition-all group">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                        <div className="w-14 h-14 rounded-2xl bg-purple-900/60 border border-purple-600/40 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <ImageIcon className="w-7 h-7 text-purple-300" />
                        </div>
                        <p className="mb-1 text-sm font-bold text-purple-200">
                          คลิกเพื่อเลือกไฟล์รูปภาพสลิป
                        </p>
                        <p className="text-[11px] text-purple-400">
                          รองรับไฟล์ PNG, JPG, JPEG (ระบบจะส่งตรวจ SlipOK อัตโนมัติ)
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleSlipUpload}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="relative w-full h-64 bg-purple-950/80 rounded-3xl border-2 border-emerald-500/60 overflow-hidden flex items-center justify-center p-2 group shadow-xl">
                      <img
                        src={slipPreview}
                        alt="Slip Preview"
                        className="h-full w-auto max-w-full object-contain rounded-2xl"
                      />
                      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                        <label className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer shadow-lg flex items-center space-x-1">
                          <ImageIcon className="w-4 h-4" />
                          <span>เปลี่ยนรูป</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleSlipUpload}
                            className="hidden"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={removeSlipImage}
                          className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg flex items-center space-x-1"
                        >
                          <X className="w-4 h-4" />
                          <span>ลบรูป</span>
                        </button>
                      </div>
                      <div className="absolute bottom-3 left-3 bg-slate-950/80 border border-emerald-500/50 backdrop-blur-md text-emerald-400 text-[11px] font-bold px-3 py-1 rounded-xl flex items-center space-x-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>แนบรูปภาพสลิปเรียบร้อยแล้ว</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (!slipPreview) {
                  alert('กรุณาคลิกเลือกรูปภาพสลิปการโอนเงินก่อนทำรายการ');
                  return;
                }
                onSubmitTopup('PromptPay Bank Transfer', { amount, slipUrl: slipPreview });
                setSlipFile(null);
                setSlipPreview(null);
              }}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3.5 rounded-2xl text-xs shadow-lg shadow-purple-600/30 transition-all"
            >
              ส่งรูปสลิปเพื่อยืนยันระบบตรวจอัตโนมัติ
            </button>
          </div>
        )}

        {/* CHANNEL 2: TRUEMONEY GIFT LINK */}
        {channel === 'truemoney_gift' && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs text-purple-300 font-semibold mb-2">วางลิงก์ซองของขวัญ TrueMoney Wallet</label>
              <input
                type="text"
                placeholder="https://gift.truemoney.com/campaign/?v=..."
                value={giftLink}
                onChange={(e) => setGiftLink(e.target.value)}
                className="w-full bg-purple-950/50 border border-purple-800/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
              />
              <span className="text-[10px] text-purple-400 mt-1 block">ระบบจะทำการรับยอดเงินจากซองและเติมเครดิตเข้าบัญชีให้โดยอัตโนมัติ</span>
            </div>

            <div>
              <label className="block text-xs text-purple-300 font-semibold mb-2">มูลค่าในซอง (บาท)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-purple-950/50 border border-purple-800/50 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <button
              onClick={() => {
                if (!giftLink) {
                  alert('กรุณากรอกลิงก์ซองของขวัญ');
                  return;
                }
                onSubmitTopup('TrueMoney Gift Link', { amount, giftLink });
              }}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-2xl text-xs shadow-lg shadow-amber-500/20"
            >
              ยืนยันเติมเงินผ่านซองของขวัญ
            </button>
          </div>
        )}

        {/* CHANNEL 3: TRUEMONEY WALLET DIRECT */}
        {channel === 'truemoney_wallet' && (
          <div className="space-y-6">
            <div className="bg-purple-950/60 p-4 rounded-2xl border border-purple-800/40">
              <span className="text-[10px] text-purple-400 block">เบอร์บัญชี TrueMoney Wallet</span>
              <h3 className="text-xl font-bold font-mono text-orange-400">{siteSettings.trueMoneyNo}</h3>
              <p className="text-xs text-purple-300 mt-1">ชื่อบัญชี: {siteSettings.bankAccountName}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-purple-300 font-semibold mb-2">จำนวนเงินที่โอน (บาท)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-purple-950/50 border border-purple-800/50 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Square Image Upload Box */}
              <div>
                <label className="block text-xs text-purple-300 font-semibold mb-2">
                  แนบไฟล์รูปสลิปการโอนเงิน (คลิกช่องสี่เหลี่ยมเพื่อแนบรูป)
                </label>
                <div className="relative">
                  {!slipPreview ? (
                    <label className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-orange-500/40 hover:border-orange-400 rounded-3xl bg-purple-950/30 hover:bg-purple-900/40 cursor-pointer transition-all group">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                        <div className="w-14 h-14 rounded-2xl bg-orange-950/60 border border-orange-500/40 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <ImageIcon className="w-7 h-7 text-orange-300" />
                        </div>
                        <p className="mb-1 text-sm font-bold text-orange-200">
                          คลิกเพื่อเลือกไฟล์รูปภาพสลิป
                        </p>
                        <p className="text-[11px] text-purple-400">
                          รองรับไฟล์ PNG, JPG, JPEG
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleSlipUpload}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="relative w-full h-64 bg-purple-950/80 rounded-3xl border-2 border-orange-500/60 overflow-hidden flex items-center justify-center p-2 group shadow-xl">
                      <img
                        src={slipPreview}
                        alt="Slip Preview"
                        className="h-full w-auto max-w-full object-contain rounded-2xl"
                      />
                      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                        <label className="bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer shadow-lg flex items-center space-x-1">
                          <ImageIcon className="w-4 h-4" />
                          <span>เปลี่ยนรูป</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleSlipUpload}
                            className="hidden"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={removeSlipImage}
                          className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg flex items-center space-x-1"
                        >
                          <X className="w-4 h-4" />
                          <span>ลบรูป</span>
                        </button>
                      </div>
                      <div className="absolute bottom-3 left-3 bg-slate-950/80 border border-orange-500/50 backdrop-blur-md text-orange-400 text-[11px] font-bold px-3 py-1 rounded-xl flex items-center space-x-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>แนบรูปภาพสลิปเรียบร้อยแล้ว</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (!slipPreview) {
                  alert('กรุณาเลือกแนบรูปสลิปการโอนเงินก่อน');
                  return;
                }
                onSubmitTopup('TrueMoney Direct Transfer', { amount, slipUrl: slipPreview });
                setSlipFile(null);
                setSlipPreview(null);
              }}
              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3.5 rounded-2xl text-xs shadow-lg shadow-orange-600/30 transition-all"
            >
              ส่งรูปสลิปเพื่อยืนยันการโอนเงิน
            </button>
          </div>
        )}

      </div>

      {/* TOPUP HISTORY TABLE */}
      <div className="bg-[#161226]/80 border border-purple-800/40 rounded-3xl p-6 shadow-xl">
        <h3 className="text-lg font-bold text-white mb-4">ประวัติการแจ้งเติมเงินของคุณ</h3>
        {topupHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-purple-900/50 text-purple-400">
                  <th className="pb-3 font-semibold">รหัสอ้างอิง</th>
                  <th className="pb-3 font-semibold">ช่องทาง</th>
                  <th className="pb-3 font-semibold">รูปสลิป</th>
                  <th className="pb-3 font-semibold">จำนวนเงิน</th>
                  <th className="pb-3 font-semibold">สถานะ</th>
                  <th className="pb-3 font-semibold">วันที่</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-900/30">
                {topupHistory.map(item => (
                  <tr key={item.id} className="text-purple-200">
                    <td className="py-3 font-mono">{item.id}</td>
                    <td className="py-3">{item.channel}</td>
                    <td className="py-3">
                      {item.slipUrl ? (
                        <a href={item.slipUrl} target="_blank" rel="noreferrer" className="text-xs text-purple-400 underline">ดูรูปสลิป</a>
                      ) : '-'}
                    </td>
                    <td className="py-3 font-mono font-bold text-emerald-400">฿{item.amount.toLocaleString()}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.status === 'approved' ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/40' :
                        item.status === 'rejected' ? 'bg-rose-950 text-rose-300 border border-rose-700/40' :
                        'bg-amber-950 text-amber-300 border border-amber-700/40'
                      }`}>
                        {item.status === 'approved' ? 'อนุมัติแล้ว' : item.status === 'rejected' ? 'ปฏิเสธ' : 'รอตรวจสอบ'}
                      </span>
                    </td>
                    <td className="py-3 text-purple-400">{item.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-purple-400 text-center py-4">ยังไม่มีประวัติการเติมเงิน</p>
        )}
      </div>
    </div>
  );
}

// ===================================================
// CONSOLIDATED ADMIN BACKEND DASHBOARD
// ===================================================
function AdminDashboard({
  subTab, setSubTab, products, setProducts, categories, setCategories,
  banners, setBanners, usersList, setUsersList, topups, orders,
  announcements, setAnnouncements, siteSettings, setSiteSettings,
  adminLogs, onApproveTopup, onAdjustUserCredit, showToast
}) {
  const [newProdModal, setNewProdModal] = useState(false);
  const [prodForm, setProdForm] = useState({
    title: '', game: 'ROV', categoryId: 'cat-1', price: '', description: '',
    accUsername: '', accPassword: '', image: ''
  });

  const [adjModal, setAdjModal] = useState(null);
  const [adjAmount, setAdjAmount] = useState('');
  const [adjReason, setAdjReason] = useState('');

  const handleAddProduct = () => {
    if (!prodForm.title || !prodForm.price) return;
    const newProduct = {
      id: `prod-${Date.now()}`,
      title: prodForm.title,
      game: prodForm.game,
      categoryId: prodForm.categoryId,
      price: parseFloat(prodForm.price),
      stock: 1,
      sold: 0,
      image: prodForm.image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600',
      description: prodForm.description || 'รายละเอียดสินค้าไอดีเกม',
      credentials: [
        { username: prodForm.accUsername || 'demo_user', password: prodForm.accPassword || 'demo_pass' }
      ]
    };

    setProducts([newProduct, ...products]);
    setNewProdModal(false);
    setProdForm({ title: '', game: 'ROV', categoryId: 'cat-1', price: '', description: '', accUsername: '', accPassword: '', image: '' });
    showToast('เพิ่มสินค้าใหม่เรียบร้อยแล้ว', 'success');
  };

  const totalSales = orders.reduce((sum, o) => sum + o.price, 0);

  return (
    <div className="space-y-6">
      {/* Admin Title & Subnav */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-800/40 pb-4">
        <div>
          <h1 className="text-2xl font-black text-amber-400 flex items-center space-x-2">
            <Shield className="w-6 h-6" />
            <span>ระบบหลังบ้านผู้ดูแลระบบ (Admin Dashboard)</span>
          </h1>
          <p className="text-purple-300 text-xs mt-1">จัดการสินค้า, แก้ไขรูปภาพ, ตั้งค่า SlipOK API, ปรับเครดิต และดูยอดขาย</p>
        </div>

        {/* Subtab menu */}
        <div className="flex flex-wrap gap-1 bg-purple-950/60 p-1.5 rounded-2xl border border-purple-800/40">
          <button onClick={() => setSubTab('overview')} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${subTab === 'overview' ? 'bg-amber-500 text-slate-950' : 'text-purple-300'}`}>ภาพรวม</button>
          <button onClick={() => setSubTab('products')} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${subTab === 'products' ? 'bg-amber-500 text-slate-950' : 'text-purple-300'}`}>จัดการสินค้า/รูปภาพ</button>
          <button onClick={() => setSubTab('slipok')} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${subTab === 'slipok' ? 'bg-amber-500 text-slate-950' : 'text-purple-300'}`}>SlipOK API</button>
          <button onClick={() => setSubTab('topups')} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${subTab === 'topups' ? 'bg-amber-500 text-slate-950' : 'text-purple-300'}`}>อนุมัติสลิป ({topups.filter(t => t.status === 'pending').length})</button>
          <button onClick={() => setSubTab('users')} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${subTab === 'users' ? 'bg-amber-500 text-slate-950' : 'text-purple-300'}`}>สมาชิก & เครดิต</button>
          <button onClick={() => setSubTab('settings')} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${subTab === 'settings' ? 'bg-amber-500 text-slate-950' : 'text-purple-300'}`}>ตั้งค่าเว็บไซต์</button>
        </div>
      </div>

      {/* 1. OVERVIEW KPIs */}
      {subTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#161226]/90 border border-purple-800/40 p-5 rounded-2xl">
              <span className="text-xs text-purple-400 block mb-1">ยอดขายรวมทั้งหมด</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">฿{totalSales.toLocaleString()}</span>
            </div>
            <div className="bg-[#161226]/90 border border-purple-800/40 p-5 rounded-2xl">
              <span className="text-xs text-purple-400 block mb-1">จำนวนคำสั่งซื้อสำเร็จ</span>
              <span className="text-2xl font-black text-purple-200 font-mono">{orders.length} รายการ</span>
            </div>
            <div className="bg-[#161226]/90 border border-purple-800/40 p-5 rounded-2xl">
              <span className="text-xs text-purple-400 block mb-1">จำนวนสมาชิกทั้งหมด</span>
              <span className="text-2xl font-black text-pink-400 font-mono">{usersList.length} คน</span>
            </div>
            <div className="bg-[#161226]/90 border border-purple-800/40 p-5 rounded-2xl">
              <span className="text-xs text-purple-400 block mb-1">รายการสลิปคอยอนุมัติ</span>
              <span className="text-2xl font-black text-amber-400 font-mono">{topups.filter(t => t.status === 'pending').length} รายการ</span>
            </div>
          </div>

          <div className="bg-[#161226]/80 border border-purple-800/40 rounded-3xl p-6">
            <h3 className="text-sm font-bold text-white mb-3">บันทึกการทำงานของผู้ดูแลระบบ (Admin Activity Logs)</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto text-xs font-mono">
              {adminLogs.map(log => (
                <div key={log.id} className="flex justify-between border-b border-purple-900/30 pb-1.5 text-purple-300">
                  <span>[{log.time}] <strong className="text-amber-400">{log.admin}</strong>: {log.action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. PRODUCTS MANAGEMENT & IMAGE URL EDITING */}
      {subTab === 'products' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">จัดการสินค้าและแก้ไข URL รูปภาพ</h3>
            <button
              onClick={() => setNewProdModal(true)}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>เพิ่มสินค้าใหม่</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map(p => (
              <div key={p.id} className="bg-[#161226]/90 border border-purple-800/40 p-4 rounded-2xl flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <img src={p.image} alt={p.title} className="w-full sm:w-28 h-28 object-cover rounded-xl border border-purple-700/40 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-white text-xs">{p.title}</h4>
                    <button 
                      onClick={() => {
                        setProducts(products.filter(item => item.id !== p.id));
                        showToast('ลบสินค้าเรียบร้อย', 'info');
                      }}
                      className="text-rose-400 hover:text-rose-300 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[11px] text-pink-400 font-mono">฿{p.price.toLocaleString()} | สต็อก: {p.stock} | ขายแล้ว: {p.sold}</p>
                  <div>
                    <label className="text-[10px] text-purple-400 block mb-0.5">เปลี่ยน URL รูปภาพสินค้า</label>
                    <input
                      type="text"
                      value={p.image}
                      onChange={(e) => {
                        const val = e.target.value;
                        setProducts(products.map(item => item.id === p.id ? { ...item, image: val } : item));
                      }}
                      className="w-full bg-purple-950/50 border border-purple-800/50 rounded-lg px-2 py-1 text-[11px] text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {newProdModal && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-[#161226] border border-purple-800/50 rounded-3xl max-w-lg w-full p-6 space-y-4">
                <h3 className="text-lg font-bold text-white">เพิ่มไอดีเกมใหม่เข้าสต็อก</h3>
                <div>
                  <label className="block text-xs text-purple-300 mb-1">ชื่อไอดีสินค้า</label>
                  <input
                    type="text"
                    value={prodForm.title}
                    onChange={(e) => setProdForm({ ...prodForm, title: e.target.value })}
                    className="w-full bg-purple-950/50 border border-purple-800/50 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-purple-300 mb-1">URL รูปภาพสินค้า</label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/..."
                    value={prodForm.image}
                    onChange={(e) => setProdForm({ ...prodForm, image: e.target.value })}
                    className="w-full bg-purple-950/50 border border-purple-800/50 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-purple-300 mb-1">หมวดหมู่เกม</label>
                    <select
                      value={prodForm.game}
                      onChange={(e) => setProdForm({ ...prodForm, game: e.target.value })}
                      className="w-full bg-purple-950/50 border border-purple-800/50 rounded-xl px-3 py-2 text-xs text-white"
                    >
                      {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-purple-300 mb-1">ราคาสินค้า (บาท)</label>
                    <input
                      type="number"
                      value={prodForm.price}
                      onChange={(e) => setProdForm({ ...prodForm, price: e.target.value })}
                      className="w-full bg-purple-950/50 border border-purple-800/50 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                </div>
                <div className="border-t border-purple-900/50 pt-3">
                  <label className="block text-xs text-amber-400 font-bold mb-2">ข้อมูลไอดีส่งมอบ (Username & Password)</label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Username / Email"
                      value={prodForm.accUsername}
                      onChange={(e) => setProdForm({ ...prodForm, accUsername: e.target.value })}
                      className="bg-purple-950/50 border border-purple-800/50 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                    <input
                      type="text"
                      placeholder="Password"
                      value={prodForm.accPassword}
                      onChange={(e) => setProdForm({ ...prodForm, accPassword: e.target.value })}
                      className="bg-purple-950/50 border border-purple-800/50 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button onClick={() => setNewProdModal(false)} className="px-4 py-2 rounded-xl text-xs text-purple-300">ยกเลิก</button>
                  <button onClick={handleAddProduct} className="bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs">บันทึกสินค้า</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. SLIPOK API SETTINGS TAB */}
      {subTab === 'slipok' && (
        <div className="bg-[#161226]/90 border border-purple-800/40 rounded-3xl p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>ตั้งค่า SlipOK (ระบบตรวจสอบสลิปอัตโนมัติ)</span>
            </h3>
            <p className="text-purple-300 text-xs mt-1">เชื่อมต่อ API จาก SlipOK เพื่อตรวจสอบยอดเงิน ผู้รับโอน และเวลาอัตโนมัติ 24 ชม.</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 bg-purple-950/60 p-4 rounded-2xl border border-purple-800/40">
              <input
                type="checkbox"
                id="slipokToggle"
                checked={siteSettings.slipOkEnabled}
                onChange={(e) => setSiteSettings({ ...siteSettings, slipOkEnabled: e.target.checked })}
                className="w-5 h-5 accent-purple-600 rounded cursor-pointer"
              />
              <label htmlFor="slipokToggle" className="text-xs font-bold text-white cursor-pointer">
                เปิดใช้งานการตรวจสอบสลิปอัตโนมัติ SlipOK Auto Verification
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-purple-300 mb-1">SlipOK API Key</label>
                <input
                  type="text"
                  value={siteSettings.slipOkApiKey}
                  onChange={(e) => setSiteSettings({ ...siteSettings, slipOkApiKey: e.target.value })}
                  className="w-full bg-purple-950/50 border border-purple-800/50 rounded-xl px-4 py-2 text-xs font-mono text-white"
                />
              </div>

              <div>
                <label className="block text-xs text-purple-300 mb-1">SlipOK Branch ID</label>
                <input
                  type="text"
                  value={siteSettings.slipOkBranchId}
                  onChange={(e) => setSiteSettings({ ...siteSettings, slipOkBranchId: e.target.value })}
                  className="w-full bg-purple-950/50 border border-purple-800/50 rounded-xl px-4 py-2 text-xs font-mono text-white"
                />
              </div>
            </div>

            <button
              onClick={() => showToast('บันทึกการตั้งค่า SlipOK เรียบร้อยแล้ว', 'success')}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs"
            >
              บันทึกการเชื่อมต่อ SlipOK API
            </button>
          </div>
        </div>
      )}

      {/* 4. TOPUPS SLIP APPROVAL QUEUE */}
      {subTab === 'topups' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">รายการสลิปแจ้งเติมเงินที่รอการตรวจสอบ</h3>
          <div className="bg-[#161226]/90 border border-purple-800/40 rounded-3xl p-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-purple-900/50 text-purple-400">
                  <th className="pb-3">รหัส</th>
                  <th className="pb-3">ผู้ใช้</th>
                  <th className="pb-3">ช่องทาง</th>
                  <th className="pb-3">จำนวนเงิน</th>
                  <th className="pb-3">สลิป</th>
                  <th className="pb-3">สถานะ</th>
                  <th className="pb-3 text-right">ดำเนินการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-900/30">
                {topups.map(t => (
                  <tr key={t.id} className="text-purple-200">
                    <td className="py-3 font-mono">{t.id}</td>
                    <td className="py-3 font-bold text-white">{t.username}</td>
                    <td className="py-3">{t.channel}</td>
                    <td className="py-3 font-mono font-bold text-emerald-400">฿{t.amount.toLocaleString()}</td>
                    <td className="py-3">
                      <a href={t.slipUrl} target="_blank" rel="noreferrer" className="text-xs text-purple-400 underline">ดูภาพสลิป</a>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        t.status === 'approved' ? 'bg-emerald-950 text-emerald-300' :
                        t.status === 'rejected' ? 'bg-rose-950 text-rose-300' : 'bg-amber-950 text-amber-300'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3 text-right space-x-2">
                      {t.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => onApproveTopup(t.id, true)}
                            className="bg-emerald-600 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold"
                          >
                            อนุมัติ
                          </button>
                          <button 
                            onClick={() => onApproveTopup(t.id, false)}
                            className="bg-rose-600 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold"
                          >
                            ปฏิเสธ
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. USER & CREDIT LEDGER MANAGEMENT */}
      {subTab === 'users' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">จัดการสมาชิกและกระเป๋าเครดิต Ledger</h3>
          <div className="bg-[#161226]/90 border border-purple-800/40 rounded-3xl p-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-purple-900/50 text-purple-400">
                  <th className="pb-3">Username</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">เครดิตปัจจุบัน</th>
                  <th className="pb-3 text-right">ปรับปรุงเครดิต</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-900/30">
                {usersList.map(u => (
                  <tr key={u.id} className="text-purple-200">
                    <td className="py-3 font-bold text-white">{u.username}</td>
                    <td className="py-3">{u.email}</td>
                    <td className="py-3 uppercase text-[10px] font-bold text-amber-400">{u.role}</td>
                    <td className="py-3 font-mono font-bold text-emerald-400">฿{u.credit.toLocaleString()}</td>
                    <td className="py-3 text-right">
                      <button 
                        onClick={() => setAdjModal(u)}
                        className="bg-purple-800 hover:bg-purple-700 text-purple-200 px-3 py-1 rounded-lg text-[10px] font-bold"
                      >
                        +/- เครดิต
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {adjModal && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-[#161226] border border-purple-800/50 rounded-3xl max-w-sm w-full p-6 space-y-4">
                <h3 className="text-base font-bold text-white">ปรับเครดิตให้คุณ: {adjModal.username}</h3>
                <div>
                  <label className="block text-xs text-purple-300 mb-1">จำนวนเงิน (ใส่ +50 หรือ -30)</label>
                  <input
                    type="number"
                    value={adjAmount}
                    onChange={(e) => setAdjAmount(e.target.value)}
                    className="w-full bg-purple-950/50 border border-purple-800/50 rounded-xl px-3 py-2 text-xs font-mono text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-purple-300 mb-1">เหตุผลในการปรับปรุงยอด</label>
                  <input
                    type="text"
                    value={adjReason}
                    onChange={(e) => setAdjReason(e.target.value)}
                    className="w-full bg-purple-950/50 border border-purple-800/50 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button onClick={() => setAdjModal(null)} className="px-3 py-1.5 text-xs text-purple-300">ยกเลิก</button>
                  <button 
                    onClick={() => {
                      onAdjustUserCredit(adjModal.id, adjAmount, adjReason);
                      setAdjModal(null);
                    }} 
                    className="bg-amber-500 text-slate-950 font-bold px-4 py-1.5 rounded-xl text-xs"
                  >
                    บันทึก
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 6. WEBSITE SETTINGS & MARQUEE */}
      {subTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-[#161226]/90 border border-purple-800/40 rounded-3xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">แก้ไขข้อความประกาศวิ่ง Marquee</h3>
            <textarea
              rows={2}
              value={announcements[0]?.text || ''}
              onChange={(e) => setAnnouncements([{ ...announcements[0], text: e.target.value }])}
              className="w-full bg-purple-950/50 border border-purple-800/50 rounded-xl p-3 text-xs text-white"
            />
          </div>

          <div className="bg-[#161226]/90 border border-purple-800/40 rounded-3xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">ตั้งค่าช่องทางการรับชำระเงิน และ QR Code</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-purple-300 mb-1">ชื่อธนาคาร</label>
                <input
                  type="text"
                  value={siteSettings.bankName}
                  onChange={(e) => setSiteSettings({ ...siteSettings, bankName: e.target.value })}
                  className="w-full bg-purple-950/50 border border-purple-800/50 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-purple-300 mb-1">เลขบัญชีธนาคาร</label>
                <input
                  type="text"
                  value={siteSettings.bankAccountNo}
                  onChange={(e) => setSiteSettings({ ...siteSettings, bankAccountNo: e.target.value })}
                  className="w-full bg-purple-950/50 border border-purple-800/50 rounded-xl px-3 py-2 text-xs font-mono text-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs text-purple-300 mb-1">URL รูปภาพ QR Code สำหรับรับโอนเงิน</label>
                <input
                  type="text"
                  placeholder="https://example.com/my-qr-code.png"
                  value={siteSettings.qrCodeUrl}
                  onChange={(e) => setSiteSettings({ ...siteSettings, qrCodeUrl: e.target.value })}
                  className="w-full bg-purple-950/50 border border-purple-800/50 rounded-xl px-3 py-2 text-xs font-mono text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// ===================================================
// CONSOLIDATED AUTHENTICATION MODAL (Admin Jao_fuse/fiw1212fiw + User + OTP)
// ===================================================
function AuthModal({ mode, setMode, onClose, onLoginSuccess, usersList, setUsersList, showToast }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // OTP Reset simulation state
  const [otpStep, setOtpStep] = useState(1);
  const [otpCode, setOtpCode] = useState('');

  const handleAuthSubmit = () => {
    if (mode === 'login') {
      // 1. Enforced Admin check
      if (username === 'Jao_fuse' && password === 'fiw1212fiw') {
        onLoginSuccess({
          id: 'user-admin-jaofuse',
          username: 'Jao_fuse',
          email: 'admin@jaofuse.com',
          role: 'admin',
          credit: 99999
        });
        return;
      }

      // 2. Regular user check
      const match = usersList.find(u => (u.username === username || u.email === username) && u.password === password);
      if (match) {
        onLoginSuccess(match);
      } else {
        showToast('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง (สิทธิ์ผู้ดูแลระบบใช้: Jao_fuse / fiw1212fiw)', 'error');
      }
    } else if (mode === 'register') {
      if (!username || !email || !password) {
        showToast('กรุณากรอกข้อมูลให้ครบถ้วน', 'error');
        return;
      }
      if (password !== confirmPassword) {
        showToast('รหัสผ่านยืนยันไม่ตรงกัน', 'error');
        return;
      }
      if (usersList.some(u => u.username === username || u.email === email)) {
        showToast('ชื่อผู้ใช้หรืออีเมลนี้มีอยู่ในระบบแล้ว', 'error');
        return;
      }
      const newUser = {
        id: `user-${Date.now()}`,
        username,
        email,
        password,
        role: 'user',
        credit: 0
      };
      setUsersList([...usersList, newUser]);
      showToast('สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบด้วยบัญชีใหม่', 'success');
      setMode('login');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#161226] border border-purple-800/50 rounded-3xl max-w-md w-full p-8 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-purple-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-black text-white">
            {mode === 'login' ? 'เข้าสู่ระบบ JAOFUSE' : mode === 'register' ? 'สมัครสมาชิกใหม่' : 'กู้คืนรหัสผ่าน OTP'}
          </h2>
          <p className="text-xs text-purple-300 mt-1">
            {mode === 'login' ? 'สิทธิ์แอดมินใช้: Jao_fuse / fiw1212fiw' : 'JAOFUSE Gaming Account Store'}
          </p>
        </div>

        {mode !== 'forgot' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-purple-300 font-semibold mb-1">ชื่อผู้ใช้ (Username) หรือ อีเมล</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-purple-950/50 border border-purple-800/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-xs text-purple-300 font-semibold mb-1">อีเมล (Email)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-purple-950/50 border border-purple-800/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            )}

            <div>
              <label className="block text-xs text-purple-300 font-semibold mb-1">รหัสผ่าน</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-purple-950/50 border border-purple-800/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-xs text-purple-300 font-semibold mb-1">ยืนยันรหัสผ่านอีกครั้ง</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-purple-950/50 border border-purple-800/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            )}

            <button
              onClick={handleAuthSubmit}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 rounded-2xl text-xs shadow-lg shadow-purple-600/30 mt-2"
            >
              {mode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}
            </button>

            <div className="flex justify-between items-center text-xs text-purple-300 pt-3 border-t border-purple-900/40">
              {mode === 'login' ? (
                <>
                  <button onClick={() => setMode('forgot')} className="hover:text-white">ลืมรหัสผ่าน?</button>
                  <button onClick={() => setMode('register')} className="text-pink-400 hover:text-pink-300 font-bold">สมัครสมาชิกใหม่</button>
                </>
              ) : (
                <button onClick={() => setMode('login')} className="text-purple-300 hover:text-white">มีบัญชีอยู่แล้ว? เข้าสู่ระบบ</button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {otpStep === 1 && (
              <>
                <p className="text-xs text-purple-300">กรอกอีเมลเพื่อรับรหัส OTP รีเซ็ตรหัสผ่าน</p>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-purple-950/50 border border-purple-800/50 rounded-xl px-4 py-2.5 text-xs text-white"
                />
                <button
                  onClick={() => {
                    setOtpStep(2);
                    showToast('ส่งรหัส OTP ไปยังอีเมลของคุณเรียบร้อยแล้ว (รหัสทดสอบ: 123456)', 'info');
                  }}
                  className="w-full bg-purple-600 text-white font-bold py-2.5 rounded-xl text-xs"
                >
                  ส่งรหัส OTP
                </button>
              </>
            )}

            {otpStep === 2 && (
              <>
                <p className="text-xs text-purple-300">กรอกรหัส OTP 6 หลักที่ได้รับในอีเมล (ทดสอบใช้: 123456)</p>
                <input
                  type="text"
                  placeholder="123456"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full bg-purple-950/50 border border-purple-800/50 rounded-xl px-4 py-2.5 text-center font-mono text-lg text-white"
                />
                <button
                  onClick={() => {
                    if (otpCode === '123456') {
                      setOtpStep(3);
                    } else {
                      showToast('รหัส OTP ไม่ถูกต้อง!', 'error');
                    }
                  }}
                  className="w-full bg-emerald-600 text-white font-bold py-2.5 rounded-xl text-xs"
                >
                  ยืนยัน OTP
                </button>
              </>
            )}

            {otpStep === 3 && (
              <>
                <p className="text-xs text-purple-300">ตั้งรหัสผ่านใหม่สำหรับบัญชีของคุณ</p>
                <input
                  type="password"
                  placeholder="รหัสผ่านใหม่"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-purple-950/50 border border-purple-800/50 rounded-xl px-4 py-2.5 text-xs text-white"
                />
                <button
                  onClick={() => {
                    showToast('เปลี่ยนรหัสผ่านสำเร็จ! กรุณาเข้าสู่ระบบใหม่', 'success');
                    setMode('login');
                    setOtpStep(1);
                  }}
                  className="w-full bg-purple-600 text-white font-bold py-2.5 rounded-xl text-xs"
                >
                  บันทึกรหัสผ่านใหม่
                </button>
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
}