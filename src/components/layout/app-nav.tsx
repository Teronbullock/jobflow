'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users } from 'lucide-react';

export function AppNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/members', label: 'Members', icon: Users },
  ];

  return (
    <div className='flex flex-col gap-6 md:gap-4 items-center'>
      {navItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className='group relative flex items-center justify-center px-3 py-2 rounded-lg transition-all'
        >
          <Icon className='w-8 h-8 md:w-6 md:h-6 shrink-0' />
          <span className='absolute left-full ml-2 px-2 py-1 text-sm bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50'>
            {label}
          </span>
        </Link>
      ))}
    </div>
  );
}
