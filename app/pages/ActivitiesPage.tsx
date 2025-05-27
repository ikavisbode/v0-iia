"use client"

import type React from "react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Clock, Users, BookOpen, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import Layout from "../../components/Layout"
import PageHeader from "../../components/PageHeader"

const ActivitiesPage: React.FC = () => {
  const { t } = useTranslation()
  const [selectedLevel, setSelectedLevel] = useState("all")

  const activities = [
    {
      id: 1,
      title: "Curso Fundamental de Atuação",
      description:
        "Curso básico que introduz os fundamentos da atuação teatral, incluindo técnicas de respiração, voz, movimento e interpretação.",
      image: "https://images.pexels.com/photos/3355366/pexels-photo-3355366.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "6 meses",
      level: "Iniciante",
      instructor: "Maria Silva",
      schedule: "Terças e Quintas, 19h-21h",
      price: "R$ 300/mês",
      category: "Curso Regular",
    },
    {
      id: 2,
      title: "Workshop Intensivo de Método",
      description:
        "Workshop avançado focado nas técnicas do método Stanislavski, com exercícios práticos e análise de personagens.",
      image: "https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "2 semanas",
      level: "Avançado",
      instructor: "João Santos",
      schedule: "Segunda a Sexta, 14h-18h",
      price: "R$ 800",
      category: "Workshop",
    },
    {
      id: 3,
      title: "Laboratório de Improvisação",
      description:
        "Espaço experimental para desenvolvimento de habilidades de improvisação e criação coletiva em tempo real.",
      image: "https://images.pexels.com/photos/2014775/pexels-photo-2014775.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "3 meses",
      level: "Intermediário",
      instructor: "Ana Costa",
      schedule: "Sábados, 9h-12h",
      price: "R$ 200/mês",
      category: "Laboratório",
    },
    {
      id: 4,
      title: "Técnicas de Voz e Dicção",
      description:
        "Curso especializado em desenvolvimento vocal, respiração, projeção e clareza na dicção para atores.",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "4 meses",
      level: "Iniciante",
      instructor: "Lucia Ferreira",
      schedule: "Quartas, 18h-20h",
      price: "R$ 250/mês",
      category: "Curso Especializado",
    },
    {
      id: 5,
      title: "Preparação para Audiovisual",
      description:
        "Curso focado nas especificidades da atuação para cinema e TV, incluindo técnicas de câmera e continuidade.",
      image: "https://images.pexels.com/photos/8106573/pexels-photo-8106573.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "5 meses",
      level: "Intermediário",
      instructor: "Carlos Mendes",
      schedule: "Segundas e Quartas, 20h-22h",
      price: "R$ 350/mês",
      category: "Curso Especializado",
    },
    {
      id: 6,
      title: "Masterclass Internacional",
      description: "Série de masterclasses com professores visitantes de escolas de teatro internacionais renomadas.",
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "1 dia",
      level: "Avançado",
      instructor: "Professores Visitantes",
      schedule: "Domingos, 10h-17h",
      price: "R$ 150/aula",
      category: "Masterclass",
    },
  ]

  const levels = ["all", "Iniciante", "Intermediário", "Avançado"]

  const filteredActivities = activities.filter((activity) => {
    return selectedLevel === "all" || activity.level === selectedLevel
  })

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Iniciante":
        return "bg-green-600"
      case "Intermediário":
        return "bg-yellow-600"
      case "Avançado":
        return "bg-red-600"
      default:
        return "bg-neutral-600"
    }
  }

  return (
    <Layout>
      <PageHeader
        title={t("activities.title")}
        subtitle={t("activities.subtitle")}
        backgroundImage="https://images.pexels.com/photos/3355366/pexels-photo-3355366.jpeg?auto=compress&cs=tinysrgb&w=1200"
      />

      <section className="py-20 bg-neutral-900">
        <div className="container mx-auto px-4">
          {/* Level Filter */}
          <div className="flex justify-center mb-12">
            <div className="bg-neutral-800 rounded-lg p-1 flex flex-wrap gap-1">
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                    selectedLevel === level ? "bg-amber-400 text-neutral-900" : "text-neutral-300 hover:text-white"
                  }`}
                >
                  {level === "all" ? "Todos os Níveis" : level}
                </button>
              ))}
            </div>
          </div>

          {/* Activities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className="bg-neutral-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={activity.image || "/placeholder.svg"}
                    alt={activity.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block px-3 py-1 bg-amber-400 text-neutral-900 text-xs font-semibold rounded-full">
                      {activity.category}
                    </span>
                    <span
                      className={`px-2 py-1 text-white text-xs font-semibold rounded ${getLevelColor(activity.level)}`}
                    >
                      {activity.level}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{activity.title}</h3>

                  <p className="text-neutral-300 mb-4 line-clamp-3">{activity.description}</p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-neutral-400">
                      <Clock className="w-4 h-4 mr-2 text-amber-400" />
                      <span className="font-medium mr-2">{t("activities.duration")}:</span>
                      <span>{activity.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-neutral-400">
                      <Users className="w-4 h-4 mr-2 text-amber-400" />
                      <span className="font-medium mr-2">{t("activities.instructor")}:</span>
                      <span>{activity.instructor}</span>
                    </div>
                    <div className="flex items-center text-sm text-neutral-400">
                      <BookOpen className="w-4 h-4 mr-2 text-amber-400" />
                      <span className="font-medium mr-2">{t("activities.schedule")}:</span>
                      <span>{activity.schedule}</span>
                    </div>
                    <div className="flex items-center text-sm text-neutral-400">
                      <Award className="w-4 h-4 mr-2 text-amber-400" />
                      <span className="font-medium mr-2">Preço:</span>
                      <span className="text-amber-400 font-semibold">{activity.price}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-amber-400 hover:bg-amber-500 text-neutral-900 font-semibold">
                    {t("activities.enroll")}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredActivities.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-400 text-lg">Nenhuma atividade encontrada para o nível selecionado.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}

export default ActivitiesPage
