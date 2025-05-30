"use client"

import type React from "react"
import { useState } from "react"
import { Mail, Send, Instagram, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

interface ContactPageProps {
  onNavigate: (page: string, section?: string, id?: string) => void
}

const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formStatus, setFormStatus] = useState<null | "success" | "error">(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Use the provided key for form submission
      const formKey = "28cfab76-143a-47aa-bafb-0775e82d9880"

      // Create enhanced mailto link with form data and key
      const emailBody = `
Formulário de Contato - Instituto Internacional de Atuação
Key: ${formKey}

Nome: ${formData.name}
Email: ${formData.email}
Assunto: ${formData.subject}

Mensagem:
${formData.message}

---
Enviado através do site institucional
      `.trim()

      const mailtoLink = `mailto:contato@institutointernacional.com?subject=${encodeURIComponent(formData.subject || "Contato via site")}&body=${encodeURIComponent(emailBody)}`

      // Open email client
      window.location.href = mailtoLink

      setFormStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      setFormStatus("error")
    } finally {
      setIsSubmitting(false)

      // Clear status after 5 seconds
      setTimeout(() => {
        setFormStatus(null)
      }, 5000)
    }
  }

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-red-900 to-red-700 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Contato</h1>
            <p className="text-xl opacity-90">Entre em contato com o Instituto Internacional de Atuação</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-serif font-bold mb-8 text-gray-800">Informações de Contato</h2>

              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <Mail className="w-6 h-6 text-red-700 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-2">Email</h3>
                      <a href="mailto:contato@institutointernacional.com" className="text-red-700 hover:underline">
                        contato@institutointernacional.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8">
                <h3 className="font-bold text-lg mb-4">Redes Sociais</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://instagram.com/institutointernacionaldatuacao"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-700 text-white p-3 rounded-full hover:bg-red-800 transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="https://youtube.com/@institutointernacionaldatuacao?si=McQeOGhEuCUXIfDh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-700 text-white p-3 rounded-full hover:bg-red-800 transition-colors"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-serif font-bold mb-8 text-gray-800">Envie-nos uma Mensagem</h2>

              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Assunto *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Mensagem *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                      ></textarea>
                    </div>

                    <div>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded-md transition-colors"
                      >
                        {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                        <Send className="ml-2 w-4 h-4" />
                      </Button>
                    </div>

                    {formStatus === "success" && (
                      <div className="p-4 bg-green-50 text-green-700 rounded-md">
                        Mensagem enviada com sucesso! Entraremos em contato em breve.
                      </div>
                    )}

                    {formStatus === "error" && (
                      <div className="p-4 bg-red-50 text-red-700 rounded-md">
                        Erro ao enviar mensagem. Por favor, tente novamente ou entre em contato diretamente por email.
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default ContactPage
