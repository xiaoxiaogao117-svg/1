/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type PageType = 'splash' | 'home' | 'route-detail' | 'booking' | 'payment' | 'trips' | 'safety' | 'social' | 'achievements' | 'profile';

interface Route {
  id: number;
  name: string;
  duration: string;
  price: number;
  image: string;
  desc: string;
}

interface Post {
  id: number;
  user: string;
  avatar: string;
  route: string;
  time: string;
  content: string;
  likes: number;
  liked: boolean;
}

// --- Constants ---
const ROUTES: Route[] = [
  { id: 1, name: '云端西湖全景', duration: '20min', price: 899, image: 'https://picsum.photos/seed/lake/400/300', desc: '俯瞰断桥残雪，尽览湖光山色。' },
  { id: 2, name: '钱江新城灯光秀', duration: '15min', price: 699, image: 'https://picsum.photos/seed/city/400/300', desc: 'AI自动避障，近距离感受城市脉动。' },
  { id: 3, name: '龙井茶园森呼吸', duration: '25min', price: 1099, image: 'https://picsum.photos/seed/tea/400/300', desc: '低空穿梭于万亩茶园，茶香四溢。' },
  { id: 4, name: '良渚遗址文明溯源', duration: '30min', price: 1299, image: 'https://picsum.photos/seed/history/400/300', desc: '跨越五千年，俯瞰文明曙光。' },
];

const POSTS_DATA: Post[] = [
  { id: 1, user: '林深见鹿', avatar: 'https://picsum.photos/seed/u1/100/100', route: '云端西湖全景', time: '2小时前', content: '今天在空中看到了绝美日落！AI驾驶非常平稳，全景视野真的无敌。', likes: 128, liked: false },
  { id: 2, user: '云端漫步者', avatar: 'https://picsum.photos/seed/u2/100/100', route: '钱江新城灯光秀', time: '5小时前', content: '第一次尝试低空观光，这种视角看城市太震撼了。', likes: 56, liked: false },
];

// --- Components ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('splash');
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [posts, setPosts] = useState<Post[]>(POSTS_DATA);
  const [showSafetyDetail, setShowSafetyDetail] = useState(false);
  const [activeTripTab, setActiveTripTab] = useState<'upcoming' | 'history'>('upcoming');

  // Particles for splash
  const particles = useMemo(() => Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${3 + Math.random() * 4}s`
  })), []);

  const handleLike = (id: number) => {
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        const newLiked = !p.liked;
        return { ...p, liked: newLiked, likes: newLiked ? p.likes + 1 : p.likes - 1 };
      }
      return p;
    }));
  };

  const navigateTo = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // --- Page Renderers ---

  const renderSplash = () => (
    <div className="relative h-screen w-full bg-bg-main overflow-hidden flex flex-col items-center justify-center px-10">
      {particles.map(p => (
        <div key={p.id} className="particle" style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration }} />
      ))}
      
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-accent rounded-full blur-3xl opacity-20 animate-pulse-glow" />
        <div className="relative z-10 w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-xl">
          <i className="fa-solid fa-plane-up text-primary text-5xl" />
        </div>
      </div>

      <div className="text-center z-10">
        <h1 className="text-3xl font-bold tracking-widest mb-2 text-primary">SKYVISTA</h1>
        <p className="text-text-sub text-sm tracking-[0.2em] mb-20">双人座 AI 自动驾驶低空观光</p>
      </div>

      <div className="w-full flex flex-col gap-4 z-10">
        <button onClick={() => navigateTo('home')} className="btn-primary w-full py-4 text-lg">启程</button>
        <button onClick={() => navigateTo('home')} className="text-text-sub/60 text-sm">游客浏览</button>
      </div>

      <div className="absolute bottom-10 w-full px-10">
        <div className="h-[1px] bg-accent/30 w-full relative">
          <div className="absolute top-0 left-0 h-full w-1/2 bg-accent shadow-[0_0_10px_#E9B5A0]" />
        </div>
      </div>
    </div>
  );

  const renderHome = () => (
    <div className="pb-24 pt-6 px-5">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
            <img src="https://picsum.photos/seed/user/100/100" alt="avatar" referrerPolicy="no-referrer" />
          </div>
          <div>
            <p className="text-xs text-text-sub">早安, 探险者</p>
            <p className="font-bold">欢迎来到云端</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-gray-200" />
              <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="3" fill="transparent" strokeDasharray="113" strokeDashoffset="20" className="text-primary" />
            </svg>
            <span className="absolute text-[10px] font-bold">85%</span>
          </div>
          <span className="text-[10px] text-text-sub mt-1">适飞指数</span>
        </div>
      </header>

      <div className="h-[1px] bg-accent/20 mb-8 relative overflow-hidden">
        <motion.div 
          animate={{ x: ['-100%', '100%'] }} 
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-accent to-transparent" 
        />
      </div>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">附近起降点</h2>
          <span className="text-xs text-primary">查看地图</span>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {[
            { name: '西湖断桥站', dist: '1.2km', avail: 3 },
            { name: '钱江世纪城站', dist: '3.5km', avail: 5 },
            { name: '西溪湿地站', dist: '5.8km', avail: 2 },
          ].map((site, i) => (
            <div key={i} className="card min-w-[160px] p-4 flex flex-col gap-2">
              <p className="font-bold text-sm truncate">{site.name}</p>
              <div className="flex items-center justify-between text-xs text-text-sub">
                <span><i className="fa-solid fa-location-dot mr-1" />{site.dist}</span>
                <span className="text-primary">可用 {site.avail}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">推荐航线</h2>
          <span className="text-xs text-text-sub">更多</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {ROUTES.map(route => (
            <div key={route.id} onClick={() => { setSelectedRoute(route); navigateTo('route-detail'); }} className="card overflow-hidden group">
              <div className="h-32 bg-gray-100 relative">
                <img src={route.image} alt={route.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-[10px] font-bold">
                  {route.duration}
                </div>
              </div>
              <div className="p-3">
                <p className="font-bold text-sm mb-1 truncate">{route.name}</p>
                <p className="text-accent font-bold text-sm">¥{route.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const renderRouteDetail = () => (
    <div className="bg-white min-h-screen pb-24">
      <div className="relative h-80">
        <img src={selectedRoute?.image} alt={selectedRoute?.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
        <button onClick={() => navigateTo('home')} className="absolute top-12 left-5 w-10 h-10 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center">
          <i className="fa-solid fa-chevron-left" />
        </button>
      </div>

      <motion.div 
        initial={{ y: 50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        className="px-5 -mt-10 relative z-10"
      >
        <div className="card p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">{selectedRoute?.name}</h1>
              <p className="text-text-sub text-sm">{selectedRoute?.desc}</p>
            </div>
            <div className="text-right">
              <p className="text-accent text-xl font-bold">¥{selectedRoute?.price}</p>
              <p className="text-[10px] text-text-sub">双人特惠</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-xs text-text-sub border-t border-border pt-4">
            <span className="flex items-center gap-1"><i className="fa-regular fa-clock text-primary" />{selectedRoute?.duration}</span>
            <span className="flex items-center gap-1"><i className="fa-solid fa-wind text-primary" />适飞等级 A</span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="font-bold mb-4">体验亮点</h2>
          <div className="flex justify-between">
            {[
              { icon: 'fa-eye', text: '全景视野' },
              { icon: 'fa-volume-xmark', text: 'AI静音巡航' },
              { icon: 'fa-map-location-dot', text: 'AR文化导览' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <i className={`fa-solid ${item.icon}`} />
                </div>
                <span className="text-xs">{item.text}</span>
                <div className="w-8 h-[2px] bg-accent/30" />
              </div>
            ))}
          </div>
        </div>

        <div className="card overflow-hidden">
          <div onClick={() => setShowSafetyDetail(!showSafetyDetail)} className="p-4 flex items-center justify-between cursor-pointer">
            <span className="font-bold">安全承诺</span>
            <i className={`fa-solid fa-chevron-${showSafetyDetail ? 'up' : 'down'} text-text-sub text-sm`} />
          </div>
          <AnimatePresence>
            {showSafetyDetail && (
              <motion.div 
                initial={{ height: 0 }} 
                animate={{ height: 'auto' }} 
                exit={{ height: 0 }}
                className="overflow-hidden bg-bg-main/50"
              >
                <div className="p-4 text-sm text-text-sub leading-relaxed">
                  基于TRIZ理论的噪音抑制系统，降噪率提升40%；全景视野优化算法，实时调整飞行姿态，确保最佳观赏角度与极致平稳体验。
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="fixed bottom-0 left-0 w-full p-5 bg-white/80 backdrop-blur-md border-t border-border z-50">
        <button onClick={() => navigateTo('booking')} className="btn-primary w-full py-4 shadow-xl">立即预约</button>
      </div>
    </div>
  );

  const renderBooking = () => (
    <div className="pb-24 pt-6 px-5">
      <header className="flex items-center justify-between mb-8">
        <button onClick={() => navigateTo('home')}><i className="fa-solid fa-chevron-left text-lg" /></button>
        <h1 className="font-bold">预定流程</h1>
        <div className="w-6" />
      </header>

      <div className="flex justify-between items-center mb-10 px-2">
        {['选点', '时间', '乘客', '增值'].map((step, i) => (
          <div key={i} className="flex flex-col items-center gap-2 relative flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs z-10 ${bookingStep > i + 1 ? 'bg-primary text-white' : bookingStep === i + 1 ? 'bg-primary text-white' : 'bg-gray-200 text-text-sub'}`}>
              {bookingStep > i + 1 ? <i className="fa-solid fa-check" /> : i + 1}
            </div>
            <span className={`text-[10px] ${bookingStep === i + 1 ? 'text-primary font-bold' : 'text-text-sub'}`}>{step}</span>
            {i < 3 && <div className={`absolute top-4 left-1/2 w-full h-[2px] -z-0 ${bookingStep > i + 1 ? 'bg-primary' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      <div className="min-h-[400px]">
        {bookingStep === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="card h-48 mb-6 bg-gray-100 overflow-hidden relative">
              <img src="https://picsum.photos/seed/map/600/400" alt="map" className="w-full h-full object-cover opacity-50" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white p-4 rounded-xl shadow-lg flex flex-col gap-3 w-4/5">
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-circle text-primary text-[8px]" />
                    <input type="text" placeholder="选择起点" className="text-sm outline-none w-full" defaultValue="西湖断桥站" />
                  </div>
                  <div className="h-[1px] bg-border" />
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-location-dot text-accent text-xs" />
                    <input type="text" placeholder="选择终点" className="text-sm outline-none w-full" defaultValue="钱江新城站" />
                  </div>
                </div>
              </div>
            </div>
            <h3 className="text-sm font-bold mb-3">热门起降点</h3>
            <div className="flex flex-wrap gap-2">
              {['奥体中心', '城市阳台', '雷峰塔', '太子湾'].map(tag => (
                <span key={tag} className="px-4 py-2 bg-white rounded-full text-xs border border-border">{tag}</span>
              ))}
            </div>
          </motion.div>
        )}

        {bookingStep === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h3 className="text-sm font-bold mb-4">选择日期</h3>
            <div className="flex gap-3 overflow-x-auto no-scrollbar mb-8">
              {[...Array(7)].map((_, i) => (
                <div key={i} className={`min-w-[60px] h-20 rounded-2xl flex flex-col items-center justify-center gap-1 border ${i === 0 ? 'border-primary bg-primary/5' : 'border-border bg-white'}`}>
                  <span className="text-[10px] text-text-sub">周{['一','二','三','四','五','六','日'][i % 7]}</span>
                  <span className="font-bold">{28 + i}</span>
                </div>
              ))}
            </div>
            <h3 className="text-sm font-bold mb-4">选择时段</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: '晨曦', time: '06:00-09:00' },
                { name: '午后', time: '13:00-16:00' },
                { name: '日落', time: '17:00-19:00' },
              ].map((slot, i) => (
                <div key={i} className={`p-3 rounded-2xl border text-center ${i === 2 ? 'border-primary bg-primary/5' : 'border-border bg-white'}`}>
                  <p className="text-xs font-bold mb-1">{slot.name}</p>
                  <p className="text-[8px] text-text-sub">{slot.time}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {bookingStep === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h3 className="text-sm font-bold mb-4">双人乘客信息</h3>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2].map(i => (
                <div key={i} className="card p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <i className="fa-solid fa-user-group text-primary text-sm" />
                    <span className="text-xs font-bold">乘客 {i}</span>
                  </div>
                  <input type="text" placeholder="姓名" className="w-full text-xs p-2 bg-bg-main rounded-lg mb-2 outline-none" />
                  <input type="text" placeholder="证件号" className="w-full text-xs p-2 bg-bg-main rounded-lg outline-none" />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {bookingStep === 4 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h3 className="text-sm font-bold mb-4">增值服务</h3>
            <div className="flex flex-col gap-4">
              {[
                { name: '全程4K录像', price: '+¥30', desc: 'AI自动运镜，记录飞行精彩瞬间' },
                { name: '文化导览包', price: '免费', desc: '深度AR讲解，探索地标背后的故事' },
              ].map((service, i) => (
                <div key={i} className="card p-4 flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm">{service.name}</span>
                      <span className="text-accent text-xs">{service.price}</span>
                    </div>
                    <p className="text-[10px] text-text-sub">{service.desc}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${i === 1 ? 'border-primary bg-primary text-white' : 'border-border'}`}>
                    {i === 1 && <i className="fa-solid fa-check text-[10px]" />}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 w-full p-5 bg-white border-t border-border flex gap-4">
        <button 
          onClick={() => bookingStep > 1 ? setBookingStep(bookingStep - 1) : navigateTo('home')} 
          className="btn-outline flex-1 py-3"
        >
          返回
        </button>
        <button 
          onClick={() => bookingStep < 4 ? setBookingStep(bookingStep + 1) : navigateTo('payment')} 
          className="btn-primary flex-[2] py-3"
        >
          {bookingStep === 4 ? '去确认' : '下一步'}
        </button>
      </div>
    </div>
  );

  const renderPayment = () => (
    <div className="pb-24 pt-6 px-5">
      <header className="flex items-center justify-between mb-8">
        <button onClick={() => setBookingStep(4)}><i className="fa-solid fa-chevron-left text-lg" /></button>
        <h1 className="font-bold">订单确认</h1>
        <div className="w-6" />
      </header>

      <div className="card p-5 mb-6">
        <h3 className="font-bold mb-4 border-b border-border pb-2">订单摘要</h3>
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex justify-between">
            <span className="text-text-sub">航线</span>
            <span className="font-medium">{selectedRoute?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-sub">起降点</span>
            <span className="font-medium">西湖断桥站 → 钱江新城站</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-sub">时间</span>
            <span className="font-medium">2026-03-28 日落时段</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-sub">乘客</span>
            <span className="font-medium">张三、李四</span>
          </div>
        </div>
      </div>

      <div className="card p-5 mb-8">
        <h3 className="font-bold mb-4 border-b border-border pb-2">价格明细</h3>
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex justify-between">
            <span className="text-text-sub">票价 (双人)</span>
            <span>¥{selectedRoute?.price}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-sub">增值服务</span>
            <span>¥0</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-text-sub">飞行保险</span>
              <i className="fa-solid fa-circle-check text-primary text-xs" />
            </div>
            <span>¥20</span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-border mt-2">
            <span className="font-bold text-lg">总计</span>
            <span className="font-bold text-xl text-text-main">¥{(selectedRoute?.price || 0) + 20}</span>
          </div>
        </div>
      </div>

      <h3 className="text-sm font-bold mb-4">支付方式</h3>
      <div className="grid grid-cols-3 gap-3 mb-10">
        {[
          { name: '微信支付', icon: 'fa-weixin' },
          { name: '支付宝', icon: 'fa-alipay' },
          { name: '云闪付', icon: 'fa-credit-card' },
        ].map((pay, i) => (
          <div key={i} className={`p-3 rounded-2xl border flex flex-col items-center gap-2 transition-all ${i === 0 ? 'border-primary bg-primary text-white' : 'border-border bg-white'}`}>
            <i className={`fa-brands ${pay.icon} text-lg`} />
            <span className="text-[10px]">{pay.name}</span>
          </div>
        ))}
      </div>

      <button onClick={() => navigateTo('trips')} className="btn-primary w-full py-4 text-lg">确认支付 ¥{(selectedRoute?.price || 0) + 20}</button>
    </div>
  );

  const renderTrips = () => (
    <div className="pb-24 pt-6 px-5">
      <h1 className="text-2xl font-bold mb-6">我的行程</h1>
      
      <div className="flex gap-8 mb-8 border-b border-border">
        <button 
          onClick={() => setActiveTripTab('upcoming')}
          className={`pb-3 text-sm font-bold relative transition-colors ${activeTripTab === 'upcoming' ? 'text-primary' : 'text-text-sub'}`}
        >
          即将启程
          {activeTripTab === 'upcoming' && <motion.div layoutId="tripTab" className="absolute bottom-0 left-0 w-full h-[2px] bg-primary" />}
        </button>
        <button 
          onClick={() => setActiveTripTab('history')}
          className={`pb-3 text-sm font-bold relative transition-colors ${activeTripTab === 'history' ? 'text-primary' : 'text-text-sub'}`}
        >
          飞行日志
          {activeTripTab === 'history' && <motion.div layoutId="tripTab" className="absolute bottom-0 left-0 w-full h-[2px] bg-primary" />}
        </button>
      </div>

      {activeTripTab === 'upcoming' ? (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="card p-6 bg-primary/5 border border-primary/10">
            <div className="flex justify-between items-center mb-6">
              <span className="px-3 py-1 bg-primary text-white text-[10px] rounded-full">待起飞</span>
              <span className="text-xs text-text-sub">距起飞 02:45:12</span>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1">
                <p className="text-[10px] text-text-sub mb-1">起点</p>
                <p className="font-bold text-sm">西湖断桥站</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <i className="fa-solid fa-plane text-primary text-xs" />
                <div className="w-12 h-[1px] bg-primary/30" />
              </div>
              <div className="flex-1 text-right">
                <p className="text-[10px] text-text-sub mb-1">终点</p>
                <p className="font-bold text-sm">钱江新城站</p>
              </div>
            </div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-[10px] text-text-sub mb-1">时间</p>
                <p className="font-bold text-sm">今日 17:30</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-text-sub mb-1">飞行器</p>
                <p className="font-bold text-sm">SV-082</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="btn-outline flex-1 py-2 text-xs">改签</button>
              <button className="btn-outline flex-1 py-2 text-xs">取消</button>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="flex flex-col gap-4">
          {[
            { name: '云端西湖全景', date: '2026-03-15', duration: '20min', tags: ['绝美日落', '平稳'] },
            { name: '龙井茶园森呼吸', date: '2026-02-20', duration: '25min', tags: ['茶香', '低空'] },
          ].map((log, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="card p-4 flex gap-4">
              <div className="w-20 h-20 bg-bg-main rounded-xl flex items-center justify-center overflow-hidden">
                <svg className="w-full h-full p-2">
                  <path d="M10 60 Q 40 10, 70 60" fill="transparent" stroke="#E9B5A0" strokeWidth="2" strokeDasharray="4 2" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-sm">{log.name}</h3>
                  <span className="text-[10px] text-text-sub">{log.date}</span>
                </div>
                <p className="text-[10px] text-text-sub mb-2">时长: {log.duration}</p>
                <div className="flex gap-2 mb-3">
                  {log.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-bg-main text-[8px] rounded-md">{tag}</span>
                  ))}
                </div>
                <button className="text-accent text-xs font-bold">写评价</button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );

  const renderSafety = () => (
    <div className="pb-24 pt-6 px-5">
      <h1 className="text-2xl font-bold mb-6">安全与信任中心</h1>
      
      <div className="card p-6 mb-6 flex flex-col items-center text-center">
        <div className="relative w-24 h-24 mb-4">
          <svg className="w-full h-full">
            <circle cx="48" cy="48" r="44" stroke="#EDEFF2" strokeWidth="8" fill="transparent" />
            <circle cx="48" cy="48" r="44" stroke="#4ADE80" strokeWidth="8" fill="transparent" strokeDasharray="276" strokeDashoffset="0" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <i className="fa-solid fa-shield-halved text-green-500 text-2xl" />
          </div>
        </div>
        <p className="font-bold text-green-500 mb-1">今日所有飞行器已通过检测</p>
        <p className="text-xs text-text-sub">自检状态: 正常</p>
        
        <div className="grid grid-cols-2 w-full mt-6 border-t border-border pt-6">
          <div className="border-r border-border">
            <p className="text-xl font-bold">1,284</p>
            <p className="text-[10px] text-text-sub">今日安全飞行</p>
          </div>
          <div>
            <p className="text-xl font-bold">45.2k</p>
            <p className="text-[10px] text-text-sub">累计安全里程</p>
          </div>
        </div>
      </div>

      <div className="card p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm">AI 驾驶说明</h3>
          <span className="px-2 py-0.5 bg-primary/10 text-primary text-[8px] rounded-md font-bold">基于TRIZ的静谧优化</span>
        </div>
        <p className="text-xs text-text-sub leading-relaxed">
          SKYVISTA 采用 L4 级 AI 自动驾驶系统，集成多传感器融合感知技术，实时避障精度达厘米级。
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="card p-4">
          <p className="text-[10px] text-text-sub mb-1">系统稳定性</p>
          <p className="text-lg font-bold text-primary">99.98%</p>
          <div className="w-full h-1 bg-gray-100 rounded-full mt-2">
            <div className="w-[99%] h-full bg-primary rounded-full" />
          </div>
        </div>
        <div className="card p-4">
          <p className="text-[10px] text-text-sub mb-1">应急响应率</p>
          <p className="text-lg font-bold text-primary">100%</p>
          <div className="w-full h-1 bg-gray-100 rounded-full mt-2">
            <div className="w-full h-full bg-primary rounded-full" />
          </div>
        </div>
      </div>

      <div className="card p-5 mb-6">
        <h3 className="font-bold text-sm mb-4">应急保障</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold mb-1">紧急联系电话</p>
            <p className="text-lg font-bold tracking-wider">400-888-9999</p>
          </div>
          <button className="w-12 h-12 rounded-full border border-primary flex items-center justify-center text-primary active:bg-primary active:text-white transition-colors">
            <i className="fa-solid fa-phone" />
          </button>
        </div>
        <p className="text-[10px] text-text-sub mt-4">平均响应时间: 90秒</p>
      </div>

      <div className="flex flex-col gap-2">
        {['飞行中遇到颠簸怎么办？', '如果天气突变会如何处理？', '如何保证隐私安全？'].map((q, i) => (
          <div key={i} className="card p-4 flex justify-between items-center">
            <span className="text-xs">{q}</span>
            <i className="fa-solid fa-chevron-right text-text-sub text-[10px]" />
          </div>
        ))}
      </div>
    </div>
  );

  const renderSocial = () => (
    <div className="pb-24 pt-6 px-5">
      <header className="flex items-center justify-between mb-8">
        <div onClick={() => navigateTo('profile')} className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden cursor-pointer">
          <img src="https://picsum.photos/seed/user/100/100" alt="avatar" referrerPolicy="no-referrer" />
        </div>
        <h1 className="font-bold">社交空间</h1>
        <button className="w-10 h-10 flex items-center justify-center"><i className="fa-solid fa-users text-text-sub" /></button>
      </header>

      <section className="mb-8">
        <h2 className="text-sm font-bold mb-4">推荐飞友</h2>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="card min-w-[100px] p-4 flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden">
                <img src={`https://picsum.photos/seed/friend${i}/100/100`} alt="friend" referrerPolicy="no-referrer" />
              </div>
              <span className="text-[10px] font-bold">飞友_{i}</span>
              <button className="px-3 py-1 border border-accent text-accent text-[8px] rounded-full">关注</button>
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-col gap-6">
        {posts.map(post => (
          <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                  <img src={post.avatar} alt={post.user} referrerPolicy="no-referrer" />
                </div>
                <div>
                  <p className="text-sm font-bold">{post.user}</p>
                  <p className="text-[10px] text-text-sub">{post.time} · {post.route}</p>
                </div>
              </div>
              <i className="fa-solid fa-ellipsis-h text-text-sub" />
            </div>

            <div className="h-40 bg-bg-main rounded-2xl mb-4 relative overflow-hidden">
              <svg className="w-full h-full p-4 opacity-30">
                <path d="M20 120 C 60 20, 180 20, 300 120" fill="transparent" stroke="#E9B5A0" strokeWidth="3" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-accent/20 text-4xl">
                <i className="fa-solid fa-map" />
              </div>
            </div>

            <p className="text-sm text-text-main mb-4 leading-relaxed">{post.content}</p>

            <div className="flex items-center gap-6 text-text-sub">
              <button 
                onClick={() => handleLike(post.id)} 
                className={`flex items-center gap-1.5 transition-colors ${post.liked ? 'text-accent' : ''}`}
              >
                <i className={`fa-heart ${post.liked ? 'fa-solid animate-bounce-heart' : 'fa-regular'}`} />
                <span className="text-xs">{post.likes}</span>
              </button>
              <button className="flex items-center gap-1.5"><i className="fa-regular fa-comment" /><span className="text-xs">24</span></button>
              <button className="flex items-center gap-1.5 ml-auto"><i className="fa-solid fa-share-nodes" /></button>
            </div>
          </motion.div>
        ))}
      </div>

      <button onClick={() => alert('发布功能开发中...')} className="fixed bottom-28 right-5 bg-accent text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2 font-bold active:scale-95 transition-transform z-40">
        <i className="fa-solid fa-plus" />
        <span>发布飞行故事</span>
      </button>
    </div>
  );

  const renderAchievements = () => (
    <div className="pb-24 pt-6 px-5">
      <header className="flex items-center justify-between mb-8">
        <button onClick={() => navigateTo('profile')}><i className="fa-solid fa-chevron-left text-lg" /></button>
        <h1 className="font-bold">成就徽章墙</h1>
        <div className="w-6" />
      </header>

      <div className="card p-6 mb-8 bg-primary/5">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-xs text-text-sub mb-1">已获得徽章</p>
            <p className="text-2xl font-bold">12 / 24</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-text-sub mb-1">等级称号</p>
            <p className="text-sm font-bold text-primary">云端领航员</p>
          </div>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="w-1/2 h-full bg-primary rounded-full" />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-10">
        {[
          { name: '初试云端', icon: 'fa-paper-plane', color: 'text-blue-400', active: true },
          { name: '日落追逐', icon: 'fa-sun', color: 'text-orange-400', active: true },
          { name: '西湖常客', icon: 'fa-water', color: 'text-cyan-400', active: true },
          { name: '夜航先锋', icon: 'fa-moon', color: 'text-indigo-400', active: true },
          { name: '千米高空', icon: 'fa-mountain', color: 'text-gray-400', active: false },
          { name: '社交达人', icon: 'fa-share-nodes', color: 'text-gray-400', active: false },
          { name: '安全大使', icon: 'fa-shield-halved', color: 'text-gray-400', active: false },
          { name: '飞行大亨', icon: 'fa-crown', color: 'text-gray-400', active: false },
        ].map((badge, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl shadow-sm ${badge.active ? 'bg-white ' + badge.color : 'bg-gray-100 text-gray-300'}`}>
              <i className={`fa-solid ${badge.icon}`} />
              {!badge.active && <i className="fa-solid fa-lock absolute text-[8px] mt-8 ml-8 text-gray-400" />}
            </div>
            <span className={`text-[8px] text-center ${badge.active ? 'text-text-main font-bold' : 'text-text-sub'}`}>{badge.name}</span>
          </div>
        ))}
      </div>

      <h3 className="text-sm font-bold mb-4">好友成就榜</h3>
      <div className="flex flex-col gap-3">
        {[
          { name: '飞友_A', badges: 18, avatar: 'https://picsum.photos/seed/a1/100/100' },
          { name: '飞友_B', badges: 15, avatar: 'https://picsum.photos/seed/a2/100/100' },
          { name: '飞友_C', badges: 12, avatar: 'https://picsum.photos/seed/a3/100/100' },
        ].map((friend, i) => (
          <div key={i} className="card p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-text-sub w-4">{i + 1}</span>
              <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden">
                <img src={friend.avatar} alt={friend.name} referrerPolicy="no-referrer" />
              </div>
              <span className="text-xs font-bold">{friend.name}</span>
            </div>
            <span className="text-xs text-primary font-bold">{friend.badges} 徽章</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="pb-24 pt-12 px-5">
      <div className="flex flex-col items-center mb-10">
        <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-lg mb-4">
          <img src="https://picsum.photos/seed/user/100/100" alt="avatar" referrerPolicy="no-referrer" />
        </div>
        <h2 className="text-xl font-bold mb-2">探险者_007</h2>
        <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden mb-2">
          <div className="w-3/4 h-full bg-primary rounded-full" />
        </div>
        <p className="text-[10px] text-text-sub">飞行里程: 128km / 200km</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: '飞行次数', val: '12' },
          { label: '总时长', val: '245m' },
          { label: '邀请人数', val: '5' },
        ].map((stat, i) => (
          <div key={i} className="card p-4 text-center">
            <p className="text-lg font-bold text-text-main">{stat.val}</p>
            <p className="text-[10px] text-text-sub">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {[
          { name: '我的行程', icon: 'fa-calendar-check', page: 'trips' },
          { name: '收藏航线', icon: 'fa-heart', page: 'home' },
          { name: '成就徽章墙', icon: 'fa-medal', page: 'achievements' },
          { name: '邀请好友', icon: 'fa-user-plus', page: 'profile' },
          { name: '设置', icon: 'fa-gear', page: 'profile' },
        ].map((item, i) => (
          <div key={i} onClick={() => navigateTo(item.page as PageType)} className="card p-4 flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-bg-main flex items-center justify-center text-primary">
                <i className={`fa-solid ${item.icon} text-sm`} />
              </div>
              <span className="text-sm font-medium">{item.name}</span>
            </div>
            <i className="fa-solid fa-chevron-right text-text-sub text-[10px]" />
          </div>
        ))}
      </div>

      <button className="w-full mt-10 text-text-sub/50 text-sm">退出登录</button>
    </div>
  );

  // --- Main Render ---

  return (
    <div className="max-w-[375px] mx-auto min-h-screen bg-bg-main relative shadow-2xl overflow-x-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {currentPage === 'splash' && renderSplash()}
          {currentPage === 'home' && renderHome()}
          {currentPage === 'route-detail' && renderRouteDetail()}
          {currentPage === 'booking' && renderBooking()}
          {currentPage === 'payment' && renderPayment()}
          {currentPage === 'trips' && renderTrips()}
          {currentPage === 'safety' && renderSafety()}
          {currentPage === 'social' && renderSocial()}
          {currentPage === 'achievements' && renderAchievements()}
          {currentPage === 'profile' && renderProfile()}
        </motion.div>
      </AnimatePresence>

      {/* Bottom Navigation */}
      {currentPage !== 'splash' && currentPage !== 'route-detail' && currentPage !== 'booking' && currentPage !== 'payment' && (
        <nav className="fixed bottom-0 left-0 w-full max-w-[375px] bg-white/80 backdrop-blur-md border-t border-border flex justify-around py-3 px-2 z-50">
          <button onClick={() => navigateTo('home')} className={`nav-item ${currentPage === 'home' ? 'active' : ''}`}>
            <i className={`fa-solid fa-house${currentPage === 'home' ? '' : '-chimney'} text-xl`} />
            <span className="text-[10px]">首页</span>
          </button>
          <button onClick={() => { setBookingStep(1); navigateTo('booking'); }} className={`nav-item ${currentPage === 'booking' ? 'active' : ''}`}>
            <i className="fa-regular fa-calendar-plus text-xl" />
            <span className="text-[10px]">预定</span>
          </button>
          <button onClick={() => navigateTo('trips')} className={`nav-item ${currentPage === 'trips' ? 'active' : ''}`}>
            <i className={`fa-solid fa-route${currentPage === 'trips' ? '' : ''} text-xl`} />
            <span className="text-[10px]">行程</span>
          </button>
          <button onClick={() => navigateTo('safety')} className={`nav-item ${currentPage === 'safety' ? 'active' : ''}`}>
            <i className={`fa-solid fa-shield-halved${currentPage === 'safety' ? '' : ''} text-xl`} />
            <span className="text-[10px]">安全</span>
          </button>
          <button onClick={() => navigateTo('social')} className={`nav-item ${currentPage === 'social' ? 'active' : ''}`}>
            <i className={`fa-solid fa-comments${currentPage === 'social' ? '' : ''} text-xl`} />
            <span className="text-[10px]">社交</span>
          </button>
        </nav>
      )}
    </div>
  );
}
