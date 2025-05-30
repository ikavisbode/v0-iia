"use client"

import React, { useState } from "react"
import "./i18n/config"
import HomePage from "./app/pages/HomePage"
import ProjectDetailPage from "./app/pages/ProjectDetailPage"
import ActivityDetailPage from "./app/pages/ActivityDetailPage"
import TeamMemberDetailPage from "./app/pages/TeamMemberDetailPage"
import ProjectsListPage from "./app/pages/ProjectsListPage"
import ActivitiesListPage from "./app/pages/ActivitiesListPage"
import TeamListPage from "./app/pages/TeamListPage"

type PageType =
  | "home"
  | "projects-list"
  | "activities-list"
  | "team-list"
  | "project-detail"
  | "activity-detail"
  | "member-detail"

interface AppState {
  currentPage: PageType
  selectedId?: string
  targetSection?: string
}

function App() {
  const [appState, setAppState] = useState<AppState>({ currentPage: "home" })

  const navigate = (page: string, section?: string, id?: string) => {
    if (page === "home" && section) {
      setAppState({ currentPage: "home", targetSection: section })
      // Scroll to section after a brief delay to ensure page is rendered
      setTimeout(() => {
        const element = document.getElementById(section)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    } else {
      setAppState({
        currentPage: page as PageType,
        selectedId: id,
        targetSection: undefined,
      })
      // Scroll to top when navigating to different pages
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // Handle scrolling to target section on home page
  React.useEffect(() => {
    if (appState.currentPage === "home" && appState.targetSection) {
      const element = document.getElementById(appState.targetSection)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
      // Clear target section after scrolling
      setAppState((prev) => ({ ...prev, targetSection: undefined }))
    }
  }, [appState.currentPage, appState.targetSection])

  // Simple routing simulation - in a real app you'd use React Router
  const renderPage = () => {
    switch (appState.currentPage) {
      case "home":
        return <HomePage onNavigate={navigate} />
      case "projects-list":
        return <ProjectsListPage onNavigate={navigate} />
      case "activities-list":
        return <ActivitiesListPage onNavigate={navigate} />
      case "team-list":
        return <TeamListPage onNavigate={navigate} />
      case "project-detail":
        return <ProjectDetailPage projectId={appState.selectedId || "1"} onNavigate={navigate} />
      case "activity-detail":
        return <ActivityDetailPage activityId={appState.selectedId || "1"} onNavigate={navigate} />
      case "member-detail":
        return <TeamMemberDetailPage memberId={appState.selectedId || "1"} onNavigate={navigate} />
      default:
        return <HomePage onNavigate={navigate} />
    }
  }

  // Update document title
  React.useEffect(() => {
    document.title = "Instituto Internacional de Atuação"
  }, [])

  // Add navigation handler to links
  React.useEffect(() => {
    const handleNavigation = (e: Event) => {
      const target = e.target as HTMLAnchorElement
      if (target.href && target.href.includes("#")) {
        e.preventDefault()
        const section = target.href.split("#")[1]
        if (
          [
            "home",
            "about",
            "projects",
            "projects-list",
            "activities",
            "activities-list",
            "team",
            "team-list",
            "contact",
          ].includes(section)
        ) {
          if (section === "home") {
            navigate("home")
          } else if (["projects-list", "activities-list", "team-list"].includes(section)) {
            navigate(section)
          } else {
            navigate("home", section)
          }
        }
      }
    }

    document.addEventListener("click", handleNavigation)
    return () => document.removeEventListener("click", handleNavigation)
  }, [])

  return <div className="min-h-screen bg-white">{renderPage()}</div>
}

export default App
