import Link from 'next/link';
import React from 'react';

export function Nav() {
  return (
    <nav className='flex gap-4 p-2'>
      {/* Add navigation links here */}
      <Link href='/' className='hover:underline'>
        Home
      </Link>
      <Link href='/dashboard/schedule' className='hover:underline'>
        Dashboard
      </Link>
    </nav>
  );
}
