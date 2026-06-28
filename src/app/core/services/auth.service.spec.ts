import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';

// El mock debe declararse antes del import del servicio
vi.mock('@core/supabase/supabase.client', () => ({
  supabase: {
    from: vi.fn(),
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
      onAuthStateChange: vi.fn().mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } },
      }),
      signUp: vi.fn(),
      signInWithPassword: vi.fn(),
      signOut: vi.fn().mockResolvedValue({ error: null }),
    },
  },
}));

import { supabase } from '@core/supabase/supabase.client';
import { AuthService } from './auth.service';

const mockAuth = (supabase as any).auth;
const mockFrom = (supabase as any).from;

function makeProfileBuilder(profile: any) {
  const r = { data: profile, error: null };
  const builder: any = {
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue(r),
  };
  return builder;
}

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    vi.clearAllMocks();
    mockAuth.getSession.mockResolvedValue({ data: { session: null }, error: null });
    mockAuth.onAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    });
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  describe('estado inicial', () => {
    it('user es null inicialmente', () => {
      expect(service.user()).toBeNull();
    });

    it('profile es null inicialmente', () => {
      expect(service.profile()).toBeNull();
    });
  });

  describe('signIn()', () => {
    it('llama a supabase.auth.signInWithPassword con email y password', async () => {
      mockAuth.signInWithPassword.mockResolvedValue({ data: {}, error: null });
      await service.signIn('sofia@email.com', 'password123');
      expect(mockAuth.signInWithPassword).toHaveBeenCalledWith({
        email: 'sofia@email.com',
        password: 'password123',
      });
    });

    it('devuelve el resultado de Supabase (éxito)', async () => {
      const mockResult = { data: { user: { id: 'uid-1' }, session: {} }, error: null };
      mockAuth.signInWithPassword.mockResolvedValue(mockResult);
      const result = await service.signIn('sofia@email.com', 'pass');
      expect(result).toEqual(mockResult);
    });

    it('devuelve el resultado de Supabase (error)', async () => {
      const mockResult = { data: { user: null, session: null }, error: { message: 'Credenciales inválidas' } };
      mockAuth.signInWithPassword.mockResolvedValue(mockResult);
      const result = await service.signIn('bad@email.com', 'wrongpass');
      expect(result.error?.message).toBe('Credenciales inválidas');
    });
  });

  describe('signUp()', () => {
    it('llama a supabase.auth.signUp con email y password', async () => {
      mockAuth.signUp.mockResolvedValue({ data: {}, error: null });
      await service.signUp('nuevo@email.com', 'password123');
      expect(mockAuth.signUp).toHaveBeenCalledWith({
        email: 'nuevo@email.com',
        password: 'password123',
      });
    });
  });

  describe('signOut()', () => {
    it('llama a supabase.auth.signOut', async () => {
      await service.signOut();
      expect(mockAuth.signOut).toHaveBeenCalled();
    });

    it('limpia el signal user tras cerrar sesión', async () => {
      await service.signOut();
      expect(service.user()).toBeNull();
    });

    it('limpia el signal profile tras cerrar sesión', async () => {
      await service.signOut();
      expect(service.profile()).toBeNull();
    });
  });

  describe('getSession()', () => {
    it('devuelve null cuando no hay sesión activa', async () => {
      mockAuth.getSession.mockResolvedValue({ data: { session: null } });
      const session = await service.getSession();
      expect(session).toBeNull();
    });

    it('devuelve la sesión cuando existe', async () => {
      const mockSession = { user: { id: 'uid-1' }, access_token: 'token-abc' };
      mockAuth.getSession.mockResolvedValue({ data: { session: mockSession } });
      const session = await service.getSession();
      expect(session).toEqual(mockSession);
    });
  });

  describe('loadProfile()', () => {
    it('actualiza el signal profile con los datos del usuario', async () => {
      const mockProfile = { id: 'uid-1', role: 'psico', full_name: 'Sofía Reyes' };
      mockFrom.mockReturnValue(makeProfileBuilder(mockProfile));
      await service.loadProfile('uid-1');
      expect(service.profile()).toEqual(mockProfile);
    });

    it('no actualiza profile si no hay datos', async () => {
      mockFrom.mockReturnValue(makeProfileBuilder(null));
      await service.loadProfile('uid-no-existe');
      expect(service.profile()).toBeNull();
    });

    it('consulta la tabla profiles con el userId correcto', async () => {
      const builder = makeProfileBuilder(null);
      mockFrom.mockReturnValue(builder);
      await service.loadProfile('uid-1');
      expect(mockFrom).toHaveBeenCalledWith('profiles');
      expect(builder.eq).toHaveBeenCalledWith('id', 'uid-1');
    });
  });
});
