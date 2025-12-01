"use client";

import Image from "next/image";
import { Search, ShoppingBag, MessageCircle, User } from "lucide-react";
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

  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      .then(({ data }) => {
        setProducts(data || []);
      });
  }, []);

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

      {/* Flash Sale - Real Products (NORMAL IMG = 100% WORKS) */}
      <div className="mt-8 px-4">
        <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
          <span className="text-red-500 animate-pulse">Flash Sale</span>
          <span className="text-sm font-normal text-gray-400">
            Ends in 2h 34m
          </span>
        </h2>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {products.length === 0 ? (
            <p className="text-gray-500">Loading hot deals...</p>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="glass rounded-2xl p-4 min-w-48 flex-shrink-0"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-xl mb-3"
                />
                <p className="font-bold text-sm line-clamp-2">{product.name}</p>
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
