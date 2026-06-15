import { Injectable, signal, inject, NgZone } from '@angular/core';
import { Profile } from '../models/profile.model';
import { supabase } from '../supabase/supabase.client';
import { User } from '@supabase/supabase-js';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private ngZone = inject(NgZone);

  user = signal<User | null>(null);
  profile = signal<Profile | null>(null);
  loading = signal(true);

  constructor() {
    // Load session eagerly so auth state is available before onAuthStateChange fires
    supabase.auth.getSession().then(({ data: { session } }) => {
      this.ngZone.run(() => {
        this.user.set(session?.user ?? null);
        if (session?.user) this.loadProfile(session.user.id);
        else this.profile.set(null);
        this.loading.set(false);
      });
    });

    // Keep listening for future auth changes (login, logout, token refresh)
    supabase.auth.onAuthStateChange((_event, session) => {
      this.ngZone.run(() => {
        this.user.set(session?.user ?? null);
        if (session?.user) this.loadProfile(session.user.id);
        else this.profile.set(null);
        this.loading.set(false);
      });
    });
  }

  async signUp(email: string, password: string) {
    return await supabase.auth.signUp({ email, password });
  }

  async loadProfile(userId: string) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (data) this.profile.set(data);
  }

  async getSession() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  }

  async signIn(email: string, password: string) {
    return await supabase.auth.signInWithPassword({ email, password });
  }

  async signOut() {
    await supabase.auth.signOut();
    this.ngZone.run(() => {
      this.user.set(null);
      this.profile.set(null);
    });
  }
}
