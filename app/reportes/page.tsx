'use client';
import React from 'react';

export default function ReportesPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ backgroundColor: '#0b1329', border: '1px solid #1e293b', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>
            Reportes Fiscales (607 / 608)
          </h2>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.25rem 0 0 0' }}>
            Resumen de ventas de bienes y servicios y anulaciones de comprobantes
          </p>
        </div>
        <button onClick={() => window.print()} style={{ backgroundColor: '#1e293b', color: '#60a5fa', border: '1px solid #334155', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>🖨️ Imprimir Reportes</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <div style={{ backgroundColor: '#0b1329', border: '1px solid #1e293b', borderRadius: '1rem', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '0.9rem', color: '#60a5fa', margin: '0 0 0.5rem 0' }}>Formato 607</h3>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '1rem' }}>Relación de ventas de bienes y servicios por período mensual.</p>
          <button onClick={() => alert('📥 Generando archivo TXT del formato 607 para la DGII...')} style={{ backgroundColor: '#2563eb', border: 'none', borderRadius: '0.5rem', padding: '0.5rem 1rem', color: '#fff', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}>
            📥 Descargar TXT 607
          </button>
        </div>

        <div style={{ backgroundColor: '#0b1329', border: '1px solid #1e293b', borderRadius: '1rem', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '0.9rem', color: '#f59e0b', margin: '0 0 0.5rem 0' }}>Formato 608</h3>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '1rem' }}>Reporte de comprobantes anulados de e-CF.</p>
          <button onClick={() => alert('📥 Generando archivo TXT del formato 608 para la DGII...')} style={{ backgroundColor: '#2563eb', border: 'none', borderRadius: '0.5rem', padding: '0.5rem 1rem', color: '#fff', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}>
            📥 Descargar TXT 608
          </button>
        </div>
      </div>
    </div>
  );
}