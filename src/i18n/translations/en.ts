export default {
  title: 'CPU Scheduling Visualizer',
  inputs: {
    arrivalTime: 'Arrival Time',
    burstTime: 'Burst Time',
    priority: 'Priority',
    timeQuantum: 'Time Quantum',
    addProcess: 'Add Process'
  },
  algorithms: {
    FCFS: 'First Come First Serve',
    SJF: 'Shortest Job First',
    RR: 'Round Robin',
    Priority: 'Priority Scheduling'
  },
  buttons: {
    runSimulation: 'Run Simulation',
    delete: 'Delete'
  },
  tables: {
    processId: 'Process ID',
    arrivalTime: 'Arrival Time',
    burstTime: 'Burst Time',
    priority: 'Priority',
    turnaroundTime: 'Turnaround Time',
    waitingTime: 'Waiting Time',
    actions: 'Actions'
  },
  sections: {
    processTable: 'Process Table',
    ganttChart: 'Gantt Chart'
  },
  tooltips: {
    arrivalTime: 'Time at which the process arrives in the system',
    burstTime: 'Time required to execute the process',
    priority: 'Lower value indicates higher priority',
    timeQuantum: 'Time slice for each process in Round Robin'
  },
  ganttChart: {
    processBlocks: 'Gantt Chart Process Blocks',
    timeAxis: 'Time Axis',
    processLegend: 'Process Legend',
    process: 'Process',
    time: 'Time',
    currentTime: 'Current Time',
    startTime: 'Start Time',
    endTime: 'End Time',
    duration: 'Duration',
    units: 'units',
    pause: 'Pause',
    start: 'Start',
    reset: 'Reset',
    simulation: 'Simulation'
  },
  queue: {
    title: 'Process Queue',
    current: 'Current Process',
    waiting: 'Waiting Processes'
  },
  toasts: {
    processAdded: 'Process Added',
    processAddedDesc: 'Process with ID {id} has been added successfully',
    error: 'Error',
    processAddError: 'An error occurred while adding the process',
    processDeleted: 'Process Deleted',
    processDeletedDesc: 'Process with ID {id} has been deleted successfully',
    simulationComplete: 'Simulation Complete',
    simulationCompleteDesc: 'The simulation has finished successfully',
    simulationError: 'An error occurred during the simulation'
  },
  theme: {
    themeTitle: 'Toggle Theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System'
  }
}
