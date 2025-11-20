'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  ShieldCheck, AlertTriangle, FileText, Bot, ArrowRight, Loader2,
  CheckCircle, AlertCircle, Info, UploadCloud, X, Clipboard,
  LayoutDashboard, BookOpen, Zap, ChevronRight, Database, Server,
  Copy, Check
} from 'lucide-react';

// Utility for cleaner tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Home() {
  const [currentView, setCurrentView] = useState<'home' | 'guide' | 'agent' | 'docs'>('home');

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-purple-950 to-black text-white font-sans selection:bg-indigo-500/30">

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setCurrentView('home')}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <ShieldCheck className="w-8 h-8 relative z-10 text-indigo-400" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              Sirion Revenue Guardian
            </span>
          </div>

          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10">
            {[
              { id: 'home', label: 'Home', icon: LayoutDashboard },
              { id: 'agent', label: 'Agent', icon: Zap },
              { id: 'docs', label: 'Docs', icon: BookOpen },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentView(tab.id as any)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-300",
                  (currentView === tab.id || (tab.id === 'agent' && currentView === 'guide'))
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-20 min-h-screen flex flex-col">
        <AnimatePresence mode="wait">
          {currentView === 'home' && <HomeView key="home" onLaunch={() => setCurrentView('guide')} />}
          {currentView === 'guide' && <GuideView key="guide" onStart={() => setCurrentView('agent')} />}
          {currentView === 'agent' && <AgentView key="agent" />}
          {currentView === 'docs' && <DocsView key="docs" />}
        </AnimatePresence>
      </main>
    </div>
  );
}

// --- VIEW COMPONENTS ---

function HomeView({ onLaunch }: { onLaunch: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex items-center justify-center p-6 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Agentic AI v1.0 Live
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight mb-6">
              Stop Revenue <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Leakage
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-xl leading-relaxed">
              The autonomous AI agent for the modern General Counsel.
              Scan contracts against your Master Agreements instantly to detect
              hidden risks and conflicting terms.
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={onLaunch}
            className="group relative px-8 py-4 bg-white text-indigo-950 rounded-full font-bold text-lg flex items-center gap-3 hover:scale-105 transition-transform shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
          >
            Launch Agent
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 rounded-full ring-2 ring-white/20 group-hover:ring-white/40 transition-all" />
          </motion.button>
        </div>

        {/* 3D Card Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative hidden lg:block perspective-1000"
        >
          <div className="relative w-full aspect-[4/5] max-w-md mx-auto">
            {/* Floating Cards */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-2xl"
            >
              <div className="h-4 w-1/3 bg-white/20 rounded mb-8" />
              <div className="space-y-4">
                <div className="h-2 w-full bg-white/10 rounded" />
                <div className="h-2 w-5/6 bg-white/10 rounded" />
                <div className="h-2 w-4/6 bg-white/10 rounded" />
              </div>

              {/* Scanning Line */}
              <motion.div
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-px bg-indigo-400 shadow-[0_0_20px_2px_rgba(129,140,248,0.5)]"
              />

              {/* Popups */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="absolute -right-12 top-20 bg-red-500/90 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-white" />
                  <div>
                    <div className="text-xs text-white/80 font-medium">Conflict Detected</div>
                    <div className="text-sm font-bold text-white">Liability Cap Mismatch</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 }}
                className="absolute -left-8 bottom-20 bg-green-500/90 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <div>
                    <div className="text-xs text-white/80 font-medium">Clause Verified</div>
                    <div className="text-sm font-bold text-white">Payment Terms Aligned</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function GuideView({ onStart }: { onStart: () => void }) {
  const [copied, setCopied] = useState(false);
  const mockText = "SERVICE ORDER - ACME CORP RENEWAL\\nCounterparty: Acme Corp\\nLiability: Notwithstanding the Master Agreement, the Provider’s total liability is hereby increased to $5,000,000.\\nRenewal: This Order shall automatically renew for subsequent 5-year terms unless cancelled with 180 days’ notice.\\nGoverning Law: Laws of France.";

  const handleCopy = () => {
    navigator.clipboard.writeText(mockText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto p-6 flex flex-col items-center justify-center min-h-[calc(100vh-100px)]"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Before you start...</h2>
        <p className="text-slate-400 text-lg">Understanding how the Revenue Guardian protects your business.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mb-12">

        {/* Card 1: Why Use This Agent? */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
          <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4">
            <ShieldCheck className="w-6 h-6 text-indigo-400" />
          </div>
          <h3 className="text-xl font-bold mb-3">Why Use This Agent?</h3>
          <p className="text-slate-300 leading-relaxed">
            Prevent revenue leakage by catching hidden liability shifts and unauthorized term changes in seconds, not hours.
          </p>
        </div>

        {/* Card 2: How It Works */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
          <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
            <Bot className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-xl font-bold mb-3">How It Works</h3>
          <ul className="space-y-2 text-slate-300">
            <li className="flex gap-2"><span className="text-purple-400 font-bold">1.</span> Upload a Draft PDF.</li>
            <li className="flex gap-2"><span className="text-purple-400 font-bold">2.</span> Agent identifies the counterparty.</li>
            <li className="flex gap-2"><span className="text-purple-400 font-bold">3.</span> Agent retrieves Master Agreement.</li>
            <li className="flex gap-2"><span className="text-purple-400 font-bold">4.</span> Agent finds conflicts.</li>
          </ul>
        </div>

        {/* Card 3: The Database */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
          <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
            <Database className="w-6 h-6 text-green-400" />
          </div>
          <h3 className="text-xl font-bold mb-3">The Database (Memory)</h3>
          <p className="text-slate-300 leading-relaxed">
            Connected to a live Supabase Vector DB containing "Ground Truth" Master Agreements for companies like Acme Corp, Globex, and Soylent Corp.
          </p>
        </div>

        {/* Card 4: Mock Prompts */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors relative group">
          <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-amber-400" />
          </div>
          <h3 className="text-xl font-bold mb-3">Mock Prompts (Try It)</h3>
          <p className="text-slate-300 mb-4">Don't have a contract? Copy this text to test the conflict detector:</p>

          <div className="bg-black/30 p-4 rounded-lg border border-white/10 font-mono text-sm text-slate-300 relative">
            "{mockText}"
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 p-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors text-white"
              title="Copy to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full font-bold text-xl text-white shadow-2xl shadow-indigo-500/30 flex items-center gap-3"
      >
        Start Analysis <ArrowRight className="w-6 h-6" />
      </motion.button>

    </motion.div>
  );
}

function AgentView() {
  const [activeTab, setActiveTab] = useState<'text' | 'pdf'>('text');
  const [contractText, setContractText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      setResult(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const clearFile = () => {
    setSelectedFile(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = async () => {
    if (activeTab === 'text' && !contractText.trim()) return;
    if (activeTab === 'pdf' && !selectedFile) return;

    setIsAnalyzing(true);
    setResult(null);

    try {
      let response;

      if (activeTab === 'pdf' && selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        response = await fetch('/api/analyze', {
          method: 'POST',
          body: formData,
        });
      } else {
        response = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contractText }),
        });
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Analysis failed', error);
      setResult({ summary: 'Error: Failed to analyze contract.', clause_analysis: [] });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getStatusStyles = (status: string) => {
    const normalizedStatus = status?.toLowerCase() || '';
    if (normalizedStatus.includes('conflict')) {
      return {
        container: 'bg-red-500/10 border-red-500/30',
        badge: 'bg-red-500/20 text-red-200 border-red-500/30',
        icon: <AlertTriangle className="w-4 h-4" />
      };
    }
    if (normalizedStatus.includes('variation')) {
      return {
        container: 'bg-amber-500/10 border-amber-500/30',
        badge: 'bg-amber-500/20 text-amber-200 border-amber-500/30',
        icon: <AlertCircle className="w-4 h-4" />
      };
    }
    return {
      container: 'bg-green-500/10 border-green-500/30',
      badge: 'bg-green-500/20 text-green-200 border-green-500/30',
      icon: <CheckCircle className="w-4 h-4" />
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto p-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-100px)]"
    >
      {/* LEFT COLUMN: Input */}
      <div className="flex flex-col gap-4 h-full">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex-1 flex flex-col overflow-hidden shadow-2xl">

          {/* Tab Switcher */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setActiveTab('text')}
              className={cn(
                "flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors",
                activeTab === 'text'
                  ? "text-indigo-400 border-b-2 border-indigo-400 bg-white/5"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <Clipboard className="w-4 h-4" /> Paste Text
            </button>
            <button
              onClick={() => setActiveTab('pdf')}
              className={cn(
                "flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors",
                activeTab === 'pdf'
                  ? "text-indigo-400 border-b-2 border-indigo-400 bg-white/5"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <UploadCloud className="w-4 h-4" /> Upload PDF
            </button>
          </div>

          <div className="flex-1 p-6 flex flex-col min-h-0">
            <div className="flex items-center gap-2 mb-4 text-indigo-400">
              <FileText className="w-5 h-5" />
              <h2 className="font-semibold text-lg">New Contract Draft</h2>
            </div>

            {activeTab === 'text' ? (
              <textarea
                className="flex-1 w-full p-4 rounded-xl bg-black/20 border border-white/10 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none font-mono text-sm leading-relaxed text-slate-300 placeholder:text-slate-600"
                placeholder="Paste the contract text here..."
                value={contractText}
                onChange={(e) => setContractText(e.target.value)}
              />
            ) : (
              !selectedFile ? (
                <div
                  className="flex-1 border-2 border-dashed border-white/10 rounded-xl bg-white/5 flex flex-col items-center justify-center p-8 text-center hover:bg-white/10 hover:border-indigo-500/50 transition-all cursor-pointer group"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="bg-white/10 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-8 h-8 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Upload Contract PDF</h3>
                  <p className="text-slate-400 text-sm mb-6">Drag & drop your PDF here, or click to browse</p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept=".pdf"
                    className="hidden"
                  />
                  <button className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors">
                    Select File
                  </button>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-8 border border-white/10 rounded-xl bg-indigo-500/10">
                  <FileText className="w-16 h-16 text-indigo-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">{selectedFile.name}</h3>
                  <p className="text-slate-400 text-sm mb-6">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  <button
                    onClick={clearFile}
                    className="text-red-400 hover:text-red-300 text-sm font-medium flex items-center gap-1 hover:underline"
                  >
                    <X className="w-4 h-4" /> Remove File
                  </button>
                </div>
              )
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || (activeTab === 'text' ? !contractText : !selectedFile)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze Contract <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Analysis */}
      <div className="flex flex-col h-full">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex-1 overflow-y-auto shadow-2xl p-6">
          <div className="flex items-center gap-2 mb-6 text-indigo-400">
            <Bot className="w-6 h-6" />
            <h2 className="font-semibold text-lg">Agent Analysis</h2>
          </div>

          {!result && !isAnalyzing && (
            <div className="h-64 flex flex-col items-center justify-center text-slate-500 text-center">
              <ShieldCheck className="w-20 h-20 mb-6 opacity-20" />
              <p className="text-lg">Ready to scan. {activeTab === 'text' ? 'Paste text' : 'Upload a PDF'} to begin.</p>
            </div>
          )}

          {isAnalyzing && (
            <div className="flex flex-col items-center justify-center h-64 space-y-6 animate-pulse">
              <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
              <p className="text-indigo-400 font-medium text-lg">Agent is scanning existing agreements...</p>
            </div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Executive Summary */}
              <div className="bg-indigo-500/10 p-6 rounded-xl border border-indigo-500/20">
                <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Info className="w-4 h-4" /> Executive Summary
                </h3>
                <p className="text-indigo-100 leading-relaxed text-lg">{result.summary}</p>
              </div>

              {/* Detailed Clause Analysis */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Detailed Clause Analysis</h3>

                {result.clause_analysis && result.clause_analysis.length > 0 ? (
                  <div className="space-y-4">
                    {result.clause_analysis.map((clause: any, idx: number) => {
                      const styles = getStatusStyles(clause.status);
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className={`border rounded-xl overflow-hidden ${styles.container}`}
                        >
                          {/* Card Header */}
                          <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
                            <h4 className="font-bold text-white text-lg">{clause.clause_name}</h4>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 uppercase tracking-wide ${styles.badge}`}>
                              {styles.icon}
                              {clause.status}
                            </span>
                          </div>

                          {/* Card Body */}
                          <div className="p-4 space-y-4">
                            {/* Risk Analysis */}
                            <div>
                              <span className="block text-xs font-bold text-slate-500 uppercase mb-1">Analysis</span>
                              <p className="text-slate-300 leading-relaxed">{clause.risk_analysis}</p>
                            </div>

                            {/* Comparison */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                              <div className="p-3 bg-black/20 rounded-lg border border-white/5">
                                <span className="block text-xs font-bold text-slate-500 uppercase mb-1">Existing Master Agreement</span>
                                <p className="text-slate-400 text-sm font-mono">{clause.old_term || "N/A"}</p>
                              </div>
                              <div className="p-3 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                                <span className="block text-xs font-bold text-indigo-300 uppercase mb-1">New Draft</span>
                                <p className="text-indigo-100 text-sm font-mono">{clause.new_term}</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-slate-400 font-mono text-xs break-all">
                    <p className="font-bold text-red-400 mb-2">No detailed clauses returned.</p>
                    Raw Result: {JSON.stringify(result, null, 2)}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function DocsView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto p-8"
    >
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl space-y-12">

        <section>
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-indigo-400" /> How to Use
          </h2>
          <div className="grid gap-6">
            {[
              { title: "Upload or Paste", desc: "Upload a PDF contract or paste the text directly into the agent interface." },
              { title: "AI Analysis", desc: "The agent identifies the counterparty and retrieves the relevant Master Agreement from the database." },
              { title: "Review Conflicts", desc: "Get an instant clause-by-clause comparison highlighting risks and deviations." }
            ].map((step, i) => (
              <div key={i} className="flex gap-4 items-start p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-white shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                  <p className="text-slate-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <Database className="w-8 h-8 text-purple-400" /> The Database
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            The system relies on a "Ground Truth" database stored in Supabase. This contains your organization's
            executed Master Agreements.
          </p>
          <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <h4 className="font-bold text-purple-300 mb-2">Example Record Structure</h4>
            <code className="block font-mono text-sm text-purple-200">
              {`{
  "id": 1,
  "counterparty": "Acme Corp",
  "content": "Full text of the executed MSA..."
}`}
            </code>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <Server className="w-8 h-8 text-green-400" /> Tech Stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Supabase', 'OpenRouter', 'Claude 3.5', 'Vercel'].map((tech) => (
              <div key={tech} className="p-3 rounded-lg bg-white/5 border border-white/10 text-center font-medium text-slate-300 hover:bg-white/10 transition-colors">
                {tech}
              </div>
            ))}
          </div>
        </section>

      </div>
    </motion.div>
  );
}
