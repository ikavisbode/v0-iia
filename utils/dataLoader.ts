// Data loader utilities for JSON files
export interface ProjectData {
  id: string
  slug: string
  category: string
  status: string
  images: string[]
  video?: string
  pt: {
    title: string
    description: string
    fullDescription?: string
    director: string
    cast: string[]
    duration: string
    premiere: string
    location: string
  }
  en: {
    title: string
    description: string
    fullDescription?: string
    director: string
    cast: string[]
    duration: string
    premiere: string
    location: string
  }
  schedule?: Array<{
    day: string
    time: string
    dayEn: string
    timeEn: string
  }>
  reviews?: Array<{
    author: string
    rating: number
    pt: { text: string }
    en: { text: string }
  }>
}

export interface ActivityData {
  id: string
  slug: string
  category: string
  maxParticipants: number
  currentParticipants: number
  featured: boolean
  images: string[]
  pt: {
    title: string
    description: string
    fullDescription?: string
    instructor: {
      name: string
      picture: string
      social?: {
        linkedin?: string
        instagram?: string
      }
      url: string
    }
    duration: string
    date: string
    time: string
    location: string
    price: string
  }
  en: {
    title: string
    description: string
    fullDescription?: string
    instructor: {
      name: string
      picture: string
      social?: {
        linkedin?: string
        instagram?: string
      }
      url: string
    }
    duration: string
    date: string
    time: string
    location: string
    price: string
  }
  program?: Array<{
    pt: {
      day: string
      sessions: Array<{ time: string; topic: string }>
    }
    en: {
      day: string
      sessions: Array<{ time: string; topic: string }>
    }
  }>
  requirements?: {
    pt: string[]
    en: string[]
  }
  benefits?: {
    pt: string[]
    en: string[]
  }
}

export interface MemberData {
  id: string
  slug: string
  department: string
  image: string
  email: string
  social: {
    linkedin: string
    instagram: string
  }
  pt: {
    name: string
    role: string
    bio: string
    specialties: string[]
  }
  en: {
    name: string
    role: string
    bio: string
    specialties: string[]
  }
  education?: {
    pt: string[]
    en: string[]
  }
  achievements?: {
    pt: string[]
    en: string[]
  }
  currentProjects?: Array<{
    pt: {
      title: string
      role: string
      status: string
    }
    en: {
      title: string
      role: string
      status: string
    }
  }>
  testimonials?: Array<{
    author: string
    pt: { text: string }
    en: { text: string }
  }>
}

// Helper function to load JSON files from public folder
const loadJsonFile = async (path: string) => {
  try {
    const response = await fetch(path)

    // Check if the response is ok and is actually JSON
    if (!response.ok) {
      console.warn(`Failed to load ${path}: ${response.status} ${response.statusText}`)
      return null
    }

    // Check content type to ensure it's JSON
    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      console.warn(`${path} is not JSON, got content-type: ${contentType}`)
      return null
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.warn(`Error loading ${path}:`, error)
    return null
  }
}

// Load all projects from JSON files
export const loadProjects = async (): Promise<ProjectData[]> => {
  try {
    const manifest = await loadJsonFile("/data/project/manifest.json")

    if (!manifest || !manifest.projects) {
      console.warn("Could not load projects manifest")
      return []
    }

    const projects: ProjectData[] = []

    for (const slug of manifest.projects) {
      const projectData = await loadJsonFile(`/data/project/${slug}.json`)
      if (projectData) {
        projects.push(projectData)
      }
    }

    return projects
  } catch (error) {
    console.error("Error loading projects:", error)
    return []
  }
}

// Load all activities from JSON files
export const loadActivities = async (): Promise<ActivityData[]> => {
  try {
    const manifest = await loadJsonFile("/data/activity/manifest.json")

    if (!manifest || !manifest.activities) {
      console.warn("Could not load activities manifest")
      return []
    }

    const activities: ActivityData[] = []

    for (const slug of manifest.activities) {
      const activityData = await loadJsonFile(`/data/activity/${slug}.json`)
      if (activityData) {
        activities.push(activityData)
      }
    }

    return activities
  } catch (error) {
    console.error("Error loading activities:", error)
    return []
  }
}

// Load all team members from JSON files
export const loadMembers = async (): Promise<MemberData[]> => {
  try {
    const manifest = await loadJsonFile("/data/member/manifest.json")

    if (!manifest || !manifest.members) {
      console.warn("Could not load members manifest")
      return []
    }

    const members: MemberData[] = []

    for (const slug of manifest.members) {
      const memberData = await loadJsonFile(`/data/member/${slug}.json`)
      if (memberData) {
        members.push(memberData)
      }
    }

    return members
  } catch (error) {
    console.error("Error loading members:", error)
    return []
  }
}

// Get specific items by slug
export const getProjectBySlug = async (slug: string): Promise<ProjectData | null> => {
  try {
    const projectData = await loadJsonFile(`/data/project/${slug}.json`)
    return projectData
  } catch (error) {
    console.error(`Error loading project ${slug}:`, error)
    return null
  }
}

export const getActivityBySlug = async (slug: string): Promise<ActivityData | null> => {
  try {
    const activityData = await loadJsonFile(`/data/activity/${slug}.json`)
    return activityData
  } catch (error) {
    console.error(`Error loading activity ${slug}:`, error)
    return null
  }
}

export const getMemberBySlug = async (slug: string): Promise<MemberData | null> => {
  try {
    const memberData = await loadJsonFile(`/data/member/${slug}.json`)
    return memberData
  } catch (error) {
    console.error(`Error loading member ${slug}:`, error)
    return null
  }
}

// Utility function to add new items (for future use)
export const addProject = async (projectData: ProjectData): Promise<boolean> => {
  // In a real application, this would make a POST request to an API
  console.log("Adding project:", projectData.slug)
  return true
}

export const addActivity = async (activityData: ActivityData): Promise<boolean> => {
  console.log("Adding activity:", activityData.slug)
  return true
}

export const addMember = async (memberData: MemberData): Promise<boolean> => {
  console.log("Adding member:", memberData.slug)
  return true
}
