'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useSpring, useTransform } from 'framer-motion'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface ProcessBlockProps {
  processId: string
  startTime: number
  endTime: number
  totalTime: number
  color: string
  index: number
  currentTime: number
}

export const ProcessBlock: React.FC<ProcessBlockProps> = ({
  processId,
  startTime,
  endTime,
  totalTime,
  color,
  index,
  currentTime
}) => {
  const { t } = useTranslation()
  const width = ((endTime - startTime) / totalTime) * 100
  const left = (startTime / totalTime) * 100

  const progress = useSpring(0, { stiffness: 100, damping: 30 })
  const scaleX = useTransform(progress, [0, 100], [0, 1])

  React.useEffect(() => {
    if (currentTime >= startTime && currentTime <= endTime) {
      progress.set(((currentTime - startTime) / (endTime - startTime)) * 100)
    } else if (currentTime > endTime) {
      progress.set(100)
    } else {
      progress.set(0)
    }
  }, [currentTime, startTime, endTime, progress])

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${left}%`,
        width: `${width}%`,
        height: '60px',
        top: 0
      }}
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1]
      }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div
              className={`h-full rounded-md border border-border bg-gradient-to-r ${color} relative
                cursor-pointer transition-all duration-200 ease-out overflow-hidden`}
              whileHover={{ scale: 1.05 }}
              aria-label={`${t('ganttChart.process')} ${processId}: ${t(
                'ganttChart.startTime'
              )} ${startTime}, ${t('ganttChart.endTime')} ${endTime}, ${t('ganttChart.duration')} ${
                endTime - startTime
              }`}
            >
              <motion.div
                className="absolute inset-0 bg-white dark:bg-black opacity-50"
                style={{ scaleX, transformOrigin: 'left' }}
              />
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">P{processId}</h4>
                <p className="text-sm font-medium leading-none">
                  {endTime - startTime} {t('ganttChart.units')}
                </p>
              </motion.div>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent side="top">
            <div className="text-sm font-semibold mb-1">
              {t('ganttChart.process')} {processId}
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-sm font-medium leading-none">
                <span>{t('ganttChart.startTime')}:</span>
                <span>{startTime}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('ganttChart.endTime')}:</span>
                <span>{endTime}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('ganttChart.duration')}:</span>
                <span>{endTime - startTime}</span>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  )
}
