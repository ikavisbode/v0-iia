"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  MapPin,
  DollarSign,
  BookOpen,
  Star,
  Award,
  Target,
  ExternalLink,
  Linkedin,
  Instagram,
} from "lucide-react"
import Layout from "../../components/Layout"
import { getActivityBySlug, type ActivityData } from "../../utils/dataLoader"

interface ActivityDetailPageProps {
  activityId: string
  onNavigate: (page: string, section?: string, memberId?: string) => void
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

  const handleInstructorClick = (instructorUrl: string) => {
    if (instructorUrl.startsWith("/")) {
      // Internal URL - navigate within the app
      const parts = instructorUrl.split("/")
      if (parts[1] === "member-detail" && parts[2]) {
        onNavigate("member-detail", undefined, parts[2])
      }
    } else {
      // External URL - open in new tab
      window.open(instructorUrl, "_blank")
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-red-500 mx-auto mb-6"></div>
            <p className="text-gray-300 text-lg">Carregando atividade...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (!activity) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-6">Atividade não encontrada</h1>
            <Button onClick={() => onNavigate("home")} className="bg-red-600 hover:bg-red-700 text-white px-8 py-3">
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
      {/* Hero Section with Gradient Background */}
      <section className="relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <Button
            onClick={() => onNavigate("home", "activities")}
            variant="ghost"
            className="text-white hover:text-red-400 mb-8 backdrop-blur-sm bg-white/10 rounded-full px-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar às Atividades
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-semibold rounded-full mb-6 shadow-lg">
                  <Star className="w-4 h-4 mr-2" />
                  {activity.category}
                </span>
                <h1 className="text-heading text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  {content.title}
                </h1>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {/* Enhanced Instructor Section */}
                <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={content.instructor.picture || "/placeholder.svg"}
                        alt={content.instructor.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-red-400 shadow-lg"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                        <Users className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <span className="text-gray-300 text-sm">Instrutor</span>
                      <div className="flex items-center space-x-3">
                        <h3
                          className="text-white font-bold text-lg cursor-pointer hover:text-red-400 transition-colors"
                          onClick={() => handleInstructorClick(content.instructor.url)}
                        >
                          {content.instructor.name}
                        </h3>
                        <ExternalLink className="w-4 h-4 text-red-400" />
                      </div>

                      {/* Social Links - Only show if social object exists and has links */}
                      {content.instructor.social &&
                        (content.instructor.social.linkedin || content.instructor.social.instagram) && (
                          <div className="flex items-center space-x-2 mt-2">
                            {content.instructor.social.linkedin && (
                              <a
                                href={content.instructor.social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                              >
                                <Linkedin className="w-4 h-4 text-white" />
                              </a>
                            )}
                            {content.instructor.social.instagram && (
                              <a
                                href={content.instructor.social.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                              >
                                <Instagram className="w-4 h-4 text-white" />
                              </a>
                            )}
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                {/* Technical Operator Section - Only show if technicalOperator exists */}
                {content.technicalOperator && (
                  <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={content.technicalOperator.picture || "/placeholder.svg"}
                          alt={content.technicalOperator.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-red-400 shadow-lg"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                          <Users className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <span className="text-gray-300 text-sm">Operador Técnico</span>
                        <div className="flex items-center space-x-3">
                          <h3
                            className="text-white font-bold text-lg cursor-pointer hover:text-red-400 transition-colors"
                            onClick={() => handleInstructorClick(content.technicalOperator.url)}
                          >
                            {content.technicalOperator.name}
                          </h3>
                          <ExternalLink className="w-4 h-4 text-red-400" />
                        </div>

                        {/* Social Links for Technical Operator */}
                        {content.technicalOperator.social &&
                          (content.technicalOperator.social.linkedin || content.technicalOperator.social.instagram) && (
                            <div className="flex items-center space-x-2 mt-2">
                              {content.technicalOperator.social.linkedin && (
                                <a
                                  href={content.technicalOperator.social.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                                >
                                  <Linkedin className="w-4 h-4 text-white" />
                                </a>
                              )}
                              {content.technicalOperator.social.instagram && (
                                <a
                                  href={content.technicalOperator.social.instagram}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
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
                    <Calendar className="w-6 h-6 text-red-400 flex-shrink-0" />
                    <div>
                      <span className="text-gray-300 text-sm">Data</span>
                      <p className="text-white font-semibold">{content.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                    <Clock className="w-6 h-6 text-red-400 flex-shrink-0" />
                    <div>
                      <span className="text-gray-300 text-sm">Horário</span>
                      <p className="text-white font-semibold">{content.time}</p>
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
                  <DollarSign className="w-6 h-6 text-red-400 flex-shrink-0" />
                  <div>
                    <span className="text-red-200 text-sm">Preço</span>
                    <p className="text-white font-bold text-xl">{content.price}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-200">
              <div className="text-center mb-8">
                <Award className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-heading text-2xl font-bold text-gray-800 mb-2">Informações da Inscrição</h3>
                <p className="text-gray-600">Garante já sua vaga nesta experiência única</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                  <span className="text-gray-600 font-medium">Duração:</span>
                  <span className="font-bold text-gray-800">{content.duration}</span>
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white py-4 text-lg font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                onClick={() => window.open(activity.registrationUrl, "_blank")}
              >
                {content.price === "Gratuito" || content.price === "Free"
                  ? "Inscrever-se Gratuitamente"
                  : "Inscrever-se Agora"}
              </Button>
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
              <h2 className="text-heading text-4xl font-bold text-gray-800 mb-4">Sobre a Atividade</h2>
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

      {/* Program Section */}
      {activity.program && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-heading text-4xl font-bold text-gray-800 mb-4">Programação</h2>
              <p className="text-gray-600 text-lg">Cronograma detalhado das atividades</p>
              <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto rounded-full mt-4"></div>
            </div>

            <div className="max-w-5xl mx-auto space-y-8">
              {activity.program.map((day, dayIndex) => {
                const dayContent = day[currentLang as keyof typeof day]
                return (
                  <div
                    key={dayIndex}
                    className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-200"
                  >
                    <h3 className="text-heading text-2xl font-bold text-gray-800 mb-8 text-center">{dayContent.day}</h3>
                    <div className="space-y-4">
                      {dayContent.sessions.map((session, sessionIndex) => (
                        <div
                          key={sessionIndex}
                          className="flex items-start space-x-6 p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                        >
                          <div className="flex-shrink-0 w-24 text-center">
                            <span className="inline-block px-3 py-2 bg-red-600 text-white text-sm font-bold rounded-lg">
                              {session.time}
                            </span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 text-lg">{session.topic}</h4>
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
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
              {/* Requirements */}
              {activity.requirements && (
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                  <div className="text-center mb-8">
                    <BookOpen className="w-12 h-12 text-red-600 mx-auto mb-4" />
                    <h2 className="text-heading text-3xl font-bold text-gray-800 mb-2">O que trazer</h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto rounded-full"></div>
                  </div>

                  <div className="space-y-4">
                    {activity.requirements[currentLang as keyof typeof activity.requirements].map(
                      (requirement, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                          <BookOpen className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                          <span className="text-body text-gray-700 font-medium">{requirement}</span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}

              {/* Benefits */}
              {activity.benefits && (
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                  <div className="text-center mb-8">
                    <Award className="w-12 h-12 text-red-600 mx-auto mb-4" />
                    <h2 className="text-heading text-3xl font-bold text-gray-800 mb-2">O que você vai ganhar</h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto rounded-full"></div>
                  </div>

                  <div className="space-y-4">
                    {activity.benefits[currentLang as keyof typeof activity.benefits].map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-4 p-4 bg-gradient-to-r from-red-50 to-red-25 rounded-xl border border-red-100"
                      >
                        <div className="w-6 h-6 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center mt-1 flex-shrink-0 shadow-sm">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <span className="text-body text-gray-700 font-medium">{benefit}</span>
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
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-heading text-4xl font-bold text-gray-800 mb-4">Galeria</h2>
            <p className="text-gray-600 text-lg">Momentos e experiências anteriores</p>
            <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {activity.images.map((image, index) => (
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

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-red-600 via-red-500 to-red-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-heading text-4xl md:text-5xl font-bold text-white mb-6">Pronto para participar?</h2>
            <p className="text-xl text-red-100 mb-12 max-w-2xl mx-auto leading-relaxed">
              Não perca esta oportunidade de desenvolver suas habilidades artísticas conosco. Uma experiência
              transformadora te espera.
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

export default ActivityDetailPage
