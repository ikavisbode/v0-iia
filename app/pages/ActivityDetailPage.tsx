"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, Users, MapPin, DollarSign, BookOpen } from "lucide-react"
import Layout from "../../components/Layout"
import { getActivityBySlug, type ActivityData } from "../../utils/dataLoader"

interface ActivityDetailPageProps {
  activityId: string
  onNavigate: (page: string, section?: string) => void
}

const ActivityDetailPage: React.FC<ActivityDetailPageProps> = ({ activityId, onNavigate }) => {
  const { i18n } = useTranslation()
  const currentLang = i18n.language || "pt"
  const [activity, setActivity] = useState<ActivityData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadActivity = async () => {
      try {
        const activityData = await getActivityBySlug(activityId)
        setActivity(activityData)
      } catch (error) {
        console.error("Error loading activity:", error)
      } finally {
        setLoading(false)
      }
    }
    loadActivity()
  }, [activityId])

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando atividade...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (!activity) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Atividade não encontrada</h1>
            <Button onClick={() => onNavigate("home")} className="bg-red-600 hover:bg-red-700 text-white">
              Voltar ao Início
            </Button>
          </div>
        </div>
      </Layout>
    )
  }

  const content = activity[currentLang as keyof typeof activity]

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <Button
            onClick={() => onNavigate("home", "activities")}
            variant="ghost"
            className="text-white hover:text-red-400 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar às Atividades
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-full mb-4">
                {activity.category}
              </span>
              <h1 className="text-heading text-4xl md:text-5xl font-bold text-white mb-6">{content.title}</h1>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center space-x-4">
                  <Users className="w-5 h-5 text-red-400" />
                  <span>
                    <strong>Instrutor:</strong> {content.instructor}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <Calendar className="w-5 h-5 text-red-400" />
                  <span>
                    <strong>Data:</strong> {content.date}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <Clock className="w-5 h-5 text-red-400" />
                  <span>
                    <strong>Horário:</strong> {content.time}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="w-5 h-5 text-red-400" />
                  <span>
                    <strong>Local:</strong> {content.location}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <DollarSign className="w-5 h-5 text-red-400" />
                  <span>
                    <strong>Preço:</strong> {content.price}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-heading text-2xl font-bold text-gray-800 mb-6">Informações da Inscrição</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duração:</span>
                  <span className="font-medium text-gray-800">{content.duration}</span>
                </div>
              </div>
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg">
                {content.price === "Gratuito" || content.price === "Free"
                  ? "Inscrever-se Gratuitamente"
                  : "Inscrever-se Agora"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-heading text-3xl font-bold text-gray-800 mb-8">Sobre a Atividade</h2>
            <div className="prose prose-lg max-w-none">
              {(content.fullDescription || content.description).split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-body text-gray-600 mb-6 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Program Section */}
      {activity.program && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-heading text-3xl font-bold text-gray-800 mb-12 text-center">Programação</h2>
            <div className="max-w-4xl mx-auto space-y-8">
              {activity.program.map((day, dayIndex) => {
                const dayContent = day[currentLang as keyof typeof day]
                return (
                  <div key={dayIndex} className="bg-gray-50 rounded-lg p-8">
                    <h3 className="text-heading text-2xl font-bold text-gray-800 mb-6">{dayContent.day}</h3>
                    <div className="space-y-4">
                      {dayContent.sessions.map((session, sessionIndex) => (
                        <div key={sessionIndex} className="flex items-start space-x-4 p-4 bg-white rounded-lg">
                          <div className="flex-shrink-0 w-20 text-sm font-medium text-red-600">{session.time}</div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800">{session.topic}</h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Requirements & Benefits */}
      {(activity.requirements || activity.benefits) && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Requirements */}
              {activity.requirements && (
                <div>
                  <h2 className="text-heading text-3xl font-bold text-gray-800 mb-8">O que trazer</h2>
                  <div className="space-y-4">
                    {activity.requirements[currentLang as keyof typeof activity.requirements].map(
                      (requirement, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <BookOpen className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                          <span className="text-body text-gray-600">{requirement}</span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}

              {/* Benefits */}
              {activity.benefits && (
                <div>
                  <h2 className="text-heading text-3xl font-bold text-gray-800 mb-8">O que você vai ganhar</h2>
                  <div className="space-y-4">
                    {activity.benefits[currentLang as keyof typeof activity.benefits].map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-body text-gray-600">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-heading text-3xl font-bold text-gray-800 mb-12 text-center">Galeria</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {activity.images.map((image, index) => (
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

      {/* CTA Section */}
      <section className="py-20 bg-red-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-heading text-3xl font-bold text-white mb-6">Pronto para participar?</h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Não perca esta oportunidade de desenvolver suas habilidades artísticas conosco.
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

export default ActivityDetailPage
