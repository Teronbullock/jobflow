'use client';

import { useState } from 'react';
import { useSession, signOut } from '@/lib/auth/auth-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import {
  Calendar,
  Receipt,
  User,
  LogOut,
  Settings,
  ChevronDown,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { LoginModal } from '@/features/auth/components/login-modal';

type HeaderProps = {
  activeTab: 'schedule' | 'invoices';
  onTabChange: (tab: 'schedule' | 'invoices') => void;
};

export function Header({ activeTab, onTabChange }: HeaderProps) {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = useSession();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const user = session?.user;
  const router = useRouter();

  return (
    <>
      <header className='border-b border-border bg-card'>
        <div className='max-w-7xl mx-auto px-4 py-4 flex items-center justify-between'>
          <h1 className='text-xl font-semibold text-foreground'>
            <Link href={user ? '/dashboard' : '/'}>CrewFlow</Link>
          </h1>
          {user ? (
            <>
              <nav className='flex gap-1 bg-muted p-1 rounded-lg'>
                <button
                  onClick={() => onTabChange('schedule')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'schedule'
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Calendar className='w-4 h-4' />
                  Schedule
                </button>
                <button
                  onClick={() => onTabChange('invoices')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'invoices'
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Receipt className='w-4 h-4' />
                  Invoices
                </button>
              </nav>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' className='flex items-center gap-2'>
                    <div className='w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium'>
                      {user.name
                        .split(' ')
                        .map(n => n[0])
                        .join('')}
                    </div>
                    <span className='hidden sm:inline text-sm font-medium'>
                      {user.name}
                    </span>
                    <ChevronDown className='w-4 h-4 text-muted-foreground' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-56'>
                  <div className='px-2 py-1.5'>
                    <p className='text-sm font-medium'>{user.name}</p>
                    <p className='text-xs text-muted-foreground'>
                      {user.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className='w-4 h-4 mr-2' />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className='w-4 h-4 mr-2' />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={async () =>
                      await signOut({
                        fetchOptions: {
                          onSuccess: () => {
                            router.push('/'); // redirect to login page
                          },
                        },
                      })
                    }
                    className='text-destructive focus:text-destructive'
                  >
                    <LogOut className='w-4 h-4 mr-2' />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className='flex gap-4'>
              <Button onClick={() => setShowLoginModal(true)}>Log in</Button>
              <Button asChild>
                <Link className='bg-red-700' href='/signup'>
                  Start free trial
                </Link>
              </Button>
            </div>
          )}
        </div>
      </header>

      <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
    </>
  );
}
