import type React from "react"
import AppIcon from "./AppIcon"
import type { App } from "../types"

interface DockProps {
  apps: App[]
  openApp: (event: React.MouseEvent<HTMLButtonElement>, appName: string) => void
}

const Dock: React.FC<DockProps> = ({ apps, openApp }) => {
  return (
    <div className="dock">
      {apps.map((app) => (
        <AppIcon key={app.name} app={app} onClick={(e) => openApp(e, app.name)} />
      ))}
    </div>
  )
}

export default Dock

