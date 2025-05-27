import type React from "react"
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

const Footer: React.FC = () => {
  const navLinks = [
    { name: "Início", href: "#home" },
    { name: "Sobre", href: "#about" },
    { name: "Projetos", href: "#projects-list" },
    { name: "Atividades", href: "#activities-list" },
    { name: "Equipe", href: "#team-list" },
    { name: "Contato", href: "#contact" },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img src="/images/logo-white.png" alt="Instituto Internacional de Atuação" className="h-10 w-auto" />
            </div>
            <p className="text-body text-gray-400 text-sm leading-relaxed">
              O Instituto Internacional de Atuação é dedicado à formação de artistas completos através de técnicas
              inovadoras e intercâmbio cultural.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-heading text-white font-semibold mb-4">Navegação</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-body text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-heading text-white font-semibold mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-body text-gray-400 text-sm">
                  Rua Augusta, 1500, Consolação, São Paulo - SP, 01304-001
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span className="text-body text-gray-400 text-sm">+55 11 3456-7890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span className="text-body text-gray-400 text-sm">contato@institutointernacional.com.br</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-heading text-white font-semibold mb-4">Newsletter</h3>
            <p className="text-body text-gray-400 text-sm mb-4">
              Assine nossa newsletter para receber novidades sobre cursos, workshops e eventos.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Seu email"
                className="text-body flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-sm text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
              />
              <button className="btn-modern px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-r-md transition-colors duration-200 font-medium">
                Inscrever
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-body text-gray-400 text-sm">
              © 2025 Instituto Internacional de Atuação. Todos os direitos reservados.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a
                href="#"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600 transition-all duration-200"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600 transition-all duration-200"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600 transition-all duration-200"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
