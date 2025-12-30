import { Suspense } from 'react';
import MainAboutUs from '@/components/aboutus/mainAboutus';
import Loading from '@/components/ui/Loading';

export default function AboutPage() {
  return (
    <Suspense fallback={<Loading />}>
      <MainAboutUs />
    </Suspense>
  );
}