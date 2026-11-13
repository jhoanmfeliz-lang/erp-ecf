import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const cookieStore = cookies()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return (
      <main style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif', background: '#f4f6f9' }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '400px', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>Acceso Restringido - ERP</h2>
          <p style={{ marginBottom: '20px', color: '#666', fontSize: '14px' }}>Debe iniciar sesión para ingresar al sistema de escritorio.</p>
          
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

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Bienvenido al Panel del ERP</h1>
      <p>Sesión activa correctamente.</p>
    </main>
  )
}