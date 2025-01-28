import type React from "react"
import type { App } from "../types"

interface AppIconProps {
  app: App
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const AppIcon: React.FC<AppIconProps> = ({ app, onClick }) => {
  return (
    <button className="app" onClick={onClick}>
      <div className="app-icon" style={{ background: app.bg }}>
        {app.icon}
      </div>
      <div className="app-name">{app.name}</div>
    </button>
  )
}

export default AppIcon

