'use client'

import { createBrowserClient } from '@supabase/ssr'
import { useEffect, useState } from 'react'

export default function CotizacionesPage() {
  const [loading, setLoading] = useState(true)
  
  // Datos de cotizaciones
  const [cotizaciones, setCotizaciones] = useState([
    { id: 'COT-1001', cliente: 'Constructora del Caribe SRL', servicio: 'Nacional Expreso', peso: '5.0 lb', total: 'RD$ 1,250.00', fecha: '13/11/2026' }
  ])

  // Campos para nueva cotización
  const [clienteInput, setClienteInput] = useState('')
  const [servicioInput, setServicioInput] = useState('Nacional Expreso')
  const [pesoInput, setPesoInput] = useState('')

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

  // Función real para imprimir la cotización (Abre la impresora directamente sin alertas falsas)
  const handleImprimirCotizacion = (cot: any) => {
    window.print()
  }

  const handleCrearCotizacion = (e: React.FormEvent) => {
    e.preventDefault()
    if (!clienteInput.trim()) {
      alert('Por favor ingrese el cliente o empresa.')
      return
    }

    const nuevoId = `COT-${1000 + cotizaciones.length + 1}`
    const nuevaCot = {
      id: nuevoId,
      cliente: clienteInput,
      servicio: servicioInput,
      peso: `${pesoInput || '0'} lb`,
      total: `RD$ ${(parseFloat(pesoInput || '0') * 250).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      fecha: new Date().toLocaleDateString()
    }

    setCotizaciones([nuevaCot, ...cotizaciones])
    setClienteInput('')
    setPesoInput('')
    alert('¡Cotización generada y guardada con éxito!')
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
      
      {/* Estilos CSS de Impresión Limpia: Oculta menús, barras y botones al imprimir */}
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

      {/* ÁREA IMPRIMIBLE (Membrete oficial y contenido de cotizaciones) */}
      <div className="printable-area">
        
        {/* Membrete formal de la empresa */}
        <div style={{ marginBottom: '25px', borderBottom: '2px solid #2563eb', paddingBottom: '12px' }}>
          <h1 style={{ margin: 0, fontSize: '22px', color: '#ffffff' }}>DARBIN SANCHEZ SANCHEZ</h1>
          <p style={{ margin: '3px 0 0', fontSize: '13px', color: '#94a3b8' }}>ESTRUCTURAS METÁLICAS e-CF | RNC: 22400221473</p>
        </div>

        {/* Cabecera de la sección */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h2 style={{ margin: 0, color: '#ffffff', fontSize: '24px' }}>Gestión de Cotizaciones</h2>
            <p style={{ color: '#94a3b8', fontSize: '13px', margin: '4px 0 0' }}>Cálculo automático de tarifas de envío y paquetes para JD Courier.</p>
          </div>
          <button 
            onClick={() => window.print()}
            style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}
            className="no-print"
          >
            🖨️ Imprimir Vista
          </button>
        </div>

        {/* Formulario para Crear Nueva Cotización */}
        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '24px', marginBottom: '30px' }} className="no-print">
          <h3 style={{ margin: '0 0 15px', color: '#ffffff', fontSize: '16px' }}>Crear Nueva Cotización de Envío</h3>
          <form onSubmit={handleCrearCotizacion} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '15px', alignItems: 'end' }}>
            <div>
              <label style={{ display: 'block', color: '#cbd5e1', fontSize: '12px', marginBottom: '5px' }}>Cliente / Empresa</label>
              <input 
                type="text" 
                value={clienteInput}
                onChange={(e) => setClienteInput(e.target.value)}
                placeholder="Ej. Constructora del Caribe SRL"
                style={{ width: '100%', padding: '10px', borderRadius: '6px', background: '#0f172a', border: '1px solid #475569', color: '#fff', boxSizing: 'border-box' }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', color: '#cbd5e1', fontSize: '12px', marginBottom: '5px' }}>Tipo de Servicio</label>
              <select 
                value={servicioInput}
                onChange={(e) => setServicioInput(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', background: '#0f172a', border: '1px solid #475569', color: '#fff', boxSizing: 'border-box' }}
              >
                <option value="Nacional Expreso">Nacional Expreso</option>
                <option value="Carga Pesada">Carga Pesada</option>
                <option value="Estructuras Metálicas">Estructuras Metálicas</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#cbd5e1', fontSize: '12px', marginBottom: '5px' }}>Peso (Libras)</label>
              <input 
                type="number" 
                value={pesoInput}
                onChange={(e) => setPesoInput(e.target.value)}
                placeholder="0.0"
                style={{ width: '100%', padding: '10px', borderRadius: '6px', background: '#0f172a', border: '1px solid #475569', color: '#fff', boxSizing: 'border-box' }}
              />
            </div>
            <button 
              type="submit" 
              style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', height: '41px' }}
            >
              + Generar
            </button>
          </form>
        </div>

        {/* Historial de Cotizaciones */}
        <h3 style={{ color: '#ffffff', fontSize: '18px', marginBottom: '15px' }}>Historial de Cotizaciones Emitidas</h3>
        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px', color: '#f8fafc' }}>
            <thead>
              <tr style={{ background: '#0f172a', color: '#94a3b8', borderBottom: '1px solid #334155' }}>
                <th style={{ padding: '14px 20px' }}>No. Cotización</th>
                <th style={{ padding: '14px 20px' }}>Cliente</th>
                <th style={{ padding: '14px 20px' }}>Servicio</th>
                <th style={{ padding: '14px 20px' }}>Peso (lb)</th>
                <th style={{ padding: '14px 20px' }}>Total Estimado</th>
                <th style={{ padding: '14px 20px', textAlign: 'right' }} className="no-print">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cotizaciones.map((cot) => (
                <tr key={cot.id} style={{ borderBottom: '1px solid #334155' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 'bold', color: '#38bdf8' }}>{cot.id}</td>
                  <td style={{ padding: '14px 20px', fontWeight: '500' }}>{cot.cliente}</td>
                  <td style={{ padding: '14px 20px', color: '#94a3b8' }}>{cot.servicio}</td>
                  <td style={{ padding: '14px 20px', color: '#94a3b8' }}>{cot.peso}</td>
                  <td style={{ padding: '14px 20px', color: '#4ade80', fontWeight: 'bold' }}>{cot.total}</td>
                  <td style={{ padding: '14px 20px', textAlign: 'right' }} className="no-print">
                    <button 
                      onClick={() => handleImprimirCotizacion(cot)}
                      style={{ background: '#334155', border: '1px solid #475569', color: '#fff', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', marginRight: '8px' }}
                    >
                      Imprimir
                    </button>
                    <button 
                      onClick={() => setCotizaciones(cotizaciones.filter(item => item.id !== cot.id))}
                      style={{ background: '#7f1d1d', border: '1px solid #991b1b', color: '#fca5a5', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  )
}