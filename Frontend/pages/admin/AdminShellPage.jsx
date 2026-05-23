import DashboardShell from '../../components/layout/DashboardShell';

const adminSections = [
  {
    title: 'Home',
    label: 'Home',
    to: '/admin-dashboard/home',
    description: 'Main admin overview.',
  },
  {
    title: 'Doctor Applications',
    label: 'Doctor Applications',
    to: '/admin-dashboard/doctor-applications',
    description: 'Review pending doctor requests.',
  },
  {
    title: 'Users',
    label: 'Users',
    to: '/admin-dashboard/users',
    description: 'Manage platform users.',
  },

];

function AdminShellPage() {
  return (
    <DashboardShell
      title="Admin Dashboard"
      description="A focused workspace for platform management."
      sections={adminSections}
      homePath="/admin-dashboard/home"
    />
  );
}

export default AdminShellPage;