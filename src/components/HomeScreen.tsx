import { useState, useRef, useEffect } from "react"
import StatusBar from "./StatusBar"
import Widgets from "./Widgets"
import AppGrid from "./AppGrid"
import SearchBar from "./SearchBar"
import Dock from "./Dock"
import PageIndicator from "./PageIndicator"
import { apps, dockApps } from "./appsData"

export interface HomeScreenProps {
  onAppOpened: (e: React.MouseEvent<HTMLButtonElement>, appName: string) => void
  style?: React.CSSProperties | undefined;
}

export function HomeScreen({ style, onAppOpened }: HomeScreenProps) {
  const [currentPage, setCurrentPage] = useState<number>(0)
  const screensContainerRef = useRef<HTMLDivElement>(null)

  const openApp = async (e: React.MouseEvent<HTMLButtonElement>, appName: string) => {
    onAppOpened(e, appName);
  };

  useEffect(() => {
    const screensContainer = screensContainerRef.current
    if (!screensContainer) return

    let startX: number,
      currentTranslate = 0,
      prevTranslate = 0,
      isDragging = false

    const dragStart = (event: TouchEvent | MouseEvent) => {
      startX = getPositionX(event)
      isDragging = true
      screensContainer.style.transition = "none"
    }

    const drag = (event: TouchEvent | MouseEvent) => {
      if (isDragging) {
        const currentX = getPositionX(event)
        const diff = startX - currentX
        currentTranslate = prevTranslate + diff
        setTransform(currentTranslate)
      }
    }

    const dragEnd = () => {
      isDragging = false
      const threshold = screensContainer.offsetWidth / 4
      if (Math.abs(currentTranslate - prevTranslate) > threshold) {
        if (currentTranslate > prevTranslate) {
          prevTranslate += screensContainer.offsetWidth
          setCurrentPage(1)
        } else {
          prevTranslate -= screensContainer.offsetWidth
          setCurrentPage(0)
        }
      }
      prevTranslate = Math.max(Math.min(prevTranslate, screensContainer.offsetWidth), 0)
      screensContainer.style.transition = "transform 0.3s ease-out"
      setTransform(prevTranslate)
    }

    const getPositionX = (event: TouchEvent | MouseEvent): number => {
      return "touches" in event ? event.touches[0].clientX : event.clientX
    }

    const setTransform = (x: number) => {
      screensContainer.style.transform = `translateX(${-x}px)`
    }

    screensContainer.addEventListener("touchstart", dragStart as EventListener)
    screensContainer.addEventListener("touchmove", drag as EventListener)
    screensContainer.addEventListener("touchend", dragEnd)
    screensContainer.addEventListener("mousedown", dragStart as EventListener)
    screensContainer.addEventListener("mousemove", drag as EventListener)
    screensContainer.addEventListener("mouseup", dragEnd)
    screensContainer.addEventListener("mouseleave", dragEnd)

    return () => {
      screensContainer.removeEventListener("touchstart", dragStart as EventListener)
      screensContainer.removeEventListener("touchmove", drag as EventListener)
      screensContainer.removeEventListener("touchend", dragEnd)
      screensContainer.removeEventListener("mousedown", dragStart as EventListener)
      screensContainer.removeEventListener("mousemove", drag as EventListener)
      screensContainer.removeEventListener("mouseup", dragEnd)
      screensContainer.removeEventListener("mouseleave", dragEnd)
    }
  }, [])

  return (
    <div className="iphone" style={style}>
      <StatusBar />
      <div className="screens-container" ref={screensContainerRef}>
        <div className="screen">
          <Widgets />
          <AppGrid apps={apps.slice(0, 12)} openApp={openApp} />
        </div>
        <div className="screen">
          <AppGrid apps={apps.slice(12)} openApp={openApp} />
        </div>
      </div>
      <SearchBar />
      <Dock apps={dockApps} openApp={openApp} />
      <PageIndicator currentPage={currentPage} totalPages={2} />
    </div>
  )
}
