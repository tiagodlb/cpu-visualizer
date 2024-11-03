'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useSpring, useTransform } from 'framer-motion'

interface TimeAxisProps {
  totalTime: number
  currentTime: number
}

export const TimeAxis: React.FC<TimeAxisProps> = ({ totalTime, currentTime }) => {
  const { t } = useTranslation()
  const progress = useSpring(currentTime, { stiffness: 100, damping: 30 })
  const translateX = useTransform(progress, [0, totalTime], ['0%', '100%'])

  return (
    <div className="h-8 border-b border-border mb-4 relative">
      <motion.div
        className="h-full w-full"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <details open>
          <summary className="sr-only">{t('ganttChart.timeAxis')}</summary>
          {Array.from({ length: totalTime + 1 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute bottom-0 transform -translate-x-1/2"
              style={{ left: `${(i / totalTime) * 100}%` }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.03,
                duration: 0.4,
                ease: 'easeOut'
              }}
            >
              <div className="h-2 w-0.5 bg-muted-foreground" aria-hidden="true" />
              <div
                className="text-xs text-muted-foreground mt-1"
                aria-label={`${t('ganttChart.time')}: ${i}`}
              >
                {i}
              </div>
            </motion.div>
          ))}
        </details>
      </motion.div>
      <motion.div
        className="absolute bottom-0 w-0.5 h-8 bg-primary"
        style={{ translateX }}
        aria-label={`${t('ganttChart.currentTime')}: ${currentTime}`}
      />
    </div>
  )
}
