"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Layout from "../../components/Layout"
import PageHeader from "../../components/PageHeader"
import { loadProjects, type ProjectData } from "../../utils/dataLoader"

interface ProjectsListPageProps {
  onNavigate: (page: string, section?: string, id?: string) => void
}

const ProjectsListPage: React.FC<ProjectsListPageProps> = ({ onNavigate }) => {
  const { i18n } = useTranslation()
  const currentLang = i18n.language || "pt"
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [projects, setProjects] = useState<ProjectData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const projectsData = await loadProjects()
        setProjects(projectsData)
      } catch (error) {
        console.error("Error loading projects:", error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const categories = ["all", "PERFORMANCE", "PESQUISA", "LABORATÓRIO", "AUDIOVISUAL"]

  const filteredProjects = projects.filter((project) => {
    const content = project[currentLang as keyof typeof project]
    const matchesSearch =
      content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <Layout>
        <PageHeader
          title="Projetos"
          subtitle="Nossas Produções & Pesquisas"
          backgroundImage="https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=1200"
        />
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando projetos...</p>
            </div>
          </div>
        </section>
      </Layout>
    )
  }

  return (
    <Layout>
      <PageHeader
        title="Projetos"
        subtitle="Nossas Produções & Pesquisas"
        backgroundImage="https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=1200"
      />

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="mb-12 space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Buscar projetos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-gray-300 focus:border-red-500 focus:ring-red-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-white border border-gray-300 text-gray-700 rounded-md px-3 py-2 focus:border-red-500 focus:ring-red-500"
                >
                  <option value="all">Todas as Categorias</option>
                  {categories.slice(1).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const content = project[currentLang as keyof typeof project]
              return (
                <div
                  key={project.id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
                  onClick={() => onNavigate("project-detail", undefined, project.slug)}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.images[0] || "/placeholder.svg"}
                      alt={content.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full mb-3">
                      {project.category}
                    </span>

                    <h3 className="text-heading text-xl font-bold text-gray-800 mb-3 line-clamp-2">{content.title}</h3>

                    <p className="text-body text-gray-600 mb-4 line-clamp-3">{content.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="font-medium mr-2">Diretor:</span>
                        <span>{content.director}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="font-medium mr-2">Duração:</span>
                        <span>{content.duration}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="font-medium mr-2">Local:</span>
                        <span>{content.location}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-medium mr-2">Status:</span>
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            project.status === "Em Cartaz" || project.status === "Ativo"
                              ? "bg-green-100 text-green-800"
                              : project.status === "Inscrições Abertas"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>
                    </div>

                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold">Saiba Mais</Button>
                  </div>
                </div>
              )
            })}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Nenhum projeto encontrado com os filtros selecionados.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-heading text-3xl font-bold text-white mb-6">Interessado em nossos projetos?</h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Entre em contato conosco para saber mais sobre como participar ou apoiar nossos projetos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => onNavigate("home", "contact")}
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100"
            >
              Entre em Contato
            </Button>
            <Button
              onClick={() => onNavigate("home", "about")}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-red-600"
            >
              Sobre Nós
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default ProjectsListPage
