export type AuthSession = {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
};

const AUTH_STORAGE_KEY = 'paqueteria.auth';

/**
 * Guarda la sesión.
 * - persist === true -> localStorage (sobrevive reinicios del navegador)
 * - persist === false -> sessionStorage (se borra al cerrar pestaña/ventana)
 */
export function saveSession(session: AuthSession, persist: boolean) {
  if (typeof window === 'undefined') return;
  const storage = persist ? window.localStorage : window.sessionStorage;
  storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  // Limpia la otra storage para evitar duplicados
  const other = persist ? window.sessionStorage : window.localStorage;
  other.removeItem(AUTH_STORAGE_KEY);
}

/**
 * Obtiene la sesión vigente. Prefiere sessionStorage y luego localStorage.
 */
export function getSession(): AuthSession | null {
  if (typeof window === 'undefined') return null;
  const rawSession = window.sessionStorage.getItem(AUTH_STORAGE_KEY) ?? window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!rawSession) return null;
  try {
    return JSON.parse(rawSession) as AuthSession;
  } catch (e) {
    console.warn('Auth session corrupted, clearing', e);
    clearSession();
    return null;
  }
}

export function clearSession() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
}
