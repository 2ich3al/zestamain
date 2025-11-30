import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-black text-white">
        {/* Hero */}
        <div className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-black" />
          
          <Image
            src="/logo.svg"
            alt="Zesta"
            width={140}
            height={140}
            className="relative z-10 mb-8 drop-shadow-2xl"
          />

          <h1 className="text-6xl font-black tracking-tighter mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            ZESTA
          </h1>
          
          <p className="text-xl text-center max-w-md text-gray-300 mb-12">
            Buy. Chat. Pay. All in one beautiful place.
          </p>

          <div className="glass rounded-3xl px-12 py-5 shadow-2xl">
            <p className="text-lg font-semibold">Coming Soon to Africa</p>
          </div>

          <div className="absolute bottom-10 left-0 right-0 text-center">
            <p className="text-sm text-gray-500">Add to Home Screen for the full experience</p>
          </div>
        </div>
      </div>
    </>
  );
}