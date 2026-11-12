'use client';
import React, { useState, useEffect } from 'react';

export default function ClientesPage() {
  const [rnc, setRnc] = useState('');
  const [nombre, setNombre] = useState('');
  const [clientes, setClientes] = useState([
    { rnc: '131000001', nombre: 'Constructora del Caribe SRL' },
    { rnc: '22400221473', nombre: 'JD Courier' }
  ]);

  useEffect(() => {
    const saved = localStorage.getItem('erp_clientes_db');
    if (saved) {
      try { setClientes(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, []);

  const guardarStorage = (nuevos: typeof clientes) => {
    setClientes(nuevos);
    localStorage.setItem('erp_clientes_db', JSON.stringify(nuevos));
  };

  const agregarCliente = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanRnc = rnc.trim();
    if (cleanRnc.length !== 9 && cleanRnc.length !== 11) {
      alert('⚠️ El RNC o Cédula debe tener 9 u 11 dígitos numéricos.');
      return;
    }
    if (!nombre.trim()) {
      alert('⚠️ Ingrese la Razón Social del cliente.');
      return;
    }
    const nuevos = [...clientes, { rnc: cleanRnc, nombre }];
    guardarStorage(nuevos);
    setRnc('');
    setNombre('');
  };

  const eliminarCliente = (index: number) => {
    const nuevos = clientes.filter((_, i) => i !== index);
    guardarStorage(nuevos);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ backgroundColor: '#0b1329', border: '1px solid #1e293b', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>Directorio de Clientes</h2>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.25rem 0 0 0' }}>Registro fiscal para facturación e-CF</p>
        </div>
        <button onClick={() => window.print()} style={{ backgroundColor: '#1e293b', color: '#60a5fa', border: '1px solid #334155', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>🖨️ Imprimir Directorio</button>
      </div>

      <div style={{ backgroundColor: '#0b1329', border: '1px solid #1e293b', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#34d399', margin: '0 0 1rem 0' }}>Registrar Nuevo Cliente</h3>
        <form onSubmit={agregarCliente} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '0.3rem' }}>RNC / Cédula</label>
            <input type="text" placeholder="Ej. 131000001" value={rnc} onChange={(e) => setRnc(e.target.value.replace(/\D/g, ''))} style={{ width: '100%', backgroundColor: '#070d1d', border: '1px solid #334155', borderRadius: '0.75rem', padding: '0.6rem', color: '#fff', outline: 'none', fontFamily: 'monospace' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '0.3rem' }}>Nombre / Razón Social</label>
            <input type="text" placeholder="Ej. Empresa SRL" value={nombre} onChange={(e) => setNombre(e.target.value)} style={{ width: '100%', backgroundColor: '#070d1d', border: '1px solid #334155', borderRadius: '0.75rem', padding: '0.6rem', color: '#fff', outline: 'none' }} />
          </div>
          <div>
            <button type="submit" style={{ width: '100%', backgroundColor: '#2563eb', border: 'none', borderRadius: '0.75rem', padding: '0.65rem', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>+ Guardar Cliente</button>
          </div>
        </form>
      </div>

      <div style={{ backgroundColor: '#0b1329', border: '1px solid #1e293b', borderRadius: '1rem', padding: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e293b', color: '#94a3b8', fontSize: '0.7rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '0.5rem' }}>RNC / Cédula</th>
              <th style={{ padding: '0.5rem' }}>Razón Social</th>
              <th style={{ padding: '0.5rem', textAlign: 'right' }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #1e293b' }}>
                <td style={{ padding: '0.75rem 0.5rem', fontFamily: 'monospace', fontWeight: 'bold', color: '#60a5fa' }}>{c.rnc}</td>
                <td style={{ padding: '0.75rem 0.5rem', fontWeight: 'bold' }}>{c.nombre}</td>
                <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>
                  <button onClick={() => eliminarCliente(i)} style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.2rem 0.6rem', borderRadius: '0.4rem', cursor: 'pointer', fontSize: '0.7rem' }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}