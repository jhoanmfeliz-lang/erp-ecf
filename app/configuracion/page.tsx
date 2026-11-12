'use client';
import React, { useState } from 'react';

export default function ConfiguracionPage() {
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [msg, setMsg] = useState({ text: '', type: '' });

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg({ text: '', type: '' });

    // Contraseña actual guardada o la por defecto 'admin1473'
    const storedPass = localStorage.getItem('erp_user_password') || 'admin1473';

    // 1. Validar contraseña actual
    if (currentPass !== storedPass) {
      setMsg({ text: 'La contraseña actual es incorrecta.', type: 'error' });
      return;
    }

    // 2. Validar requisitos: Mínimo 8 caracteres, al menos 1 mayúscula y al menos 1 número
    const hasMinLength = newPass.length >= 8;
    const hasUppercase = /[A-Z]/.test(newPass);
    const hasNumber = /[0-9]/.test(newPass);

    if (!hasMinLength || !hasUppercase || !hasNumber) {
      setMsg({ 
        text: 'La nueva contraseña debe tener mínimo 8 caracteres, al menos una letra mayúscula y al menos un número.', 
        type: 'error' 
      });
      return;
    }

    // 3. Validar que la confirmación coincida
    if (newPass !== confirmPass) {
      setMsg({ text: 'La nueva contraseña y la confirmación no coinciden.', type: 'error' });
      return;
    }

    // Guardar la nueva contraseña de forma persistente
    localStorage.setItem('erp_user_password', newPass);
    
    setMsg({ 
      text: '¡Contraseña actualizada con éxito! Ya puede usar su nueva contraseña al cerrar sesión.', 
      type: 'success' 
    });
    
    // Limpiar campos
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
  };

  return (
    <div style={{ maxWidth: '650px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Configuración del Sistema</h2>

      <div style={{ backgroundColor: '#0b1329', padding: '2rem', borderRadius: '0.75rem', border: '1px solid #1e293b' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: '#60a5fa' }}>🔑 Cambiar Contraseña</h3>

        {msg.text && (
          <div style={{ 
            marginBottom: '1.2rem', 
            padding: '0.75rem 1rem', 
            borderRadius: '0.5rem', 
            fontSize: '0.85rem',
            backgroundColor: msg.type === 'error' ? 'rgba(220, 38, 38, 0.2)' : 'rgba(16, 185, 129, 0.2)',
            border: `1px solid ${msg.type === 'error' ? '#dc2626' : '#10b981'}`,
            color: msg.type === 'error' ? '#fca5a5' : '#a7f3d0'
          }}>
            {msg.text}
          </div>
        )}

        <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          
          {/* Contraseña Actual */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem', color: '#94a3b8' }}>Contraseña Actual</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input 
                type={showCurrent ? 'text' : 'password'}
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 2.5rem 0.75rem 0.75rem', backgroundColor: '#070d1d', border: '1px solid #1e293b', borderRadius: '0.5rem', color: '#ffffff', outline: 'none', boxSizing: 'border-box' }}
                placeholder="Ingrese la contraseña actual"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                style={{ position: 'absolute', right: '0.75rem', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.1rem' }}
              >
                {showCurrent ? '👁️' : '🙈'}
              </button>
            </div>
          </div>

          {/* Nueva Contraseña */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem', color: '#94a3b8' }}>Nueva Contraseña</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input 
                type={showNew ? 'text' : 'password'}
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 2.5rem 0.75rem 0.75rem', backgroundColor: '#070d1d', border: '1px solid #1e293b', borderRadius: '0.5rem', color: '#ffffff', outline: 'none', boxSizing: 'border-box' }}
                placeholder="Mínimo 8 dígitos, 1 mayúscula y 1 número"
                required
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                style={{ position: 'absolute', right: '0.75rem', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.1rem' }}
              >
                {showNew ? '👁️' : '🙈'}
              </button>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.3rem', display: 'block' }}>
              * Requisitos: Mínimo 8 dígitos, al menos 1 mayúscula y 1 número.
            </span>
          </div>

          {/* Confirmar Nueva Contraseña */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem', color: '#94a3b8' }}>Confirmar Nueva Contraseña</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input 
                type={showConfirm ? 'text' : 'password'}
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 2.5rem 0.75rem 0.75rem', backgroundColor: '#070d1d', border: '1px solid #1e293b', borderRadius: '0.5rem', color: '#ffffff', outline: 'none', boxSizing: 'border-box' }}
                placeholder="Repita la nueva contraseña"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                style={{ position: 'absolute', right: '0.75rem', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.1rem' }}
              >
                {showConfirm ? '👁️' : '🙈'}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            style={{ padding: '0.75rem', backgroundColor: '#2563eb', color: '#ffffff', fontWeight: 'bold', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', marginTop: '0.5rem', fontSize: '0.95rem' }}
          >
            Actualizar Contraseña
          </button>
        </form>
      </div>
    </div>
  );
}