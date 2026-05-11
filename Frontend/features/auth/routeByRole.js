export function routeByRole(role) {
  return role === 'doctor' ? '/doctor' : '/client';
}
