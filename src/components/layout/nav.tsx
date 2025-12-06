import React from 'react';

export function Nav() {
  return (
    <nav className='flex gap-4 p-2'>
      {/* Add navigation links here */}
      <a href='/' className='hover:underline'>
        Home
      </a>
      <a href='/dashboard' className='hover:underline'>
        Dashboard
      </a>
    </nav>
  );
}
