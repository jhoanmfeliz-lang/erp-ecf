'use client';
import React, { useState, useEffect } from 'react';

export default function VehiculosPage() {
  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState('');
  const [estadoUnidad, setEstadoUnidad] = useState('Activo / Ruta');
  const [vehiculos, setVehiculos] = useState([
    { placa: 'L402192', modelo: 'Daihatsu Hijet Cargo', estado: 'Activo / Ruta Norte' }
  ]);

  useEffect(() => {
    const saved = localStorage.getItem('erp_vehiculos_db');
    if (saved) {
      try { setVehiculos(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, []);

  const guardarStorage = (nuevos: typeof vehiculos) => {
    setVehiculos(nuevos);
    localStorage.setItem('erp_vehiculos_db', JSON.stringify(nuevos));
  };

  const agregarVehiculo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!placa.trim() || !modelo.trim()) {
      alert('⚠️ Debe ingresar la placa y el modelo del vehículo.');
      return;
    }
    const nuevos = [...vehiculos, { placa: placa.toUpperCase(), modelo, estado: estadoUnidad }];
    guardarStorage(nuevos);
    setPlaca('');
    setModelo('');
  };

  const eliminarVehiculo = (index: number) => {
    const nuevos = vehiculos.filter((_, i) => i !== index);
    guardarStorage(nuevos);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ backgroundColor: '#0b1329', border: '1px solid #1e293b', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>Unidades de Vehículo</h2>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.25rem 0 0 0' }}>Flotilla de transporte y entrega JD Courier</p>
        </div>
        <button onClick={() => window.print()} style={{ backgroundColor: '#1e293b', color: '#60a5fa', border: '1px solid #334155', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>🖨️ Imprimir Listado</button>
      </div>

      <div style={{ backgroundColor: '#0b1329', border: '1px solid #1e293b', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#34d399', margin: '0 0 1rem 0' }}>Registrar Nueva Unidad</h3>
        <form onSubmit={agregarVehiculo} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '0.3rem' }}>Placa</label>
            <input type="text" placeholder="Ej. A123456" value={placa} onChange={(e) => setPlaca(e.target.value)} style={{ width: '100%', backgroundColor: '#070d1d', border: '1px solid #334155', borderRadius: '0.75rem', padding: '0.6rem', color: '#fff', outline: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '0.3rem' }}>Modelo / Marca</label>
            <input type="text" placeholder="Ej. Hyundai Porter" value={modelo} onChange={(e) => setModelo(e.target.value)} style={{ width: '100%', backgroundColor: '#070d1d', border: '1px solid #334155', borderRadius: '0.75rem', padding: '0.6rem', color: '#fff', outline: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '0.3rem' }}>Estado</label>
            <select value={estadoUnidad} onChange={(e) => setEstadoUnidad(e.target.value)} style={{ width: '100%', backgroundColor: '#070d1d', border: '1px solid #334155', borderRadius: '0.75rem', padding: '0.6rem', color: '#fff', outline: 'none' }}>
              <option value="Activo / Ruta">Activo / Ruta</option>
              <option value="Disponible">Disponible</option>
              <option value="En Mantenimiento">En Mantenimiento</option>
            </select>
          </div>
          <div>
            <button type="submit" style={{ width: '100%', backgroundColor: '#2563eb', border: 'none', borderRadius: '0.75rem', padding: '0.65rem', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>+ Registrar Unidad</button>
          </div>
        </form>
      </div>

      <div style={{ backgroundColor: '#0b1329', border: '1px solid #1e293b', borderRadius: '1rem', padding: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e293b', color: '#94a3b8', fontSize: '0.7rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '0.5rem' }}>Placa</th>
              <th style={{ padding: '0.5rem' }}>Modelo</th>
              <th style={{ padding: '0.5rem' }}>Estado</th>
              <th style={{ padding: '0.5rem', textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vehiculos.map((v, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #1e293b' }}>
                <td style={{ padding: '0.75rem 0.5rem', fontFamily: 'monospace', fontWeight: 'bold', color: '#60a5fa' }}>{v.placa}</td>
                <td style={{ padding: '0.75rem 0.5rem', fontWeight: 'bold' }}>{v.modelo}</td>
                <td style={{ padding: '0.75rem 0.5rem', color: '#34d399' }}>{v.estado}</td>
                <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>
                  <button onClick={() => eliminarVehiculo(i)} style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.2rem 0.6rem', borderRadius: '0.4rem', cursor: 'pointer', fontSize: '0.7rem' }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}