import type React from "react"

interface PageHeaderProps {
  title: string
  subtitle?: string
  backgroundImage?: string
  className?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, backgroundImage, className = "" }) => {
  return (
    <section
      className={`relative py-20 lg:py-32 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 ${className}`}
      style={
        backgroundImage
          ? {
              backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : {}
      }
    >
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">{title}</h1>
        {subtitle && <p className="text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto">{subtitle}</p>}
        <div className="w-20 h-1 bg-amber-400 mx-auto mt-8"></div>
      </div>
    </section>
  )
}

export default PageHeader
