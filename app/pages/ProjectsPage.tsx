"use client"

import type React from "react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Layout from "../../components/Layout"
import PageHeader from "../../components/PageHeader"
import Card from "../../components/Card"

const ProjectsPage: React.FC = () => {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const projects = [
    {
      id: 1,
      title: "Hamlet Contemporâneo",
      description:
        "Uma releitura moderna do clássico de Shakespeare, explorando temas contemporâneos através de técnicas inovadoras de atuação e cenografia digital.",
      image: "https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Teatro",
      status: "Ativo",
      director: "Maria Silva",
      cast: "12 atores",
    },
    {
      id: 2,
      title: "Workshop Internacional de Método",
      description:
        "Programa intensivo de formação com mestres internacionais, focado em técnicas de método Stanislavski e improvisação contemporânea.",
      image: "https://images.pexels.com/photos/3355366/pexels-photo-3355366.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Formação",
      status: "Inscrições Abertas",
      director: "João Santos",
      cast: "20 participantes",
    },
    {
      id: 3,
      title: "Pesquisa Audiovisual Brasileira",
      description:
        "Projeto de pesquisa sobre a adaptação de técnicas teatrais para o meio audiovisual, com foco na dramaturgia brasileira contemporânea.",
      image: "https://images.pexels.com/photos/2014775/pexels-photo-2014775.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Pesquisa",
      status: "Em Desenvolvimento",
      director: "Ana Costa",
      cast: "8 pesquisadores",
    },
    {
      id: 4,
      title: "Espetáculo Colaborativo",
      description:
        "Criação coletiva que explora narrativas urbanas brasileiras através de técnicas de teatro físico e música ao vivo.",
      image: "https://images.pexels.com/photos/8106573/pexels-photo-8106573.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Teatro",
      status: "Pré-produção",
      director: "Carlos Mendes",
      cast: "15 artistas",
    },
    {
      id: 5,
      title: "Laboratório de Voz e Movimento",
      description:
        "Espaço experimental para desenvolvimento de técnicas vocais e corporais aplicadas às artes cênicas contemporâneas.",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Laboratório",
      status: "Ativo",
      director: "Lucia Ferreira",
      cast: "10 participantes",
    },
    {
      id: 6,
      title: "Documentário: Artes Cênicas no Brasil",
      description:
        "Produção audiovisual que retrata a evolução das artes cênicas no Brasil, com entrevistas e registros históricos.",
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Audiovisual",
      status: "Pós-produção",
      director: "Roberto Lima",
      cast: "5 entrevistados",
    },
  ]

  const categories = ["all", "Teatro", "Formação", "Pesquisa", "Laboratório", "Audiovisual"]

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <Layout>
      <PageHeader
        title={t("projects.title")}
        subtitle={t("projects.subtitle")}
        backgroundImage="https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=1200"
      />

      <section className="py-20 bg-neutral-900">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="mb-12 space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Buscar projetos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-neutral-800 border-neutral-700 text-white placeholder-neutral-400"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="text-neutral-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-neutral-800 border border-neutral-700 text-white rounded-md px-3 py-2"
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
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                category={project.category}
                status={project.status}
                buttonText={t("projects.learnMore")}
                onButtonClick={() => console.log("Learn more about", project.title)}
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-400 text-lg">Nenhum projeto encontrado com os filtros selecionados.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}

export default ProjectsPage
