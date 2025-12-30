import { Suspense } from 'react';
import MainServices from '@/components/services/MainServices';
import Loading from '@/components/ui/Loading';

export default function ServicesPage() {
  return (
    <Suspense fallback={<Loading />}>
      <MainServices />
    </Suspense>
  );
}