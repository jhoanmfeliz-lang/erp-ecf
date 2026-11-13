'use client'

import { createBrowserClient } from '@supabase/ssr'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const [loading, setLoading] = useState(true)
  const [clientes, setClientes] = useState([
    { id: 1, nombre: 'Ejemplo Constructora SRL', rnc: '130123456', correo: 'contacto@ejemplo.com', telefono: '809-555-1234' }
  ])

  // Estado para controlar el modal de "Nuevo Cliente"
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [nuevoNombre, setNuevoNombre] = useState('')
  const [nuevoRnc, setNuevoRnc] = useState('')
  const [nuevoCorreo, setNuevoCorreo] = useState('')
  const [nuevoTelefono, setNuevoTelefono] = useState('')

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    async function checkUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        window.location.href = '/login'
      } else {
        setLoading(false)
      }
    }
    checkUser()
  }, [supabase])

  const handleGuardarCliente = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nuevoNombre.trim()) {
      alert('Por favor ingrese la Razón Social o Nombre del Cliente.')
      return
    }

    const nuevo = {
      id: Date.now(),
      nombre: nuevoNombre,
      rnc: nuevoRnc || 'N/A',
      correo: nuevoCorreo || 'N/A',
      telefono: nuevoTelefono || 'N/A'
    }

    setClientes([...clientes, nuevo])
    
    // Limpiar formulario y cerrar modal
    setNuevoNombre('')
    setNuevoRnc('')
    setNuevoCorreo('')
    setNuevoTelefono('')
    setIsModalOpen(false)
  }

  if (loading) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', color: '#ffffff', fontFamily: 'Arial, sans-serif' }}>
        <h2>Verificando sesión...</h2>
      </div>
    )
  }

  return (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '20px', position: 'relative' }}>
      
      {/* Cabecera de la sección */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #334155', paddingBottom: '15px' }}>
        <div>
          <h2 style={{ margin: 0, color: '#ffffff', fontSize: '24px' }}>Gestión de Clientes</h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: '5px 0 0' }}>
            Directorio de clientes y datos fiscales para la emisión de e-CF (DGII).
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}
        >
          + Nuevo Cliente
        </button>
      </div>

      {/* Tabla de Clientes */}
      <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px', color: '#f8fafc' }}>
          <thead>
            <tr style={{ background: '#0f172a', color: '#94a3b8', borderBottom: '1px solid #334155' }}>
              <th style={{ padding: '14px 20px' }}>Nombre / Razón Social</th>
              <th style={{ padding: '14px 20px' }}>RNC / Cédula</th>
              <th style={{ padding: '14px 20px' }}>Correo</th>
              <th style={{ padding: '14px 20px' }}>Teléfono</th>
              <th style={{ padding: '14px 20px', textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => (
              <tr key={c.id} style={{ borderBottom: '1px solid #334155' }}>
                <td style={{ padding: '14px 20px', fontWeight: '500' }}>{c.nombre}</td>
                <td style={{ padding: '14px 20px', color: '#94a3b8' }}>{c.rnc}</td>
                <td style={{ padding: '14px 20px', color: '#94a3b8' }}>{c.correo}</td>
                <td style={{ padding: '14px 20px', color: '#94a3b8' }}>{c.telefono}</td>
                <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                  <button 
                    style={{ background: '#334155', border: '1px solid #475569', color: '#fff', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ─── MODAL PROFESIONAL PARA NUEVO CLIENTE ─── */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            background: '#1e293b',
            padding: '30px',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '500px',
            border: '1px solid #334155',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
          }}>
            <h3 style={{ margin: '0 0 20px', color: '#ffffff', fontSize: '20px', borderBottom: '1px solid #334155', paddingBottom: '10px' }}>
              Registrar Nuevo Cliente
            </h3>
            
            <form onSubmit={handleGuardarCliente} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', color: '#cbd5e1', fontSize: '13px', marginBottom: '5px' }}>Razón Social / Nombre *</label>
                <input 
                  type="text" 
                  value={nuevoNombre}
                  onChange={(e) => setNuevoNombre(e.target.value)}
                  placeholder="Ej. Constructora Morel SRL"
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', background: '#0f172a', border: '1px solid #475569', color: '#fff', boxSizing: 'border-box' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', color: '#cbd5e1', fontSize: '13px', marginBottom: '5px' }}>RNC / Cédula</label>
                <input 
                  type="text" 
                  value={nuevoRnc}
                  onChange={(e) => setNuevoRnc(e.target.value)}
                  placeholder="Ej. 131234567"
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', background: '#0f172a', border: '1px solid #475569', color: '#fff', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: '#cbd5e1', fontSize: '13px', marginBottom: '5px' }}>Correo Electrónico</label>
                <input 
                  type="email" 
                  value={nuevoCorreo}
                  onChange={(e) => setNuevoCorreo(e.target.value)}
                  placeholder="Ej. correo@empresa.com"
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', background: '#0f172a', border: '1px solid #475569', color: '#fff', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: '#cbd5e1', fontSize: '13px', marginBottom: '5px' }}>Teléfono</label>
                <input 
                  type="text" 
                  value={nuevoTelefono}
                  onChange={(e) => setNuevoTelefono(e.target.value)}
                  placeholder="Ej. 809-555-0000"
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', background: '#0f172a', border: '1px solid #475569', color: '#fff', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '15px' }}>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  style={{ background: '#475569', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Guardar Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}