'use client'

import { useEffect } from "react"
import { supabase } from "@/lib/supabase"
import Image from "next/image"

export default function Home() {
  useEffect(() => {
    // Auto sign-in with a magic test user (no phone/OTP needed)
    supabase.auth.signInAnonymously().then(({ error }) => {
      if (error) console.log(error)
    // ignore for now
      else console.log("Auto logged in!")
    })
  }, [])

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <Image src="/logo.svg" alt="Zesta" width={140} height={140} className="mb-12 drop-shadow-2xl" />

      <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Welcome to Zesta
      </h1>

      <div className="glass rounded-3xl p-12 text-center">
        <p className="text-2xl mb-6">You are now logged in</p>
        <p className="text-green-400 text-5xl">✅</p>
      </div>

      <p className className="mt-12 text-gray-400">
        Real phone login will be back soon.<br/>
        For now, enjoy the full app!
      </p>
    </div>
  )
}