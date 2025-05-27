"use client"

import type React from "react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Calendar, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import Layout from "../../components/Layout"
import PageHeader from "../../components/PageHeader"

const EventsPage: React.FC = () => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState("upcoming")

  const upcomingEvents = [
    {
      id: 1,
      title: "Apresentação: Hamlet Contemporâneo",
      description:
        "Estreia da nossa releitura moderna do clássico de Shakespeare, com direção de Maria Silva e elenco completo do IIA.",
      image: "https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=800",
      date: "15 de Junho, 2025",
      location: "Teatro Municipal de São Paulo",
      price: "R$ 40 - R$ 80",
      category: "Apresentação",
    },
    {
      id: 2,
      title: "Workshop: Técnicas de Improvisação",
      description:
        "Workshop intensivo de fim de semana focado em técnicas avançadas de improvisação teatral com mestres internacionais.",
      image: "https://images.pexels.com/photos/3355366/pexels-photo-3355366.jpeg?auto=compress&cs=tinysrgb&w=800",
      date: "22-23 de Junho, 2025",
      location: "Estúdio IIA, São Paulo",
      price: "R$ 150",
      category: "Workshop",
    },
    {
      id: 3,
      title: "Palestra: O Futuro das Artes Cênicas",
      description:
        "Mesa redonda com diretores e pesquisadores sobre as tendências e desafios das artes cênicas no século XXI.",
      image: "https://images.pexels.com/photos/2014775/pexels-photo-2014775.jpeg?auto=compress&cs=tinysrgb&w=800",
      date: "5 de Julho, 2025",
      location: "Auditório IIA, São Paulo",
      price: "Gratuito",
      category: "Palestra",
    },
    {
      id: 4,
      title: "Audições: Novo Projeto Colaborativo",
      description:
        "Processo seletivo para nosso próximo projeto colaborativo que explorará narrativas urbanas brasileiras.",
      image: "https://images.pexels.com/photos/8106573/pexels-photo-8106573.jpeg?auto=compress&cs=tinysrgb&w=800",
      date: "10-11 de Julho, 2025",
      location: "Estúdio 2, São Paulo",
      price: "Gratuito",
      category: "Audição",
    },
  ]

  const pastEvents = [
    {
      id: 5,
      title: "Festival de Inverno IIA 2024",
      description:
        "Primeira edição do nosso festival anual, com apresentações, workshops e palestras durante uma semana inteira.",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
      date: "15-22 de Julho, 2024",
      location: "Diversos locais, São Paulo",
      price: "R$ 20 - R$ 100",
      category: "Festival",
    },
    {
      id: 6,
      title: "Masterclass: Método Stanislavski",
      description:
        "Masterclass exclusiva com professor visitante da Moscow Art Theatre School sobre as técnicas do método.",
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800",
      date: "3 de Dezembro, 2024",
      location: "Estúdio Principal IIA",
      price: "R$ 200",
      category: "Masterclass",
    },
  ]

  const events = activeTab === "upcoming" ? upcomingEvents : pastEvents

  return (
    <Layout>
      <PageHeader
        title={t("events.title")}
        subtitle={t("events.subtitle")}
        backgroundImage="https://images.pexels.com/photos/2014775/pexels-photo-2014775.jpeg?auto=compress&cs=tinysrgb&w=1200"
      />

      <section className="py-20 bg-neutral-900">
        <div className="container mx-auto px-4">
          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-neutral-800 rounded-lg p-1">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === "upcoming" ? "bg-amber-400 text-neutral-900" : "text-neutral-300 hover:text-white"
                }`}
              >
                {t("events.upcoming")}
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === "past" ? "bg-amber-400 text-neutral-900" : "text-neutral-300 hover:text-white"
                }`}
              >
                {t("events.past")}
              </button>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-neutral-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-amber-400 text-neutral-900 text-xs font-semibold rounded-full mb-3">
                    {event.category}
                  </span>

                  <h3 className="text-xl font-bold text-white mb-3">{event.title}</h3>

                  <p className="text-neutral-300 mb-4 line-clamp-3">{event.description}</p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-neutral-400">
                      <Calendar className="w-4 h-4 mr-2 text-amber-400" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-neutral-400">
                      <MapPin className="w-4 h-4 mr-2 text-amber-400" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-neutral-400">
                      <Users className="w-4 h-4 mr-2 text-amber-400" />
                      <span>{event.price}</span>
                    </div>
                  </div>

                  {activeTab === "upcoming" && (
                    <Button className="w-full bg-amber-400 hover:bg-amber-500 text-neutral-900 font-semibold">
                      {event.price === "Gratuito" ? "Inscrever-se" : "Comprar Ingresso"}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {events.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-400 text-lg">
                {activeTab === "upcoming"
                  ? "Nenhum evento próximo programado no momento."
                  : "Nenhum evento passado registrado."}
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}

export default EventsPage
