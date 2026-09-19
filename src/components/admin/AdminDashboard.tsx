import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  PlusCircle, 
  Layers, 
  BookOpen, 
  Wrench, 
  Users, 
  Megaphone, 
  Settings, 
  LogOut, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Save, 
  ExternalLink, 
  Flame, 
  Eye, 
  Copy, 
  ShieldCheck,
  RotateCcw,
  Search,
  Filter,
  Download,
  AlertCircle
} from 'lucide-react';
import { useDataStore } from '../../hooks/useDataStore';
import { useToast } from '../../context/ToastContext';
import { Prompt, Category, Blog, AITool, Advertisement, SiteSettings } from '../../types';

interface AdminDashboardProps {
  onBackToHome: () => void;
}

type AdminTab = 
  | 'overview' 
  | 'prompts' 
  | 'add_prompt' 
  | 'categories' 
  | 'blogs' 
  | 'add_blog' 
  | 'tools' 
  | 'ads' 
  | 'users' 
  | 'settings';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToHome }) => {
  const { 
    prompts, 
    categories, 
    blogs, 
    tools, 
    ads, 
    settings, 
    subscribers, 
    users, 
    dataStore 
  } = useDataStore();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [editingPromptId, setEditingPromptId] = useState<string | null>(null);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editingToolId, setEditingToolId] = useState<string | null>(null);
  const [editingAdId, setEditingAdId] = useState<string | null>(null);

  // Search queries in admin tables
  const [promptSearch, setPromptSearch] = useState('');
  const [blogSearch, setBlogSearch] = useState('');

  // Prompt Form State
  const [promptForm, setPromptForm] = useState({
    title: '',
    fullPrompt: '',
    shortDescription: '',
    categoryId: categories[0]?.id || '',
    categoryName: categories[0]?.name || '',
    aiModel: 'ChatGPT',
    tags: '',
    featuredImage: '',
    authorName: 'PromptView Admin',
    authorRole: 'Lead Prompt Engineer',
    status: 'published' as 'published' | 'draft',
    publishDate: new Date().toISOString().split('T')[0],
    isFeatured: false,
    difficulty: 'Intermediate' as 'Beginner' | 'Intermediate' | 'Advanced',
  });

  // Blog Form State
  const [blogForm, setBlogForm] = useState({
    title: '',
    featuredImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    excerpt: '',
    fullContent: '',
    authorName: 'PromptView Team',
    category: 'ChatGPT',
    tags: '',
    status: 'published' as 'published' | 'draft',
    publishDate: new Date().toISOString().split('T')[0],
    readTimeMinutes: 5,
    isFeatured: false,
  });

  // Category Form State
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: '',
    iconName: 'Sparkles',
    description: '',
    color: '#FF1E2D',
    isTrending: false,
  });

  // Tool Form State
  const [toolForm, setToolForm] = useState({
    name: '',
    iconUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
    shortDescription: '',
    category: 'Text to Image',
    directUrl: 'https://',
    pricingType: 'Freemium' as 'Free' | 'Freemium' | 'Paid' | 'Open Source',
    rating: 4.8,
    featured: false,
    badge: 'Popular',
    tags: '',
  });

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState<SiteSettings>({ ...settings });

  // Handle Save Prompt
  const handleSavePrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptForm.title || !promptForm.fullPrompt) {
      showToast('Title and Full Prompt are required', 'error');
      return;
    }

    const cat = categories.find((c) => c.id === promptForm.categoryId) || categories[0];
    const tagsArray = promptForm.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingPromptId) {
      dataStore.updatePrompt(editingPromptId, {
        title: promptForm.title,
        fullPrompt: promptForm.fullPrompt,
        shortDescription: promptForm.shortDescription,
        categoryId: cat.id,
        categoryName: cat.name,
        aiModel: promptForm.aiModel,
        tags: tagsArray,
        featuredImage: promptForm.featuredImage || undefined,
        status: promptForm.status,
        publishDate: promptForm.publishDate,
        isFeatured: promptForm.isFeatured,
        difficulty: promptForm.difficulty,
      });
      showToast('প্রম্পট সফলভাবে আপডেট করা হয়েছে!', 'success');
      setEditingPromptId(null);
    } else {
      dataStore.addPrompt({
        title: promptForm.title,
        slug: promptForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        fullPrompt: promptForm.fullPrompt,
        shortDescription: promptForm.shortDescription,
        categoryId: cat.id,
        categoryName: cat.name,
        aiModel: promptForm.aiModel,
        tags: tagsArray,
        featuredImage: promptForm.featuredImage || undefined,
        author: {
          name: promptForm.authorName || 'PromptView Admin',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
          role: promptForm.authorRole,
        },
        status: promptForm.status,
        publishDate: promptForm.publishDate,
        isFeatured: promptForm.isFeatured,
        rating: 5.0,
        difficulty: promptForm.difficulty,
      });
      showToast('নতুন প্রম্পট সফলভাবে পাবলিশ হয়েছে!', 'success');
    }

    // Reset Form
    setPromptForm({
      title: '',
      fullPrompt: '',
      shortDescription: '',
      categoryId: categories[0]?.id || '',
      categoryName: categories[0]?.name || '',
      aiModel: 'ChatGPT',
      tags: '',
      featuredImage: '',
      authorName: 'PromptView Admin',
      authorRole: 'Lead Prompt Engineer',
      status: 'published',
      publishDate: new Date().toISOString().split('T')[0],
      isFeatured: false,
      difficulty: 'Intermediate',
    });
    setActiveTab('prompts');
  };

  const handleEditPrompt = (p: Prompt) => {
    setEditingPromptId(p.id);
    setPromptForm({
      title: p.title,
      fullPrompt: p.fullPrompt,
      shortDescription: p.shortDescription,
      categoryId: p.categoryId,
      categoryName: p.categoryName,
      aiModel: p.aiModel,
      tags: p.tags.join(', '),
      featuredImage: p.featuredImage || '',
      authorName: p.author.name,
      authorRole: p.author.role || '',
      status: p.status,
      publishDate: p.publishDate,
      isFeatured: Boolean(p.isFeatured),
      difficulty: p.difficulty || 'Intermediate',
    });
    setActiveTab('add_prompt');
  };

  const handleDeletePrompt = (id: string) => {
    if (window.confirm('Are you sure you want to delete this prompt?')) {
      dataStore.deletePrompt(id);
      showToast('প্রম্পট মুছে ফেলা হয়েছে!', 'info');
    }
  };

  // Handle Save Blog
  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.fullContent) {
      showToast('Title and Content are required', 'error');
      return;
    }

    const tagsArray = blogForm.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingBlogId) {
      dataStore.updateBlog(editingBlogId, {
        title: blogForm.title,
        featuredImage: blogForm.featuredImage,
        excerpt: blogForm.excerpt,
        fullContent: blogForm.fullContent,
        category: blogForm.category,
        tags: tagsArray,
        status: blogForm.status,
        publishDate: blogForm.publishDate,
        readTimeMinutes: Number(blogForm.readTimeMinutes) || 5,
        isFeatured: blogForm.isFeatured,
      });
      showToast('ব্লগ পোস্ট সফলভাবে আপডেট করা হয়েছে!', 'success');
      setEditingBlogId(null);
    } else {
      dataStore.addBlog({
        title: blogForm.title,
        slug: blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        featuredImage: blogForm.featuredImage,
        excerpt: blogForm.excerpt,
        fullContent: blogForm.fullContent,
        author: {
          name: blogForm.authorName || 'PromptView Team',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        },
        category: blogForm.category,
        tags: tagsArray,
        status: blogForm.status,
        publishDate: blogForm.publishDate,
        readTimeMinutes: Number(blogForm.readTimeMinutes) || 5,
        isFeatured: blogForm.isFeatured,
      });
      showToast('নতুন ব্লগ সফলভাবে পাবলিশ হয়েছে!', 'success');
    }

    setBlogForm({
      title: '',
      featuredImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      excerpt: '',
      fullContent: '',
      authorName: 'PromptView Team',
      category: 'ChatGPT',
      tags: '',
      status: 'published',
      publishDate: new Date().toISOString().split('T')[0],
      readTimeMinutes: 5,
      isFeatured: false,
    });
    setActiveTab('blogs');
  };

  const handleEditBlog = (b: Blog) => {
    setEditingBlogId(b.id);
    setBlogForm({
      title: b.title,
      featuredImage: b.featuredImage,
      excerpt: b.excerpt,
      fullContent: b.fullContent,
      authorName: b.author.name,
      category: b.category,
      tags: b.tags.join(', '),
      status: b.status,
      publishDate: b.publishDate,
      readTimeMinutes: b.readTimeMinutes,
      isFeatured: Boolean(b.isFeatured),
    });
    setActiveTab('add_blog');
  };

  // Handle Save Category
  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.name) {
      showToast('Category name is required', 'error');
      return;
    }

    if (editingCategoryId) {
      dataStore.updateCategory(editingCategoryId, {
        name: categoryForm.name,
        slug: categoryForm.slug || categoryForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        iconName: categoryForm.iconName,
        description: categoryForm.description,
        color: categoryForm.color,
        isTrending: categoryForm.isTrending,
      });
      showToast('ক্যাটাগরি আপডেট করা হয়েছে!', 'success');
      setEditingCategoryId(null);
    } else {
      dataStore.addCategory({
        name: categoryForm.name,
        slug: categoryForm.slug || categoryForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        iconName: categoryForm.iconName,
        description: categoryForm.description,
        color: categoryForm.color,
        isTrending: categoryForm.isTrending,
      });
      showToast('নতুন ক্যাটাগরি তৈরি হয়েছে!', 'success');
    }

    setCategoryForm({
      name: '',
      slug: '',
      iconName: 'Sparkles',
      description: '',
      color: '#FF1E2D',
      isTrending: false,
    });
  };

  // Handle Save Tool
  const handleSaveTool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!toolForm.name || !toolForm.directUrl) {
      showToast('Tool name and URL are required', 'error');
      return;
    }

    const tagsArray = toolForm.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingToolId) {
      dataStore.updateTool(editingToolId, {
        name: toolForm.name,
        iconUrl: toolForm.iconUrl,
        shortDescription: toolForm.shortDescription,
        category: toolForm.category,
        directUrl: toolForm.directUrl,
        pricingType: toolForm.pricingType,
        rating: Number(toolForm.rating),
        featured: toolForm.featured,
        badge: toolForm.badge,
        tags: tagsArray,
      });
      showToast('টুল আপডেট করা হয়েছে!', 'success');
      setEditingToolId(null);
    } else {
      dataStore.addTool({
        name: toolForm.name,
        slug: toolForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        iconUrl: toolForm.iconUrl,
        shortDescription: toolForm.shortDescription,
        category: toolForm.category,
        directUrl: toolForm.directUrl,
        pricingType: toolForm.pricingType,
        rating: Number(toolForm.rating),
        featured: toolForm.featured,
        badge: toolForm.badge,
        tags: tagsArray,
      });
      showToast('নতুন AI টুল যোগ করা হয়েছে!', 'success');
    }

    setToolForm({
      name: '',
      iconUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
      shortDescription: '',
      category: 'Text to Image',
      directUrl: 'https://',
      pricingType: 'Freemium',
      rating: 4.8,
      featured: false,
      badge: 'Popular',
      tags: '',
    });
  };

  // Handle Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    dataStore.updateSettings(settingsForm);
    showToast('ওয়েবসাইট সেটিংস সফলভাবে আপডেট করা হয়েছে!', 'success');
  };

  // Export Subscribers as CSV
  const handleExportSubscribers = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,ID,Email,Subscribed Date\n' +
      subscribers.map((s) => `${s.id},${s.email},${s.subscribedAt}`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `promptview_subscribers_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Subscribers CSV ডাউনলোড শুরু হয়েছে!', 'success');
  };

  // Total metrics
  const totalCopies = prompts.reduce((sum, p) => sum + (p.copiesCount || 0), 0);
  const totalViews = prompts.reduce((sum, p) => sum + (p.viewsCount || 0), 0);
  const totalAdImpressions = ads.reduce((sum, a) => sum + (a.impressions || 0), 0);

  const filteredPrompts = prompts.filter(
    (p) =>
      p.title.toLowerCase().includes(promptSearch.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(promptSearch.toLowerCase()) ||
      p.aiModel.toLowerCase().includes(promptSearch.toLowerCase())
  );

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
      b.category.toLowerCase().includes(blogSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl border border-red-500/30 bg-gradient-to-r from-[#18080A] via-[#0E0E12] to-[#18080A] shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#E50914] text-white shadow-lg shadow-red-950">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white">PromptView Admin Panel</h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                AUTHORIZED SECURE
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Manage Prompts, Categories, Blogs, AI Tools, Advertisements & Platform Configurations in Real-Time.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onBackToHome}
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold border border-zinc-800 transition-colors"
          >
            Exit to Website
          </button>
        </div>
      </div>

      {/* Admin Layout: Left Tabs Sidebar + Right Main Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-2">
          <div className="rounded-2xl border border-zinc-800 bg-[#0E0E12] p-3 shadow-lg space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'overview'
                  ? 'bg-[#E50914] text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-[#14141A]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('prompts')}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'prompts'
                  ? 'bg-[#E50914] text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-[#14141A]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4" />
                <span>Prompts</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-zinc-300">
                {prompts.length}
              </span>
            </button>

            <button
              onClick={() => {
                setEditingPromptId(null);
                setActiveTab('add_prompt');
              }}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'add_prompt'
                  ? 'bg-[#E50914] text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-[#14141A]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <PlusCircle className="w-4 h-4 text-[#FF1E2D]" />
                <span>Add Prompt</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'categories'
                  ? 'bg-[#E50914] text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-[#14141A]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4" />
                <span>Categories</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-zinc-300">
                {categories.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('blogs')}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'blogs'
                  ? 'bg-[#E50914] text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-[#14141A]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4" />
                <span>Blogs & Guides</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-zinc-300">
                {blogs.length}
              </span>
            </button>

            <button
              onClick={() => {
                setEditingBlogId(null);
                setActiveTab('add_blog');
              }}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'add_blog'
                  ? 'bg-[#E50914] text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-[#14141A]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <PlusCircle className="w-4 h-4 text-emerald-400" />
                <span>Add Blog</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('tools')}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'tools'
                  ? 'bg-[#E50914] text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-[#14141A]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Wrench className="w-4 h-4" />
                <span>AI Tools</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-zinc-300">
                {tools.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('ads')}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'ads'
                  ? 'bg-[#E50914] text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-[#14141A]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Megaphone className="w-4 h-4" />
                <span>Advertisements</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-zinc-300">
                {ads.filter((a) => a.isActive).length} active
              </span>
            </button>

            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'users'
                  ? 'bg-[#E50914] text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-[#14141A]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4" />
                <span>Users & Subscribers</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-zinc-300">
                {subscribers.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'settings'
                  ? 'bg-[#E50914] text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-[#14141A]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Settings className="w-4 h-4" />
                <span>Site Settings</span>
              </div>
            </button>
          </div>

          {/* Seed Data Reset Action */}
          <div className="p-4 rounded-2xl border border-zinc-800/80 bg-[#0E0E12] space-y-2">
            <p className="text-[11px] text-zinc-400">
              Need to restore original demo content?
            </p>
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Reset all prompts, categories, and settings to original defaults?')) {
                  dataStore.resetToDefaultSeeds();
                  showToast('সকল ডেটা সফলভাবে রিসেট করা হয়েছে!', 'info');
                }
              }}
              className="w-full py-1.5 px-3 rounded-lg border border-red-500/30 bg-[#180A0C] hover:bg-red-950/60 text-xs font-semibold text-red-400 transition-colors flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Restore Default Seeds
            </button>
          </div>
        </div>

        {/* Tab Content Panel */}
        <div className="lg:col-span-9">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl border border-zinc-800 bg-[#0E0E12] space-y-1">
                  <span className="text-xs text-zinc-400 font-medium">Total Prompts</span>
                  <p className="text-2xl font-black text-white">{prompts.length}</p>
                  <span className="text-[10px] text-emerald-400 font-semibold">Live in library</span>
                </div>

                <div className="p-5 rounded-2xl border border-zinc-800 bg-[#0E0E12] space-y-1">
                  <span className="text-xs text-zinc-400 font-medium">Total Copies</span>
                  <p className="text-2xl font-black text-[#FF1E2D]">{totalCopies.toLocaleString()}</p>
                  <span className="text-[10px] text-zinc-500">User clipboard copies</span>
                </div>

                <div className="p-5 rounded-2xl border border-zinc-800 bg-[#0E0E12] space-y-1">
                  <span className="text-xs text-zinc-400 font-medium">Categories</span>
                  <p className="text-2xl font-black text-white">{categories.length}</p>
                  <span className="text-[10px] text-zinc-500">Active taxonomies</span>
                </div>

                <div className="p-5 rounded-2xl border border-zinc-800 bg-[#0E0E12] space-y-1">
                  <span className="text-xs text-zinc-400 font-medium">Subscribers</span>
                  <p className="text-2xl font-black text-white">{subscribers.length}</p>
                  <span className="text-[10px] text-emerald-400 font-semibold">Newsletter opt-ins</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-6 rounded-2xl border border-zinc-800 bg-[#0E0E12] space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Quick Management Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => {
                      setEditingPromptId(null);
                      setActiveTab('add_prompt');
                    }}
                    className="p-4 rounded-xl border border-red-500/40 bg-[#16080A] hover:bg-[#200A0D] text-left transition-all group"
                  >
                    <PlusCircle className="w-5 h-5 text-[#FF1E2D] mb-2 group-hover:scale-110 transition-transform" />
                    <h4 className="text-xs font-bold text-white">Publish New Prompt</h4>
                    <p className="text-[11px] text-zinc-400 mt-0.5">Add a new AI prompt to website</p>
                  </button>

                  <button
                    onClick={() => setActiveTab('categories')}
                    className="p-4 rounded-xl border border-zinc-800 bg-[#121216] hover:bg-[#181820] text-left transition-all group"
                  >
                    <Layers className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                    <h4 className="text-xs font-bold text-white">Manage Categories</h4>
                    <p className="text-[11px] text-zinc-400 mt-0.5">Add or edit prompt topics</p>
                  </button>

                  <button
                    onClick={() => setActiveTab('ads')}
                    className="p-4 rounded-xl border border-zinc-800 bg-[#121216] hover:bg-[#181820] text-left transition-all group"
                  >
                    <Megaphone className="w-5 h-5 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                    <h4 className="text-xs font-bold text-white">Configure Ads</h4>
                    <p className="text-[11px] text-zinc-400 mt-0.5">Update banners & sponsored slots</p>
                  </button>
                </div>
              </div>

              {/* Recent Prompts List */}
              <div className="p-6 rounded-2xl border border-zinc-800 bg-[#0E0E12] space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">Recently Published Prompts</h3>
                  <button
                    onClick={() => setActiveTab('prompts')}
                    className="text-xs text-[#FF1E2D] font-semibold hover:underline"
                  >
                    View All ({prompts.length})
                  </button>
                </div>

                <div className="divide-y divide-zinc-800/80">
                  {prompts.slice(0, 5).map((p) => (
                    <div key={p.id} className="py-3 flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] px-2 py-0.2 rounded bg-zinc-800 text-zinc-300 font-semibold">
                            {p.aiModel}
                          </span>
                          <span className="text-[10px] text-zinc-400">{p.categoryName}</span>
                          <span className={`text-[10px] px-1.5 rounded ${
                            p.status === 'published' ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'
                          }`}>
                            {p.status}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-white truncate">{p.title}</h4>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditPrompt(p)}
                          className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeletePrompt(p.id)}
                          className="p-1.5 rounded bg-red-950/60 hover:bg-red-900 text-red-300"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROMPTS TABLE */}
          {activeTab === 'prompts' && (
            <div className="rounded-2xl border border-zinc-800 bg-[#0E0E12] p-6 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-white">All Prompts ({prompts.length})</h3>
                  <p className="text-xs text-zinc-400">Search, filter, update or delete prompts</p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      value={promptSearch}
                      onChange={(e) => setPromptSearch(e.target.value)}
                      placeholder="Search prompts..."
                      className="w-full bg-[#14141A] border border-zinc-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50914]"
                    />
                  </div>

                  <button
                    onClick={() => {
                      setEditingPromptId(null);
                      setActiveTab('add_prompt');
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-[#E50914] hover:bg-[#FF1E2D] text-white text-xs font-bold transition-all shrink-0 flex items-center gap-1 shadow-md shadow-red-950"
                  >
                    <PlusCircle className="w-3.5 h-3.5" /> Add Prompt
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-zinc-300 border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 bg-[#121216] text-zinc-400 uppercase font-semibold text-[10px]">
                      <th className="p-3">Title</th>
                      <th className="p-3">Model</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Copies</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {filteredPrompts.map((p) => (
                      <tr key={p.id} className="hover:bg-[#14141A] transition-colors">
                        <td className="p-3 font-medium text-white max-w-xs truncate">
                          {p.title}
                          {p.isFeatured && (
                            <span className="ml-2 text-[9px] px-1.5 py-0.2 bg-[#E50914] text-white rounded font-bold">
                              HOT
                            </span>
                          )}
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-200">
                            {p.aiModel}
                          </span>
                        </td>
                        <td className="p-3 text-zinc-400">{p.categoryName}</td>
                        <td className="p-3">
                          <button
                            onClick={() => {
                              const newStatus = p.status === 'published' ? 'draft' : 'published';
                              dataStore.updatePrompt(p.id, { status: newStatus });
                              showToast(`Status changed to ${newStatus}`, 'info');
                            }}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              p.status === 'published'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                                : 'bg-amber-950 text-amber-400 border border-amber-800/40'
                            }`}
                          >
                            {p.status}
                          </button>
                        </td>
                        <td className="p-3 font-mono text-[#FF1E2D] font-semibold">{p.copiesCount || 0}</td>
                        <td className="p-3 text-right space-x-1.5">
                          <button
                            onClick={() => handleEditPrompt(p)}
                            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                            title="Edit"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeletePrompt(p.id)}
                            className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ADD / EDIT PROMPT FORM */}
          {activeTab === 'add_prompt' && (
            <div className="rounded-2xl border border-zinc-800 bg-[#0E0E12] p-6 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {editingPromptId ? 'Edit Prompt' : 'Publish New AI Prompt'}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Fill in all fields. Changes immediately appear across the entire website.
                  </p>
                </div>
                {editingPromptId && (
                  <button
                    onClick={() => {
                      setEditingPromptId(null);
                      setActiveTab('prompts');
                    }}
                    className="text-xs text-zinc-400 hover:text-white"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              <form onSubmit={handleSavePrompt} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Prompt Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={promptForm.title}
                    onChange={(e) => setPromptForm({ ...promptForm, title: e.target.value })}
                    placeholder="e.g., Ultra-Detailed Midjourney Dhaka 2077 Cyberpunk"
                    className="w-full bg-[#14141A] border border-zinc-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                {/* Model & Category & Difficulty */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                      AI Model *
                    </label>
                    <select
                      value={promptForm.aiModel}
                      onChange={(e) => setPromptForm({ ...promptForm, aiModel: e.target.value })}
                      className="w-full bg-[#14141A] border border-zinc-700 rounded-xl px-3 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-[#E50914]"
                    >
                      <option value="ChatGPT">ChatGPT (OpenAI)</option>
                      <option value="Google Gemini">Google Gemini 2.5</option>
                      <option value="Claude">Claude 3.5 Sonnet</option>
                      <option value="Midjourney">Midjourney v6</option>
                      <option value="Stable Diffusion">Stable Diffusion XL</option>
                      <option value="Flux.1">Flux.1</option>
                      <option value="Runway Gen-3">Runway Gen-3</option>
                      <option value="AI Coding">AI Coding</option>
                      <option value="Other AI Tools">Other AI Tools</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                      Category *
                    </label>
                    <select
                      value={promptForm.categoryId}
                      onChange={(e) => {
                        const cat = categories.find((c) => c.id === e.target.value);
                        setPromptForm({
                          ...promptForm,
                          categoryId: e.target.value,
                          categoryName: cat?.name || '',
                        });
                      }}
                      className="w-full bg-[#14141A] border border-zinc-700 rounded-xl px-3 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-[#E50914]"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                      Difficulty Level
                    </label>
                    <select
                      value={promptForm.difficulty}
                      onChange={(e) => setPromptForm({ ...promptForm, difficulty: e.target.value as any })}
                      className="w-full bg-[#14141A] border border-zinc-700 rounded-xl px-3 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-[#E50914]"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                {/* Short Description */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Short Description (Summary)
                  </label>
                  <input
                    type="text"
                    value={promptForm.shortDescription}
                    onChange={(e) => setPromptForm({ ...promptForm, shortDescription: e.target.value })}
                    placeholder="Brief explanation of what this prompt produces and its primary benefits..."
                    className="w-full bg-[#14141A] border border-zinc-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                {/* Full Prompt */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Full Prompt Content *
                  </label>
                  <textarea
                    rows={6}
                    required
                    value={promptForm.fullPrompt}
                    onChange={(e) => setPromptForm({ ...promptForm, fullPrompt: e.target.value })}
                    placeholder="Paste the complete prompt with instructions, parameters, or rules..."
                    className="w-full bg-[#08080C] border border-zinc-700 rounded-xl p-4 font-mono text-xs sm:text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                {/* Tags & Featured Image */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                      Tags (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={promptForm.tags}
                      onChange={(e) => setPromptForm({ ...promptForm, tags: e.target.value })}
                      placeholder="e.g., Cyberpunk, Midjourney, Bangla, Marketing"
                      className="w-full bg-[#14141A] border border-zinc-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E50914]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                      Featured Image URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={promptForm.featuredImage}
                      onChange={(e) => setPromptForm({ ...promptForm, featuredImage: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-[#14141A] border border-zinc-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E50914]"
                    />
                  </div>
                </div>

                {/* Status & Featured Checkbox */}
                <div className="flex flex-wrap items-center gap-6 p-4 rounded-xl bg-[#14141A] border border-zinc-800">
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-bold text-zinc-300">Status:</label>
                    <select
                      value={promptForm.status}
                      onChange={(e) => setPromptForm({ ...promptForm, status: e.target.value as any })}
                      className="bg-black border border-zinc-700 rounded-lg px-2.5 py-1 text-xs text-white"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft (Hidden)</option>
                    </select>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={promptForm.isFeatured}
                      onChange={(e) => setPromptForm({ ...promptForm, isFeatured: e.target.checked })}
                      className="w-4 h-4 accent-[#E50914] rounded"
                    />
                    <span className="text-xs font-bold text-white flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-[#FF1E2D]" /> Feature on Homepage
                    </span>
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setActiveTab('prompts')}
                    className="px-4 py-2 rounded-xl bg-zinc-900 text-xs font-semibold text-zinc-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#E50914] hover:bg-[#FF1E2D] text-white text-xs sm:text-sm font-bold shadow-lg shadow-red-950 flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingPromptId ? 'Update Prompt' : 'Publish Prompt'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 4: CATEGORIES MANAGER */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              {/* Add / Edit Category Box */}
              <div className="rounded-2xl border border-zinc-800 bg-[#0E0E12] p-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  {editingCategoryId ? 'Edit Category' : 'Create New Category'}
                </h3>
                
                <form onSubmit={handleSaveCategory} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Category Name *</label>
                    <input
                      type="text"
                      required
                      value={categoryForm.name}
                      onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                      placeholder="e.g., DeepSeek Prompts"
                      className="w-full bg-[#14141A] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E50914]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Color (Hex)</label>
                    <input
                      type="text"
                      value={categoryForm.color}
                      onChange={(e) => setCategoryForm({ ...categoryForm, color: e.target.value })}
                      placeholder="#FF1E2D"
                      className="w-full bg-[#14141A] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E50914]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Icon Name</label>
                    <select
                      value={categoryForm.iconName}
                      onChange={(e) => setCategoryForm({ ...categoryForm, iconName: e.target.value })}
                      className="w-full bg-[#14141A] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E50914]"
                    >
                      <option value="Sparkles">Sparkles</option>
                      <option value="Bot">Bot / AI</option>
                      <option value="Image">Image</option>
                      <option value="Code">Code</option>
                      <option value="Search">Search</option>
                      <option value="TrendingUp">Trending Up</option>
                      <option value="Video">Video</option>
                      <option value="Zap">Zap</option>
                    </select>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Description</label>
                    <input
                      type="text"
                      value={categoryForm.description}
                      onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                      placeholder="Short summary for this category..."
                      className="w-full bg-[#14141A] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E50914]"
                    />
                  </div>

                  <div className="sm:col-span-3 flex items-center justify-between pt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={categoryForm.isTrending}
                        onChange={(e) => setCategoryForm({ ...categoryForm, isTrending: e.target.checked })}
                        className="w-4 h-4 accent-[#E50914] rounded"
                      />
                      <span className="text-xs text-zinc-300">Show in Trending sidebar</span>
                    </label>

                    <div className="flex gap-2">
                      {editingCategoryId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCategoryId(null);
                            setCategoryForm({ name: '', slug: '', iconName: 'Sparkles', description: '', color: '#FF1E2D', isTrending: false });
                          }}
                          className="px-3 py-1.5 rounded-lg bg-zinc-800 text-xs text-zinc-400"
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-xl bg-[#E50914] hover:bg-[#FF1E2D] text-white text-xs font-bold transition-all shadow-md"
                      >
                        {editingCategoryId ? 'Update Category' : 'Add Category'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Categories Table */}
              <div className="rounded-2xl border border-zinc-800 bg-[#0E0E12] p-6 space-y-4">
                <h3 className="text-sm font-bold text-white">Live Categories ({categories.length})</h3>
                <div className="divide-y divide-zinc-800/60">
                  {categories.map((cat) => (
                    <div key={cat.id} className="py-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: cat.color || '#FF1E2D' }} 
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-white">{cat.name}</h4>
                            <span className="text-[10px] px-1.5 rounded bg-zinc-800 text-zinc-400">
                              {cat.count} Prompts
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-500">{cat.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingCategoryId(cat.id);
                            setCategoryForm({
                              name: cat.name,
                              slug: cat.slug,
                              iconName: cat.iconName,
                              description: cat.description,
                              color: cat.color || '#FF1E2D',
                              isTrending: Boolean(cat.isTrending),
                            });
                          }}
                          className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete category "${cat.name}"?`)) {
                              dataStore.deleteCategory(cat.id);
                              showToast('ক্যাটাগরি মুছে ফেলা হয়েছে', 'info');
                            }
                          }}
                          className="p-1.5 rounded bg-red-950/60 hover:bg-red-900 text-red-300"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: BLOGS */}
          {activeTab === 'blogs' && (
            <div className="rounded-2xl border border-zinc-800 bg-[#0E0E12] p-6 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-white">All Blog Posts ({blogs.length})</h3>
                  <p className="text-xs text-zinc-400">Publish guides, tutorials and prompt engineering tips</p>
                </div>

                <button
                  onClick={() => {
                    setEditingBlogId(null);
                    setActiveTab('add_blog');
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-[#E50914] hover:bg-[#FF1E2D] text-white text-xs font-bold transition-all flex items-center gap-1 shadow-md shadow-red-950"
                >
                  <PlusCircle className="w-3.5 h-3.5" /> Add New Blog
                </button>
              </div>

              <div className="divide-y divide-zinc-800/80">
                {blogs.map((b) => (
                  <div key={b.id} className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={b.featuredImage}
                        alt={b.title}
                        className="w-14 h-14 rounded-xl object-cover border border-zinc-800 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] px-2 py-0.2 rounded bg-zinc-800 text-[#FF1E2D] font-semibold">
                            {b.category}
                          </span>
                          <span className="text-[10px] text-zinc-500">{b.publishDate}</span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-white truncate">{b.title}</h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleEditBlog(b)}
                        className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                        title="Edit"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Delete this blog post?')) {
                            dataStore.deleteBlog(b.id);
                            showToast('ব্লগ পোস্ট মুছে ফেলা হয়েছে', 'info');
                          }
                        }}
                        className="p-1.5 rounded bg-red-950/60 hover:bg-red-900 text-red-300"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: ADD / EDIT BLOG FORM */}
          {activeTab === 'add_blog' && (
            <div className="rounded-2xl border border-zinc-800 bg-[#0E0E12] p-6 space-y-6">
              <h3 className="text-lg font-bold text-white">
                {editingBlogId ? 'Edit Blog Post' : 'Create New Blog Post'}
              </h3>

              <form onSubmit={handleSaveBlog} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Blog Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    placeholder="e.g., Midjourney v6 Master Guide"
                    className="w-full bg-[#14141A] border border-zinc-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                      Category
                    </label>
                    <input
                      type="text"
                      value={blogForm.category}
                      onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                      placeholder="e.g., Image Generation"
                      className="w-full bg-[#14141A] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                      Read Time (Minutes)
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={blogForm.readTimeMinutes}
                      onChange={(e) => setBlogForm({ ...blogForm, readTimeMinutes: parseInt(e.target.value) || 5 })}
                      className="w-full bg-[#14141A] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                      Author Name
                    </label>
                    <input
                      type="text"
                      value={blogForm.authorName}
                      onChange={(e) => setBlogForm({ ...blogForm, authorName: e.target.value })}
                      className="w-full bg-[#14141A] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Featured Image URL
                  </label>
                  <input
                    type="url"
                    value={blogForm.featuredImage}
                    onChange={(e) => setBlogForm({ ...blogForm, featuredImage: e.target.value })}
                    className="w-full bg-[#14141A] border border-zinc-700 rounded-xl px-4 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Short Excerpt / Teaser
                  </label>
                  <textarea
                    rows={2}
                    value={blogForm.excerpt}
                    onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                    className="w-full bg-[#14141A] border border-zinc-700 rounded-xl p-3 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Full Content (Markdown Supported) *
                  </label>
                  <textarea
                    rows={8}
                    required
                    value={blogForm.fullContent}
                    onChange={(e) => setBlogForm({ ...blogForm, fullContent: e.target.value })}
                    placeholder="Write article in Markdown. Use ## for headings, - for lists..."
                    className="w-full bg-[#08080C] border border-zinc-700 rounded-xl p-4 font-mono text-xs text-zinc-100"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setActiveTab('blogs')}
                    className="px-4 py-2 rounded-xl bg-zinc-900 text-xs text-zinc-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-[#E50914] text-white text-xs font-bold shadow-md"
                  >
                    Save Blog Post
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 7: AI TOOLS */}
          {activeTab === 'tools' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-zinc-800 bg-[#0E0E12] p-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  {editingToolId ? 'Edit AI Tool' : 'Add New AI Tool to Toolkit'}
                </h3>

                <form onSubmit={handleSaveTool} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Tool Name *</label>
                    <input
                      type="text"
                      required
                      value={toolForm.name}
                      onChange={(e) => setToolForm({ ...toolForm, name: e.target.value })}
                      placeholder="e.g., Midjourney v6"
                      className="w-full bg-[#14141A] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Category</label>
                    <input
                      type="text"
                      value={toolForm.category}
                      onChange={(e) => setToolForm({ ...toolForm, category: e.target.value })}
                      placeholder="Text to Image"
                      className="w-full bg-[#14141A] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Pricing Model</label>
                    <select
                      value={toolForm.pricingType}
                      onChange={(e) => setToolForm({ ...toolForm, pricingType: e.target.value as any })}
                      className="w-full bg-[#14141A] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                    >
                      <option value="Freemium">Freemium</option>
                      <option value="Free">Free</option>
                      <option value="Paid">Paid</option>
                      <option value="Open Source">Open Source</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Direct Website URL *</label>
                    <input
                      type="url"
                      required
                      value={toolForm.directUrl}
                      onChange={(e) => setToolForm({ ...toolForm, directUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full bg-[#14141A] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Badge</label>
                    <input
                      type="text"
                      value={toolForm.badge}
                      onChange={(e) => setToolForm({ ...toolForm, badge: e.target.value })}
                      placeholder="Popular / Hot"
                      className="w-full bg-[#14141A] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">Short Description</label>
                    <input
                      type="text"
                      value={toolForm.shortDescription}
                      onChange={(e) => setToolForm({ ...toolForm, shortDescription: e.target.value })}
                      placeholder="What this tool does..."
                      className="w-full bg-[#14141A] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="sm:col-span-3 flex justify-end gap-2 pt-2">
                    {editingToolId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingToolId(null);
                          setToolForm({ name: '', iconUrl: '', shortDescription: '', category: 'Text to Image', directUrl: 'https://', pricingType: 'Freemium', rating: 4.8, featured: false, badge: 'Popular', tags: '' });
                        }}
                        className="px-3 py-1.5 rounded-lg bg-zinc-800 text-xs text-zinc-400"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-[#E50914] text-white text-xs font-bold"
                    >
                      {editingToolId ? 'Update Tool' : 'Add Tool'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Tools List */}
              <div className="rounded-2xl border border-zinc-800 bg-[#0E0E12] p-6 space-y-4">
                <h3 className="text-sm font-bold text-white">Toolkit Directory ({tools.length})</h3>
                <div className="divide-y divide-zinc-800/60">
                  {tools.map((t) => (
                    <div key={t.id} className="py-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={t.iconUrl}
                          alt={t.name}
                          className="w-10 h-10 rounded-xl object-cover border border-zinc-800"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-white">{t.name}</h4>
                          <p className="text-[11px] text-zinc-400">{t.category} • {t.pricingType}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingToolId(t.id);
                            setToolForm({
                              name: t.name,
                              iconUrl: t.iconUrl,
                              shortDescription: t.shortDescription,
                              category: t.category,
                              directUrl: t.directUrl,
                              pricingType: t.pricingType,
                              rating: t.rating,
                              featured: Boolean(t.featured),
                              badge: t.badge || '',
                              tags: t.tags?.join(', ') || '',
                            });
                          }}
                          className="p-1.5 rounded bg-zinc-800 text-zinc-300"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete tool ${t.name}?`)) {
                              dataStore.deleteTool(t.id);
                              showToast('টুল মুছে ফেলা হয়েছে', 'info');
                            }
                          }}
                          className="p-1.5 rounded bg-red-950/60 text-red-300"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: ADVERTISEMENTS */}
          {activeTab === 'ads' && (
            <div className="rounded-2xl border border-zinc-800 bg-[#0E0E12] p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Dynamic Advertisement Slots</h3>
                <p className="text-xs text-zinc-400">
                  Enable/disable or update images and links for Top Banner, Sidebar, and In-Feed partner slots.
                </p>
              </div>

              <div className="space-y-4">
                {ads.map((ad) => (
                  <div
                    key={ad.id}
                    className="p-4 rounded-2xl border border-zinc-800/80 bg-[#121216] space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white uppercase tracking-wider">
                          Position: <span className="text-[#FF1E2D]">{ad.position}</span>
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                          {ad.clicks} Clicks
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          const newActive = !ad.isActive;
                          dataStore.updateAd(ad.id, { isActive: newActive });
                          showToast(`Ad slot "${ad.position}" ${newActive ? 'Enabled' : 'Disabled'}`, 'info');
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          ad.isActive
                            ? 'bg-emerald-500 text-black'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        {ad.isActive ? 'Active (Live)' : 'Disabled'}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-zinc-800/60 text-xs">
                      <div>
                        <label className="block text-[11px] text-zinc-400 mb-1">Ad Title</label>
                        <input
                          type="text"
                          value={ad.title}
                          onChange={(e) => dataStore.updateAd(ad.id, { title: e.target.value })}
                          className="w-full bg-[#181820] border border-zinc-700 rounded-lg px-3 py-1.5 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-zinc-400 mb-1">Target Link URL</label>
                        <input
                          type="url"
                          value={ad.targetUrl}
                          onChange={(e) => dataStore.updateAd(ad.id, { targetUrl: e.target.value })}
                          className="w-full bg-[#181820] border border-zinc-700 rounded-lg px-3 py-1.5 text-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] text-zinc-400 mb-1">Image Banner URL</label>
                        <input
                          type="url"
                          value={ad.imageUrl}
                          onChange={(e) => dataStore.updateAd(ad.id, { imageUrl: e.target.value })}
                          placeholder="https://..."
                          className="w-full bg-[#181820] border border-zinc-700 rounded-lg px-3 py-1.5 text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: USERS & SUBSCRIBERS */}
          {activeTab === 'users' && (
            <div className="rounded-2xl border border-zinc-800 bg-[#0E0E12] p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Newsletter Subscribers ({subscribers.length})</h3>
                  <p className="text-xs text-zinc-400">Export emails or view user subscriptions</p>
                </div>

                <button
                  onClick={handleExportSubscribers}
                  className="px-4 py-2 rounded-xl bg-[#E50914] hover:bg-[#FF1E2D] text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
                >
                  <Download className="w-3.5 h-3.5" /> Export CSV
                </button>
              </div>

              <div className="divide-y divide-zinc-800/60">
                {subscribers.map((s) => (
                  <div key={s.id} className="py-2.5 flex items-center justify-between text-xs">
                    <span className="text-white font-medium">{s.email}</span>
                    <span className="text-zinc-500 font-mono">{s.subscribedAt}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: SITE SETTINGS */}
          {activeTab === 'settings' && (
            <div className="rounded-2xl border border-zinc-800 bg-[#0E0E12] p-6 space-y-6">
              <h3 className="text-lg font-bold text-white">Global Site Configuration</h3>

              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                      Website Name
                    </label>
                    <input
                      type="text"
                      value={settingsForm.siteName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, siteName: e.target.value })}
                      className="w-full bg-[#14141A] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={settingsForm.contactEmail}
                      onChange={(e) => setSettingsForm({ ...settingsForm, contactEmail: e.target.value })}
                      className="w-full bg-[#14141A] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Bengali Hero Headline
                  </label>
                  <input
                    type="text"
                    value={settingsForm.heroHeadlineBn}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroHeadlineBn: e.target.value })}
                    className="w-full bg-[#14141A] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Bengali Hero Subheading
                  </label>
                  <textarea
                    rows={2}
                    value={settingsForm.heroSubheadingBn}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroSubheadingBn: e.target.value })}
                    className="w-full bg-[#14141A] border border-zinc-700 rounded-xl p-3 text-xs text-white"
                  />
                </div>

                <div className="flex items-center gap-6 p-4 rounded-xl bg-[#14141A] border border-zinc-800">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settingsForm.enableAds}
                      onChange={(e) => setSettingsForm({ ...settingsForm, enableAds: e.target.checked })}
                      className="w-4 h-4 accent-[#E50914] rounded"
                    />
                    <span className="text-xs text-white font-semibold">Enable Advertisements</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settingsForm.enableNewsletter}
                      onChange={(e) => setSettingsForm({ ...settingsForm, enableNewsletter: e.target.checked })}
                      className="w-4 h-4 accent-[#E50914] rounded"
                    />
                    <span className="text-xs text-white font-semibold">Enable Newsletter Box</span>
                  </label>
                </div>

                <div className="flex justify-end pt-3">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#E50914] hover:bg-[#FF1E2D] text-white text-xs font-bold shadow-lg shadow-red-950"
                  >
                    Save Settings
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
