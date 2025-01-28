import type React from "react"

const Widgets: React.FC = () => {
  return (
    <div className="widgets">
      <div className="widget weather">
        <div>Cupertino</div>
        <div className="temp">56°</div>
        <div>Sunny</div>
        <div>H:77° L:55°</div>
      </div>
      <div className="widget calendar-widget">
        <div>MONDAY</div>
        <div className="calendar-date">10</div>
        <div>2 birthdays</div>
        <div className="calendar-event">Portfolio work s...</div>
        <div>10-10:30AM</div>
      </div>
    </div>
  )
}

export default Widgets

