'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Process } from '../types/Process'

interface QueueProps {
  processes: Process[]
  currentProcess: Process | null
}

export const Queue: React.FC<QueueProps> = ({ processes, currentProcess }) => {
  const { t } = useTranslation()

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">{t('queue.title')}</h3>
      <div className="flex items-center space-x-4 overflow-x-auto pb-4">
        <AnimatePresence>
          {processes.map(process => (
            <motion.div
              key={process.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex-shrink-0 w-16 h-16 rounded-lg flex items-center justify-center text-lg font-bold ${
                process.id === currentProcess?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              P{process.id}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
