"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

type Mensaje = {
  autor: "turista" | "anfitrion";
  texto: string;
};

const respuestasAnfitrion = [
  "¡Hola! Soy el anfitrión virtual, ¿en qué puedo ayudarte?",
  "Puedes buscar alojamientos y experiencias usando los botones principales.",
  "Si tienes dudas sobre reservas, revisa la sección 'Mis Reservas'.",
  "¿Te gustaría recibir recomendaciones personalizadas?",
  "¡Gracias por tu mensaje! Estoy aquí para ayudarte.",
  "Para ayuda adicional, visita el centro de ayuda para turistas.",
];

function obtenerRespuesta(pregunta: string) {
  if (pregunta.toLowerCase().includes("hola")) return respuestasAnfitrion[0];
  if (pregunta.toLowerCase().includes("reserva")) return respuestasAnfitrion[2];
  if (pregunta.toLowerCase().includes("recomendacion")) return respuestasAnfitrion[3];
  if (pregunta.toLowerCase().includes("ayuda")) return respuestasAnfitrion[5];
  return respuestasAnfitrion[Math.floor(Math.random() * respuestasAnfitrion.length)];
}

export default function Turista() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    { autor: "anfitrion", texto: "¡Hola! Soy el anfitrión virtual, ¿en qué puedo ayudarte?" },
  ]);
  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [mensajes, showChat]);

  const enviarMensaje = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    const nuevoMensaje: Mensaje = { autor: "turista", texto: input };
    setMensajes((prev) => [...prev, nuevoMensaje]);
    setInput("");
    setTimeout(() => {
      const respuesta = obtenerRespuesta(input);
      setMensajes((prev) => [...prev, { autor: "anfitrion", texto: respuesta }]);
    }, 800);
  };

  return (
    <div className="flex flex-col items-center min-h-screen relative">
      {/* Imagen de fondo usando Next Image */}
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
      
      <div className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-lg p-6 my-8 z-10 relative border-2" style={{ borderColor: '#0F47AF' }}>
        {/* Botón de regreso y menú */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="text-[#0F47AF] hover:text-[#078930] transition-colors">
            <span className="flex items-center p-2 rounded-full hover:bg-gray-100">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </span>
          </Link>
          
          {/* Menú de opciones */}
          <button className="text-[#111111] p-2 rounded-full hover:bg-gray-100 transition-colors">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
        </div>

        {/* Título */}
        <h1 className="text-3xl font-bold text-center mb-8" style={{ color: '#0F47AF' }}>Turista</h1>

        {/* Buscador */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar alojamientos, experiencias..."
              className="w-full px-5 py-4 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F47AF] focus:border-transparent shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#078930] transition-colors">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="22" 
                height="22" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>
        </div>

        {/* Opciones de turista */}
        <div className="space-y-5">
          <Link href="/turista/alojamientos" className="block">
            <button className="w-full bg-[#0F47AF] text-white py-4 px-5 rounded-lg font-medium hover:bg-[#0D3E9A] transition-colors text-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
              BUSCAR ALOJAMIENTO
            </button>
          </Link>
          
          <Link href="/turista/experiencias" className="block">
            <button className="w-full bg-[#0F47AF] text-white py-4 px-5 rounded-lg font-medium hover:bg-[#0D3E9A] transition-colors text-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
              DESCUBRIR EXPERIENCIAS
            </button>
          </Link>
          
          <Link href="/turista/reservas" className="block">
            <button className="w-full bg-[#0F47AF] text-white py-4 px-5 rounded-lg font-medium hover:bg-[#0D3E9A] transition-colors text-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
              MIS RESERVAS
            </button>
          </Link>
          
          <Link href="/turista/favoritos" className="block">
            <button className="w-full bg-[#0F47AF] text-white py-4 px-5 rounded-lg font-medium hover:bg-[#0D3E9A] transition-colors text-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
              FAVORITOS
            </button>
          </Link>
          
          <Link href="/turista/mapa" className="block">
            <button className="w-full bg-[#0F47AF] text-white py-4 px-5 rounded-lg font-medium hover:bg-[#0D3E9A] transition-colors text-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
              EXPLORAR MAPA
            </button>
          </Link>
        </div>
        
        {/* Botón de chat - Movido arriba de Recomendados para ti */}
        <div className="mt-8 mb-4 flex justify-center">
          <button
            className="bg-[#0F47AF] hover:bg-[#078930] text-white rounded-full shadow-lg p-4 flex items-center transition-colors"
            style={{ boxShadow: "0 4px 16px rgba(15,71,175,0.15)" }}
            onClick={() => setShowChat((v) => !v)}
            aria-label="Abrir chat con anfitrión"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span className="font-semibold hidden sm:inline">Chat</span>
          </button>
        </div>
        
        {/* Sección de recomendaciones */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#0F47AF' }}>Recomendados para ti</h2>
          <div className="bg-gray-50 p-5 rounded-lg shadow-sm border" style={{ borderColor: '#078930' }}>
            <p className="text-sm text-[#111111] mb-3">Descubre los mejores lugares de Córdoba según tus preferencias.</p>
            <Link href="/turista/recomendaciones" className="text-[#078930] font-medium text-sm hover:underline flex items-center">
              Ver recomendaciones personalizadas
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="ml-1"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>
        
        {/* Información adicional */}
        {/* Eliminado el centro de ayuda para turistas */}

        {/* Chatbot desplegable */}
        {showChat && (
          <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50 w-80 max-w-[90vw] bg-white rounded-xl shadow-2xl border border-[#0F47AF] flex flex-col" style={{ minHeight: 400 }}>
            <div className="flex items-center justify-between px-4 py-3 bg-[#0F47AF] rounded-t-xl">
              <span className="text-white font-semibold">Chat con Anfitrión</span>
              <button onClick={() => setShowChat(false)} className="text-white hover:text-[#078930] transition-colors" aria-label="Cerrar chat">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div ref={chatRef} className="flex-1 overflow-y-auto px-4 py-3 bg-[#F5F8FF]">
              {mensajes.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex mb-3 ${msg.autor === "turista" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg max-w-[75%] text-sm shadow
                      ${msg.autor === "turista"
                        ? "bg-[#0F47AF] text-white rounded-br-none"
                        : "bg-white text-[#0F47AF] border border-[#0F47AF] rounded-bl-none"
                      }`}
                  >
                    <span className="block font-semibold mb-1">
                      {msg.autor === "turista" ? "Tú" : "Anfitrión"}
                    </span>
                    {msg.texto}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={enviarMensaje} className="flex gap-2 p-3 border-t border-[#0F47AF] bg-white">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-4 py-2 border border-[#0F47AF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#078930] transition"
                autoFocus
              />
              <button
                type="submit"
                className="bg-[#0F47AF] hover:bg-[#078930] text-white px-4 py-2 rounded-lg font-semibold transition"
              >
                Enviar
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}