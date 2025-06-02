"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Mail, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "../../components/Layout";
import PageHeader from "../../components/PageHeader";
import { loadMembers, type MemberData } from "../../utils/dataLoader";
import { useRouter } from "next/navigation";

const TeamListPage: React.FC = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [selectedRole, setSelectedRole] = useState("all");
  const currentLang = i18n.language || "pt";

  const [teamMembers, setTeamMembers] = useState<MemberData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const membersData = await loadMembers();
        setTeamMembers(membersData);
      } catch (error) {
        console.error("Error loading team members:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const departments = [
    "all",
    "Direção",
    "Educação",
    "Pesquisa",
    "Produção",
    "Audiovisual",
  ];

  if (loading) {
    return (
      <Layout>
        <PageHeader
          title="Nossa Equipe"
          subtitle="Profissionais Dedicados à Arte"
          backgroundImage="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200"
        />
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando equipe...</p>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  const filteredMembers = teamMembers.filter((member) => {
    const matchesRole =
      selectedRole === "all" || member.department === selectedRole;
    return matchesRole;
  });

  return (
    <Layout>
      <PageHeader
        title="Nossa Equipe"
        subtitle="Profissionais Dedicados à Arte"
        backgroundImage="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200"
      />

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMembers.map((member) => {
              const content = member[currentLang as keyof typeof member];
              return (
                <div
                  key={member.id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
                  onClick={() => router.push(`/membros/${member.slug}`)}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={content.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {content.name}
                      </h3>
                      <p className="text-red-600 font-medium mb-2">
                        {content.role}
                      </p>
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                        {member.department}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {content.bio}
                    </p>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-800 mb-2">
                        Especialidades:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {content.specialties
                          .slice(0, 3)
                          .map((specialty, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded"
                            >
                              {specialty}
                            </span>
                          ))}
                        {content.specialties.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            +{content.specialties.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <a
                          href={`mailto:${member.email}`}
                          className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                        <a
                          href={member.social.linkedin}
                          className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                        <a
                          href={member.social.instagram}
                          className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Instagram className="w-4 h-4" />
                        </a>
                      </div>
                      <Button
                        size="sm"
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        Ver Perfil
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Nenhum membro encontrado com os filtros selecionados.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-6">
            Interessado em fazer parte da nossa equipe?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Estamos sempre em busca de profissionais talentosos e apaixonados
            pelas artes cênicas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => router.push("/#contact")}
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100"
            >
              Entre em Contato
            </Button>
            <Button
              onClick={() => router.push("/#about")}
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
  );
};

export default TeamListPage;
