"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Layout from "../../components/Layout"
import {
  loadProjects,
  loadActivities,
  loadMembers,
  type ProjectData,
  type ActivityData,
  type MemberData,
} from "../../utils/dataLoader"
import { useTranslation } from "react-i18next"

interface HomePageProps {
  onNavigate: (page: string, section?: string, id?: string) => void
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { i18n } = useTranslation()
  const currentLang = i18n.language || "pt"
  const [activeProjectFilter, setActiveProjectFilter] = useState("TODOS")
  const [projects, setProjects] = useState<ProjectData[]>([])
  const [activities, setActivities] = useState<ActivityData[]>([])
  const [teamMembers, setTeamMembers] = useState<MemberData[]>([])

  // Add loading states for each data type:
  const [projectsLoading, setProjectsLoading] = useState(true)
  const [activitiesLoading, setActivitiesLoading] = useState(true)
  const [membersLoading, setMembersLoading] = useState(true)

  // Update the useEffect to handle loading states:
  useEffect(() => {
    const loadData = async () => {
      try {
        const [projectsData, activitiesData, membersData] = await Promise.all([
          loadProjects().finally(() => setProjectsLoading(false)),
          loadActivities().finally(() => setActivitiesLoading(false)),
          loadMembers().finally(() => setMembersLoading(false)),
        ])
        setProjects(projectsData)
        setActivities(activitiesData)
        setTeamMembers(membersData)
      } catch (error) {
        console.error("Error loading data:", error)
      }
    }
    loadData()
  }, [])

  const projectFilters = ["TODOS", "PERFORMANCE", "PESQUISA", "WORKSHOP"]

  const filteredProjects =
    activeProjectFilter === "TODOS" ? projects : projects.filter((project) => project.category === activeProjectFilter)

  const featuredActivity = activities.find((activity) => activity.featured)
  const otherActivities = activities.filter((activity) => !activity.featured)

  return (
    <Layout>
      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url('/images/2025_IIA_KV_1.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="container mx-auto px-4 text-center text-white relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Instituto Internacional de
              <br />
              Atuação
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-medium tracking-wide">Pesquisa - Técnica - Produção</p>
            <p className="text-body text-lg mb-10 max-w-3xl mx-auto leading-relaxed opacity-90">
              Impulsionando vocações e expandindo as potencialidades de quem vive a arte da atuação como um chamado.
            </p>
            <Button
              size="lg"
              className="btn-modern bg-white text-red-800 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => onNavigate("projects-list")}
            >
              Conheça nossos projetos
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-heading text-4xl font-bold text-gray-800 mb-4">Sobre Nós</h2>
            <p className="text-lg text-gray-600 font-medium">Nossa História & Missão</p>
            <div className="w-16 h-1 bg-red-600 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="text-heading text-xl font-semibold text-gray-800 mb-4">Nossa História</h3>
              <p className="text-body text-gray-600 text-sm leading-relaxed">
                Fundado no final de 2024, o Instituto Internacional de Atuação nasceu da paixão de um grupo de artistas
                comprometidos em elevar o nível das artes cênicas como um todo.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-heading text-xl font-semibold text-gray-800 mb-4">Nossa Missão</h3>
              <p className="text-body text-gray-600 text-sm leading-relaxed">
                Desenvolvemos artistas completos através de técnicas internacionais de atuação, promovendo excelência
                artística, pesquisa teatral e audiovisual.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-heading text-xl font-semibold text-gray-800 mb-4">Nossa Visão</h3>
              <p className="text-body text-gray-600 text-sm leading-relaxed">
                Ser reconhecido internacionalmente como centro de excelência em formação artística, produção teatral
                inovadora e transformação cultural.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-heading text-xl font-semibold text-gray-800 mb-4">Nossos Valores</h3>
              <p className="text-body text-gray-600 text-sm leading-relaxed">
                Excelência artística, inovação constante, inclusão e diversidade, transformação social e colaboração
                internacional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-heading text-4xl font-bold text-white mb-4">Projetos</h2>
            <p className="text-lg text-gray-300 font-medium">Nossas Produções & Pesquisas</p>
            <div className="w-16 h-1 bg-red-600 mx-auto mt-4"></div>
          </div>

          {/* Project Filters */}
          <div className="flex justify-center mb-12">
            <div className="flex space-x-2">
              {projectFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveProjectFilter(filter)}
                  className={`btn-modern px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeProjectFilter === filter
                      ? "bg-red-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          {projectsLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-300">Carregando projetos...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-gray-800 rounded-lg overflow-hidden group hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
                  onClick={() => onNavigate("project-detail", undefined, project.slug)}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.images[0] || "/placeholder.svg"}
                      alt={project[currentLang as keyof typeof project].title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-heading text-xl font-semibold text-white mb-3">
                      {project[currentLang as keyof typeof project].title}
                    </h3>
                    <Button size="sm" className="btn-modern bg-red-600 hover:bg-red-700 text-white font-medium">
                      Saiba Mais
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button
              onClick={() => onNavigate("projects-list")}
              size="lg"
              variant="outline"
              className="btn-modern border-white text-white hover:bg-white hover:text-gray-900 font-medium"
            >
              Ver Todos os Projetos
            </Button>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section id="activities" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-heading text-4xl font-bold text-gray-800 mb-4">Atividades</h2>
            <p className="text-lg text-gray-600 font-medium">Próximos Eventos & Workshops</p>
            <div className="w-16 h-1 bg-red-600 mx-auto mt-4"></div>
          </div>

          {activitiesLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando atividades...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Featured Activity */}
              {featuredActivity && (
                <div className="lg:row-span-2">
                  <div
                    className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
                    onClick={() => onNavigate("activity-detail", undefined, featuredActivity.slug)}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={featuredActivity.images[0] || "/placeholder.svg"}
                        alt={featuredActivity[currentLang as keyof typeof featuredActivity].title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-8">
                      <span className="text-caption inline-block px-3 py-1 bg-red-100 text-red-600 text-sm font-medium rounded-full mb-4">
                        Destaque
                      </span>
                      <h3 className="text-heading text-2xl font-semibold text-gray-800 mb-4">
                        {featuredActivity[currentLang as keyof typeof featuredActivity].title}
                      </h3>
                      <p className="text-body text-gray-600 mb-6 leading-relaxed">
                        {featuredActivity[currentLang as keyof typeof featuredActivity].description}
                      </p>
                      <div className="space-y-2 mb-6">
                        <p className="text-caption text-sm text-gray-500">
                          <span className="font-medium">Data:</span>{" "}
                          {featuredActivity[currentLang as keyof typeof featuredActivity].date}
                        </p>
                        <p className="text-caption text-sm text-gray-500">
                          <span className="font-medium">Local:</span>{" "}
                          {featuredActivity[currentLang as keyof typeof featuredActivity].location}
                        </p>
                        <p className="text-caption text-sm text-gray-500">
                          <span className="font-medium">Preço:</span>{" "}
                          {featuredActivity[currentLang as keyof typeof featuredActivity].price}
                        </p>
                      </div>
                      <Button className="btn-modern bg-red-600 hover:bg-red-700 text-white font-medium">
                        Inscrever-se
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Other Activities */}
              <div className="space-y-6">
                {otherActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden flex cursor-pointer hover:shadow-xl transition-shadow duration-300"
                    onClick={() => onNavigate("activity-detail", undefined, activity.slug)}
                  >
                    <div className="w-32 h-32 flex-shrink-0">
                      <img
                        src={activity.images[0] || "/placeholder.svg"}
                        alt={activity[currentLang as keyof typeof activity].title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 flex-1">
                      <h4 className="text-heading text-lg font-semibold text-gray-800 mb-2">
                        {activity[currentLang as keyof typeof activity].title}
                      </h4>
                      <p className="text-body text-gray-600 text-sm mb-3 line-clamp-2">
                        {activity[currentLang as keyof typeof activity].description}
                      </p>
                      <div className="space-y-1 mb-3">
                        <p className="text-caption text-xs text-gray-500">
                          <span className="font-medium">Data:</span>{" "}
                          {activity[currentLang as keyof typeof activity].date}
                        </p>
                        <p className="text-caption text-xs text-gray-500">
                          <span className="font-medium">Preço:</span>{" "}
                          {activity[currentLang as keyof typeof activity].price}
                        </p>
                      </div>
                      <Button size="sm" className="btn-modern bg-red-600 hover:bg-red-700 text-white font-medium">
                        Saiba Mais
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-center mt-12">
            <Button
              onClick={() => onNavigate("activities-list")}
              size="lg"
              className="btn-modern bg-red-600 hover:bg-red-700 text-white font-medium"
            >
              Ver Todas as Atividades
            </Button>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-heading text-4xl font-bold text-white mb-4">Nossa Equipe</h2>
            <p className="text-lg text-gray-300 font-medium">Os Artistas & Educadores</p>
            <div className="w-16 h-1 bg-red-600 mx-auto mt-4"></div>
          </div>

          {membersLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-300">Carregando equipe...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="text-center cursor-pointer group"
                  onClick={() => onNavigate("member-detail", undefined, member.slug)}
                >
                  <div className="aspect-square overflow-hidden rounded-lg mb-4 group-hover:transform group-hover:scale-105 transition-all duration-300">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member[currentLang as keyof typeof member].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-heading text-xl font-semibold text-white mb-2 group-hover:text-red-400 transition-colors duration-200">
                    {member[currentLang as keyof typeof member].name}
                  </h3>
                  <p className="text-body text-gray-300">{member[currentLang as keyof typeof member].role}</p>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button
              onClick={() => onNavigate("team-list")}
              size="lg"
              variant="outline"
              className="btn-modern border-white text-white hover:bg-white hover:text-gray-900 font-medium"
            >
              Conheça Toda a Equipe
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default HomePage
