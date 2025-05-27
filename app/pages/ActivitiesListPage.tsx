"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Clock, Users, Award, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Layout from "../../components/Layout"
import PageHeader from "../../components/PageHeader"
import { loadActivities, type ActivityData } from "../../utils/dataLoader"

interface ActivitiesListPageProps {
  onNavigate: (page: string, section?: string, id?: string) => void
}

const ActivitiesListPage: React.FC<ActivitiesListPageProps> = ({ onNavigate }) => {
  const { i18n } = useTranslation()
  const currentLang = i18n.language || "pt"
  const [activities, setActivities] = useState<ActivityData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const activitiesData = await loadActivities()
        setActivities(activitiesData)
      } catch (error) {
        console.error("Error loading activities:", error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const filteredActivities = activities

  if (loading) {
    return (
      <Layout>
        <PageHeader
          title="Atividades Acadêmicas"
          subtitle="Cursos, Workshops & Formações"
          backgroundImage="https://images.pexels.com/photos/3355366/pexels-photo-3355366.jpeg?auto=compress&cs=tinysrgb&w=1200"
        />
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando atividades...</p>
            </div>
          </div>
        </section>
      </Layout>
    )
  }

  return (
    <Layout>
      <PageHeader
        title="Atividades Acadêmicas"
        subtitle="Cursos, Workshops & Formações"
        backgroundImage="https://images.pexels.com/photos/3355366/pexels-photo-3355366.jpeg?auto=compress&cs=tinysrgb&w=1200"
      />

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Activities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredActivities.map((activity) => {
              const content = activity[currentLang as keyof typeof activity]

              return (
                <div
                  key={activity.id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
                  onClick={() => onNavigate("activity-detail", undefined, activity.slug)}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={activity.images[0] || "/placeholder.svg"}
                      alt={content.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block px-3 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full">
                        {activity.category}
                      </span>
                    </div>

                    <h3 className="text-heading text-xl font-bold text-gray-800 mb-3 line-clamp-2">{content.title}</h3>

                    <p className="text-body text-gray-600 mb-4 line-clamp-3">{content.description}</p>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-2 text-red-400" />
                        <span className="font-medium mr-2">Duração:</span>
                        <span>{content.duration}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="w-4 h-4 mr-2 text-red-400" />
                        <span className="font-medium mr-2">Instrutor:</span>
                        <span>{content.instructor}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2 text-red-400" />
                        <span className="font-medium mr-2">Data:</span>
                        <span>{content.date}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-2 text-red-400" />
                        <span className="font-medium mr-2">Local:</span>
                        <span>{content.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Award className="w-4 h-4 mr-2 text-red-400" />
                        <span className="font-medium mr-2">Preço:</span>
                        <span className="text-red-600 font-semibold">{content.price}</span>
                      </div>
                    </div>

                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold">
                      {content.price === "Gratuito" || content.price === "Free"
                        ? "Inscrever-se Gratuitamente"
                        : "Inscrever-se"}
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>

          {filteredActivities.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Nenhuma atividade encontrada.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-heading text-3xl font-bold text-white mb-6">
            Pronto para começar sua jornada artística?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Descubra o programa perfeito para desenvolver suas habilidades e alcançar seus objetivos artísticos.
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

export default ActivitiesListPage
