'use client'

import { createBrowserClient } from '@supabase/ssr'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('clientes') // Pestaña activa por defecto

  // Cliente de Supabase para componentes de cliente (Browser)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        window.location.href = '/login'
      } else {
        setUser(user)
        setLoading(false)
      }
    }
    getUser()
  }, [supabase])

  if (loading) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', fontFamily: 'Arial, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
        <h2>Cargando sistema...</h2>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', fontFamily: 'Arial, sans-serif' }}>
      
      {/* ─── MENÚ LATERAL IZQUIERDO ─── */}
      <aside style={{ width: '280px', background: '#0f172a', color: '#ffffff', display: 'flex', flexDirection: 'column', borderRight: '1px solid #1e293b' }}>
        
        {/* Cabecera del Logo / Empresa */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid #1e293b', textAlign: 'center' }}>
          <div style={{ background: '#ffffff', padding: '10px', borderRadius: '8px', display: 'inline-block', marginBottom: '10px' }}>
            <span style={{ fontWeight: 'bold', color: '#0f172a', fontSize: '14px' }}>DSS e-CF</span>
          </div>
          <h2 style={{ fontSize: '15px', margin: '5px 0 0', color: '#f8fafc', textTransform: 'uppercase' }}>
            DARBIN SANCHEZ SANCHEZ
          </h2>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 0' }}>
            ESTRUCTURAS METÁLICAS e-CF
          </p>
          <p style={{ fontSize: '11px', color: '#38bdf8', margin: '4px 0 0' }}>
            RNC: 22400221473
          </p>
        </div>

        {/* Navegación de Pestañas */}
        <nav style={{ padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          {[
            { id: 'clientes', label: 'Clientes' },
            { id: 'proyectos', label: 'Proyectos y Obras' },
            { id: 'cotizaciones', label: 'Cotizaciones' },
            { id: 'facturacion', label: 'Facturación e-CF' },
            { id: 'vehiculos', label: 'Unidades de Vehículo' },
            { id: 'nomina', label: 'Nómina Personal' },
            { id: 'mantenimiento', label: 'Mantenimiento' },
            { id: 'reportes', label: 'Reportes Fiscales' },
            { id: 'configuracion', label: 'Configuración e-CF' },
          ].map((item) => {
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: isActive ? '#2563eb' : 'transparent',
                  color: isActive ? '#ffffff' : '#cbd5e1',
                  fontWeight: isActive ? 'bold' : 'normal',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
              >
                {item.label}
              </button>
            )
          })}
        </nav>
      </aside>

      {/* ─── CONTENIDO PRINCIPAL ─── */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Barra superior */}
        <header style={{ height: '70px', background: '#ffffff', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px' }}>
          <span style={{ fontWeight: 'bold', color: '#334155', fontSize: '16px' }}>
            Módulo Operativo Activo - DGII Ready
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '13px', color: '#16a34a', fontWeight: 'bold' }}>● En Línea</span>
            <a
              href="/api/logout"
              style={{
                background: '#ef4444',
                color: '#ffffff',
                padding: '8px 16px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 'bold',
              }}
            >
              Cerrar Sesión
            </a>
          </div>
        </header>

        {/* Cuerpo dinámico según la pestaña activa */}
        <div style={{ padding: '40px', flex: 1, boxSizing: 'border-box' }}>
          <div
            style={{
              maxWidth: '1000px',
              margin: '0 auto',
              background: '#ffffff',
              padding: '40px',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              minHeight: '400px',
            }}
          >
            {activeTab === 'clientes' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '15px' }}>
                  <h2 style={{ margin: 0, color: '#1e293b', fontSize: '22px' }}>Gestión de Clientes</h2>
                  <button style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                    + Nuevo Cliente
                  </button>
                </div>
                <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>
                  Aquí podrá administrar el directorio de clientes y sus datos fiscales para la emisión de e-CF.
                </p>
                {/* Tabla de ejemplo para la vista de clientes */}
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                    <thead>
                      <tr style={{ background: '#f1f5f9', color: '#334155', borderBottom: '1px solid #e2e8f0' }}>
                        <th style={{ padding: '12px 16px' }}>Nombre / Razón Social</th>
                        <th style={{ padding: '12px 16px' }}>RNC / Cédula</th>
                        <th style={{ padding: '12px 16px' }}>Correo</th>
                        <th style={{ padding: '12px 16px' }}>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '12px 16px', color: '#1e293b' }}>Ejemplo Constructora SRL</td>
                        <td style={{ padding: '12px 16px', color: '#64748b' }}>130123456</td>
                        <td style={{ padding: '12px 16px', color: '#64748b' }}>contacto@ejemplo.com</td>
                        <td style={{ padding: '12px 16px' }}>
                          <button style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Editar</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'proyectos' && (
              <div>
                <h2 style={{ color: '#1e293b', marginTop: 0 }}>Proyectos y Obras</h2>
                <p style={{ color: '#64748b' }}>Módulo de administración de obras y estructuras metálicas en desarrollo.</p>
              </div>
            )}

            {activeTab === 'cotizaciones' && (
              <div>
                <h2 style={{ color: '#1e293b', marginTop: 0 }}>Cotizaciones</h2>
                <p style={{ color: '#64748b' }}>Módulo de cotizaciones para clientes corporativos y particulares.</p>
              </div>
            )}

            {activeTab === 'facturacion' && (
              <div>
                <h2 style={{ color: '#1e293b', marginTop: 0 }}>Facturación e-CF</h2>
                <p style={{ color: '#64748b' }}>Emisión de Comprobantes Fiscales Electrónicos (DGII).</p>
              </div>
            )}

            {activeTab === 'vehiculos' && (
              <div>
                <h2 style={{ color: '#1e293b', marginTop: 0 }}>Unidades de Vehículo</h2>
                <p style={{ color: '#64748b' }}>Control de la flotilla de transporte y despacho.</p>
              </div>
            )}

            {activeTab === 'nomina' && (
              <div>
                <h2 style={{ color: '#1e293b', marginTop: 0 }}>Nómina Personal</h2>
                <p style={{ color: '#64748b' }}>Gestión de personal técnico y administrativo.</p>
              </div>
            )}

            {activeTab === 'mantenimiento' && (
              <div>
                <h2 style={{ color: '#1e293b', marginTop: 0 }}>Mantenimiento</h2>
                <p style={{ color: '#64748b' }}>Herramientas de soporte y mantenimiento del sistema.</p>
              </div>
            )}

            {activeTab === 'reportes' && (
              <div>
                <h2 style={{ color: '#1e293b', marginTop: 0 }}>Reportes Fiscales</h2>
                <p style={{ color: '#64748b' }}>Generación de reportes y libros de venta DGII.</p>
              </div>
            )}

            {activeTab === 'configuracion' && (
              <div>
                <h2 style={{ color: '#1e293b', marginTop: 0, marginBottom: '20px' }}>Configuración e-CF</h2>
                <p style={{ color: '#64748b', marginBottom: '20px' }}>
                  Ajustes generales del sistema y parámetros de conexión con la DGII.
                </p>
                {/* Aquí dejaremos listo el espacio para el certificado P12 */}
                <div style={{ background: '#f8fafc', border: '1px dashed #cbd5e1', padding: '25px', borderRadius: '8px' }}>
                  <h4 style={{ margin: '0 0 10px', color: '#1e293b' }}>Gestión de Certificado Digital (.P12)</h4>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 15px' }}>
                    Próximamente podrá adjuntar y configurar su archivo de certificado P12 para la firma electrónica.
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  )
}