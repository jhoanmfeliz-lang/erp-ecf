import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const username = (formData.get('username') as string || '').trim()
    const password = (formData.get('password') as string || '').trim()

    if (!username || !password) {
      return NextResponse.redirect(new URL('/login?error=Campos+incompletos', request.url), 303)
    }

    const cookieStore = await cookies()
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: 'Variables de Supabase no configuradas en Vercel' },
        { status: 500 }
      )
    }

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch {
            // Ignorar en Server Actions / Route Handlers
          }
        },
      },
    })

    // Limpiar el usuario y asegurar el dominio correcto en minúsculas
    const cleanUsername = username.toLowerCase()
    const email = cleanUsername.includes('@') ? cleanUsername : `${cleanUsername}@dss.com`

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      // Redirigir al login enviando el error exacto para diagnosticar si fuera necesario
      return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(error.message)}`, request.url), 303)
    }

    // Crear la respuesta de redirección a la página principal
    const url = new URL('/', request.url)
    const response = NextResponse.redirect(url, {
      status: 303,
    })

    // Copiar explícitamente las cookies de sesión generadas por Supabase a la respuesta final
    cookieStore.getAll().forEach((cookie) => {
      response.cookies.set(cookie.name, cookie.value)
    })

    return response

  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error interno del servidor' }, { status: 500 })
  }
}