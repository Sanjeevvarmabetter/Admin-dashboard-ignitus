import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function AdminRoute({ children }) {
  const { currentUser, userRecord, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!currentUser || userRecord?.role !== 'admin')) {
      router.replace('/unauthorized');
    }
  }, [currentUser, userRecord, loading]);

  if (loading || !currentUser || userRecord?.role !== 'admin') {
    return <div className="text-center mt-10 text-white">Loading...</div>;
  }

  return children;
}
