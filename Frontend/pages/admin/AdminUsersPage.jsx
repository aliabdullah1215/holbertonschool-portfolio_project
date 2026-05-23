import { useEffect, useState } from 'react';
import { getAdminUsers } from '../../features/adminService';

function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      setError('');
      setIsLoading(true);

      try {
        const data = await getAdminUsers();
        setUsers(data);
      } catch {
        setError('Unable to load users.');
      } finally {
        setIsLoading(false);
      }
    }

    loadUsers();
  }, []);

  return (
    <section className="dashboard-section-page admin-users-page">
      <div className="dashboard-section-page__heading">
        <h1>Users</h1>
        <p>Review platform accounts, roles, and account status.</p>
      </div>

      {isLoading ? <p className="status-card">Loading users...</p> : null}
      {error ? <p className="form-feedback form-feedback--error">{error}</p> : null}

      {!isLoading && users.length === 0 ? (
        <p className="status-card">No users found.</p>
      ) : null}

      {!isLoading && users.length > 0 ? (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Staff</th>
                <th>Superuser</th>
                <th>Active</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <strong>{user.username}</strong>
                    <span>ID: {user.id}</span>
                  </td>
                  <td>{user.email || 'No email'}</td>
                  <td>
                    <span className={`admin-status admin-status--${user.display_role}`}>
                      {user.display_role}
                    </span>
                  </td>
                  <td>{user.is_staff ? 'Yes' : 'No'}</td>
                  <td>{user.is_superuser ? 'Yes' : 'No'}</td>
                  <td>
                    <span
                      className={`admin-status ${
                        user.is_active ? 'admin-status--approved' : 'admin-status--rejected'
                      }`}
                    >
                      {user.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
}

export default AdminUsersPage;