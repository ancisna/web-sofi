import { Injectable, signal } from '@angular/core';
import { Profile } from '../models/profile.model';

import { supabase } from '../supabase/supabase.client';

import { User } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = signal<User | null>(null);
  profile = signal<Profile | null>(null);
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
    if (session?.user) {
      await this.loadProfile(session.user.id);
    }

    // Escuchar cambios auth

    supabase.auth.onAuthStateChange((event, session) => {
      this.user.set(session?.user ?? null);
      if (session?.user) {
      this.loadProfile(session.user.id);
      }
      else {
        this.profile.set(null);
      }
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

  async loadProfile(userId: string) {

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    console.log('PROFILE:', data);

    console.log('PROFILE ERROR:', error);

    if (data) {

      this.profile.set(data);

    }

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