import DashboardShell from '../../components/layout/DashboardShell';

const clientSections = [
  { title: 'Home', to: '/client/home', description: 'The first page after sign-in.' },
  { title: 'About', to: '/client/about', description: 'An overview of the platform and its mission.' },
  { title: 'Contact', to: '/client/contact', description: 'Official contact channels.' },
  {
    title: 'AI Plans',
    to: '/client/ai-plans',
    description: 'The future area for generating nutrition plans.',
  },
  {
    title: 'Your Plans',
    to: '/client/plans-history',
    description: 'Plan history and creation dates.',
  },
  {
    title: 'Assessment Tools',
    to: '/client/assessment-tools',
    description: 'Frontend-only calculations and indicators.',
  },
  {
    title: 'Medical Support',
    to: '/client/medical-support',
    description: 'Doctor listings and contact details.',
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
