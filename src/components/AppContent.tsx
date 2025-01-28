import { apps } from "./appsData";

export interface AppContentProps {
  ref?: React.RefObject<HTMLDivElement | null>;
  appName: string | undefined;
  onClose: () => void;
}

export function AppContent({ appName, onClose, ref }: AppContentProps) {
  const closeApp = () => {
    onClose();
  };

  const app = apps.find(item => item.name == appName);

  return (
    <div ref={ref} className="app-content" style={{ display: appName == null ? "none" : "flex", background: app?.bg, }}>
      <button className="back-button" onClick={closeApp}>
        ← Back
      </button>
      <div>{app?.icon}</div>
      <h1>{appName}</h1>
      <p>This is the {appName} app content.</p>
    </div>
  )
}


