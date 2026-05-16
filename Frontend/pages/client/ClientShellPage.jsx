import DashboardShell from '../../components/layout/DashboardShell';

const clientSections = [
  {
    title: 'Home',
    label: 'Home',
    to: '/client/home',
    description: 'The first page after sign-in.',
  },
  {
    title: 'Assessment Tools',
    label: 'Assessment Tools',
    to: '/client/assessment-tools',
    description: 'Frontend-only calculations and indicators.',
  },
  {
    title: 'Dashboard',
    label: 'Dashboard',
    to: '/client/plans-history',
    description: 'Saved plan history and complete historical plans.',
  },
  {
    title: 'AI Plans',
    label: 'AI Plans',
    to: '/client/ai-plans',
    description: 'Generate personalized nutrition plans.',
  },
  {
    title: 'Medical Support',
    label: 'Medical Support',
    to: '/client/medical-support',
    description: 'Approved doctor listings and contact details.',
  },
  {
    title: 'Contact Us',
    label: 'Contact Us',
    to: '/client/contact',
    description: 'Official contact channels.',
  },
  {
    title: 'About',
    label: 'About',
    to: '/client/about',
    description: 'An overview of the platform and its mission.',
  },
];


function ClientShellPage() {
  return (
    <DashboardShell
      title="Client Dashboard"
      description="Your nutrition workspace in a clean and focused layout."
      sections={clientSections}
      homePath="/client/home"
    />
  );
}

export default ClientShellPage;
