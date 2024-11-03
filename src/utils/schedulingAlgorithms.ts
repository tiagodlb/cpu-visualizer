import { Process } from '../types/Process';

export const FCFS = (processes: Process[]): Process[] => {
  const sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  let currentTime = 0;
  
  return sorted.map(process => {
    currentTime = Math.max(currentTime, process.arrivalTime);
    const startTime = currentTime;
    currentTime += process.burstTime;
    
    return {
      ...process,
      completionTime: currentTime,
      turnaroundTime: currentTime - process.arrivalTime,
      waitingTime: startTime - process.arrivalTime
    };
  });
};

export const SJF = (processes: Process[]): Process[] => {
  const result: Process[] = [];
  const remaining = [...processes];
  let currentTime = 0;

  while (remaining.length > 0) {
    const available = remaining.filter(p => p.arrivalTime <= currentTime);
    
    if (available.length === 0) {
      currentTime = Math.min(...remaining.map(p => p.arrivalTime));
      continue;
    }

    const shortest = available.reduce((prev, curr) => 
      prev.burstTime < curr.burstTime ? prev : curr
    );

    const index = remaining.findIndex(p => p.id === shortest.id);
    const process = remaining.splice(index, 1)[0];
    
    result.push({
      ...process,
      completionTime: currentTime + process.burstTime,
      turnaroundTime: (currentTime + process.burstTime) - process.arrivalTime,
      waitingTime: currentTime - process.arrivalTime
    });

    currentTime += process.burstTime;
  }

  return result;
};

export const RoundRobin = (processes: Process[], quantum: number): Process[] => {
  const result: Process[] = processes.map(p => ({
    ...p,
    remainingTime: p.burstTime,
    completionTime: 0,
    turnaroundTime: 0,
    waitingTime: 0
  }));
  
  let currentTime = 0;
  let done = false;

  while (!done) {
    done = true;
    
    for (const process of result) {
      if (process.remainingTime! > 0) {
        done = false;
        
        const executeTime = Math.min(quantum, process.remainingTime!);
        currentTime += executeTime;
        process.remainingTime! -= executeTime;
        
        if (process.remainingTime === 0) {
          process.completionTime = currentTime;
          process.turnaroundTime = currentTime - process.arrivalTime;
          process.waitingTime = process.turnaroundTime - process.burstTime;
        }
      }
    }
  }

  return result;
};

export const PriorityScheduling = (processes: Process[]): Process[] => {
  const result: Process[] = [];
  const remaining = [...processes];
  let currentTime = 0;

  while (remaining.length > 0) {
    const available = remaining.filter(p => p.arrivalTime <= currentTime);
    
    if (available.length === 0) {
      currentTime = Math.min(...remaining.map(p => p.arrivalTime));
      continue;
    }

    const highest = available.reduce((prev, curr) => 
      (prev.priority || 0) > (curr.priority || 0) ? prev : curr
    );

    const index = remaining.findIndex(p => p.id === highest.id);
    const process = remaining.splice(index, 1)[0];
    
    result.push({
      ...process,
      completionTime: currentTime + process.burstTime,
      turnaroundTime: (currentTime + process.burstTime) - process.arrivalTime,
      waitingTime: currentTime - process.arrivalTime
    });

    currentTime += process.burstTime;
  }

  return result;
};