import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.redirect(new URL('/?error=missing_env', request.url), { status: 303 })
    }

    // Petición nativa a la API de autenticación de Supabase
    const res = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseAnonKey,
      },
      body: JSON.stringify({ email, password, gotrue_meta_security: {} }),
    })

    const data = await res.json()

    if (!res.ok || !data.access_token) {
      return NextResponse.redirect(new URL('/?error=invalid_credentials', request.url), { status: 303 })
    }

    const cookieStore = await cookies()
    const response = NextResponse.redirect(new URL('/', request.url), { status: 303 })

    // Guardar la sesión de Supabase en una cookie compatible con nuestra validación del page.tsx
    const cookieName = `sb-${new URL(supabaseUrl).hostname.split('.')[0]}-auth-token`
    
    response.cookies.set({
      name: cookieName,
      value: JSON.stringify({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        user: data.user,
      }),
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: data.expires_in || 604800,
    })

    return response
  } catch (err) {
    console.error('Error en login:', err)
    return NextResponse.redirect(new URL('/?error=server_error', request.url), { status: 303 })
  }
}