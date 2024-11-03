export default {
  title: 'Visualizador de Planificación de CPU',
  inputs: {
    arrivalTime: 'Tiempo de Llegada',
    burstTime: 'Tiempo de Ráfaga',
    priority: 'Prioridad',
    timeQuantum: 'Quantum de Tiempo',
    addProcess: 'Agregar Proceso'
  },
  algorithms: {
    FCFS: 'Primero en Llegar, Primero en Servir',
    SJF: 'Trabajo Más Corto Primero',
    RR: 'Round Robin',
    Priority: 'Planificación por Prioridad'
  },
  buttons: {
    runSimulation: 'Ejecutar Simulación',
    delete: 'Eliminar'
  },
  tables: {
    processId: 'ID de Proceso',
    arrivalTime: 'Tiempo de Llegada',
    burstTime: 'Tiempo de Ráfaga',
    priority: 'Prioridad',
    turnaroundTime: 'Tiempo de Retorno',
    waitingTime: 'Tiempo de Espera',
    actions: 'Acciones'
  },
  sections: {
    processTable: 'Tabla de Procesos',
    ganttChart: 'Diagrama de Gantt'
  },
  tooltips: {
    arrivalTime: 'Momento en que el proceso llega al sistema',
    burstTime: 'Tiempo necesario para ejecutar el proceso',
    priority: 'Valor menor indica mayor prioridad',
    timeQuantum: 'Tiempo asignado a cada proceso en Round Robin'
  },
  ganttChart: {
    processBlocks: 'Bloques de Procesos del Diagrama de Gantt',
    timeAxis: 'Eje de Tiempo',
    processLegend: 'Leyenda de Procesos',
    process: 'Proceso',
    time: 'Tiempo',
    currentTime: 'Tiempo Actual',
    startTime: 'Tiempo de Inicio',
    endTime: 'Tiempo de Fin',
    duration: 'Duración',
    units: 'unidades',
    pause: 'Pausar',
    start: 'Iniciar',
    reset: 'Reiniciar',
    simulation: 'Simulación'
  },
  queue: {
    title: 'Cola de Procesos',
    current: 'Proceso Actual',
    waiting: 'Procesos en Espera'
  },
  toasts: {
    processAdded: 'Proceso Agregado',
    processAddedDesc: 'El proceso con ID {id} ha sido agregado exitosamente',
    error: 'Error',
    processAddError: 'Ocurrió un error al agregar el proceso',
    processDeleted: 'Proceso Eliminado',
    processDeletedDesc: 'El proceso con ID {id} ha sido eliminado exitosamente',
    simulationComplete: 'Simulación Completa',
    simulationCompleteDesc: 'La simulación ha finalizado exitosamente',
    simulationError: 'Ocurrió un error durante la simulación'
  },
  theme: {
    themeTitle: 'Trocar Tema',
    light: 'Claro',
    dark: 'Escuro',
    system: 'Sistema'
  }
}
