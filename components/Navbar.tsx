"use client"

import type React from "react"
import { useState } from "react"
import { Menu, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import i18n from "../i18n/config"

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState("PT")

  const toggleLanguage = () => {
    const newLang = currentLanguage === "PT" ? "EN" : "PT"
    const i18nLang = newLang === "PT" ? "pt" : "en"

    if (i18n && typeof i18n.changeLanguage === "function") {
      i18n.changeLanguage(i18nLang)
      setCurrentLanguage(newLang)
    }
  }

  const navLinks = [
    { name: "INÍCIO", href: "#home" },
    { name: "SOBRE", href: "#about" },
    { name: "PROJETOS", href: "#projects-list" },
    { name: "ATIVIDADES", href: "#activities-list" },
    { name: "EQUIPE", href: "#team-list" },
    { name: "CONTATO", href: "#contact" },
  ]

  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#home" className="flex items-center">
              <img src="/images/logo-white.png" alt="Instituto Internacional de Atuação" className="h-12 w-auto" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-caption text-white hover:text-red-400 transition-colors duration-200 text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="btn-modern text-white hover:text-red-400 hover:bg-gray-800 font-medium"
            >
              <Globe className="w-4 h-4 mr-2" />
              {currentLanguage}
            </Button>

            <button className="md:hidden text-white hover:text-red-400" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-caption block py-3 text-white hover:text-red-400 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
