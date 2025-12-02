"use client";

import Image from "next/image";
import {
  Search,
  ShoppingBag,
  MessageCircle,
  User,
  Send,
  Mic,
  ArrowLeft,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  old_price?: number;
  image: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<"home" | "chat">("home");
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      .then(({ data }) => {
        setProducts(data || []);
      });
  }, []);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([
      ...messages,
      {
        id: Date.now(),
        sender: "You",
        message: newMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setNewMessage("");
  };

  const categories = [
    "Fashion",
    "Phones",
    "Electronics",
    "Home",
    "Beauty",
    "Sports",
    "Toys",
    "Groceries",
  ];

  return (
    <>
      {/* MAIN SCREEN */}
      {activeTab === "home" && (
        <div className="min-h-screen bg-black text-white pb-32 pb-24">
          {/* Header */}
          <div className="glass backdrop-blur-xl sticky top-0 z-50 border-b border-white/10">
            <div className="flex items-center justify-between p-4">
              <Image src="/logo.svg" alt="Zesta" width={50} height={50} />
              <h1 className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ZESTA
              </h1>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full" />
            </div>
          </div>

          {/* Search */}
          <div className="px-4 mt-4">
            <div className="glass rounded-2xl px-5 py-4 flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                placeholder="Search anything..."
                className="bg-transparent flex-1 outline-none text-lg"
              />
            </div>
          </div>

          {/* Stories */}
          <div className="px-4 mt-6">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
              <div className="flex flex-col items-center min-w-fit">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 p-0.5">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <span className="text-2xl">+</span>
                  </div>
                </div>
                <p className="text-xs mt-1 text-gray-400">Your Story</p>
              </div>
              {[
                "50% OFF",
                "Free Delivery",
                "₦5k Flash",
                "iPhone Deal",
                "Jumia Killer",
              ].map((story, i) => (
                <div key={i} className="flex flex-col items-center min-w-fit">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 p-0.5 animate-pulse">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                      <span className="text-xl font-bold">{i + 1}</span>
                    </div>
                  </div>
                  <p className="text-xs mt-1 max-w-16 text-center">{story}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="px-4 mt-6">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
              {categories.map((cat) => (
                <div
                  key={cat}
                  className="glass rounded-2xl px-6 py-3 whitespace-nowrap"
                >
                  {cat}
                </div>
              ))}
            </div>
          </div>

          {/* Flash Sale */}
          <div className="mt-8 px-4">
            <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
              <span className="text-red-500 animate-pulse">Flash Sale</span>
              <span className="text-sm font-normal text-gray-400">
                Ends in 2h 34m
              </span>
            </h2>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
              {products.length === 0 ? (
                <p className="text-gray-500">Loading...</p>
              ) : (
                products.map((product) => (
                  <div
                    key={product.id}
                    className="glass rounded-2xl p-4 min-w-48 flex-shrink-0"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-32 object-cover rounded-xl mb-3 border border-white/10"
                    />
                    <p className="font-bold text-sm line-clamp-2">
                      {product.name}
                    </p>
                    <p className="text-2xl font-black text-pink-400">
                      ₦{product.price.toLocaleString()}
                    </p>
                    {product.old_price && (
                      <p className="text-sm line-through text-gray-500">
                        ₦{product.old_price.toLocaleString()}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* CHAT SCREEN */}
      {activeTab === "chat" && (
        <div className="min-h-screen bg-black text-white flex flex-col">
          <div className="glass backdrop-blur-xl sticky top-0 z-50 border-b border-white/10 p-4 flex items-center gap-3">
            <button onClick={() => setActiveTab("home")} className="text-2xl">
              <ArrowLeft />
            </button>
            <Image src="/logo.svg" alt="Zesta" width={40} height={40} />
            <h1 className="text-xl font-bold">Seller Chat</h1>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "You" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`glass rounded-2xl px-4 py-3 max-w-xs ${
                    msg.sender === "You" ? "bg-purple-600" : "bg-white/10"
                  }`}
                >
                  <p>{msg.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="glass border-t border-white/10 p-4">
            <div className="flex items-center gap-3">
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 bg-transparent outline-none text-lg"
              />
              <button
                onClick={sendMessage}
                className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl"
              >
                <Send className="w-5 h-5" />
              </button>
              <button className="p-3 glass rounded-2xl">
                <Mic className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BOTTOM NAV — ALWAYS VISIBLE */}
      <div className="fixed bottom-0 left-0 right-0 glass backdrop-blur-2xl border-t border-white/10 z-50">
        <div className="flex justify-around items-center py-3">
          <button
            onClick={() => setActiveTab("home")}
            className={`p-4 rounded-2xl ${
              activeTab === "home"
                ? "bg-gradient-to-br from-purple-600 to-pink-600"
                : ""
            }`}
          >
            <ShoppingBag className="w-7 h-7" />
          </button>
          <button
            onClick={() => setActiveTab("chat")}
            className={`p-4 rounded-2xl ${
              activeTab === "chat"
                ? "bg-gradient-to-br from-purple-600 to-pink-600"
                : ""
            }`}
          >
            <MessageCircle className="w-7 h-7" />
          </button>
          <button className="p-4 rounded-2xl">
            <User className="w-7 h-7" />
          </button>
        </div>
      </div>
    </>
  );
}
