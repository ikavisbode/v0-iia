"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Mail,
  Linkedin,
  Instagram,
  Award,
  BookOpen,
} from "lucide-react";
import Layout from "@/components/Layout";
import { getMemberBySlug, type MemberData } from "@/utils/dataLoader";
import { useParams, useRouter } from "next/navigation";

const TeamMemberDetailPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const memberId = params.slug as string;
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "pt";
  const [member, setMember] = useState<MemberData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMember = async () => {
      try {
        const memberData = await getMemberBySlug(memberId);
        setMember(memberData);
      } catch (error) {
        console.error("Error loading member:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMember();
  }, [memberId]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando membro...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!member) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Membro não encontrado
            </h1>
            <Button
              onClick={() => router.push("/")}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Voltar ao Início
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const content = member[currentLang as keyof typeof member];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <Button
            onClick={() => router.push("/#team")}
            variant="ghost"
            className="text-white hover:text-red-400 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar à Equipe
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-heading text-4xl md:text-5xl font-bold text-white mb-4">
                {content.name}
              </h1>
              <p className="text-2xl text-red-400 font-medium mb-6">
                {content.role}
              </p>
              <p className="text-lg text-gray-300 mb-8">
                <strong>Departamento:</strong> {member.department}
              </p>

              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-4 text-gray-300">
                  <Mail className="w-5 h-5 text-red-400" />
                  <a
                    href={`mailto:${member.email}`}
                    className="hover:text-white transition-colors"
                  >
                    {member.email}
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                <a
                  href={member.social.linkedin}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600 transition-all duration-200"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={member.social.instagram}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600 transition-all duration-200"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src={member.image || "/placeholder.svg"}
                alt={content.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-heading text-3xl font-bold text-gray-800 mb-8">
              Biografia
            </h2>
            <div className="prose prose-lg max-w-none text-justify">
              {content.bio.split("\n\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="text-body text-gray-600 mb-6 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education & Specialties */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Education */}
            {member.education && (
              <div>
                <h2 className="text-heading text-3xl font-bold text-gray-800 mb-8">
                  Formação
                </h2>
                <div className="space-y-4">
                  {member.education[
                    currentLang as keyof typeof member.education
                  ].map((edu, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg"
                    >
                      <BookOpen className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                      <span className="text-body text-gray-700">{edu}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Specialties */}
            <div>
              <h2 className="text-heading text-3xl font-bold text-gray-800 mb-8">
                Especialidades
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {content.specialties.map((specialty, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 bg-red-100 text-red-800 rounded-lg text-center font-medium"
                  >
                    {specialty}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      {member.achievements && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-heading text-3xl font-bold text-gray-800 mb-12 text-center">
                Conquistas e Reconhecimentos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {member.achievements[
                  currentLang as keyof typeof member.achievements
                ].map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-sm"
                  >
                    <Award className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                    <span className="text-body text-gray-700 font-medium">
                      {achievement}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-red-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-heading text-3xl font-bold text-white mb-6">
            Interessado em trabalhar conosco?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Entre em contato para saber mais sobre oportunidades de colaboração
            e projetos futuros.
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

export default TeamMemberDetailPage;
