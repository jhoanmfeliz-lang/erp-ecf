'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [showPass, setShowPass] = useState(false); // Estado para el ojito del login
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedTheme = localStorage.getItem('erp_dark_mode');
    if (savedTheme !== null) {
      setDarkMode(savedTheme === 'true');
    }
  }, []);

  const toggleTheme = () => {
    const nuevoEstado = !darkMode;
    setDarkMode(nuevoEstado);
    localStorage.setItem('erp_dark_mode', String(nuevoEstado));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Consulta la contraseña actualizada en el navegador o la por defecto
    const currentValidPassword = localStorage.getItem('erp_user_password') || 'admin1473';

    if (user.trim().toLowerCase() === 'darbin' && pass === currentValidPassword) {
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  const handleRecoverPassword = () => {
    alert('Por razones de seguridad, si olvidó su acceso solicite el restablecimiento al administrador o cambie su clave en el módulo de Configuración con la sesión iniciada.');
  };

  const theme = {
    bgBase: darkMode ? '#070d1d' : '#f1f5f9',
    cardBg: darkMode ? '#0b1329' : '#ffffff',
    border: darkMode ? '#1e293b' : '#cbd5e1',
    textMain: darkMode ? '#f8fafc' : '#0f172a',
    textMuted: darkMode ? '#94a3b8' : '#64748b',
    inputBg: darkMode ? '#070d1d' : '#f8fafc',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.bgBase, color: theme.textMain, transition: 'background-color 0.3s, color 0.3s', padding: '1rem', position: 'relative' }}>
      
      <button 
        onClick={toggleTheme}
        style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', backgroundColor: darkMode ? '#1e293b' : '#e2e8f0', color: theme.textMain, border: `1px solid ${theme.border}`, padding: '0.5rem 1rem', borderRadius: '0.5rem', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer' }}
      >
        {darkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
      </button>

      <div style={{ backgroundColor: theme.cardBg, padding: '2.5rem', borderRadius: '1rem', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)', width: '100%', maxWidth: '420px', border: `1px solid ${theme.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <div style={{ width: '75px', height: '75px', borderRadius: '1rem', overflow: 'hidden', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #334155', padding: '3px', marginBottom: '1rem' }}>
          <img src="/logo.png" alt="Darbin Sanchez Sanchez Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1rem', fontWeight: 'bold', color: theme.textMain, margin: 0 }}>DARBIN SANCHEZ SANCHEZ</h1>
          <p style={{ fontSize: '0.7rem', color: '#60a5fa', margin: '0.3rem 0 0 0', fontWeight: 'bold' }}>ESTRUCTURAS METÁLICAS e-CF</p>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: theme.textMain, marginTop: '1rem' }}>Iniciar Sesión</h2>
        </div>
        
        {error && (
          <div style={{ width: '100%', marginBottom: '1rem', padding: '0.75rem', backgroundColor: 'rgba(220, 38, 38, 0.2)', border: '1px solid #dc2626', color: '#fca5a5', fontSize: '0.85rem', borderRadius: '0.5rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.4rem', color: theme.textMuted }}>Usuario</label>
            <input 
              type="text" 
              value={user} 
              onChange={(e) => setUser(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', backgroundColor: theme.inputBg, border: `1px solid ${theme.border}`, borderRadius: '0.5rem', color: theme.textMain, outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box' }}
              placeholder="Ingrese su usuario"
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.4rem', color: theme.textMuted }}>Contraseña</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input 
                type={showPass ? 'text' : 'password'} 
                value={pass} 
                onChange={(e) => setPass(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 2.5rem 0.75rem 0.75rem', backgroundColor: theme.inputBg, border: `1px solid ${theme.border}`, borderRadius: '0.5rem', color: theme.textMain, outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box' }}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{ position: 'absolute', right: '0.75rem', background: 'none', border: 'none', color: theme.textMuted, cursor: 'pointer', fontSize: '1.1rem' }}
                title={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPass ? '👁️' : '🙈'}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            style={{ width: '100%', padding: '0.75rem', backgroundColor: '#2563eb', color: '#ffffff', fontWeight: 'bold', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.95rem', transition: 'background-color 0.2s', marginTop: '0.5rem' }}
          >
            Entrar al Sistema
          </button>
        </form>

        <button 
          onClick={handleRecoverPassword}
          style={{ background: 'none', border: 'none', color: '#60a5fa', fontSize: '0.8rem', marginTop: '1.2rem', cursor: 'pointer', textDecoration: 'underline' }}
        >
          ¿Olvidó su contraseña?
        </button>

      </div>
    </div>
  );
}