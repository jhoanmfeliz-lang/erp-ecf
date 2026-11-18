'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Users, 
  FileText, 
  FileSpreadsheet, 
  Truck, 
  ChevronDown, 
  ChevronUp, 
  BarChart3, 
  Moon, 
  Sun 
} from 'lucide-react'

export default function Sidebar() {
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <aside style={{ 
      width: '280px', 
      background: '#0f172a', 
      borderRight: '1px solid #1e293b', 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      padding: '20px',
      boxSizing: 'border-box',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      flexShrink: 0
    }}>
      
      {/* Perfil del Usuario */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px', paddingBottom: '15px', borderBottom: '1px solid #1e293b' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>
          D
        </div>
        <div>
          <h4 style={{ margin: 0, color: '#f8fafc', fontSize: '15px' }}>Darwin</h4>
          <span style={{ fontSize: '12px', color: '#38bdf8' }}>● Conectado</span>
        </div>
      </div>

      {/* Navegación Principal */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        
        <Link href="/clientes" style={navItemStyle}>
          <Users size={18} /> Clientes
        </Link>

        <Link href="/facturacion" style={navItemStyle}>
          <FileText size={18} /> Facturación
        </Link>

        <Link href="/cotizaciones" style={navItemStyle}>
          <FileSpreadsheet size={18} /> Cotizaciones
        </Link>

        <Link href="/vehiculos" style={navItemStyle}>
          <Truck size={18} /> Unidades de Vehículos
        </Link>

        {/* Botón Más Opciones (Desplegable) */}
        <div>
          <button 
            onClick={() => setIsMoreOpen(!isMoreOpen)}
            style={{ ...navItemStyle, width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              Más Opciones
            </span>
            {isMoreOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {/* Submenú desplegable */}
          {isMoreOpen && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: '15px', marginTop: '6px', borderLeft: '2px solid #334155' }}>
              <Link href="/reportes" style={{ ...subNavItemStyle }}>
                <BarChart3 size={16} /> Reportes
              </Link>

              {/* Modo Oscuro / Claro al final del despliegue */}
              <button 
                onClick={toggleDarkMode}
                style={{ ...subNavItemStyle, width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
              >
                {isDarkMode ? <Moon size={16} /> : <Sun size={16} />} 
                {isDarkMode ? 'Modo Oscuro' : 'Modo Claro'}
              </button>
            </div>
          )}
        </div>

      </nav>

    </aside>
  )
}

const navItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 14px',
  borderRadius: '8px',
  color: '#cbd5e1',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: '500',
  transition: 'background 0.2s'
}

const subNavItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '10px 12px',
  borderRadius: '6px',
  color: '#94a3b8',
  textDecoration: 'none',
  fontSize: '13px',
  background: '#1e293b'
}