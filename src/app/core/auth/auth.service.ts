import { Injectable, signal } from '@angular/core';

import { supabase } from '../supabase/supabase.client';

import { User } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = signal<User | null>(null);

  loading = signal(true);

  constructor() {

    this.initialize();

  }

  async initialize() {

    // Sesión actual

    const {
      data: { session }
    } = await supabase.auth.getSession();

    this.user.set(session?.user ?? null);

    // Escuchar cambios auth

    supabase.auth.onAuthStateChange((event, session) => {

      this.user.set(session?.user ?? null);

    });

    this.loading.set(false);

  }

  // REGISTER

  async signUp(
    email: string,
    password: string
  ) {

    return await supabase.auth.signUp({
      email,
      password
    });

  }

  // LOGIN

  async signIn(
    email: string,
    password: string
  ) {

    return await supabase.auth.signInWithPassword({
      email,
      password
    });

  }

  // LOGOUT

  async signOut() {

    return await supabase.auth.signOut();

  }

}