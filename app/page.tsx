"use client";

import type React from "react";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import {
  loadProjects,
  loadActivities,
  loadMembers,
  type ProjectData,
  type ActivityData,
  type MemberData,
} from "@/utils/dataLoader";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const HomePage: React.FC = () => {
  const router = useRouter();
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "pt";
  const [activeProjectFilter, setActiveProjectFilter] = useState("TODOS");
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [activities, setActivities] = useState<ActivityData[]>([]);
  const [teamMembers, setTeamMembers] = useState<MemberData[]>([]);

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselImages = [
    "/images/2025_IIA_KV_1.png",
    "/images/2025_IIA_KV_3.png",
    "/images/2025_IIA_KV_4.png",
  ];
  const [activitiesSlide, setActivitiesSlide] = useState(0);

  // Add loading states for each data type:
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [activitiesLoading, setActivitiesLoading] = useState(true);
  const [membersLoading, setMembersLoading] = useState(true);

  // Carousel auto-play effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const displayedMembers = isMobile ? teamMembers : [...teamMembers, ...teamMembers];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768); // md: 768px

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMobile || !carouselRef.current) {
      setCanScrollLeft(true);
      setCanScrollRight(true);
      return
    }

    const container = carouselRef.current;

    const updateScrollButtons = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    };

    updateScrollButtons(); // verifica ao montar

    container.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      container.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [membersLoading]);

  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    if (membersLoading || isMobile) return;

    const container = carouselRef.current;
    if (!container) return;

    let animationId: number;

    const animate = () => {
      if (!paused) {
        container.scrollLeft += speed;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        } else if (container.scrollLeft <= 0) {
          container.scrollLeft = container.scrollWidth / 2;
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [membersLoading, paused, speed, isMobile]);

  // Update the useEffect to handle loading states:
  useEffect(() => {
    const loadData = async () => {
      try {
        const [projectsData, activitiesData, membersData] = await Promise.all([
          loadProjects().finally(() => setProjectsLoading(false)),
          loadActivities().finally(() => setActivitiesLoading(false)),
          loadMembers().finally(() => setMembersLoading(false)),
        ]);
        setProjects(projectsData);
        setActivities(activitiesData);
        setTeamMembers(membersData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loadData();
  }, []);

  const projectFilters = ["TODOS", "PERFORMANCE", "PESQUISA"];

  const filteredProjects =
    activeProjectFilter === "TODOS"
      ? projects
      : projects.filter((project) => project.category === activeProjectFilter);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );
  };

  const valores = [
    "Excelência Artística",
    "Inovação Constante",
    "Inclusão e Diversidade",
    "Transformação Social",
    "Colaboração Internacional",
  ];

  return (
    <Layout>
      {/* Hero Section with Carousel */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Carousel Images */}
        <div className="absolute inset-0">
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              style={{
                backgroundImage: `url('${image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          ))}
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Carousel Navigation */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 text-center text-white relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Instituto Internacional de
              <br />
              Atuação
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-medium tracking-wide">
              Pesquisa - Técnica - Produção
            </p>
            <p className="text-body text-lg mb-10 max-w-3xl mx-auto leading-relaxed opacity-90">
              Impulsionando vocações e expandindo as potencialidades de quem
              vive a arte da atuação como um chamado.
            </p>
            <Button
              size="lg"
              className="btn-modern bg-white text-red-800 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => router.push("/projetos")}
            >
              Conheça nossos projetos
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-heading text-4xl font-bold text-gray-800 mb-4">
              Sobre Nós
            </h2>
            <p className="text-lg text-gray-600 font-medium">
              Nossa História & Missão
            </p>
            <div className="w-16 h-1 bg-red-600 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="text-heading text-xl font-semibold text-gray-800 mb-4">
                Nossa História
              </h3>
              <p className="text-body text-gray-600 text-sm leading-relaxed text-justify">
                Fundado no fim de 2024, o Instituto Internacional de Atuação
                nasceu da paixão de um grupo de artistas comprometidos em elevar
                o nível da arte da cena como um todo. Nossa história está só no
                começo, mas nossos membros já se espalham por diversos lugares
                do Brasil e do mundo. Juntos, caminhamos a passos largos na
                realização de nossas primeiras atividades e produções.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-heading text-xl font-semibold text-gray-800 mb-4">
                Nossa Missão
              </h3>
              <p className="text-body text-gray-600 text-sm leading-relaxed text-justify">
                Desenvolvemos artistas completos através de técnicas
                internacionais de atuação, promovendo a excelência artística, a
                pesquisa teatral e audiovisual, e o impacto social positivo
                através das artes da cena.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-heading text-xl font-semibold text-gray-800 mb-4">
                Nossa Visão
              </h3>
              <p className="text-body text-gray-600 text-sm leading-relaxed text-justify">
                Ser reconhecido internacionalmente como um centro de excelência
                em formação artística, produção teatral inovadora e intercâmbio
                cultural, transformando vidas através da arte da atuação.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-heading text-xl font-semibold text-gray-800 mb-4">
                Nossos Valores
              </h3>
              <ul className="text-body text-gray-600 text-sm leading-relaxed space-y-2">
                {valores.map((valor, index) => (
                  <li key={index} className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-red-600 rounded-full mr-2 flex-shrink-0"></span>
                    {valor}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-heading text-4xl font-bold text-white mb-4">
              Projetos
            </h2>
            <p className="text-lg text-gray-300 font-medium">
              Nossas Produções & Pesquisas
            </p>
            <div className="w-16 h-1 bg-red-600 mx-auto mt-4"></div>
          </div>

          {/* Project Filters */}
          <div className="flex justify-center mb-12">
            <div className="flex flex-wrap justify-center gap-2 md:space-x-2 md:gap-0">
              {projectFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveProjectFilter(filter)}
                  className={`btn-modern px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 ${
                    activeProjectFilter === filter
                      ? "bg-red-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          {projectsLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-300">Carregando projetos...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-gray-800 rounded-lg overflow-hidden group hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
                  onClick={() => router.push(`/projetos/${project.slug}`)}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.images[0] || "/placeholder.svg"}
                      alt={project[currentLang as keyof typeof project].title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-heading text-xl font-semibold text-white mb-3">
                      {project[currentLang as keyof typeof project].title}
                    </h3>
                    <Button
                      size="sm"
                      className="btn-modern bg-red-600 hover:bg-red-700 text-white font-medium"
                    >
                      Saiba Mais
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button
              onClick={() => router.push("/projetos")}
              size="lg"
              variant="outline"
              className="btn-modern border-white text-white hover:bg-white hover:text-gray-900 font-medium"
            >
              Ver Todos os Projetos
            </Button>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section id="activities" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-heading text-4xl font-bold text-gray-800 mb-4">
              Atividades
            </h2>
            <p className="text-lg text-gray-600 font-medium">
              Próximos Eventos & Workshops
            </p>
            <div className="w-16 h-1 bg-red-600 mx-auto mt-4"></div>
          </div>

          {activitiesLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando atividades...</p>
            </div>
          ) : (
            <div className="relative">
              {/* Activities Carousel */}
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${
                      activitiesSlide * (100 / Math.min(activities.length, 3))
                    }%)`,
                  }}
                >
                  {activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                    >
                      <div
                        className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 h-full"
                        onClick={() =>
                          router.push(`/atividades/${activity.slug}`)
                        }
                      >
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={activity.images[0] || "/placeholder.svg"}
                            alt={
                              activity[currentLang as keyof typeof activity]
                                .title
                            }
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-6">
                          {activity.featured && (
                            <span className="text-caption inline-block px-3 py-1 bg-red-100 text-red-600 text-sm font-medium rounded-full mb-4">
                              Destaque
                            </span>
                          )}
                          <h3 className="text-heading text-xl font-semibold text-gray-800 mb-3">
                            {
                              activity[currentLang as keyof typeof activity]
                                .title
                            }
                          </h3>
                          <p className="text-body text-gray-600 mb-4 leading-relaxed line-clamp-3">
                            {
                              activity[currentLang as keyof typeof activity]
                                .description
                            }
                          </p>
                          <div className="space-y-2 mb-4">
                            <p className="text-caption text-sm text-gray-500">
                              <span className="font-medium">Data:</span>{" "}
                              {
                                activity[currentLang as keyof typeof activity]
                                  .date
                              }
                            </p>
                            <p className="text-caption text-sm text-gray-500">
                              <span className="font-medium">Local:</span>{" "}
                              {
                                activity[currentLang as keyof typeof activity]
                                  .location
                              }
                            </p>
                            <p className="text-caption text-sm text-gray-500">
                              <span className="font-medium">Preço:</span>{" "}
                              {
                                activity[currentLang as keyof typeof activity]
                                  .price
                              }
                            </p>
                            <p className="text-caption text-sm text-gray-500">
                              <span className="font-medium">Instrutor:</span>{" "}
                              {
                                activity[currentLang as keyof typeof activity]
                                  .instructor.name
                              }
                            </p>
                          </div>
                          <Button
                            className="btn-modern bg-red-600 hover:bg-red-700 text-white font-medium w-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (activity.registrationUrl) {
                                window.open(activity.registrationUrl, "_blank");
                              }
                            }}
                          >
                            Inscrever-se Agora
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Navigation Dots */}
              {activities.length > 3 && (
                <div className="flex justify-center mt-6 space-x-2">
                  {Array.from(
                    { length: Math.max(1, activities.length - 2) },
                    (_, index) => (
                      <button
                        key={index}
                        onClick={() => setActivitiesSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                          index === activitiesSlide
                            ? "bg-red-600"
                            : "bg-gray-300"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    )
                  )}
                </div>
              )}

              {/* Carousel Controls */}
              {activities.length > 3 && (
                <>
                  <button
                    onClick={() =>
                      setActivitiesSlide((prev) => Math.max(0, prev - 1))
                    }
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg z-10"
                    aria-label="Previous activity"
                    disabled={activitiesSlide === 0}
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <button
                    onClick={() =>
                      setActivitiesSlide((prev) =>
                        Math.min(activities.length - 3, prev + 1)
                      )
                    }
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg z-10"
                    aria-label="Next activity"
                    disabled={activitiesSlide >= activities.length - 3}
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>
          )}

          <div className="text-center mt-12">
            <Button
              onClick={() => router.push("/atividades")}
              size="lg"
              className="btn-modern bg-red-600 hover:bg-red-700 text-white font-medium"
            >
              Ver Todas as Atividades
            </Button>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-heading text-4xl font-bold text-gray-800 mb-4">
              Nossa Equipe
            </h2>
            <p className="text-lg text-gray-600 font-medium">
              Os Artistas & Educadores
            </p>
            <div className="w-16 h-1 bg-red-600 mx-auto mt-4"></div>
          </div>

          {membersLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando equipe...</p>
            </div>
          ) : (
            <>
              {/* Members Carousel */}
              <div className="mb-16 relative">
                <div 
                  className="relative overflow-hidden space-x-4 overflow-x-auto scrollbar-hide md:overflow-hidden"
                  ref={carouselRef}
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                >
                  <div className="flex w-max">
                    {displayedMembers.map((member, index) => (
                      <div
                        key={index}
                        className="w-[250px] flex-shrink-0 px-4"
                      >
                        <div
                          className="text-center cursor-pointer group"
                          onClick={() => router.push(`/membros/${member.slug}`)}
                        >
                          <div className="aspect-square overflow-hidden rounded-lg mb-4 group-hover:transform group-hover:scale-105 transition-all duration-300">
                            <img
                              src={member.image || "/placeholder.svg"}
                              alt={
                                member[currentLang as keyof typeof member].name
                              }
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h3 className="text-heading text-xl font-semibold text-gray-800 mb-2 group-hover:text-red-600 transition-colors duration-200">
                            {member[currentLang as keyof typeof member].name}
                          </h3>
                          <p className="text-body text-gray-600">
                            {member[currentLang as keyof typeof member].role}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Carousel Controls */}
                {teamMembers.length > 4 && (
                  <>
                    <button
                      onMouseDown={() => setSpeed(-3)}
                      onMouseUp={() => setSpeed(1)}
                      onMouseLeave={() => setSpeed(1)}
                      disabled={!canScrollLeft}
                      className={`absolute left-0 top-[125px] transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg z-10 ${!canScrollLeft ? 'opacity-30 cursor-not-allowed' : ''}`}
                      aria-label="Previous member"
                    >
                      <ChevronLeft size={24} />
                    </button>

                    <button
                      onMouseDown={() => setSpeed(3)}
                      onMouseUp={() => setSpeed(1)}
                      onMouseLeave={() => setSpeed(1)}
                      disabled={!canScrollRight}
                      className={`absolute right-0 top-[125px] transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg z-10 ${!canScrollRight ? 'opacity-30 cursor-not-allowed' : ''}`}
                      aria-label="Next member"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>
            </>
          )}

          <div className="text-center mt-12">
            <Button
              onClick={() => router.push("/membros")}
              size="lg"
              className="btn-modern bg-red-600 hover:bg-red-700 text-white font-medium"
            >
              Conheça Toda a Equipe
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
