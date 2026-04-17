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
      description="The doctor journey is also separated into focused pages, making onboarding and profile approval much easier to build next."
      sections={doctorSections}
      homePath="/doctor/home"
    />
  );
}

export default DoctorShellPage;
