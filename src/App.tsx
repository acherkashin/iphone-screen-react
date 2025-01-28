import type React from "react"
import { HomeScreen } from "./components/HomeScreen"
import { AppContent } from "./components/AppContent"
import "./App.css"
import { useRef, useState } from "react"
import { flushSync } from "react-dom"

const App: React.FC = () => {
  const [app, setApp] = useState<string>();
  const openedApp = useRef<HTMLButtonElement>();

  const handleAppOpened = (e: React.MouseEvent<HTMLButtonElement>, appName: string) => {
    openedApp.current = (e.target as HTMLButtonElement);
    openedApp.current.style.viewTransitionName = 'app-content';

    document.startViewTransition(() => {
      if (openedApp.current?.style) {
        openedApp.current.style.viewTransitionName = '';
      }

      flushSync(() => {
        setApp(appName);
      })
    })
  };

  const handleClosed = async () => {
    const transition = document.startViewTransition(() => {
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

export default App

