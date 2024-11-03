'use client'

import React, { useMemo, useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { useTranslation } from 'react-i18next'
import { TimeAxis } from './TimeAxis'
import { ProcessBlock } from './ProcessBlock'
import { Legend } from './Legend'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { PlayIcon, PauseIcon } from 'lucide-react'
import { StopIcon } from '@radix-ui/react-icons'

interface TimeSlot {
  processId: string
  startTime: number
  endTime: number
}

interface GanttChartProps {
  timeline: TimeSlot[]
}

export interface GanttChartRef {
  startSimulation: () => void
}

export const GanttChart = forwardRef<GanttChartRef, GanttChartProps>(({ timeline }, ref) => {
  const { t } = useTranslation()
  const [currentTime, setCurrentTime] = useState(0)
  const [isSimulating, setIsSimulating] = useState(false)
  const [activeProcesses, setActiveProcesses] = useState<Set<string>>(new Set())
  const totalTime = useMemo(() => timeline[timeline.length - 1]?.endTime || 0, [timeline])
  const colors = [
    'from-blue-500 to-blue-600',
    'from-purple-500 to-purple-600',
    'from-green-500 to-green-600',
    'from-red-500 to-red-600',
    'from-yellow-500 to-yellow-600'
  ]

  const uniqueProcesses = useMemo(
    () =>
      Array.from(new Set(timeline.map(slot => slot.processId))).sort(
        (a, b) => parseInt(a) - parseInt(b)
      ),
    [timeline]
  )

  useEffect(() => {
    setActiveProcesses(new Set(uniqueProcesses))
  }, [uniqueProcesses])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isSimulating && currentTime < totalTime) {
      interval = setInterval(() => {
        setCurrentTime(prevTime => {
          const nextTime = prevTime + 1
          if (nextTime > totalTime) {
            clearInterval(interval)
            setIsSimulating(false)
            return totalTime
          }
          return nextTime
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isSimulating, currentTime, totalTime])

  const handleSimulation = () => {
    setIsSimulating(!isSimulating)
  }

  const resetSimulation = () => {
    setIsSimulating(false)
    setCurrentTime(0)
  }

  const toggleProcess = (processId: string) => {
    setActiveProcesses(prev => {
      const newSet = new Set(prev)
      if (newSet.has(processId)) {
        newSet.delete(processId)
      } else {
        newSet.add(processId)
      }
      return newSet
    })
  }

  useImperativeHandle(ref, () => ({
    startSimulation: () => {
      setCurrentTime(0)
      setIsSimulating(true)
    }
  }))

  return (
    <Card>
      <CardContent className="p-4">
        <ScrollArea className="h-[300px] w-full">
          <div className="min-w-[768px]">
            <div className="relative mb-16 pt-20">
              <TimeAxis totalTime={totalTime} currentTime={currentTime} />
              <fieldset className="relative h-[60px] border-0 p-0 m-0">
                <legend className="sr-only">{t('ganttChart.processBlocks')}</legend>
                {timeline.map(
                  (slot, index) =>
                    activeProcesses.has(slot.processId) && (
                      <ProcessBlock
                        key={`${slot.processId}-${slot.startTime}`}
                        processId={slot.processId}
                        startTime={slot.startTime}
                        endTime={slot.endTime}
                        totalTime={totalTime}
                        color={colors[parseInt(slot.processId) % colors.length]}
                        index={index}
                        currentTime={currentTime}
                      />
                    )
                )}
              </fieldset>
            </div>
          </div>
        </ScrollArea>
        <Legend
          processes={uniqueProcesses}
          colors={colors}
          onToggleProcess={toggleProcess}
          activeProcesses={activeProcesses}
        />
        <div className="flex justify-center mt-8 space-x-2">
          <Button onClick={handleSimulation}>
            {isSimulating ? (
              <PauseIcon className="mr-2 h-4 w-4" />
            ) : (
              <PlayIcon className="mr-2 h-4 w-4" />
            )}
            {isSimulating ? t('ganttChart.pause') : t('ganttChart.start')}{' '}
            {t('ganttChart.simulation')}
          </Button>
          <Button onClick={resetSimulation} variant="outline">
            <StopIcon className="mr-2 h-4 w-4" />
            {t('ganttChart.reset')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
})

GanttChart.displayName = 'GanttChart'
