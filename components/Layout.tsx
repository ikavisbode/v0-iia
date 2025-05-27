"use client"

import React from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"

interface LayoutProps {
  children: React.ReactNode
  className?: string
}

const Layout: React.FC<LayoutProps> = ({ children, className = "" }) => {
  React.useEffect(() => {
    document.title = "Instituto Internacional de Atuação"
  }, [])

  return (
    <div className={`min-h-screen bg-white ${className}`}>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
