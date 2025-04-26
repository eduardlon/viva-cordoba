"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

type Mensaje = {
  autor: "turista" | "bot" | "anfitrion";
  texto: string;
};

const respuestasBot = [
  "¡Hola! ¿En qué puedo ayudarte hoy?",
  "Recuerda que puedes gestionar tus alojamientos y experiencias desde el panel de anfitrión.",
  "Si tienes dudas sobre reservas, revisa la sección de reservas o contacta soporte.",
  "¿Quieres saber cómo mejorar tu perfil? Te puedo dar algunos consejos.",
  "¡Gracias por tu mensaje! Estoy aquí para ayudarte.",
  "Puedes agregar nuevas experiencias desde el botón 'Agregar Experiencia'.",
  "Para subir un alojamiento, utiliza la opción 'Subir Alojamiento' en el menú principal.",
];

function obtenerRespuesta(pregunta: string) {
  if (pregunta.toLowerCase().includes("hola")) return respuestasBot[0];
  if (pregunta.toLowerCase().includes("reserva")) return respuestasBot[2];
  if (pregunta.toLowerCase().includes("perfil")) return respuestasBot[3];
  if (pregunta.toLowerCase().includes("experiencia")) return respuestasBot[5];
  if (pregunta.toLowerCase().includes("alojamiento")) return respuestasBot[6];
  return respuestasBot[Math.floor(Math.random() * respuestasBot.length)];
}

export default function Mensajes() {
  // Simulación de una conversación entre turista y bot, y posible intervención del anfitrión
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    { autor: "turista", texto: "¡Hola! ¿Me puedes ayudar con una reserva?" },
    { autor: "bot", texto: obtenerRespuesta("reserva") },
    { autor: "turista", texto: "¿Cómo puedo agregar una experiencia?" },
    { autor: "bot", texto: obtenerRespuesta("experiencia") },
    { autor: "turista", texto: "Quiero hablar con un asesor." },
    { autor: "anfitrion", texto: "¡Hola! Soy el anfitrión, ¿en qué puedo ayudarte personalmente?" },
    { autor: "turista", texto: "Quiero saber más sobre la finca El Paraíso." },
    // El anfitrión puede responder manualmente aquí si lo desea
  ]);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [mensajes]);

  return (
    <div className="flex flex-col items-center min-h-screen relative bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 z-10 relative flex flex-col h-[600px]">
        {/* Botón de regreso */}
        <div className="flex items-center mb-6">
          <Link href="/anfitrion" className="text-blue-800 hover:underline flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Volver
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-center mb-4 text-green-800">Conversación con Turista</h1>
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto bg-green-50 rounded-lg p-4 mb-4 border border-green-100"
        >
          {mensajes.map((msg, idx) => (
            <div
              key={idx}
              className={`flex mb-3 ${
                msg.autor === "turista"
                  ? "justify-start"
                  : msg.autor === "bot"
                  ? "justify-center"
                  : "justify-end"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-[75%] text-sm shadow
                  ${
                    msg.autor === "turista"
                      ? "bg-blue-100 text-blue-900 rounded-bl-none"
                      : msg.autor === "bot"
                      ? "bg-white text-green-900 border border-green-200"
                      : "bg-green-700 text-white rounded-br-none"
                  }`}
              >
                <span className="block font-semibold mb-1">
                  {msg.autor === "turista"
                    ? "Turista"
                    : msg.autor === "bot"
                    ? "Asistente Virtual"
                    : "Anfitrión"}
                </span>
                {msg.texto}
              </div>
            </div>
          ))}
        </div>
        {/* El anfitrión NO puede escribir a menos que el turista solicite asesoría personalizada */}
        <div className="text-center text-green-700 text-sm mt-2">
          El anfitrión solo intervendrá si el turista solicita asesoría personalizada.
        </div>
      </div>
    </div>
  );
}