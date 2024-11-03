export interface Process {
  id: string;
  arrivalTime: number;
  burstTime: number;
  priority?: number;
  remainingTime?: number;
  completionTime?: number;
  turnaroundTime?: number;
  waitingTime?: number;
}

export type Algorithm = 'FCFS' | 'SJF' | 'RR' | 'Priority';