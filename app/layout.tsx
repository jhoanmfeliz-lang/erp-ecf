
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(true);

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

  const handleLogout = () => {
    window.location.href = '/api/logout';
  };

  const isLoginPage = pathname === '/login';

  const theme = {
    bgBase: darkMode ? '#070d1d' : '#f1f5f9',
    bgSidebar: darkMode ? '#0b1329' : '#ffffff',
    bgHeader: darkMode ? '#0b1329' : '#ffffff',
    border: darkMode ? '#1e293b' : '#cbd5e1',
    textMain: darkMode ? '#f8fafc' : '#0f172a',
    textMuted: darkMode ? '#94a3b8' : '#64748b',
  };

  const navItems = [
    { name: 'Clientes', href: '/' },
    { name: 'Proyectos y Obras', href: '/proyectos' },
    { name: 'Cotizaciones', href: '/cotizaciones' },
    { name: 'Facturación e-CF', href: '/facturacion' },
    { name: 'Unidades de Vehículo', href: '/vehiculos' },
    { name: 'Nómina Personal', href: '/nomina' },
    { name: 'Mantenimiento', href: '/mantenimiento' },
    { name: 'Reportes Fiscales', href: '/reportes' },
    { name: 'Configuración e-CF', href: '/configuracion' },
  ];

  if (isLoginPage) {
    return (
      <html lang="es">
        <body style={{ margin: 0, padding: 0 }}>
          {children}
        </body>
      </html>
    );
  }

  return (
    <html lang="es">
      <body
        style={{
          backgroundColor: theme.bgBase,
          color: theme.textMain,
          margin: 0,
          padding: 0,
          transition: 'background-color 0.3s, color 0.3s',
        }}
      >
        <div style={{ display: 'flex', minHeight: '100vh' }}>

          <aside
            style={{
              width: '280px',
              backgroundColor: theme.bgSidebar,
              borderRight: `1px solid ${theme.border}`,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                padding: '1.2rem 1rem',
                borderBottom: `1px solid ${theme.border}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '0.5rem',
              }}
            >
              <div
                style={{
                  width: '65px',
                  height: '65px',
                  borderRadius: '0.75rem',
                  overflow: 'hidden',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #334155',
                  padding: '2px',
                }}
              >
                <img
                  src="/logo.png"
                  alt="Darbin Sanchez Sanchez Logo"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </div>

              <div>
                <h1
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    margin: 0,
                    lineHeight: '1.2',
                  }}
                >
                  DARBIN SANCHEZ SANCHEZ
                </h1>

                <p
                  style={{
                    fontSize: '0.6rem',
                    color: '#60a5fa',
                    margin: '0.2rem 0 0 0',
                    fontWeight: 'bold',
                  }}
                >
                  ESTRUCTURAS METÁLICAS e-CF
                </p>

                <p
                  style={{
                    fontSize: '0.6rem',
                    color: theme.textMuted,
                    margin: '0.1rem 0 0 0',
                  }}
                >
                  RNC: 22400221473
                </p>
              </div>
            </div>

            <nav
              style={{
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
                fontSize: '0.85rem',
                overflowY: 'auto',
                flex: 1,
              }}
            >
              {navItems.map((item) => {
                const activo = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      color: activo ? '#ffffff' : theme.textMuted,
                      textDecoration: 'none',
                      padding: '0.6rem 1rem',
                      borderRadius: '0.5rem',
                      backgroundColor: activo
                        ? '#1d4ed8'
                        : 'transparent',
                      fontWeight: activo ? 'bold' : 'normal',
                    }}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </aside>

          <main
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <header
              style={{
                height: '60px',
                backgroundColor: theme.bgHeader,
                borderBottom: `1px solid ${theme.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 2rem',
              }}
            >
              <span
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  color: theme.textMuted,
                }}
              >
                Módulo Operativo Activo - DGII Ready
              </span>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <button
                  onClick={toggleTheme}
                  style={{
                    backgroundColor: darkMode
                      ? '#1e293b'
                      : '#e2e8f0',
                    color: theme.textMain,
                    border: `1px solid ${theme.border}`,
                    padding: '0.4rem 0.8rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  {darkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
                </button>

                <button
                  onClick={() => window.print()}
                  style={{
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  🖨️ Imprimir Vista
                </button>

                <button
                  onClick={handleLogout}
                  style={{
                    backgroundColor: '#dc2626',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  🚪 Cerrar Sesión
                </button>

                <span
                  style={{
                    fontSize: '0.8rem',
                    color: '#34d399',
                    fontWeight: 'bold',
                  }}
                >
                  ● En Línea
                </span>
              </div>
            </header>

            <div
              style={{
                padding: '2rem',
                flex: 1,
                backgroundColor: theme.bgBase,
              }}
            >
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
