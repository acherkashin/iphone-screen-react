import type React from "react"
import { HomeScreen } from "./components/HomeScreen"
import { AppContent } from "./components/AppContent"
import "./App.css"
import { useRef, useState } from "react"
import { flushSync } from "react-dom"

const App: React.FC = () => {
  const [app, setApp] = useState<string>();
  const openedApp = useRef<HTMLButtonElement>(undefined);

  const handleAppOpened = (e: React.MouseEvent<HTMLButtonElement>, appName: string) => {
    openedApp.current = (e.target as HTMLButtonElement);
    openedApp.current.style.viewTransitionName = 'app-content';

    startViewTransition(() => {
      if (openedApp.current?.style) {
        openedApp.current.style.viewTransitionName = '';
      }

      flushSync(() => {
        setApp(appName);
      })
    })
  };

  const handleClosed = async () => {
    const transition = startViewTransition(() => {
      if (openedApp.current?.style) {
        openedApp.current.style.viewTransitionName = 'app-content';
      }

      flushSync(() => {
        setApp(undefined)
      });
    });

    await transition.finished;

    if (openedApp.current?.style) {
      openedApp.current.style.viewTransitionName = '';
    }
  }

  return (
    <div className="App">
      <HomeScreen onAppOpened={handleAppOpened} />
      <AppContent appName={app} onClose={handleClosed} />
    </div>
  )
}

function startViewTransition(callback: () => void) {
  if ('startViewTransition' in document) {
    return document.startViewTransition(callback);
  } else {
    callback();
    return { finished: Promise.resolve() };
  }
};

export default App

