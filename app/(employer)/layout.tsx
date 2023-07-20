import EmployerNavbar from '@/components/employer/layout/EmployerNavbar';
import EmployerSidebar from '@/components/employer/layout/EmployerSidebar';

const EmployerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex gap-3 h-full w-full min-h-screen p-5 flex-wrap'>
      <EmployerSidebar />
      <section className='border border-gray-200 p-3 rounded-lg flex-1'>
        {children}
      </section>
    </div>
  );
};

export default EmployerLayout;
