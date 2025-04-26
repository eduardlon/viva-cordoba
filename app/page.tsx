import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      {/* Imagen de fondo usando Next Image con tamaño optimizado */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/sombrero.webp"
          alt="Sombrero Vueltiao - Símbolo de Córdoba"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={85}
        />
      </div>
      
      <main className="flex flex-col items-center justify-center w-full max-w-md bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-2xl p-8 z-10 border-2" style={{ borderColor: '#0F47AF', backgroundColor: '#FFFFFF' }}>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-1" style={{ color: '#0F47AF' }}>VIVE</h1>
          <h2 className="text-4xl font-bold" style={{ color: '#078930' }}>CÓRDOBA</h2>
        </div>

        <div className="w-full space-y-6">
          <Link href="/turista" className="block">
            <button className="w-full text-white py-4 px-6 rounded-lg font-medium 
                             hover:shadow-lg transform hover:-translate-y-1 hover:bg-[#0D3E9A]
                             transition-all duration-300 flex items-center justify-center"
                   style={{ backgroundColor: '#0F47AF', boxShadow: '0 4px 6px rgba(15, 71, 175, 0.25)' }}>
              <span className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="5" />
                  <path d="M20 21v-2a7 7 0 0 0-14 0v2" />
                </svg>
              </span>
              SOY TURISTA
            </button>
          </Link>
          
          <Link href="/anfitrion" className="block">
            <button className="w-full text-white py-4 px-6 rounded-lg font-medium 
                             hover:shadow-lg transform hover:-translate-y-1 hover:bg-[#067829]
                             transition-all duration-300 flex items-center justify-center"
                   style={{ backgroundColor: '#078930', boxShadow: '0 4px 6px rgba(7, 137, 48, 0.25)' }}>
              <span className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </span>
              SOY ANFITRIÓN
            </button>
          </Link>
        </div>
        
        <div className="mt-8 text-center text-sm rounded-lg p-3" style={{ backgroundColor: '#F5F5F5', color: '#111111' }}>
          <p>Descubre la magia del departamento de Córdoba</p>
        </div>
      </main>
    </div>
  );
}

