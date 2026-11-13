'use client'

import { useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function Home() {
  const supabase = createClientComponentClient()

  useEffect(() => {
    // Si viene con el parámetro de la app de escritorio, matamos la sesión en Supabase al instante
    const params = new URLSearchParams(window.location.search)
    if (params.get('force_login') === 'true') {
      supabase.auth.signOut().then(() => {
        // Limpiamos el parámetro de la URL para dejar la barra limpia y recargamos limpio
        window.location.href = '/'
      })
    }
  }, [supabase])

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Iniciando sistema de seguridad...</h1>
    </main>
  )
}import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// Forzamos a que esta página sea dinámica siempre (sin caché de Vercel)
export const dynamic = 'force-dynamic'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })

  // Verificamos si hay una sesión activa real en el servidor de Supabase
  const { data: { session } } = await supabase.auth.getSession()

  // SI NO HAY SESIÓN: Mostramos directamente la pantalla de Login o bloqueamos el acceso
  if (!session) {
    return (
      <main style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif', background: '#f4f6f9' }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '400px', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>Acceso Restringido - ERP</h2>
          <p style={{ marginBottom: '20px', color: '#666', fontSize: '14px' }}>Debe iniciar sesión para ingresar al sistema de escritorio.</p>
          
          {/* Aquí puedes colocar tu formulario de login de Supabase o un botón que lleve al login */}
          <form action="/auth/login" method="POST">
            <input 
              type="email" 
              name="email" 
              placeholder="Correo electrónico" 
              required 
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <input 
              type="password" 
              name="password" 
              placeholder="Contraseña" 
              required 
              style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <button 
              type="submit" 
              style={{ width: '100%', padding: '10px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </main>
    )
  }

  // SI SÍ HAY SESIÓN: Mostramos su panel normal del ERP que ya tenía hecho
  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Bienvenido al Panel del ERP</h1>
      <p>Sesión activa correctamente.</p>
      {/* Aquí va el contenido normal de su panel */}
    </main>
  )
}