import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Esto nos dirá exactamente si falta alguna variable o qué contiene
    if (!supabaseUrl || !supabaseAnonKey) {
      return new NextResponse(`ERROR DE CONFIGURACIÓN: URL=${supabaseUrl}, KEY=${supabaseAnonKey}`, { status: 500 })
    }

    const email = username.includes('@') ? username : `${username}@dss.com`

    const res = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseAnonKey,
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    // Si Supabase rechaza las credenciales o da error, veremos el motivo exacto aquí
    if (!res.ok) {
      return new NextResponse(`ERROR DE SUPABASE (${res.status}): ${JSON.stringify(data)}`, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    return new NextResponse(`EXCEPCIÓN EN EL CÓDIGO: ${err.message}`, { status: 500 })
  }
}