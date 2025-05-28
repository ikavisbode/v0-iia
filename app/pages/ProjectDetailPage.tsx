"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Users, MapPin, Play, Star, Award, Target, Clock, Ticket, Linkedin, Instagram, ExternalLink } from 'lucide-react'
import Layout from "../../components/Layout"
import { getProjectBySlug, type ProjectData } from "../../utils/dataLoader"

interface ProjectDetailPageProps {
  projectId: string
  onNavigate: (page: string, section?: string, memberId?: string) => void
}

const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ projectId, onNavigate }) => {
  const { i18n } = useTranslation()
  const currentLang = i18n.language || "pt"
  const [project, setProject] = useState<ProjectData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProject = async () => {
      try {
        const projectData = await getProjectBySlug(projectId)
        setProject(projectData)
      } catch (error) {
        console.error("Error loading project:", error)
      } finally {
        setLoading(false)
      }
    }
    loadProject()
  }, [projectId])

  const handleDirectorClick = (directorUrl?: string) => {
    if (!directorUrl) return
    
    if (directorUrl.startsWith("/")) {
      // Internal URL - navigate within the app
      const parts = directorUrl.split("/")
      if (parts[1] === "member-detail" && parts[2]) {
        onNavigate("member-detail", undefined, parts[2])
      }
    } else {
      // External URL - open in new tab
      window.open(directorUrl, "_blank")
    }
  }

  const handleAssistantDirectorClick = (assistantDirectorUrl?: string) => {
    if (!assistantDirectorUrl) return
    
    if (assistantDirectorUrl.startsWith("/")) {
      // Internal URL - navigate within the app
      const parts = assistantDirectorUrl.split("/")
      if (parts[1] === "member-detail" && parts[2]) {
        onNavigate("member-detail", undefined, parts[2])
      }
    } else {
      // External URL - open in new tab
      window.open(assistantDirectorUrl, "_blank")
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-red-500 mx-auto mb-6"></div>
            <p className="text-gray-300 text-lg">Carregando projeto...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (!project) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-6">Projeto não encontrado</h1>
            <Button onClick={() => onNavigate("home")} className="bg-red-600 hover:bg-red-700 text-white px-8 py-3">
              Voltar ao Início
            </Button>
          </div>
        </div>
      </Layout>
    )
  }

  const content = project[currentLang as keyof typeof project]

  return (
    <Layout>
      {/* Hero Section with Gradient Background */}
      <section className="relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <Button
            onClick={() => onNavigate("home", "projects")}
            variant="ghost"
            className="text-white hover:text-red-400 mb-8 backdrop-blur-sm bg-white/10 rounded-full px-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar aos Projetos
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-semibold rounded-full mb-6 shadow-lg">
                  <Star className="w-4 h-4 mr-2" />
                  {project.category}
                </span>
                <h1 className="text-heading text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  {content.title}
                </h1>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {/* Director Section */}
                <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={content.directorPicture || "/placeholder.svg"}
                        alt={content.director}
                        className="w-16 h-16 rounded-full object-cover border-2 border-red-400 shadow-lg"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                        <Users className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <span className="text-gray-300 text-sm">Direção</span>
                      <div className="flex items-center space-x-3">
                        <h3
                          className={`text-white font-bold text-lg ${
                            content.directorUrl ? 'cursor-pointer hover:text-red-400 transition-colors' : ''
                          }`}
                          onClick={() => handleDirectorClick(content.directorUrl)}
                        >
                          {content.director}
                        </h3>
                        {content.directorUrl && (
                          <ExternalLink className="w-4 h-4 text-red-400" />
                        )}
                      </div>

                      {/* Director Social Links - Only show if social object exists and has links */}
                      {content.directorSocial && 
                        (content.directorSocial.linkedin || content.directorSocial.instagram) && (
                          <div className="flex items-center space-x-2 mt-2">
                            {content.directorSocial.linkedin && (
                              <a
                                href={content.directorSocial.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Linkedin className="w-4 h-4 text-white" />
                              </a>
                            )}
                            {content.directorSocial.instagram && (
                              <a
                                href={content.directorSocial.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Instagram className="w-4 h-4 text-white" />
                              </a>
                            )}
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                {/* Assistant Director Section */}
                {content.assistantDirector && (
                  <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={content.assistantDirectorPicture || "/placeholder.svg"}
                          alt={content.assistantDirector}
                          className="w-16 h-16 rounded-full object-cover border-2 border-red-400 shadow-lg"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                          <Users className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <span className="text-gray-300 text-sm">Assistência de Direção</span>
                        <div className="flex items-center space-x-3">
                          <h3
                            className={`text-white font-bold text-lg ${
                              content.assistantDirectorUrl ? 'cursor-pointer hover:text-red-400 transition-colors' : ''
                            }`}
                            onClick={() => handleAssistantDirectorClick(content.assistantDirectorUrl)}
                          >
                            {content.assistantDirector}
                          </h3>
                          {content.assistantDirectorUrl && (
                            <ExternalLink className="w-4 h-4 text-red-400" />
                          )}
                        </div>

                        {/* Assistant Director Social Links - Only show if social object exists and has links */}
                        {content.assistantDirectorSocial && 
                          (content.assistantDirectorSocial.linkedin || content.assistantDirectorSocial.instagram) && (
                            <div className="flex items-center space-x-2 mt-2">
                              {content.assistantDirectorSocial.linkedin && (
                                <a
                                  href={content.assistantDirectorSocial.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Linkedin className="w-4 h-4 text-white" />
                                </a>
                              )}
                              {content.assistantDirectorSocial.instagram && (
                                <a
                                  href={content.assistantDirectorSocial.instagram}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Instagram className="w-4 h-4 text-white" />
                                </a>
                              )}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                    <Play className="w-6 h-6 text-red-400 flex-shrink-0" />
                    <div>
                      <span className="text-gray-300 text-sm">Duração</span>
                      <p className="text-white font-semibold">{content.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                    <Calendar className="w-6 h-6 text-red-400 flex-shrink-0" />
                    <div>
                      <span className="text-gray-300 text-sm">Estreia</span>
                      <p className="text-white font-semibold">{content.premiere}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <MapPin className="w-6 h-6 text-red-400 flex-shrink-0" />
                  <div>
                    <span className="text-gray-300 text-sm">Local</span>
                    <p className="text-white font-semibold">{content.location}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-red-600/20 to-red-500/20 backdrop-blur-sm rounded-xl border border-red-400/30">
                  <Award className="w-6 h-6 text-red-400 flex-shrink-0" />
                  <div>
                    <span className="text-red-200 text-sm">Status</span>
                    <p className="text-white font-bold text-xl">{project.status}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-200">
              <div className="text-center mb-8">
                <Ticket className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-heading text-2xl font-bold text-gray-800 mb-2">Informações do Projeto</h3>
                <p className="text-gray-600">Detalhes sobre esta produção</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                  <span className="text-gray-600 font-medium">Categoria:</span>
                  <span className="font-bold text-gray-800">{project.category}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                  <span className="text-gray-600 font-medium">Status:</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
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

              {project.status === "Em Cartaz" && (
                <Button className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white py-4 text-lg font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200">
                  Comprar Ingressos
                </Button>
              )}
              {project.status === "Inscrições Abertas" && (
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-4 text-lg font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200">
                  Inscrever-se
                </Button>
              )}
              {(project.status === "Pré-produção" || project.status === "Em Desenvolvimento") && (
                <Button className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-white py-4 text-lg font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200">
                  Acompanhar Projeto
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Target className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-heading text-4xl font-bold text-gray-800 mb-4">Sobre o Projeto</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto rounded-full"></div>
            </div>

            <div className="prose prose-lg max-w-none">
              {(content.fullDescription || content.description).split("\n\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="text-body text-gray-700 mb-6 leading-relaxed text-lg bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cast & Schedule */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {/* Cast */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="text-center mb-8">
                <Users className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h2 className="text-heading text-3xl font-bold text-gray-800 mb-2">Elenco</h2>
                <div className="w-16 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto rounded-full"></div>
              </div>

              <div className="space-y-4">
                {content.cast.map((actor, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-red-600" />
                    </div>
                    <span className="text-body text-gray-700 font-medium mt-3">{actor}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule */}
            {project.schedule && (
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <div className="text-center mb-8">
                  <Clock className="w-12 h-12 text-red-600 mx-auto mb-4" />
                  <h2 className="text-heading text-3xl font-bold text-gray-800 mb-2">Programação</h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto rounded-full"></div>
                </div>

                <div className="space-y-4">
                  {project.schedule.map((session, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-6 p-6 bg-gradient-to-r from-red-50 to-red-25 rounded-xl border border-red-100"
                    >
                      <div className="flex-shrink-0 w-24 text-center">
                        <span className="inline-block px-3 py-2 bg-red-600 text-white text-sm font-bold rounded-lg">
                          {currentLang === "en" ? session.timeEn : session.time}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 text-lg">
                          {currentLang === "en" ? session.dayEn : session.day}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Button className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white py-4 text-lg font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200">
                    Comprar Ingressos
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-heading text-4xl font-bold text-gray-800 mb-4">Galeria</h2>
            <p className="text-gray-600 text-lg">Momentos e registros do projeto</p>
            <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {project.images.map((image, index) => (
              <div
                key={index}
                className="group relative aspect-video rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${content.title} ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      {project.reviews && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Award className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-heading text-4xl font-bold text-gray-800 mb-4">Críticas</h2>
              <p className="text-gray-600 text-lg">O que a crítica especializada diz</p>
              <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto rounded-full mt-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {project.reviews.map((review, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                  <div className="flex items-center mb-6">
                    <div className="flex space-x-1 mr-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-xl">
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="font-bold text-gray-800 text-lg">{review.author}</span>
                  </div>
                  <p className="text-body text-gray-600 italic text-lg leading-relaxed">
                    "{review[currentLang as keyof typeof review].text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-red-600 via-red-500 to-red-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-heading text-4xl md:text-5xl font-bold text-white mb-6">
              Interessado em nossos projetos?
            </h2>
            <p className="text-xl text-red-100 mb-12 max-w-2xl mx-auto leading-relaxed">
              Entre em contato conosco para saber mais sobre como participar ou apoiar nossos projetos.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                onClick={() => onNavigate("home", "contact")}
                size="lg"
                className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Entre em Contato
              </Button>
              <Button
                onClick={() => onNavigate("home", "about")}
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm transform hover:scale-105 transition-all duration-200"
              >
                Sobre Nós
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default ProjectDetailPage
