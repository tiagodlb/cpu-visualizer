'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface LegendProps {
  processes: string[]
  colors: string[]
  onToggleProcess: (processId: string) => void
  activeProcesses: Set<string>
}

export const Legend: React.FC<LegendProps> = ({
  processes,
  colors,
  onToggleProcess,
  activeProcesses
}) => {
  const { t } = useTranslation()

  return (
    <motion.div
      className="mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-4">
        {t('ganttChart.processLegend')}
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {processes.map((processId, index) => (
          <motion.div
            key={processId}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + index * 0.1 }}
          >
            <Button
              variant="outline"
              className={`w-full justify-start ${
                activeProcesses.has(processId) ? 'border-primary' : 'border-muted'
              }`}
              onClick={() => onToggleProcess(processId)}
              aria-pressed={activeProcesses.has(processId)}
              aria-label={`${t('ganttChart.toggleVisibility')} ${t(
                'ganttChart.process'
              )} ${processId}`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-gradient-to-r ${
                  colors[index % colors.length]
                } mr-2`}
                aria-hidden="true"
              />
              <span className="truncate">
                {t('ganttChart.process')} {processId}
              </span>
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
