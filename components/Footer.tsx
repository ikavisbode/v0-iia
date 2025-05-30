import type React from "react"
import { Instagram, Youtube, Mail } from "lucide-react"

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
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

          {/* Contact */}
          <div>
            <h3 className="text-heading text-white font-semibold mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-red-400 flex-shrink-0" />
                <a
                  href="mailto:contato@institutointernacionaldeatuacao.com"
                  className="text-body text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  contato@institutointernacionaldeatuacao.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Instagram className="w-4 h-4 text-red-400 flex-shrink-0" />
                <a
                  href="https://instagram.com/institutointernacionaldatuacao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  @institutointernacionaldatuacao
                </a>
              </div>
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
                href="https://instagram.com/institutointernacionaldatuacao"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600 transition-all duration-200"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@InstitutoInternacionaldAtua%C3%A7%C3%A3o"
                target="_blank"
                rel="noopener noreferrer"
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
