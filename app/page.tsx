import { cookies } from 'next/headers'
import { Suspense } from 'react'

export default function Home() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#0f172a',
            color: '#fff',
            fontFamily: 'sans-serif',
          }}
        >
          Cargando sistema...
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  )
}

async function HomeContent() {
  const cookieStore = await cookies()
  const allCookies = cookieStore.getAll()

  const hasSession = allCookies.some(
    (cookie: { name: string }) =>
      cookie.name.startsWith('sb-') &&
      cookie.name.endsWith('-auth-token')
  )

  if (!hasSession) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 99999,
          background: '#0f172a',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'sans-serif',
          padding: '20px',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            background: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
            width: '100%',
            maxWidth: '380px',
            textAlign: 'center',
          }}
        >
          {/* Logo y Nombre de la Empresa */}
          <div style={{ marginBottom: '24px' }}>
            <img
              src="/logo.png"
              alt="Logo Empresa"
              style={{ height: '60px', objectFit: 'contain', marginBottom: '12px' }}
              onError={(e) => {
                // Oculta la imagen si no existe la ruta y no rompe el diseño
                e.currentTarget.style.display = 'none'
              }}
            />
            <h2 style={{ margin: 0, color: '#1e293b', fontSize: '20px', fontWeight: 'bold' }}>
              DARBIN SANCHEZ SANCHEZ
            </h2>
            <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>
              ESTRUCTURAS METÁLICAS e-CF
            </p>
          </div>

          <form action="/login" method="POST">
            <div style={{ marginBottom: '14px', textAlign: 'left' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>
                Usuario
              </label>
              <input
                type="text"
                name="username"
                placeholder="Ingrese su usuario"
                required
                autoComplete="username"
                style={{
                  boxSizing: 'border-box',
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  outline: 'none',
                  fontSize: '14px',
                }}
              />
            </div>

            <div style={{ marginBottom: '24px', textAlign: 'left' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                placeholder="Ingrese su contraseña"
                required
                autoComplete="current-password"
                style={{
                  boxSizing: 'border-box',
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  outline: 'none',
                  fontSize: '14px',
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                background: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Bienvenido al Panel del ERP</h1>
      <p>Sesión activa correctamente.</p>
    </div>
  )
}