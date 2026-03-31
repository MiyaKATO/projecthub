/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  LogIn, 
  BookOpen, 
  Folder, 
  Search, 
  Bell, 
  Calendar, 
  ChevronRight, 
  ExternalLink, 
  MessageSquare, 
  HardDrive, 
  Palette, 
  Code, 
  FileText,
  UserPlus,
  Info
} from 'lucide-react';
import { useState, useMemo } from 'react';
import { QUICK_LINKS, RESOURCE_CATEGORIES, ANNOUNCEMENTS, MILESTONES } from './constants';

// Icon mapping helper
const IconMap: Record<string, any> = {
  Home, LogIn, BookOpen, Folder, Search, Bell, Calendar, 
  MessageSquare, HardDrive, Palette, Code, FileText, UserPlus, Info
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return RESOURCE_CATEGORIES;
    return RESOURCE_CATEGORIES.map(cat => ({
      ...cat,
      links: cat.links.filter(link => 
        link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        link.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(cat => cat.links.length > 0);
  }, [searchQuery]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for header/padding
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-secondary flex font-sans selection:bg-brand-primary selection:text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-sidebar border-r border-slate-200 fixed h-full hidden md:flex flex-col p-6 z-20">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-sm">
            <Home size={22} />
          </div>
          <h1 className="font-bold text-lg tracking-tight text-slate-800">Project Hub</h1>
        </div>

        <nav className="space-y-1 flex-1">
          <SidebarLink icon={Home} label="ホーム" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
          <SidebarLink icon={LogIn} label="主要ツール" onClick={() => scrollToSection('tools')} />
          <SidebarLink icon={Folder} label="カテゴリー別資料" onClick={() => scrollToSection('categories')} />
          <SidebarLink icon={Bell} label="お知らせ" onClick={() => scrollToSection('announcements')} />
          <SidebarLink icon={Calendar} label="マイルストーン" onClick={() => scrollToSection('milestones')} />
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-200">
          <div className="bg-white/50 rounded-2xl p-4 text-xs text-slate-500 leading-relaxed">
            <p className="font-semibold mb-1 text-slate-700">💡 サポート</p>
            <p>不明点はSlackの #project-support チャンネルへ。</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 md:p-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight mb-1">
              プロジェクト・ポータル
            </h2>
            <p className="text-slate-500">プロジェクトの全資料とツールを集約しています。</p>
          </div>

          <div className="relative group max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="資料やツールを検索..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all shadow-sm"
            />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Quick Links Section */}
            <section id="tools" className="scroll-mt-24">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 px-1">主要ツール</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {QUICK_LINKS.map((link) => (
                  <QuickLinkCard key={link.id} link={link} />
                ))}
              </div>
            </section>

            {/* Resource Categories */}
            <section id="categories" className="space-y-6 scroll-mt-24">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 px-1">カテゴリー別資料</h3>
              <div className="grid grid-cols-1 gap-6">
                {filteredCategories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
                {filteredCategories.length === 0 && (
                  <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                    <p className="text-slate-400 italic">該当する資料が見つかりませんでした。</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right Column: Sidebar Widgets */}
          <aside className="space-y-8">
            {/* Announcements */}
            <section id="announcements" className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-200 scroll-mt-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <Bell size={18} className="text-brand-primary" />
                  お知らせ
                </h3>
                <button className="text-xs font-semibold text-brand-primary hover:text-brand-accent transition-colors">すべて見る</button>
              </div>
              <div className="space-y-5">
                {ANNOUNCEMENTS.map((ann) => (
                  <div key={ann.id} className="group cursor-pointer">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full uppercase tracking-wider">
                        {ann.tag}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{ann.date}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-700 group-hover:text-brand-primary transition-colors line-clamp-1">{ann.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">{ann.content}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Milestones / Schedule */}
            <section id="milestones" className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-200 scroll-mt-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <Calendar size={18} className="text-brand-primary" />
                  マイルストーン
                </h3>
              </div>
              <div className="space-y-4">
                {MILESTONES.map((ms) => (
                  <div key={ms.id} className="flex items-start gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                    <div className="flex flex-col items-center justify-center min-w-[48px] h-12 bg-slate-50 rounded-xl text-slate-600">
                      <span className="text-[10px] font-bold uppercase opacity-50">{ms.date.split('-')[1]}月</span>
                      <span className="text-lg font-bold leading-none">{ms.date.split('-')[2]}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-700">{ms.title}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        ms.status === 'urgent' ? 'bg-red-50 text-red-500' : 'bg-indigo-50 text-indigo-500'
                      }`}>
                        {ms.status === 'urgent' ? '至急' : '予定'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* External Links / Folders */}
            <section className="bg-slate-100/50 rounded-[2rem] p-6 border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-4">共有フォルダ</h3>
              <div className="space-y-2">
                <FolderLink label="プロジェクト資料 (Desktop)" />
                <FolderLink label="デザインアセット" />
                <FolderLink label="議事録アーカイブ" />
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}

function SidebarLink({ icon: Icon, label, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 text-slate-500 hover:bg-white hover:text-brand-primary hover:shadow-sm"
    >
      <Icon size={20} />
      <span className="text-sm tracking-wide font-medium">{label}</span>
    </button>
  );
}

function QuickLinkCard({ link }: any) {
  const Icon = IconMap[link.icon] || ExternalLink;
  return (
    <a 
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group flex flex-col items-center text-center"
    >
      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-500 group-hover:bg-brand-primary group-hover:text-white transition-colors mb-3">
        <Icon size={24} />
      </div>
      <span className="text-xs font-bold text-slate-700 mb-1">{link.title}</span>
      <span className="text-[10px] text-slate-400 line-clamp-1">{link.description}</span>
    </a>
  );
}

function CategoryCard({ category }: any) {
  const Icon = IconMap[category.icon] || Folder;
  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-200">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-slate-50 rounded-[1.25rem] flex items-center justify-center text-brand-primary">
          <Icon size={28} />
        </div>
        <div>
          <h4 className="text-xl font-bold text-slate-800 tracking-tight">{category.title}</h4>
          <p className="text-sm text-slate-400">{category.links.length}件の資料</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {category.links.map((link: any, idx: number) => (
          <a 
            key={idx}
            href={link.url}
            className="group flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 hover:bg-brand-primary/5 transition-all border border-transparent hover:border-brand-primary/20"
          >
            <div className="flex-1">
              <h5 className="text-sm font-bold text-slate-700 group-hover:text-brand-primary transition-colors">{link.title}</h5>
              <p className="text-xs text-slate-500 mt-0.5">{link.description}</p>
            </div>
            <ChevronRight size={16} className="text-slate-300 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
          </a>
        ))}
      </div>
    </div>
  );
}

function FolderLink({ label }: any) {
  return (
    <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white transition-all group">
      <div className="flex items-center gap-3">
        <Folder size={16} className="text-slate-400 group-hover:text-brand-primary" />
        <span className="text-xs font-bold text-slate-600 group-hover:text-slate-800">{label}</span>
      </div>
      <ExternalLink size={12} className="text-slate-300 group-hover:text-brand-primary" />
    </button>
  );
}
