import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

export default async function Dashboard() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return (
      <div>
        <p>No Access</p>
      </div>
    );
  } else {
    return (
      <div>
        <p>Dashboard</p>
      </div>
    );
  }
}
