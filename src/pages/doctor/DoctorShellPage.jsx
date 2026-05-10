import DashboardShell from '../../components/layout/DashboardShell';

const doctorSections = [
  { title: 'Home', to: '/doctor/home', description: 'The main doctor landing page.' },
  { title: 'About', to: '/doctor/about', description: 'An overview of the platform and its purpose.' },
  {
    title: 'Join Us as a Doctor',
    to: '/doctor/join',
    description: 'The future onboarding and approval flow.',
  },
  { title: 'Contact', to: '/doctor/contact', description: 'General contact information.' },
];

function DoctorShellPage() {
  return (
    <DashboardShell
      title="Doctor Dashboard"
      description="A calm workspace for onboarding and doctor profile review."
      sections={doctorSections}
      homePath="/doctor/home"
    />
  );
}

export default DoctorShellPage;
