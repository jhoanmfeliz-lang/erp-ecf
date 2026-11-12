'use client';
import React, { useState } from 'react';

export default function FacturacionPage() {
  const [tipoEcf, setTipoEcf] = useState('31');
  const [clienteRnc, setClienteRnc] = useState('');
  const [montoNeto, setMontoNeto] = useState('');

  // Cálculos fiscales automáticos (ITBIS 18%)
  const netoNum = parseFloat(montoNeto) || 0;
  const itbisNum = netoNum * 0.18;
  const totalNum = netoNum + itbisNum;

  const emitirEcf = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clienteRnc || netoNum <= 0) {
      alert('⚠️ Complete el RNC del cliente y un monto válido.');
      return;
    }
    alert(`✅ e-CF Tipo ${tipoEcf} transmitido exitosamente.\nCliente: ${clienteRnc}\nTotal con ITBIS: RD$ ${totalNum.toFixed(2)}`);
    setClienteRnc('');
    setMontoNeto('');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ backgroundColor: '#0b1329', border: '1px solid #1e293b', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>
            Emisión de Comprobantes Fiscales Electrónicos (e-CF)
          </h2>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.25rem 0 0 0' }}>
            Generación con cálculo automático de ITBIS (18%) para la DGII
          </p>
        </div>
        <button onClick={() => window.print()} style={{ backgroundColor: '#1e293b', color: '#60a5fa', border: '1px solid #334155', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>🖨️ Imprimir Factura</button>
      </div>

      <div style={{ backgroundColor: '#0b1329', border: '1px solid #1e293b', borderRadius: '1rem', padding: '1.5rem' }}>
        <form onSubmit={emitirEcf} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.2rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Tipo de e-CF</label>
            <select 
              value={tipoEcf} 
              onChange={(e) => setTipoEcf(e.target.value)}
              style={{ width: '100%', backgroundColor: '#070d1d', border: '1px solid #334155', borderRadius: '0.75rem', padding: '0.6rem 0.8rem', color: '#ffffff', fontSize: '0.8rem', outline: 'none' }}
            >
              <option value="31">E31 - Factura de Crédito Fiscal Electrónica</option>
              <option value="32">E32 - Factura de Consumo Electrónica</option>
              <option value="33">E33 - Nota de Débito Electrónica</option>
              <option value="34">E34 - Nota de Crédito Electrónica</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.3rem' }}>RNC / Cédula del Cliente</label>
            <input 
              type="text" 
              placeholder="Ej. 131000001"
              value={clienteRnc}
              onChange={(e) => setClienteRnc(e.target.value.replace(/\D/g, ''))}
              style={{ width: '100%', backgroundColor: '#070d1d', border: '1px solid #334155', borderRadius: '0.75rem', padding: '0.6rem 0.8rem', color: '#ffffff', fontSize: '0.8rem', outline: 'none', boxSizing: 'border-box', fontFamily: 'monospace' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Monto Neto (DOP)</label>
            <input 
              type="number" 
              step="0.01"
              placeholder="0.00"
              value={montoNeto}
              onChange={(e) => setMontoNeto(e.target.value)}
              style={{ width: '100%', backgroundColor: '#070d1d', border: '1px solid #334155', borderRadius: '0.75rem', padding: '0.6rem 0.8rem', color: '#ffffff', fontSize: '0.8rem', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ backgroundColor: '#070d1d', border: '1px solid #1e293b', borderRadius: '0.75rem', padding: '0.8rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>ITBIS (18%): <span style={{ color: '#f8fafc', fontWeight: 'bold' }}>RD$ {itbisNum.toFixed(2)}</span></div>
            <div style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 'bold', marginTop: '0.2rem' }}>Total: RD$ {totalNum.toFixed(2)}</div>
          </div>

          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button 
              type="submit"
              style={{ backgroundColor: '#10b981', border: 'none', borderRadius: '0.75rem', padding: '0.75rem 2rem', color: '#ffffff', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer' }}
            >
              🚀 Transmitir e-CF a DGII
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}