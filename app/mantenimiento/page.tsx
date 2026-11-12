'use client';
import React, { useState, useEffect } from 'react';

export default function MantenimientoPage() {
  const [unidad, setUnidad] = useState('');
  const [tipo, setTipo] = useState('');
  const [costo, setCosto] = useState('');
  const [mantenimientos, setMantenimientos] = useState([
    { unidad: 'L402192', tipo: 'Cambio de Aceite y Filtros', fecha: '2026-11-10', costo: '3500.00' }
  ]);

  useEffect(() => {
    const saved = localStorage.getItem('erp_mantenimiento_db');
    if (saved) {
      try { setMantenimientos(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, []);

  const guardarStorage = (nuevos: typeof mantenimientos) => {
    setMantenimientos(nuevos);
    localStorage.setItem('erp_mantenimiento_db', JSON.stringify(nuevos));
  };

  const agregarMantenimiento = (e: React.FormEvent) => {
    e.preventDefault();
    if (!unidad.trim() || !tipo.trim() || !costo) {
      alert('⚠️ Complete los campos de unidad, tipo de servicio y costo.');
      return;
    }
    const fechaActual = new Date().toISOString().split('T')[0];
    const nuevos = [...mantenimientos, { unidad: unidad.toUpperCase(), tipo, fecha: fechaActual, costo: Number(costo).toFixed(2) }];
    guardarStorage(nuevos);
    setUnidad('');
    setTipo('');
    setCosto('');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ backgroundColor: '#0b1329', border: '1px solid #1e293b', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>Mantenimiento de Flotilla</h2>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.25rem 0 0 0' }}>Registro de reparaciones técnicas</p>
        </div>
        <button onClick={() => window.print()} style={{ backgroundColor: '#1e293b', color: '#60a5fa', border: '1px solid #334155', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>🖨️ Imprimir Reporte</button>
      </div>

      <div style={{ backgroundColor: '#0b1329', border: '1px solid #1e293b', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#34d399', margin: '0 0 1rem 0' }}>Nuevo Registro de Mantenimiento</h3>
        <form onSubmit={agregarMantenimiento} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '0.3rem' }}>Placa / Unidad</label>
            <input type="text" placeholder="Ej. L402192" value={unidad} onChange={(e) => setUnidad(e.target.value)} style={{ width: '100%', backgroundColor: '#070d1d', border: '1px solid #334155', borderRadius: '0.75rem', padding: '0.6rem', color: '#fff', outline: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '0.3rem' }}>Trabajo Realizado</label>
            <input type="text" placeholder="Ej. Frenos y Bandas" value={tipo} onChange={(e) => setTipo(e.target.value)} style={{ width: '100%', backgroundColor: '#070d1d', border: '1px solid #334155', borderRadius: '0.75rem', padding: '0.6rem', color: '#fff', outline: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '0.3rem' }}>Costo (DOP)</label>
            <input type="number" step="0.01" placeholder="0.00" value={costo} onChange={(e) => setCosto(e.target.value)} style={{ width: '100%', backgroundColor: '#070d1d', border: '1px solid #334155', borderRadius: '0.75rem', padding: '0.6rem', color: '#fff', outline: 'none' }} />
          </div>
          <div>
            <button type="submit" style={{ width: '100%', backgroundColor: '#2563eb', border: 'none', borderRadius: '0.75rem', padding: '0.65rem', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>+ Registrar Mantenimiento</button>
          </div>
        </form>
      </div>

      <div style={{ backgroundColor: '#0b1329', border: '1px solid #1e293b', borderRadius: '1rem', padding: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e293b', color: '#94a3b8', fontSize: '0.7rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '0.5rem' }}>Unidad / Placa</th>
              <th style={{ padding: '0.5rem' }}>Trabajo Realizado</th>
              <th style={{ padding: '0.5rem' }}>Fecha</th>
              <th style={{ padding: '0.5rem' }}>Costo</th>
            </tr>
          </thead>
          <tbody>
            {mantenimientos.map((m, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #1e293b' }}>
                <td style={{ padding: '0.75rem 0.5rem', fontFamily: 'monospace', fontWeight: 'bold', color: '#60a5fa' }}>{m.unidad}</td>
                <td style={{ padding: '0.75rem 0.5rem', fontWeight: 'bold' }}>{m.tipo}</td>
                <td style={{ padding: '0.75rem 0.5rem', color: '#94a3b8' }}>{m.fecha}</td>
                <td style={{ padding: '0.75rem 0.5rem', fontFamily: 'monospace', color: '#f59e0b', fontWeight: 'bold' }}>RD$ {Number(m.costo).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}