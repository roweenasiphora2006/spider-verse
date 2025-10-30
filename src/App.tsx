import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useMultiverseStore } from './store/multiverseStore';
import { MultiverseCanvas } from './components/MultiverseCanvas';
import { ControlPanel } from './components/ControlPanel';
import { ActionLog } from './components/ActionLog';
import { SplashScreen } from './components/SplashScreen';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const initializeUniverse = useMultiverseStore(state => state.initializeUniverse);

  useEffect(() => {
    initializeUniverse();
  }, [initializeUniverse]);

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      <div className="min-h-screen flex relative overflow-hidden">
        <MultiverseCanvas />
        <ControlPanel />
        <ActionLog />
      </div>
    </>
  );
}

export default App;
