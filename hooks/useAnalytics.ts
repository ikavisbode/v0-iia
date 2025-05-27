"use client"

import { useEffect } from "react"
import { useRouter } from "next/router"
import * as gtag from "../utils/gtag"

export const useAnalytics = () => {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }

    router.events.on("routeChangeComplete", handleRouteChange)
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events])

  return {
    trackEvent: gtag.event,
    trackPageView: gtag.pageview,
  }
}
