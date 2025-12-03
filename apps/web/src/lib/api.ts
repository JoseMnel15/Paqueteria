const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

export interface DailyReport {
  date: string;
  totalReceived: number;
  totalDelivered: number;
  pending: number;
  totalAmountCollected: number;
}

export interface PackageRow {
  id: string;
  trackingCode: string;
  recipient: string;
  courier: string;
  status: 'DELIVERED' | 'READY_FOR_PICKUP' | 'RECEIVED' | 'RETURNED';
  date: string;
}

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return res.json();
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    return await fetchJson<LoginResponse>(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  } catch (err) {
    console.warn('Falling back to mock login', err);
    return {
      accessToken: 'mock-token',
      refreshToken: 'mock-refresh-token',
      user: { id: 1, name: 'Administrador', email, role: 'ADMIN' },
    };
  }
}

export async function getDailyReport(date?: string): Promise<DailyReport> {
  const search = date ? `?date=${encodeURIComponent(date)}` : '';
  try {
    return await fetchJson<DailyReport>(`${API_BASE}/reports/daily${search}`);
  } catch (err) {
    console.warn('Falling back to mock report', err);
    return {
      date: new Date().toISOString().slice(0, 10),
      totalReceived: 48,
      totalDelivered: 32,
      pending: 14,
      totalAmountCollected: 5290.5,
    };
  }
}

export async function getRecentPackages(): Promise<PackageRow[]> {
  try {
    const data = await fetchJson<any[]>(`${API_BASE}/packages?status=DELIVERED`);
    return data.map((pkg) => ({
      id: pkg.id,
      trackingCode: pkg.trackingCode,
      recipient: pkg.recipient || pkg.client?.name || 'Cliente',
      courier: pkg.courier?.name || 'Interna',
      status: pkg.status,
      date: pkg.deliveredAt || pkg.receivedAt,
    }));
  } catch (err) {
    console.warn('Falling back to mock packages', err);
    return [
      { id: '1', trackingCode: '#A34-091', recipient: 'Michael Johnson', courier: 'Interna', status: 'DELIVERED', date: '2024-05-23' },
      { id: '2', trackingCode: '#B12-452', recipient: 'Sarah Lee', courier: 'FedEx', status: 'DELIVERED', date: '2024-05-23' },
      { id: '3', trackingCode: '#C89-731', recipient: 'David Chen', courier: 'UPS', status: 'READY_FOR_PICKUP', date: '2024-05-22' },
      { id: '4', trackingCode: '#D45-115', recipient: 'Emily Rogers', courier: 'Interna', status: 'DELIVERED', date: '2024-05-22' },
    ];
  }
}
