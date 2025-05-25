
import { Suspense } from 'react';
import HomePageContent from '../components/HomePage'; 


export default function HomePage() {
  return (
    <Suspense >
      <HomePageContent />
    </Suspense>
  );
}