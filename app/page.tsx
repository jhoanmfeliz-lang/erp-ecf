'use client'

import { createBrowserClient } from '@supabase/ssr'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const [loading, setLoading] = useState(true)
  const [clientes, setClientes] = useState([
    { id: 1, nombre: 'Ejemplo Constructora SRL', rnc: '130123456', correo: 'contacto@ejemplo.com' }
  ])

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Validar autenticación obligatoria al cargar la página
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

  const handleNuevoCliente = () => {
    const nombre = prompt('Ingrese el Nombre o Razón Social del Cliente:')
    if (!nombre) return
    const rnc = prompt('Ingrese el RNC o Cédula:') || ''
    const correo = prompt('Ingrese el Correo electrónico:') || ''

    setClientes([...clientes, { id: Date.now(), nombre, rnc, correo }])
    alert('¡Cliente agregado exitosamente!')
  }

  const handleEditar = (id: number) => {
    alert(`Editando cliente ID: ${id}`)
  }

  if (loading) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', color: '#ffffff', fontFamily: 'Arial, sans-serif' }}>
        <h2>Verificando sesión...</h2>
      </div>
    )
  }

  return (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      
      {/* Cabecera de la sección */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #334155', paddingBottom: '15px' }}>
        <div>
          <h2 style={{ margin: 0, color: '#ffffff', fontSize: '24px' }}>Gestión de Clientes</h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: '5px 0 0' }}>
            Directorio de clientes y datos fiscales para la emisión de e-CF (DGII).
          </p>
        </div>
        <button 
          onClick={handleNuevoCliente}
          style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}
        >
          + Nuevo Cliente
        </button>
      </div>

      {/* Tabla de Clientes Integrada sin fondo blanco gigante */}
      <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px', color: '#f8fafc' }}>
          <thead>
            <tr style={{ background: '#0f172a', color: '#94a3b8', borderBottom: '1px solid #334155' }}>
              <th style={{ padding: '14px 20px' }}>Nombre / Razón Social</th>
              <th style={{ padding: '14px 20px' }}>RNC / Cédula</th>
              <th style={{ padding: '14px 20px' }}>Correo</th>
              <th style={{ padding: '14px 20px', textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => (
              <tr key={c.id} style={{ borderBottom: '1px solid #334155' }}>
                <td style={{ padding: '14px 20px', fontWeight: '500' }}>{c.nombre}</td>
                <td style={{ padding: '14px 20px', color: '#94a3b8' }}>{c.rnc}</td>
                <td style={{ padding: '14px 20px', color: '#94a3b8' }}>{c.correo}</td>
                <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                  <button 
                    onClick={() => handleEditar(c.id)}
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
  )
}