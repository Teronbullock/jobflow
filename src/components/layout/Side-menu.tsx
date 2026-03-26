'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { clsx } from 'clsx';

interface SideMenuProp {
  className?: string;
  children?: React.ReactNode;
}

export const SideMenu = ({ className, children }: SideMenuProp) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Hamburger Button */}
      {!isOpen && (
        <div className='md:hidden absolute top-22 right-4 z-50'>
          <button
            onClick={() => setIsOpen(true)}
            className='p-2 bg-black text-white rounded-md shadow-lg focus:outline-none transition-all hover:bg-zinc-900'
            aria-label='Open menu'
          >
            <Menu className='w-6 h-6' />
          </button>
        </div>
      )}

      {/* Mobile Menu Overlay - Full Screen */}
      {isOpen && (
        <div className='md:hidden fixed inset-0 z-[100] bg-black text-white flex flex-col p-6 animate-in fade-in duration-200'>
          <div className='flex justify-end mb-12'>
            <button
              onClick={() => setIsOpen(false)}
              className='p-2 text-white hover:bg-white/10 rounded-full transition-colors'
              aria-label='Close menu'
            >
              <X className='w-8 h-8' />
            </button>
          </div>
          <nav
            className='flex flex-col items-center gap-8'
            onClick={() => setIsOpen(false)}
          >
            {children}
          </nav>
        </div>
      )}

      {/* Desktop Side Menu */}
      <nav className={clsx('hidden md:flex flex-col h-screen', className)}>
        {children}
      </nav>
    </>
  );
};
