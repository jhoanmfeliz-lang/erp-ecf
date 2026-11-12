'use client';
import React, { useState, useEffect } from 'react';

export default function ProyectosPage() {
  const [nombreObra, setNombreObra] = useState('');
  const [cliente, setCliente] = useState('');
  const [presupuesto, setPresupuesto] = useState('');
  const [estado, setEstado] = useState('En Fabricación (Taller)');
  const [proyectos, setProyectos] = useState([
    { id: 'PRJ-501', obra: 'Nave Industrial Zona Franca', cliente: 'Constructora del Caribe SRL', presupuesto: '450,000.00', estado: 'Fabricación (Taller)' }
  ]);

  useEffect(() => {
    const saved = localStorage.getItem('erp_proyectos_db');
    if (saved) {
      try { setProyectos(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, []);

  const guardarStorage = (nuevos: typeof proyectos) => {
    setProyectos(nuevos);
    localStorage.setItem('erp_proyectos_db', JSON.stringify(nuevos));
  };

  const agregarProyecto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombreObra.trim() || !cliente.trim() || !presupuesto) {
      alert('⚠️ Complete el nombre de la obra, el cliente y el presupuesto.');
      return;
    }

    const nuevoPrj = {
      id: `PRJ-${Math.floor(100 + Math.random() * 900)}`,
      obra: nombreObra,
      cliente,
      presupuesto: Number(presupuesto).toLocaleString('en-US', { minimumFractionDigits: 2 }),
      estado
    };

    const nuevos = [nuevoPrj, ...proyectos];
    guardarStorage(nuevos);
    setNombreObra('');
    setCliente('');
    setPresupuesto('');
    alert(`✅ Proyecto ${nuevoPrj.id} registrado correctamente.`);
  };

  const eliminarProyecto = (index: number) => {
    const nuevos = proyectos.filter((_, i) => i !== index);
    guardarStorage(nuevos);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ backgroundColor: '#0b1329', border: '1px solid #1e293b', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>Gestión de Proyectos y Estructuras</h2>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.25rem 0 0 0' }}>Control de obras y seguimiento de fabricación para Darbin Sanchez Sanchez</p>
        </div>
        <button onClick={() => window.print()} style={{ backgroundColor: '#1e293b', color: '#60a5fa', border: '1px solid #334155', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>🖨️ Imprimir Obras</button>
      </div>

      {/* Formulario de Registro */}
      <div style={{ backgroundColor: '#0b1329', border: '1px solid #1e293b', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#34d399', margin: '0 0 1rem 0' }}>Registrar Nueva Obra / Proyecto Metálico</h3>
        <form onSubmit={agregarProyecto} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '0.3rem' }}>Nombre de la Obra / Estructura</label>
            <input type="text" placeholder="Ej. Mezzanine Comercial Santiago" value={nombreObra} onChange={(e) => setNombreObra(e.target.value)} style={{ width: '100%', backgroundColor: '#070d1d', border: '1px solid #334155', borderRadius: '0.75rem', padding: '0.6rem', color: '#fff', outline: 'none' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '0.3rem' }}>Cliente / Contratante</label>
            <input type="text" placeholder="Ej. Constructora del Caribe SRL" value={cliente} onChange={(e) => setCliente(e.target.value)} style={{ width: '100%', backgroundColor: '#070d1d', border: '1px solid #334155', borderRadius: '0.75rem', padding: '0.6rem', color: '#fff', outline: 'none' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '0.3rem' }}>Presupuesto Estimado (DOP)</label>
            <input type="number" step="0.01" placeholder="0.00" value={presupuesto} onChange={(e) => setPresupuesto(e.target.value)} style={{ width: '100%', backgroundColor: '#070d1d', border: '1px solid #334155', borderRadius: '0.75rem', padding: '0.6rem', color: '#fff', outline: 'none' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '0.3rem' }}>Estado de la Obra</label>
            <select value={estado} onChange={(e) => setEstado(e.target.value)} style={{ width: '100%', backgroundColor: '#070d1d', border: '1px solid #334155', borderRadius: '0.75rem', padding: '0.6rem', color: '#fff', outline: 'none' }}>
              <option value="Diseño y Planos">Diseño y Planos</option>
              <option value="Fabricación (Taller)">Fabricación (Taller)</option>
              <option value="Montaje en Campo">Montaje en Campo</option>
              <option value="Completado / Facturado">Completado / Facturado</option>
            </select>
          </div>

          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" style={{ backgroundColor: '#2563eb', border: 'none', borderRadius: '0.75rem', padding: '0.7rem 2rem', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.8rem' }}>+ Registrar Proyecto Metálico</button>
          </div>
        </form>
      </div>

      {/* Tabla de Proyectos */}
      <div style={{ backgroundColor: '#0b1329', border: '1px solid #1e293b', borderRadius: '1rem', padding: '1.5rem' }}>
        <h3 style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#60a5fa', margin: '0 0 1rem 0' }}>Listado de Obras Activas</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e293b', color: '#94a3b8', fontSize: '0.7rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '0.5rem' }}>ID Obra</th>
              <th style={{ padding: '0.5rem' }}>Proyecto / Estructura</th>
              <th style={{ padding: '0.5rem' }}>Cliente</th>
              <th style={{ padding: '0.5rem' }}>Presupuesto</th>
              <th style={{ padding: '0.5rem' }}>Estado</th>
              <th style={{ padding: '0.5rem', textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proyectos.map((p, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #1e293b' }}>
                <td style={{ padding: '0.75rem 0.5rem', fontFamily: 'monospace', fontWeight: 'bold', color: '#60a5fa' }}>{p.id}</td>
                <td style={{ padding: '0.75rem 0.5rem', fontWeight: 'bold' }}>{p.obra}</td>
                <td style={{ padding: '0.75rem 0.5rem', color: '#94a3b8' }}>{p.cliente}</td>
                <td style={{ padding: '0.75rem 0.5rem', fontFamily: 'monospace', color: '#34d399', fontWeight: 'bold' }}>RD$ {p.presupuesto}</td>
                <td style={{ padding: '0.75rem 0.5rem', color: '#f59e0b', fontWeight: 'bold' }}>{p.estado}</td>
                <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>
                  <button onClick={() => eliminarProyecto(i)} style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.2rem 0.6rem', borderRadius: '0.4rem', cursor: 'pointer', fontSize: '0.7rem' }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}