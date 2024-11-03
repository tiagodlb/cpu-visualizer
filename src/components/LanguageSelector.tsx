'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' }
]

export const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation()

  return (
    <motion.div
      className="flex items-center gap-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Globe className="w-5 h-5 text-primary" />
      <Select value={i18n.language} onValueChange={value => i18n.changeLanguage(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          {languages.map(lang => (
            <SelectItem key={lang.code} value={lang.code}>
              {`${lang.flag} ${lang.name}`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </motion.div>
  )
}
