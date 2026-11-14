'use client'

import { createBrowserClient } from '@supabase/ssr'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const [loading, setLoading] = useState(true)

  // Datos de prueba para Clientes
  const [clientes, setClientes] = useState([
    { id: 1, nombre: 'Ejemplo Constructora SRL', rnc: '130123456', correo: 'contacto@ejemplo.com', telefono: '809-555-1234' }
  ])

  // Estados para el Modal de Clientes (Crear / Editar)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
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

  // Abrir modal para Crear
  const handleAbrirNuevo = () => {
    setEditingId(null)
    setNuevoNombre('')
    setNuevoRnc('')
    setNuevoCorreo('')
    setNuevoTelefono('')
    setIsModalOpen(true)
  }

  // Abrir modal para Editar
  const handleAbrirEditar = (c: any) => {
    setEditingId(c.id)
    setNuevoNombre(c.nombre)
    setNuevoRnc(c.rnc)
    setNuevoCorreo(c.correo)
    setNuevoTelefono(c.telefono)
    setIsModalOpen(true)
  }

  // Guardar Cliente (Crear o Actualizar)
  const handleGuardarCliente = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nuevoNombre.trim()) {
      alert('Por favor ingrese la Razón Social o Nombre del Cliente.')
      return
    }

    if (editingId !== null) {
      // Editar existente
      setClientes(clientes.map(c => c.id === editingId ? {
        ...c,
        nombre: nuevoNombre,
        rnc: nuevoRnc || 'N/A',
        correo: nuevoCorreo || 'N/A',
        telefono: nuevoTelefono || 'N/A'
      } : c))
      alert('¡Cliente actualizado exitosamente!')
    } else {
      // Crear nuevo
      const nuevo = {
        id: Date.now(),
        nombre: nuevoNombre,
        rnc: nuevoRnc || 'N/A',
        correo: nuevoCorreo || 'N/A',
        telefono: nuevoTelefono || 'N/A'
      }
      setClientes([...clientes, nuevo])
      alert('¡Cliente agregado exitosamente!')
    }

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
      
      {/* Estilos globales de impresión: Ocultan barras, menús y botones al imprimir */}
      <style jsx global>{`
        @media print {
          aside, header, button, .no-print {
            display: none !important;
          }
          body {
            background: #ffffff !important;
            color: #000000 !important;
          }
          .printable-area {
            background: #ffffff !important;
            color: #000000 !important;
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
          }
          table {
            color: #000000 !important;
            border: 1px solid #000 !important;
          }
          th, td {
            border: 1px solid #ccc !important;
            color: #000 !important;
          }
        }
      `}</style>

      {/* ÁREA IMPRIMIBLE (Membrete oficial y contenido principal) */}
      <div className="printable-area">
        
        {/* Membrete formal de la empresa para impresión */}
        <div style={{ marginBottom: '25px', borderBottom: '2px solid #2563eb', paddingBottom: '12px' }}>
          <h1 style={{ margin: 0, fontSize: '22px', color: '#ffffff' }}>DARBIN SANCHEZ SANCHEZ</h1>
          <p style={{ margin: '3px 0 0', fontSize: '13px', color: '#94a3b8' }}>ESTRUCTURAS METÁLICAS e-CF | RNC: 22400221473</p>
        </div>

        {/* CONTENIDO PRINCIPAL: GESTIÓN DE CLIENTES */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h2 style={{ margin: 0, color: '#ffffff', fontSize: '24px' }}>Gestión de Clientes</h2>
              <p style={{ color: '#94a3b8', fontSize: '13px', margin: '4px 0 0' }}>Directorio de clientes y datos fiscales para la emisión de e-CF (DGII).</p>
            </div>
            <button 
              onClick={handleAbrirNuevo}
              style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}
              className="no-print"
            >
              + Nuevo Cliente
            </button>
          </div>

          <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px', color: '#f8fafc' }}>
              <thead>
                <tr style={{ background: '#0f172a', color: '#94a3b8', borderBottom: '1px solid #334155' }}>
                  <th style={{ padding: '14px 20px' }}>Nombre / Razón Social</th>
                  <th style={{ padding: '14px 20px' }}>RNC / Cédula</th>
                  <th style={{ padding: '14px 20px' }}>Correo</th>
                  <th style={{ padding: '14px 20px' }}>Teléfono</th>
                  <th style={{ padding: '14px 20px', textAlign: 'right' }} className="no-print">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((c) => (
                  <tr key={c.id} style={{ borderBottom: '1px solid #334155' }}>
                    <td style={{ padding: '14px 20px', fontWeight: '500' }}>{c.nombre}</td>
                    <td style={{ padding: '14px 20px', color: '#94a3b8' }}>{c.rnc}</td>
                    <td style={{ padding: '14px 20px', color: '#94a3b8' }}>{c.correo}</td>
                    <td style={{ padding: '14px 20px', color: '#94a3b8' }}>{c.telefono}</td>
                    <td style={{ padding: '14px 20px', textAlign: 'right' }} className="no-print">
                      <button 
                        onClick={() => handleAbrirEditar(c)}
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
        </div>

      </div>

      {/* ─── MODAL DE CLIENTES (NUEVO / EDITAR) ─── */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0, 0, 0, 0.7)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            background: '#1e293b', padding: '30px', borderRadius: '12px',
            width: '100%', maxWidth: '500px', border: '1px solid #334155',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
          }}>
            <h3 style={{ margin: '0 0 20px', color: '#ffffff', fontSize: '20px', borderBottom: '1px solid #334155', paddingBottom: '10px' }}>
              {editingId !== null ? 'Editar Cliente' : 'Registrar Nuevo Cliente'}
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
                  {editingId !== null ? 'Actualizar Cliente' : 'Guardar Cliente'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}