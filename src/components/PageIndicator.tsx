import type React from "react"

interface PageIndicatorProps {
  currentPage: number
  totalPages: number
}

const PageIndicator: React.FC<PageIndicatorProps> = ({ currentPage, totalPages }) => {
  return (
    <div className="page-indicator">
      {[...Array(totalPages)].map((_, index) => (
        <div key={index} className={`page-dot ${index === currentPage ? "active" : ""}`}></div>
      ))}
    </div>
  )
}

export default PageIndicator

