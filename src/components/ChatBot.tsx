"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Loader2,
  Sparkles,
} from "lucide-react";

type Message = {
  id: string;
  role: "user" | "bot";
  content: string;
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "bot",
      content:
        "Hi there! I'm Nirav's AI assistant. I can answer questions about his background, skills, and projects. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");

    // Add user message to UI immediately
    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userMessage,
    };
    setMessages((prev) => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userMessage }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: data.answer || "Sorry, I couldn't generate a response.",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content:
          "Oops! Something went wrong while trying to answer that. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="mb-4 w-[350px] sm:w-[400px] h-[500px] max-h-[calc(100vh-120px)] bg-white/90 backdrop-blur-xl border border-stone-200/60 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="relative p-5 border-b border-stone-200/60 overflow-hidden bg-gradient-to-br from-blue-50 to-white flex-shrink-0">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-32 h-32 bg-blue-200/40 rounded-full blur-[30px] opacity-80 pointer-events-none"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white shadow-md">
                      <Bot size={20} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-stone-900 text-lg flex items-center gap-1">
                        Nirav's AI{" "}
                        <Sparkles size={14} className="text-blue-500" />
                      </h3>
                      <div className="flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <p className="text-xs font-semibold text-stone-500">
                          Online & Ready
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors shadow-sm"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-5 pb-2 space-y-4 no-scrollbar">
                {messages.map((msg) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className="flex items-end gap-2 max-w-[85%]">
                      {msg.role === "bot" && (
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0 mb-1">
                          <Bot size={12} />
                        </div>
                      )}

                      <div
                        className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                          msg.role === "user"
                            ? "bg-stone-900 text-white rounded-br-sm"
                            : "bg-white border border-stone-200 text-stone-700 rounded-bl-sm"
                        }`}
                      >
                        {msg.content}
                      </div>

                      {msg.role === "user" && (
                        <div className="w-6 h-6 rounded-full bg-stone-200 flex items-center justify-center text-stone-600 flex-shrink-0 mb-1">
                          <User size={12} />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-end gap-2 max-w-[85%]">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0 mb-1">
                        <Bot size={12} />
                      </div>
                      <div className="px-5 py-4 rounded-2xl bg-white border border-stone-200 rounded-bl-sm shadow-sm flex gap-1.5 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-[bounce_1s_infinite]"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-[bounce_1s_infinite_0.2s]"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-[bounce_1s_infinite_0.4s]"></span>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} className="h-2" />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white/50 border-t border-stone-200/60 backdrop-blur-md">
                <form
                  onSubmit={handleSubmit}
                  className="flex items-center gap-2 bg-white border border-stone-200 rounded-full pl-4 pr-1.5 py-1.5 shadow-sm focus-within:shadow-md focus-within:border-blue-300 transition-all duration-300"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about Nirav..."
                    className="flex-1 bg-transparent text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 text-white disabled:bg-stone-200 disabled:text-stone-400 transition-colors shadow-sm cursor-pointer disabled:cursor-not-allowed hover:bg-blue-700"
                  >
                    {isLoading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Send size={16} className="ml-0.5" />
                    )}
                  </button>
                </form>
                <div className="text-center mt-2">
                  <p className="text-[10px] text-stone-400 font-medium">
                    Responses generated by AI
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <div className="relative flex items-center justify-center">
          {/* Ring Animation */}
          {!isOpen && (
            <span className="absolute w-14 h-14 rounded-full bg-blue-500/20 animate-ping" />
          )}

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`relative w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 z-10 ${
              isOpen
                ? "bg-stone-900 rotate-90"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isOpen ? "close" : "chat"}
                initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </>
  );
}
