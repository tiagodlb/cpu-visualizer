'use client'

import { useState, useEffect, useRef } from 'react'
import { Process, Algorithm } from './types/Process'
import { ProcessTable } from './components/ProcessTable'
import { GanttChart, GanttChartRef } from './components/GanttChart/index'
import { Queue } from './components/Queue'
import { ModeToggle } from './components/ThemeToggle'
import { LanguageSelector } from './components/LanguageSelector'
import { Cpu, Plus, Loader2 } from 'lucide-react'
import { FCFS, SJF, RoundRobin, PriorityScheduling } from './utils/schedulingAlgorithms'
import { useTranslation } from 'react-i18next'
import './i18n/i18n'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemeProvider } from '@/components/theme-provider'
import { useToast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'

function App() {
  const { t } = useTranslation()
  const { toast } = useToast()
  const [processes, setProcesses] = useState<Process[]>([])
  const [algorithm, setAlgorithm] = useState<Algorithm>('FCFS')
  const [quantum, setQuantum] = useState(2)
  const [timeline, setTimeline] = useState<
    { processId: string; startTime: number; endTime: number }[]
  >([])
  const [newProcess, setNewProcess] = useState({
    arrivalTime: 0,
    burstTime: 1,
    priority: 1
  })
  const [isAddingProcess, setIsAddingProcess] = useState(false)
  const [isRunningSimulation, setIsRunningSimulation] = useState(false)
  const [currentProcess, setCurrentProcess] = useState<Process | null>(null)
  const [queueProcesses, setQueueProcesses] = useState<Process[]>([])
  const ganttChartRef = useRef<GanttChartRef>(null)

  const addProcess = async () => {
    setIsAddingProcess(true)
    try {
      const process: Process = {
        id: (processes.length + 1).toString(),
        ...newProcess
      }
      setProcesses([...processes, process])
      setNewProcess({ arrivalTime: 0, burstTime: 1, priority: 1 })
      toast({
        title: t('toasts.processAdded'),
        description: t('toasts.processAddedDesc', { id: process.id })
      })
    } catch (error) {
      toast({
        title: t('toasts.error'),
        description: t('toasts.processAddError'),
        variant: 'destructive'
      })
      console.log(error)
    } finally {
      setIsAddingProcess(false)
    }
  }

  const deleteProcess = (id: string) => {
    setProcesses(processes.filter(p => p.id !== id))
    toast({
      title: t('toasts.processDeleted'),
      description: t('toasts.processDeletedDesc', { id })
    })
  }

  const runSimulation = async () => {
    setIsRunningSimulation(true)
    try {
      let result: Process[]
      const newTimeline: { processId: string; startTime: number; endTime: number }[] = []

      switch (algorithm) {
        case 'FCFS':
          result = FCFS(processes)
          break
        case 'SJF':
          result = SJF(processes)
          break
        case 'RR':
          result = RoundRobin(processes, quantum)
          break
        case 'Priority':
          result = PriorityScheduling(processes)
          break
        default:
          result = processes
          break
      }

      for (const process of result) {
        if (process.completionTime) {
          newTimeline.push({
            processId: process.id,
            startTime: process.completionTime - process.burstTime,
            endTime: process.completionTime
          })
        }
      }

      setProcesses(result)
      setTimeline(newTimeline.sort((a, b) => a.startTime - b.startTime))
      toast({
        title: t('toasts.simulationComplete'),
        description: t('toasts.simulationCompleteDesc')
      })

      // Start the Gantt chart simulation
      if (ganttChartRef.current) {
        ganttChartRef.current.startSimulation()
      }

      // Animate the queue
      for (const timeSlot of newTimeline) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        const currentProcess = processes.find(p => p.id === timeSlot.processId)
        if (currentProcess) {
          setCurrentProcess(currentProcess)
          setQueueProcesses(prev => prev.filter(p => p.id !== currentProcess.id))
        }
      }
      setCurrentProcess(null)
    } catch (error) {
      toast({
        title: t('toasts.error'),
        description: t('toasts.simulationError'),
        variant: 'destructive'
      })
      console.log(error)
    } finally {
      setIsRunningSimulation(false)
    }
  }

  useEffect(() => {
    setQueueProcesses([...processes])
  }, [processes])

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Cpu className="w-8 h-8 text-primary mr-3" />
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                {t('title')}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSelector />
              <ModeToggle />
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>{t('inputs.addProcess')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <Label htmlFor="arrivalTime">{t('inputs.arrivalTime')}</Label>
                  <Input
                    id="arrivalTime"
                    type="number"
                    min="0"
                    value={newProcess.arrivalTime}
                    onChange={(e: { target: { value: string } }) =>
                      setNewProcess({ ...newProcess, arrivalTime: parseInt(e.target.value) })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="burstTime">{t('inputs.burstTime')}</Label>
                  <Input
                    id="burstTime"
                    type="number"
                    min="1"
                    value={newProcess.burstTime}
                    onChange={(e: { target: { value: string } }) =>
                      setNewProcess({ ...newProcess, burstTime: parseInt(e.target.value) })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="priority">{t('inputs.priority')}</Label>
                  <Input
                    id="priority"
                    type="number"
                    min="1"
                    value={newProcess.priority}
                    onChange={(e: { target: { value: string } }) =>
                      setNewProcess({ ...newProcess, priority: parseInt(e.target.value) })
                    }
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={addProcess} className="w-full" disabled={isAddingProcess}>
                    {isAddingProcess ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Plus className="w-4 h-4 mr-2" />
                    )}
                    {t('inputs.addProcess')}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label htmlFor="algorithm">{t('algorithms.FCFS')}</Label>
                  <Select
                    value={algorithm}
                    onValueChange={(value: string) => setAlgorithm(value as Algorithm)}
                  >
                    <SelectTrigger id="algorithm">
                      <SelectValue placeholder="Select algorithm" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FCFS">{t('algorithms.FCFS')}</SelectItem>
                      <SelectItem value="SJF">{t('algorithms.SJF')}</SelectItem>
                      <SelectItem value="RR">{t('algorithms.RR')}</SelectItem>
                      <SelectItem value="Priority">{t('algorithms.Priority')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {algorithm === 'RR' && (
                  <div>
                    <Label htmlFor="timeQuantum">{t('inputs.timeQuantum')}</Label>
                    <Input
                      id="timeQuantum"
                      type="number"
                      min="1"
                      value={quantum}
                      onChange={(e: { target: { value: string } }) =>
                        setQuantum(parseInt(e.target.value))
                      }
                    />
                  </div>
                )}
                <div className="flex items-end">
                  <Button
                    onClick={runSimulation}
                    className="w-full"
                    disabled={isRunningSimulation || processes.length === 0}
                  >
                    {isRunningSimulation ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                    {t('buttons.runSimulation')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          {processes.length > 0 && (
            <>
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>{t('sections.processTable')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ProcessTable processes={processes} onDelete={deleteProcess} />
                </CardContent>
              </Card>
              <Card className="mt-8">
                <CardContent>
                  <Queue processes={queueProcesses} currentProcess={currentProcess} />
                </CardContent>
              </Card>
              {timeline.length > 0 && (
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle>{t('sections.ganttChart')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <GanttChart timeline={timeline} ref={ganttChartRef} />
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
      <Toaster />
    </ThemeProvider>
  )
}

export default App
