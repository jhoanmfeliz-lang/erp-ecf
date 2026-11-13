export default function LoginPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#0f172a',
        fontFamily: 'Arial, sans-serif',
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
          boxSizing: 'border-box',
        }}
      >
        <div style={{ marginBottom: '28px' }}>
          <img
            src="/logo.png"
            alt="Logo de la empresa"
            style={{
              height: '65px',
              width: 'auto',
              objectFit: 'contain',
              marginBottom: '12px',
            }}
          />

          <h2
            style={{
              margin: 0,
              color: '#1e293b',
              fontSize: '20px',
              fontWeight: 'bold',
            }}
          >
            DARBIN SANCHEZ SANCHEZ
          </h2>

          <p
            style={{
              margin: '6px 0 0',
              color: '#64748b',
              fontSize: '13px',
            }}
          >
            ESTRUCTURAS METÁLICAS e-CF
          </p>

          <p
            style={{
              margin: '5px 0 0',
              color: '#94a3b8',
              fontSize: '11px',
            }}
          >
            RNC: 22400221473
          </p>
        </div>

        <form action="/api/login" method="POST">
          <div style={{ marginBottom: '18px', textAlign: 'left' }}>
            <label
              htmlFor="username"
              style={{
                display: 'block',
                marginBottom: '7px',
                color: '#334155',
                fontSize: '13px',
                fontWeight: 'bold',
              }}
            >
              Usuario
            </label>

            <input
              id="username"
              type="text"
              name="username"
              placeholder="Ingrese su usuario"
              required
              autoComplete="username"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '13px',
                borderRadius: '7px',
                border: '1px solid #cbd5e1',
                outline: 'none',
                fontSize: '14px',
              }}
            />
          </div>

          <div style={{ marginBottom: '25px', textAlign: 'left' }}>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                marginBottom: '7px',
                color: '#334155',
                fontSize: '13px',
                fontWeight: 'bold',
              }}
            >
              Contraseña
            </label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="Ingrese su contraseña"
              required
              autoComplete="current-password"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '13px',
                borderRadius: '7px',
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
              padding: '14px',
              background: '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '7px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Iniciar Sesión
          </button>
        </form>

        <p
          style={{
            marginTop: '25px',
            marginBottom: 0,
            color: '#94a3b8',
            fontSize: '11px',
          }}
        >
          Sistema Administrativo e-CF
        </p>
      </div>
    </main>
  )
}