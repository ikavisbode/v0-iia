"use client"

import type React from "react"
import { Button } from "@/components/ui/button"

interface CardProps {
  title: string
  description: string
  image?: string
  category?: string
  date?: string
  location?: string
  price?: string
  status?: string
  buttonText?: string
  onButtonClick?: () => void
  className?: string
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  category,
  date,
  location,
  price,
  status,
  buttonText,
  onButtonClick,
  className = "",
}) => {
  return (
    <div
      className={`bg-neutral-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 ${className}`}
    >
      {image && (
        <div className="aspect-video overflow-hidden">
          <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="p-6">
        {category && (
          <span className="inline-block px-3 py-1 bg-amber-400 text-neutral-900 text-xs font-semibold rounded-full mb-3">
            {category}
          </span>
        )}

        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{title}</h3>

        <p className="text-neutral-300 mb-4 line-clamp-3">{description}</p>

        <div className="space-y-2 mb-4">
          {date && (
            <div className="flex items-center text-sm text-neutral-400">
              <span className="font-medium mr-2">Data:</span>
              <span>{date}</span>
            </div>
          )}
          {location && (
            <div className="flex items-center text-sm text-neutral-400">
              <span className="font-medium mr-2">Local:</span>
              <span>{location}</span>
            </div>
          )}
          {price && (
            <div className="flex items-center text-sm text-neutral-400">
              <span className="font-medium mr-2">Preço:</span>
              <span>{price}</span>
            </div>
          )}
          {status && (
            <div className="flex items-center text-sm">
              <span className="font-medium mr-2">Status:</span>
              <span
                className={`px-2 py-1 rounded text-xs ${
                  status === "Ativo" || status === "Active"
                    ? "bg-green-600 text-white"
                    : "bg-neutral-600 text-neutral-300"
                }`}
              >
                {status}
              </span>
            </div>
          )}
        </div>

        {buttonText && onButtonClick && (
          <Button
            onClick={onButtonClick}
            className="w-full bg-amber-400 hover:bg-amber-500 text-neutral-900 font-semibold"
          >
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  )
}

export default Card
