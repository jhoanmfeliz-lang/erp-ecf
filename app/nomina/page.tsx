'use client';
import React, { useState, useEffect } from 'react';

export default function NominaPage() {
  const [nombre, setNombre] = useState('');
  const [cargo, setCargo] = useState('');
  const [salario, setSalario] = useState('');
  const [empleados, setEmpleados] = useState([
    { nombre: 'Carlos Gomez', cargo: 'Chofer Repartidor', salario: '35000.00' },
    { nombre: 'Mariana Peguero', cargo: 'Atención al Cliente', salario: '28000.00' }
  ]);

  useEffect(() => {
    const saved = localStorage.getItem('erp_nomina_db');
    if (saved) {
      try { setEmpleados(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, []);

  const guardarStorage = (nuevos: typeof empleados) => {
    setEmpleados(nuevos);
    localStorage.setItem('erp_nomina_db', JSON.stringify(nuevos));
  };

  const agregarEmpleado = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !salario) {
      alert('⚠️ Ingrese el nombre y el salario del colaborador.');
      return;
    }
    const nuevos = [...empleados, { nombre, cargo: cargo || 'Colaborador General', salario: Number(salario).toFixed(2) }];
    guardarStorage(nuevos);
    setNombre('');
    setCargo('');
    setSalario('');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ backgroundColor: '#0b1329', border: '1px solid #1e293b', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>Nómina Personal</h2>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.25rem 0 0 0' }}>Control de colaboradores y pagos</p>
        </div>
        <button onClick={() => window.print()} style={{ backgroundColor: '#1e293b', color: '#60a5fa', border: '1px solid #334155', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>🖨️ Imprimir Nómina</button>
      </div>

      <div style={{ backgroundColor: '#0b1329', border: '1px solid #1e293b', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#34d399', margin: '0 0 1rem 0' }}>Registrar Colaborador</h3>
        <form onSubmit={agregarEmpleado} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '0.3rem' }}>Nombre Completo</label>
            <input type="text" placeholder="Ej. Juan Pérez" value={nombre} onChange={(e) => setNombre(e.target.value)} style={{ width: '100%', backgroundColor: '#070d1d', border: '1px solid #334155', borderRadius: '0.75rem', padding: '0.6rem', color: '#fff', outline: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '0.3rem' }}>Cargo</label>
            <input type="text" placeholder="Ej. Administrador" value={cargo} onChange={(e) => setCargo(e.target.value)} style={{ width: '100%', backgroundColor: '#070d1d', border: '1px solid #334155', borderRadius: '0.75rem', padding: '0.6rem', color: '#fff', outline: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '0.3rem' }}>Salario Base (DOP)</label>
            <input type="number" step="0.01" placeholder="0.00" value={salario} onChange={(e) => setSalario(e.target.value)} style={{ width: '100%', backgroundColor: '#070d1d', border: '1px solid #334155', borderRadius: '0.75rem', padding: '0.6rem', color: '#fff', outline: 'none' }} />
          </div>
          <div>
            <button type="submit" style={{ width: '100%', backgroundColor: '#2563eb', border: 'none', borderRadius: '0.75rem', padding: '0.65rem', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>+ Agregar Empleado</button>
          </div>
        </form>
      </div>

      <div style={{ backgroundColor: '#0b1329', border: '1px solid #1e293b', borderRadius: '1rem', padding: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e293b', color: '#94a3b8', fontSize: '0.7rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '0.5rem' }}>Colaborador</th>
              <th style={{ padding: '0.5rem' }}>Cargo</th>
              <th style={{ padding: '0.5rem' }}>Salario Base</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((emp, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #1e293b' }}>
                <td style={{ padding: '0.75rem 0.5rem', fontWeight: 'bold' }}>{emp.nombre}</td>
                <td style={{ padding: '0.75rem 0.5rem', color: '#94a3b8' }}>{emp.cargo}</td>
                <td style={{ padding: '0.75rem 0.5rem', fontFamily: 'monospace', color: '#34d399', fontWeight: 'bold' }}>RD$ {Number(emp.salario).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}