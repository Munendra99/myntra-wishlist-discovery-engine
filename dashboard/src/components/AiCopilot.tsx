"use client";

import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Sparkles,
  Send,
  Bot,
  User,
  Loader2,
} from "lucide-react";
import { EpistemicBadge } from "./DiscoveryFunnel";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const AiCopilot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `### 👋 Welcome to the Executive Discovery Copilot
I am your **Product Discovery Research Assistant** for the Myntra Wishlist Intelligence Engine.

I am grounded on **3,026+ authentic customer reviews & signals** across Google Play Store, Apple App Store, and Fashion Forums.

Click any of the suggested queries above or ask your own discovery question!`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    // Only scroll the internal chat container when messages are actively added, never scroll the main page
    if (messages.length > 1 || isLoading) {
      scrollToBottom();
    }
  }, [messages, isLoading]);

  const quickPrompts = [
    "Why do users add fashion products to their wishlist?",
    "What prevents wishlisted products from eventually being purchased?",
    "What uncertainties remain after users have identified a product they like?",
    "What causes users to postpone a purchase?",
    "How do users compare multiple shortlisted products?",
    "What information do users seek outside Myntra before purchasing?",
    "What role do fit, size, styling, price, reviews, occasion and social validation play?",
    "When do users use the wishlist as genuine purchase intent versus simply as a bookmarking mechanism?",
    "How do these behaviors differ across user segments?",
    "What unmet needs emerge consistently across user conversations?",
  ];

  const handleSend = async (userText?: string) => {
    const query = userText || input;
    if (!query.trim() || isLoading) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: query },
    ];
    setMessages(newMessages);
    if (!userText) setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "⚠️ " + (data.error || "Unable to generate AI response."),
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Network error connecting to AI Discovery Service.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 shadow-2xl overflow-hidden">
        <div className="px-6 py-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center shadow-md shadow-pink-500/25">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                Executive Discovery Copilot
                <span className="text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Grounded on 3.0k+ Reviews
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Structured RAG Q&A answering discovery questions with citations & counter-evidence
              </p>
            </div>
          </div>
          <EpistemicBadge status="INFERRED" />
        </div>

        {/* Chat Body */}
        <div className="p-6">
          {/* Quick Prompts Pills */}
          <div className="mb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Suggested Queries:
            </span>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  disabled={isLoading}
                  className="text-xs bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-pink-300 border border-slate-800 hover:border-pink-500/40 px-3 py-1.5 rounded-xl transition-all text-left shadow-sm active:scale-95 disabled:opacity-50"
                >
                  💡 {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Messages List - Container scoped scrolling */}
          <div
            ref={chatContainerRef}
            className="h-[460px] overflow-y-auto pr-2 space-y-4 mb-4 custom-scrollbar bg-slate-950/70 rounded-2xl p-4 border border-slate-800/80"
          >
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex items-start space-x-3 ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {m.role === "assistant" && (
                  <div className="w-8 h-8 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-pink-400" />
                  </div>
                )}

                <div
                  className={`max-w-[90%] rounded-2xl px-5 py-4 text-xs leading-relaxed ${
                    m.role === "user"
                      ? "bg-gradient-to-r from-pink-500 to-rose-600 text-white font-medium shadow-md"
                      : "bg-slate-900/90 border border-slate-800 text-slate-200 shadow-md"
                  }`}
                >
                  {m.role === "user" ? (
                    <div className="whitespace-pre-wrap font-sans text-sm font-medium">
                      {m.content}
                    </div>
                  ) : (
                    <div className="markdown-content text-slate-200 space-y-3">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h1: ({ node, ...props }) => (
                            <h1 className="text-base font-bold text-white mb-2 pb-1 border-b border-slate-800" {...props} />
                          ),
                          h2: ({ node, ...props }) => (
                            <h2 className="text-sm font-bold text-pink-300 mt-3 mb-1.5 flex items-center gap-1.5" {...props} />
                          ),
                          h3: ({ node, ...props }) => (
                            <h3 className="text-xs font-bold text-slate-100 mt-2 mb-1" {...props} />
                          ),
                          p: ({ node, ...props }) => (
                            <p className="mb-2 leading-relaxed text-slate-300" {...props} />
                          ),
                          strong: ({ node, ...props }) => (
                            <strong className="font-bold text-white bg-slate-800/80 px-1 py-0.5 rounded" {...props} />
                          ),
                          ul: ({ node, ...props }) => (
                            <ul className="list-disc list-inside space-y-1 my-2 pl-1 text-slate-300" {...props} />
                          ),
                          ol: ({ node, ...props }) => (
                            <ol className="list-decimal list-inside space-y-1 my-2 pl-1 text-slate-300" {...props} />
                          ),
                          li: ({ node, ...props }) => (
                            <li className="leading-relaxed" {...props} />
                          ),
                          blockquote: ({ node, ...props }) => (
                            <blockquote className="border-l-2 border-pink-500 pl-3 py-1 my-2 italic bg-slate-950/80 rounded text-slate-300" {...props} />
                          ),
                          table: ({ node, ...props }) => (
                            <div className="overflow-x-auto my-3 rounded-xl border border-slate-800 bg-slate-950">
                              <table className="w-full text-left text-xs border-collapse" {...props} />
                            </div>
                          ),
                          thead: ({ node, ...props }) => (
                            <thead className="bg-slate-800/80 text-pink-300 font-semibold border-b border-slate-700" {...props} />
                          ),
                          tbody: ({ node, ...props }) => (
                            <tbody className="divide-y divide-slate-800 text-slate-300" {...props} />
                          ),
                          th: ({ node, ...props }) => (
                            <th className="px-3 py-2 font-bold text-slate-200" {...props} />
                          ),
                          td: ({ node, ...props }) => (
                            <td className="px-3 py-2" {...props} />
                          ),
                          code: ({ node, ...props }) => (
                            <code className="bg-slate-950 text-pink-300 px-1.5 py-0.5 rounded font-mono text-[11px] border border-slate-800" {...props} />
                          ),
                        }}
                      >
                        {m.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>

                {m.role === "user" && (
                  <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4 text-slate-300" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center space-x-3 text-slate-400 text-xs py-3 pl-2">
                <div className="w-8 h-8 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center shrink-0">
                  <Loader2 className="w-4 h-4 text-pink-400 animate-spin" />
                </div>
                <span className="font-mono text-slate-300 animate-pulse">
                  Querying 3,026+ structured signals & synthesizing discovery evidence...
                </span>
              </div>
            )}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              placeholder="Ask any discovery question (e.g. 'What are the top purchase blockers?' or 'Why do users postpone?')..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1 bg-slate-950 border border-slate-800 text-white text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 transition-colors shadow-inner"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white p-3 rounded-xl transition-all shadow-md shadow-pink-500/25 active:scale-95 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
