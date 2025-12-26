import { Suspense, useState, useEffect } from 'react';
import ThreeBackground from '@/components/ThreeBackground';
import VideoHero from '@/components/VideoHero';
import ProjectsSection from '@/components/ProjectsSection';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import TubesCursor from '@/components/TubesCursor';

const Index = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // TEMPORARY FOR TESTING: Always show loader
    // TODO: Comment out the line below when done testing
    setShowLoader(true);

    // PRODUCTION CODE (uncomment when ready):
    // Check if user has seen the loader within the last 30 minutes
    // const loaderTimestamp = localStorage.getItem('velarix-loader-timestamp');
    // const now = Date.now();
    // const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds
    // 
    // if (!loaderTimestamp || (now - parseInt(loaderTimestamp)) > thirtyMinutes) {
    //   setShowLoader(true);
    // } else {
    //   setIsReady(true);
    // }
  }, []);

  const handleLoaderComplete = () => {
    // Store the current timestamp instead of just a flag
    localStorage.setItem('velarix-loader-timestamp', Date.now().toString());
    setShowLoader(false);
    setIsReady(true);
  };

  if (showLoader) {
    return <LoadingScreen onComplete={handleLoaderComplete} />;
  }

  if (!isReady) {
    return null;
  }

  return (
    <div className="relative min-h-screen">
      {/* 3D Background removed to show video */}
      {/* <Suspense fallback={null}>
        <ThreeBackground />
      </Suspense> */}

      {/* Content */}
      <main className="relative z-20">
        <VideoHero />
        <ProjectsSection />
        <Footer />
      </main>

      {/* Tubes Cursor Effect - Above content but non-interactive */}
      <TubesCursor />
    </div>
  );
};

export default Index;
