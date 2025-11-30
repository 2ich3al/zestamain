"use client";

import Image from "next/image";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOTP = async () => {
    if (!phone || phone.length < 10)
      return alert("Enter valid Nigerian number");

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      phone: "+234" + phone.replace(/^0/, ""), // removes leading zero
    });

    setLoading(false);
    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("OTP sent successfully! Check your SMS");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <Image
        src="/logo.svg"
        alt="Zesta"
        width={130}
        height={130}
        className="mb-12 drop-shadow-2xl"
      />

      <h1 className="text-5xl font-black mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Zesta
      </h1>
      <p className="text-gray-400 mb-20 text-lg text-center max-w-xs">
        Buy. Chat. Pay. All in one.
      </p>

      <div className="glass rounded-3xl p-8 w-full max-w-sm shadow-2xl">
        <div className="flex items-center bg-white/10 rounded-2xl mb-6">
          <span className="pl-4 text-lg">+234</span>
          <input
            type="tel"
            placeholder="810 000 0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-transparent flex-1 px-4 py-5 outline-none text-lg"
          />
        </div>

        <button
          onClick={sendOTP}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-5 rounded-2xl font-bold text-lg shadow-xl hover:scale-105 transition transform"
        >
          {loading ? "Sending..." : "Get Started"}
        </button>
      </div>

      <p className="absolute bottom-10 text-sm text-gray-500">
        Add to Home Screen for full app experience
      </p>
    </div>
  );
}
