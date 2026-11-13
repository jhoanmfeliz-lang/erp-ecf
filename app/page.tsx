'use client'

import { useState } from 'react'

export default function HomePage() {
  // Estado para manejar la vista activa dentro del panel
  const [activeTab, setActiveTab] = useState('clientes')

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* ─── VISTA DE CLIENTES ─── */}
      <div
        style={{
          background: '#ffffff',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
          minHeight: '400px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '15px' }}>
          <h2 style={{ margin: 0, color: '#1e293b', fontSize: '22px' }}>Gestión de Clientes</h2>
          <button style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
            + Nuevo Cliente
          </button>
        </div>

        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>
          Aquí podrá administrar el directorio de clientes y sus datos fiscales para la emisión de e-CF (DGII).
        </p>

        {/* Tabla de Clientes */}
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

    </div>
  )
}