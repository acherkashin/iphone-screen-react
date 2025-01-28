import type React from "react"
import AppIcon from "./AppIcon"
import type { App } from "../types"

interface AppGridProps {
  apps: App[]
  openApp: (e: React.MouseEvent<HTMLButtonElement>, appName: string) => void
}

const AppGrid: React.FC<AppGridProps> = ({ apps, openApp }) => {
  return (
    <div className="app-grid">
      {apps.map((app) => (
        <AppIcon key={app.name} app={app} onClick={(e) => openApp(e, app.name)} />
      ))}
    </div>
  )
}

export default AppGrid

