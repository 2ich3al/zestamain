"use client";

import Image from "next/image";
import { Search, ShoppingBag, MessageCircle, User } from "lucide-react";

export default function Home() {
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
  const flashSales = [1, 2, 3, 4];

  return (
    <div className="min-h-screen bg-black text-white pb-20">
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

      {/* Search Bar */}
      <div className="px-4 mt-4">
        <div className="glass rounded-2xl px-5 py-4 flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            placeholder="Search anything..."
            className="bg-transparent flex-1 outline-none text-lg"
          />
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
          {flashSales.map((i) => (
            <div key={i} className="glass rounded-2xl p-4 min-w-48">
              <div className="bg-gray-800 rounded-xl w-full h-40 mb-3" />
              <p className="font-bold">iPhone 15 Pro</p>
              <p className="text-2xl font-black text-pink-400">₦850,000</p>
              <p className="text-sm line-through text-gray-500">₦1,200,000</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 glass backdrop-blur-2xl border-t border-white/10">
        <div className="flex justify-around items-center py-3">
          <button className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl">
            <ShoppingBag className="w-7 h-7" />
          </button>
          <button className="p-3">
            <MessageCircle className="w-7 h-7" />
          </button>
          <button className="p-3">
            <User className="w-7 h-7" />
          </button>
        </div>
      </div>
    </div>
  );
}
