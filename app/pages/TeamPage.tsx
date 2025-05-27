import type React from "react"
import { useTranslation } from "react-i18next"
import { Mail, Phone, Linkedin, Instagram } from "lucide-react"
import Layout from "../../components/Layout"
import PageHeader from "../../components/PageHeader"

const TeamPage: React.FC = () => {
  const { t } = useTranslation()

  const teamMembers = [
    {
      id: 1,
      name: "Maria Silva",
      role: "Diretora Artística",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Formada pela UNICAMP e com mestrado em Artes Cênicas pela USP. Mais de 15 anos de experiência em direção teatral e formação de atores.",
      experience: "15 anos",
      specialties: ["Direção Teatral", "Método Stanislavski", "Teatro Contemporâneo"],
      email: "maria.silva@iia.com.br",
      phone: "+55 11 99999-0001",
      social: {
        linkedin: "#",
        instagram: "#",
      },
    },
    {
      id: 2,
      name: "João Santos",
      role: "Coordenador Pedagógico",
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Doutor em Artes Cênicas pela UNIRIO. Especialista em técnicas de improvisação e teatro físico, com formação internacional.",
      experience: "12 anos",
      specialties: ["Improvisação", "Teatro Físico", "Pedagogia Teatral"],
      email: "joao.santos@iia.com.br",
      phone: "+55 11 99999-0002",
      social: {
        linkedin: "#",
        instagram: "#",
      },
    },
    {
      id: 3,
      name: "Ana Costa",
      role: "Pesquisadora Senior",
      image: "https://images.pexels.com/photos/3355366/pexels-photo-3355366.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Pós-doutora em Estudos Teatrais pela UFBA. Líder de projetos de pesquisa em dramaturgia brasileira contemporânea.",
      experience: "10 anos",
      specialties: ["Pesquisa Teatral", "Dramaturgia", "Teatro Brasileiro"],
      email: "ana.costa@iia.com.br",
      phone: "+55 11 99999-0003",
      social: {
        linkedin: "#",
        instagram: "#",
      },
    },
    {
      id: 4,
      name: "Carlos Mendes",
      role: "Diretor de Produção",
      image: "https://images.pexels.com/photos/8106573/pexels-photo-8106573.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Formado em Produção Cultural pela PUC-SP. Especialista em gestão de projetos artísticos e produção audiovisual.",
      experience: "8 anos",
      specialties: ["Produção Teatral", "Gestão Cultural", "Audiovisual"],
      email: "carlos.mendes@iia.com.br",
      phone: "+55 11 99999-0004",
      social: {
        linkedin: "#",
        instagram: "#",
      },
    },
    {
      id: 5,
      name: "Lucia Ferreira",
      role: "Professora de Técnica Vocal",
      image: "https://images.pexels.com/photos/2014775/pexels-photo-2014775.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Mestre em Música pela UNESP com especialização em técnica vocal para teatro. Cantora lírica e preparadora vocal.",
      experience: "14 anos",
      specialties: ["Técnica Vocal", "Preparação Vocal", "Canto Lírico"],
      email: "lucia.ferreira@iia.com.br",
      phone: "+55 11 99999-0005",
      social: {
        linkedin: "#",
        instagram: "#",
      },
    },
    {
      id: 6,
      name: "Roberto Lima",
      role: "Diretor de Audiovisual",
      image: "https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Cineasta formado pela FAAP com especialização em documentário. Diretor de diversos filmes sobre artes cênicas.",
      experience: "11 anos",
      specialties: ["Direção Audiovisual", "Documentário", "Edição"],
      email: "roberto.lima@iia.com.br",
      phone: "+55 11 99999-0006",
      social: {
        linkedin: "#",
        instagram: "#",
      },
    },
  ]

  return (
    <Layout>
      <PageHeader
        title={t("team.title")}
        subtitle={t("team.subtitle")}
        backgroundImage="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200"
      />

      <section className="py-20 bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-neutral-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-amber-400 font-medium mb-3">{member.role}</p>

                  <p className="text-neutral-300 text-sm mb-4 line-clamp-3">{member.bio}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-neutral-400">
                      <span className="font-medium mr-2">{t("team.experience")}:</span>
                      <span>{member.experience}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-white mb-2">Especialidades:</h4>
                    <div className="flex flex-wrap gap-1">
                      {member.specialties.map((specialty, index) => (
                        <span key={index} className="px-2 py-1 bg-neutral-700 text-neutral-300 text-xs rounded">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <a
                        href={`mailto:${member.email}`}
                        className="w-8 h-8 bg-neutral-700 rounded-full flex items-center justify-center text-neutral-400 hover:text-amber-400 hover:bg-neutral-600 transition-all duration-200"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                      <a
                        href={`tel:${member.phone}`}
                        className="w-8 h-8 bg-neutral-700 rounded-full flex items-center justify-center text-neutral-400 hover:text-amber-400 hover:bg-neutral-600 transition-all duration-200"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                      <a
                        href={member.social.linkedin}
                        className="w-8 h-8 bg-neutral-700 rounded-full flex items-center justify-center text-neutral-400 hover:text-amber-400 hover:bg-neutral-600 transition-all duration-200"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a
                        href={member.social.instagram}
                        className="w-8 h-8 bg-neutral-700 rounded-full flex items-center justify-center text-neutral-400 hover:text-amber-400 hover:bg-neutral-600 transition-all duration-200"
                      >
                        <Instagram className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default TeamPage
