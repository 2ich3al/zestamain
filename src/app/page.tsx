'use client'

import Image from "next/image"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function Home() {
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<"phone" | "otp">("phone")

  const sendOTP = async () => {
    if (!phone || phone.length < 10) return alert("Enter valid number")
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({
      phone: "+234" + phone.replace(/^0/, ""),
    })
    setLoading(false)
    if (error) alert(error.message)
    else {
      setStep("")
      alert("OTP sent! Check SMS")
    }
  }

  const verifyOTP = async () => {
    if (otp.length !== 6) return alert("Enter 6-digit code")
    setLoading(true)
    const { error, data } = await supabase.auth.verifyOtp({
      phone: "+234" + phone.replace(/^0/, ""),
      token: otp,
      type: "sms",
    })
    setLoading(false)
    if (error) alert(error.message)
    else {
      alert("Welcome to Zesta! You’re now logged in 🔥")
      // Here we’ll go to the real home feed next time
      console.log("Logged in user:", data.user)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <Image src="/logo.svg" alt="Zesta" width={140} height={140} className="mb-12 drop-shadow-2xl" />

      {step === "phone" ? (
        <>
          <h1 className="text-5xl font-black mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Zesta
          </h1>
          <p className="text-gray-300 mb-10 text-center">Buy. Chat. Pay. All in one.</p>

          <div className="glass rounded-3xl p-8 w-full max-w-sm shadow-2xl">
            <div className="flex items-center bg-white/10 rounded-2xl mb-6">
              <span className="px-4 text-lg">+234</span>
              <input
                type="tel"
                placeholder="810 000 0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-transparent flex-1 py-5 outline-none text-lg"
              />
            </div>
            <button
              onClick={sendOTP}
              disabled={loading={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-5 rounded-2xl font-bold text-lg shadow-xl hover:scale-105 transition"
            >
              {loading ? "Sending…" : "Get Started"}
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-8">Enter 6-digit code</h2>
          <input
            type="text"
            placeholder="483921"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="text-center text-4xl tracking-widest bg-white/10 rounded-2xl py-6 px-8 mb-8 w-full max-w-xs"
            maxLength={6}
          />
          <button
            onClick={verifyOTP}
            disabled={loading || otp.length !== 6}
            className="w-full max-w-xs bg-gradient-to-r from-purple-600 to-pink-600 py-5 rounded-2xl font-bold text-lg shadow-xl hover:scale-105 transition"
          >
            {loading ? "Verifying…" : "Verify & Enter Zesta"}
          </button>
        </>
      )}

      <p className="absolute bottom-8 text-sm text-gray-500">
        Add to Home Screen • Zesta 2025
      </p>
    </div>
  )
}