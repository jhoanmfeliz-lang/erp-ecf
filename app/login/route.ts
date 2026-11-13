import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.redirect(new URL('/?error=missing_env', request.url), { status: 303 })
    }

    // Si el usuario no incluye '@', ajusta el formato al correo que requiere Supabase
    const email = username.includes('@') ? username : `${username}@dss.com`

    // Petición HTTP nativa a Supabase
    const res = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseAnonKey,
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (!res.ok || !data.access_token) {
      return NextResponse.redirect(new URL('/?error=invalid_credentials', request.url), { status: 303 })
    }

    const cookieStore = await cookies()
    const response = NextResponse.redirect(new URL('/', request.url), { status: 303 })

    // Generar la cookie de sesión compatible
    const hostname = new URL(supabaseUrl).hostname
    const cookieName = `sb-${hostname.split('.')[0]}-auth-token`

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
      maxAge: 604800, // 1 semana
    })

    return response
  } catch (err) {
    console.error('Error en autenticación:', err)
    return NextResponse.redirect(new URL('/?error=server_error', request.url), { status: 303 })
  }
}