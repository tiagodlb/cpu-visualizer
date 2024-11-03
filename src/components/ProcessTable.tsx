'use client'

import React from 'react'
import { Process } from '../types/Process'
import { Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'

interface ProcessTableProps {
  processes: Process[]
  onDelete: (id: string) => void
}

export const ProcessTable: React.FC<ProcessTableProps> = ({ processes, onDelete }) => {
  const { t } = useTranslation()

  return (
    <div className="overflow-x-auto">
      <Table className="text-center">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">{t('tables.processId')}</TableHead>
            <TableHead className="text-center">{t('tables.arrivalTime')}</TableHead>
            <TableHead className="text-center">{t('tables.burstTime')}</TableHead>
            <TableHead className="text-center">{t('tables.priority')}</TableHead>
            <TableHead className="text-center">{t('tables.turnaroundTime')}</TableHead>
            <TableHead className="text-center">{t('tables.waitingTime')}</TableHead>
            <TableHead className="text-center">{t('tables.actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {processes.map((process, index) => (
            <motion.tr
              key={process.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <TableCell>P{process.id}</TableCell>
              <TableCell>{process.arrivalTime}</TableCell>
              <TableCell>{process.burstTime}</TableCell>
              <TableCell>{process.priority ?? '-'}</TableCell>
              <TableCell>{process.turnaroundTime ?? '-'}</TableCell>
              <TableCell>{process.waitingTime ?? '-'}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" onClick={() => onDelete(process.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
