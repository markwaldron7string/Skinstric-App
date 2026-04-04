export default function Home() {
  return (
    <div className="w-full min-h-screen bg-white text-[#1A1B1C] relative">

      {/* 🔥 DIAGONAL SHAPES */}
      <div className="absolute inset-0 pointer-events-none">

        {/* LEFT SHAPE */}
        <div className="absolute left-0 top-[179px] w-[602px] h-[602px] border-[2px] border-dashed border-[#A0A4AB] rotate-45" />

        {/* RIGHT SHAPE */}
        <div className="absolute right-0 top-[179px] w-[602px] h-[602px] border-[2px] border-dashed border-[#A0A4AB] rotate-45" />

      </div>

      {/* HEADER */}
      <header className="h-[64px] flex items-center justify-between px-8">
        <div className="text-sm tracking-wide">
          SKINSTRIC <span className="opacity-50 ml-2">[ INTRO ]</span>
        </div>

        <button className="bg-black text-white text-xs px-4 py-2">
          ENTER CODE
        </button>
      </header>

      {/* MAIN CENTER */}
      <main className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 
          className="text-[128px] leading-[120px] text-center"
          style={{ 
            fontVariationSettings: '"wght" 300',
            letterSpacing: "-0.07em",
            WebkitFontSmoothing: "antialiased",
          }}
        >
          Sophisticated <br /> skincare
        </h1>
      </main>

      {/* LEFT BUTTON */}
      <div className="absolute left-[32px] top-[458px] flex items-center gap-4">
        <div className="w-6 h-6 border border-black rotate-45 flex items-center justify-center">
          <div className="-rotate-45 text-xs">←</div>
        </div>

        <span className="text-xs tracking-wide">
          DISCOVER A.I.
        </span>
      </div>

      {/* RIGHT BUTTON */}
      <div className="absolute right-[32px] top-[458px] flex items-center gap-4">
        <span className="text-xs tracking-wide">
          TAKE TEST
        </span>

        <div className="w-6 h-6 border border-black rotate-45 flex items-center justify-center">
          <div className="-rotate-45 text-xs">→</div>
        </div>
      </div>

      {/* BOTTOM TEXT */}
      <div className="absolute left-[32px] bottom-[32px] w-[316px] text-[14px] leading-[24px] uppercase">
        SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALISED ROUTINE TAILORED TO WHAT YOUR SKIN NEEDS.
      </div>

    </div>
  );
}