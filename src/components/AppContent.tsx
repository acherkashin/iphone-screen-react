import { apps } from "./appsData";

export interface AppContentProps {
  appName: string | undefined;
  onClose: () => void;
}

export function AppContent({ appName, onClose }: AppContentProps) {
  const closeApp = () => {
    onClose();
  };

  const app = apps.find(item => item.name == appName);
  // https://native-transitions.netlify.app/

  return (
    <div className="app-content" style={{ display: appName == null ? "none" : "flex", background: app?.bg, }}>
      {/* 
        TODO: 
        - сделать иконку текст и фон отдельными компонентами и примваивать им разные transition name 
        - или выставлять начальную позицию для диалога такую же как у иконки и не выставлять иконки viewTransitionName
      */}
      <button className="back-button" onClick={closeApp}>
        ← Back
      </button>
      <div>{app?.icon}</div>
      <h1>{appName}</h1>
      <p>This is the {appName} app content.</p>
    </div>
  )
}


