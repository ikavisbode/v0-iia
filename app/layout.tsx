import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"

export const metadata: Metadata = {
  title: "Instituto Internacional de Atuação",
  description: "Instituto Internacional de Atuação - Formação teatral de excelência",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt">
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-DX43ESQTE0" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DX43ESQTE0');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
