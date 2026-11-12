'use client';
import React, { useState, useEffect } from 'react';

export default function CotizacionesPage() {
  const [cliente, setCliente] = useState('');
  const [pesoLb, setPesoLb] = useState('');
  const [tipoEnvio, setTipoEnvio] = useState('Nacional Expreso');
  const [cotizaciones, setCotizaciones] = useState([
    { id: 'COT-1001', cliente: 'Constructora del Caribe SRL', peso: '5.0', tipo: 'Nacional Expreso', total: '1,250.00', fecha: '2026-11-12' }
  ]);

  useEffect(() => {
    const saved = localStorage.getItem('erp_cotizaciones_db');
    if (saved) {
      try { setCotizaciones(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, []);

  const guardarStorage = (nuevos: typeof cotizaciones) => {
    setCotizaciones(nuevos);
    localStorage.setItem('erp_cotizaciones_db', JSON.stringify(nuevos));
  };

  const pesoNum = parseFloat(pesoLb) || 0;
  let tarifaBase = 200;
  if (tipoEnvio === 'Aéreo Internacional') tarifaBase = 450;
  if (tipoEnvio === 'Marítimo Carga Pesada') tarifaBase = 100;

  const costoTotal = pesoNum > 0 ? (tarifaBase + (pesoNum * 180)) * 1.18 : 0;

  const crearCotizacion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cliente.trim() || pesoNum <= 0) {
      alert('⚠️ Ingrese el nombre del cliente y un peso válido en libras.');
      return;
    }

    const nuevaCot = {
      id: `COT-${Math.floor(1000 + Math.random() * 9000)}`,
      cliente,
      peso: pesoNum.toFixed(1),
      tipo: tipoEnvio,
      total: costoTotal.toFixed(2),
      fecha: new Date().toISOString().split('T')[0]
    };

    const nuevos = [nuevaCot, ...cotizaciones];
    guardarStorage(nuevos);
    setCliente('');
    setPesoLb('');
    alert(`✅ Cotización ${nuevaCot.id} generada con éxito por RD$ ${nuevaCot.total}`);
  };

  const eliminarCotizacion = (index: number) => {
    const nuevos = cotizaciones.filter((_, i) => i !== index);
    guardarStorage(nuevos);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ backgroundColor: '#0b1329', border: '1px solid #1e293b', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>Gestión de Cotizaciones</h2>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.25rem 0 0 0' }}>Cálculo automático de tarifas de envío y paquetes para JD Courier</p>
        </div>
        <button onClick={() => window.print()} style={{ backgroundColor: '#1e293b', color: '#60a5fa', border: '1px solid #334155', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>🖨️ Imprimir Cotizaciones</button>
      </div>

      <div style={{ backgroundColor: '#0b1329', border: '1px solid #1e293b', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#34d399', margin: '0 0 1rem 0' }}>Crear Nueva Cotización de Envío</h3>
        <form onSubmit={crearCotizacion} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '0.3rem' }}>Cliente / Empresa</label>
            <input type="text" placeholder="Ej. Juan Pérez o Empresa SRL" value={cliente} onChange={(e) => setCliente(e.target.value)} style={{ width: '100%', backgroundColor: '#070d1d', border: '1px solid #334155', borderRadius: '0.75rem', padding: '0.6rem', color: '#fff', outline: 'none' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '0.3rem' }}>Tipo de Servicio</label>
            <select value={tipoEnvio} onChange={(e) => setTipoEnvio(e.target.value)} style={{ width: '100%', backgroundColor: '#070d1d', border: '1px solid #334155', borderRadius: '0.75rem', padding: '0.6rem', color: '#fff', outline: 'none' }}>
              <option value="Nacional Expreso">Nacional Expreso</option>
              <option value="Aéreo Internacional">Aéreo Internacional</option>
              <option value="Marítimo Carga Pesada">Marítimo Carga Pesada</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '0.3rem' }}>Peso (Libras)</label>
            <input type="number" step="0.1" placeholder="0.0" value={pesoLb} onChange={(e) => setPesoLb(e.target.value)} style={{ width: '100%', backgroundColor: '#070d1d', border: '1px solid #334155', borderRadius: '0.75rem', padding: '0.6rem', color: '#fff', outline: 'none' }} />
          </div>

          <div style={{ backgroundColor: '#070d1d', border: '1px solid #1e293b', borderRadius: '0.75rem', padding: '0.6rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>Estimado Total (Inc. ITBIS):</span>
            <span style={{ fontSize: '0.9rem', color: '#34d399', fontWeight: 'bold' }}>RD$ {costoTotal.toFixed(2)}</span>
          </div>

          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" style={{ backgroundColor: '#2563eb', border: 'none', borderRadius: '0.75rem', padding: '0.7rem 2rem', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.8rem' }}>+ Generar y Guardar Cotización</button>
          </div>
        </form>
      </div>

      <div style={{ backgroundColor: '#0b1329', border: '1px solid #1e293b', borderRadius: '1rem', padding: '1.5rem' }}>
        <h3 style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#60a5fa', margin: '0 0 1rem 0' }}>Historial de Cotizaciones Emitidas</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e293b', color: '#94a3b8', fontSize: '0.7rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '0.5rem' }}>No. Cotización</th>
              <th style={{ padding: '0.5rem' }}>Cliente</th>
              <th style={{ padding: '0.5rem' }}>Servicio</th>
              <th style={{ padding: '0.5rem' }}>Peso (Lb)</th>
              <th style={{ padding: '0.5rem' }}>Total Estimado</th>
              <th style={{ padding: '0.5rem', textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cotizaciones.map((cot, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #1e293b' }}>
                <td style={{ padding: '0.75rem 0.5rem', fontFamily: 'monospace', fontWeight: 'bold', color: '#60a5fa' }}>{cot.id}</td>
                <td style={{ padding: '0.75rem 0.5rem', fontWeight: 'bold' }}>{cot.cliente}</td>
                <td style={{ padding: '0.75rem 0.5rem', color: '#94a3b8' }}>{cot.tipo}</td>
                <td style={{ padding: '0.75rem 0.5rem', fontFamily: 'monospace' }}>{cot.peso} lb</td>
                <td style={{ padding: '0.75rem 0.5rem', fontFamily: 'monospace', color: '#34d399', fontWeight: 'bold' }}>RD$ {cot.total}</td>
                <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', display: 'flex', gap: '0.5rem', justifyContent: 'end' }}>
                  <button onClick={() => alert(`🖨️ Imprimiendo detalles de la cotización ${cot.id}...`)} style={{ backgroundColor: '#1e293b', color: '#60a5fa', border: '1px solid #334155', padding: '0.2rem 0.5rem', borderRadius: '0.4rem', cursor: 'pointer', fontSize: '0.7rem' }}>Imprimir</button>
                  <button onClick={() => eliminarCotizacion(i)} style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.2rem 0.5rem', borderRadius: '0.4rem', cursor: 'pointer', fontSize: '0.7rem' }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}