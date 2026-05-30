export function routeByRole(role) {
  if (role === 'admin') {
    return '/admin-dashboard';
  }

  if (role === 'doctor') {
    return '/doctor';
  }

  return '/client';
}