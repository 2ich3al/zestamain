"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <Image
        src="/logo.svg"
        alt="Zesta"
        width={160}
        height={160}
        className="mb-12"
      />

      <h1 className="text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        ZESTA
      </h1>

      <div className="mt-12 glass rounded-3xl p-10 text-center">
        <p className="text-3xl mb-4">You are inside</p>
        <p className="text-green-400 text-7xl">✅</p>
        <p className="mt-8 text-gray-400">Real login coming soon</p>
      </div>
    </div>
  );
}
