"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Clock, Users, Award, Calendar, MapPin, Play } from 'lucide-react'
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
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory
    return matchesCategory
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
          {/* Category Filters */}
          <div className="flex justify-center mb-12">
            <div className="flex flex-wrap justify-center gap-2 md:space-x-2 md:gap-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-red-600 text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {category === "all" ? "TODOS" : category}
                </button>
              ))}
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
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block px-3 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full">
                        {project.category}
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
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

                    <h3 className="text-heading text-xl font-bold text-gray-800 mb-3 line-clamp-2">{content.title}</h3>

                    <p className="text-body text-gray-600 mb-4 line-clamp-3">{content.description}</p>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="w-4 h-4 mr-2 text-red-400" />
                        <span className="font-medium mr-2">Diretor:</span>
                        <span>{content.director}</span>
                      </div>
                      {content.assistantDirector && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="w-4 h-4 mr-2 text-red-400" />
                          <span className="font-medium mr-2">Assistência de Direção:</span>
                          <span>{content.assistantDirector}</span>
                        </div>
                      )}
                      <div className="flex items-center text-sm text-gray-500">
                        <Play className="w-4 h-4 mr-2 text-red-400" />
                        <span className="font-medium mr-2">Duração:</span>
                        <span>{content.duration}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2 text-red-400" />
                        <span className="font-medium mr-2">Estreia:</span>
                        <span>{content.premiere}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-2 text-red-400" />
                        <span className="font-medium mr-2">Local:</span>
                        <span>{content.location}</span>
                      </div>
                    </div>

                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold">
                      Saiba Mais
                    </Button>
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
