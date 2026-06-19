"use client";//

import { useState } from 'react';
import { Sun, Moon, Camera } from 'lucide-react';
import { loginpi } from './pi-sdk' ; //
export default function Home() {
  const [dark, setDark] = useState(false);
  //
  const [foto, setFoto] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load tema + foto dari localStorage pas awal
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setDarkMode(savedTheme === "dark");

    const savedFoto = localStorage.getItem("userFoto");
    if (savedFoto) setFoto(savedFoto);
  }, []);

  // Simpan tema ke localStorage
  useEffect(() => {
    localStorage.setItem("theme", darkMode? "dark" : "light");
  }, [darkMode]);

  // Handle pilih foto dari kamera/galeri
  const handleFoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFoto(ev.target?.result as string); // base64
      };
      reader.readAsDataURL(file);
    }
  };

  // Simpan foto ke localStorage
  const simpanFoto = () => {
    if (foto) {
      localStorage.setItem("userFoto", foto);
      alert("Foto berhasil disimpan ✅");
    }
  };

  // Hapus foto + hapus yg lama di localStorage
  const hapusFoto = () => {
    setFoto(null);
    localStorage.removeItem("userFoto");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className={`min-h-screen flex-col items-center justify-center p-6 relative overflow-hidden transition-all duration-500
      ${darkMode? "bg-gradient-to-br from-purple-900 via-purple-950 to-black" : "bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600"}`}>

      {/* Toggle Mode Pojok Kanan Atas */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 z-20 p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition"
      >
        {darkMode? <Sun className="text-yellow-300" size={24}/> : <Moon className="text-purple-900" size={24}/>}
      </button>

      {/* Lingkaran Besar + Logo Pi Emas Transparan */}
      <div className={`absolute w-[400px] h-[400px] rounded-full backdrop-blur-sm transition
        ${darkMode? "bg-gradient-to-br from-yellow-400/10 to-yellow-600/5" : "bg-gradient-to-br from-yellow-300/20 to-yellow-500/10"}`}>
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-2xl">
  <span className="text-7xl font-bold text-white">π</span>
</div>
    {/* Tombol Login Pi */}
<button 
  onClick={loginPi}
  className="mt-8 bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition-transform"
>
  Login with Pi
</button>
      {/* Konten Utama */}
      <div className="relative z-10 text-center space-y-6">

        <h1 className={`text-5xl font-bold drop-shadow-[0_0_8px_rgba(255,215,0,0.6)] transition ${darkMode? "text-yellow-100" : "text-white"}`}>NFT Social</h1>

        <p className={`text-2xl font-semibold drop-shadow-md transition ${darkMode? "text-purple-300" : "text-purple-900"}`}>Genesis</p>

        <button className={`w-64 py-3 font-semibold rounded-xl shadow-lg hover:scale-105 transition ${darkMode? "bg-purple-800/80 text-yellow-200 hover:bg-purple-700" : "bg-white/90 text-purple-700 hover:bg-white"}`}>Login / Logout</button>

        <button className="w-64 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-purple-900 font-bold text-lg rounded-xl shadow-xl hover:scale-105 transition">Mint NFT = 0.01 Pi</button>

        {/* Lingkaran Upload Foto */}
        <div className="flex flex-col items-center gap-2">
          <input type="file" accept="image/*" capture="user" ref={inputRef} onChange={handleFoto} className="hidden" />

          <button onClick={() => inputRef.current?.click()} className={`w-24 h-24 rounded-full border-4 border-black overflow-hidden backdrop-blur-md transition hover:scale-110 ${darkMode? "bg-white/10" : "bg-white/20"}`}>
            {foto? <img src={foto} className="w-full h-full object-cover" alt="User foto" /> : <div className="w-full h-full flex items-center justify-center"><Camera size={32} className={`${darkMode? "text-gray-300" : "text-black"} opacity-60`} /></div>}
          </button>

          {/* Tombol Aksi */}
          {foto && (
            <div className="flex gap-3 mt-1 flex-wrap justify-center">
              <button onClick={hapusFoto} className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition ${darkMode? "bg-red-900/60 text-red-200 hover:bg-red-800" : "bg-red-500/80 text-white hover:bg-red-600"}`}>
                <Trash2 size={14}/> Hapus
              </button>

              <button onClick={() => inputRef.current?.click()} className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition ${darkMode? "bg-yellow-600/60 text-yellow-100 hover:bg-yellow-500" : "bg-yellow-500 text-purple-900 hover:bg-yellow-400"}`}>
                <RefreshCw size={14}/> Ganti
              </button>

              <button onClick={simpanFoto} className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition ${darkMode? "bg-green-800/60 text-green-200 hover:bg-green-700" : "bg-green-500 text-white hover:bg-green-600"}`}>
                <Save size={14}/> Simpan
              </button>
            </div>
          )}
        </div>

        <p className={`font-semibold tracking-widest mt-8 transition ${darkMode? "text-yellow-400" : "text-yellow-300"}`}>Media Social</p>

        <p className={`text-sm opacity-80 mt-4 transition ${darkMode? "text-gray-300" : "text-white"}`}>By Yaasien</p>
      </div>
    </div>
  );
}
