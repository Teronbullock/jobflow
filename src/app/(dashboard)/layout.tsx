import { SideMenu } from '@/components/layout/Side-menu';
import { AppNav } from '@/components/layout/app-nav';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex gap-6 min-h-screen'>
      <SideMenu className='w-[10%] bg-gray-600 text-white p-4'>
        <AppNav />
      </SideMenu>
      <main className='w-full pt-6 pb-6'>{children}</main>
    </div>
  );
}
