"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Users, MapPin, Play } from "lucide-react"
import Layout from "../../components/Layout"
import { getProjectBySlug, type ProjectData } from "../../utils/dataLoader"

interface ProjectDetailPageProps {
  projectId: string
  onNavigate: (page: string, section?: string) => void
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

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando projeto...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (!project) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Projeto não encontrado</h1>
            <Button onClick={() => onNavigate("home")} className="bg-red-600 hover:bg-red-700 text-white">
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
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <Button
            onClick={() => onNavigate("home", "projects")}
            variant="ghost"
            className="text-white hover:text-red-400 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar aos Projetos
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-full mb-4">
                {project.category}
              </span>
              <h1 className="text-heading text-4xl md:text-5xl font-bold text-white mb-6">{content.title}</h1>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center space-x-4">
                  <Users className="w-5 h-5 text-red-400" />
                  <span>
                    <strong>Direção:</strong> {content.director}
                  </span>
                </div>
                {content.assistantDirector && (
                  <div className="flex items-center space-x-4">
                    <Users className="w-5 h-5 text-red-400" />
                    <span>
                      <strong>Assistência de Direção:</strong> {content.assistantDirector}
                    </span>
                  </div>
                )}
                <div className="flex items-center space-x-4">
                  <Calendar className="w-5 h-5 text-red-400" />
                  <span>
                    <strong>Estreia:</strong> {content.premiere}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="w-5 h-5 text-red-400" />
                  <span>
                    <strong>Local:</strong> {content.location}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <Play className="w-5 h-5 text-red-400" />
                  <span>
                    <strong>Duração:</strong> {content.duration}
                  </span>
                </div>
              </div>
            </div>

            <div className="aspect-video rounded-lg overflow-hidden">
              <img
                src={project.images[0] || "/placeholder.svg"}
                alt={content.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-heading text-3xl font-bold text-gray-800 mb-8">Sobre o Projeto</h2>
            <div className="prose prose-lg max-w-none">
              {(content.fullDescription || content.description).split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-body text-gray-600 mb-6 leading-relaxed text-justify">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-heading text-3xl font-bold text-gray-800 mb-12 text-center">Galeria</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.images.map((image, index) => (
              <div key={index} className="aspect-video rounded-lg overflow-hidden">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${content.title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cast & Schedule */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Cast */}
            <div>
              <h2 className="text-heading text-3xl font-bold text-gray-800 mb-8">Elenco</h2>
              <div className="space-y-4">
                {content.cast.map((actor, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-gray-600" />
                    </div>
                    <span className="text-lg font-medium text-gray-800">{actor}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule */}
            {project.schedule && (
              <div>
                <h2 className="text-heading text-3xl font-bold text-gray-800 mb-8">Programação</h2>
                <div className="space-y-4">
                  {project.schedule.map((session, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
                      <span className="font-medium text-gray-800">
                        {currentLang === "en" ? session.dayEn : session.day}
                      </span>
                      <span className="text-red-600 font-bold">
                        {currentLang === "en" ? session.timeEn : session.time}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-3">Comprar Ingressos</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Reviews */}
      {project.reviews && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-heading text-3xl font-bold text-gray-800 mb-12 text-center">Críticas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {project.reviews.map((review, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="flex space-x-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-xl">
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="ml-3 font-medium text-gray-800">{review.author}</span>
                  </div>
                  <p className="text-body text-gray-600 italic">"{review[currentLang as keyof typeof review].text}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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

export default ProjectDetailPage
