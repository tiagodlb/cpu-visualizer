export default {
  title: 'Visualizador de Escalonamento de CPU',
  inputs: {
    arrivalTime: 'Tempo de Chegada',
    burstTime: 'Tempo de Execução',
    priority: 'Prioridade',
    timeQuantum: 'Quantum de Tempo',
    addProcess: 'Adicionar Processo'
  },
  algorithms: {
    FCFS: 'Primeiro a Chegar, Primeiro a Ser Servido',
    SJF: 'Trabalho Mais Curto Primeiro',
    RR: 'Round Robin',
    Priority: 'Escalonamento por Prioridade'
  },
  buttons: {
    runSimulation: 'Executar Simulação',
    delete: 'Excluir'
  },
  tables: {
    processId: 'ID do Processo',
    arrivalTime: 'Tempo de Chegada',
    burstTime: 'Tempo de Execução',
    priority: 'Prioridade',
    turnaroundTime: 'Tempo de Retorno',
    waitingTime: 'Tempo de Espera',
    actions: 'Ações'
  },
  sections: {
    processTable: 'Tabela de Processos',
    ganttChart: 'Gráfico de Gantt'
  },
  tooltips: {
    arrivalTime: 'Momento em que o processo chega ao sistema',
    burstTime: 'Tempo necessário para executar o processo',
    priority: 'Valor menor indica maior prioridade',
    timeQuantum: 'Fatia de tempo para cada processo no Round Robin'
  },
  ganttChart: {
    processBlocks: 'Blocos de Processos do Gráfico de Gantt',
    timeAxis: 'Eixo do Tempo',
    processLegend: 'Legenda de Processos',
    process: 'Processo',
    time: 'Tempo',
    currentTime: 'Tempo Atual',
    startTime: 'Tempo de Início',
    endTime: 'Tempo de Fim',
    duration: 'Duração',
    units: 'unidades',
    pause: 'Pausar',
    start: 'Iniciar',
    reset: 'Reiniciar',
    simulation: 'Simulação'
  },
  queue: {
    title: 'Fila de Processos',
    current: 'Processo Atual',
    waiting: 'Processos em Espera'
  },
  toasts: {
    processAdded: 'Processo Adicionado',
    processAddedDesc: 'O processo com ID {id} foi adicionado com sucesso',
    error: 'Erro',
    processAddError: 'Ocorreu um erro ao adicionar o processo',
    processDeleted: 'Processo Excluído',
    processDeletedDesc: 'O processo com ID {id} foi excluído com sucesso',
    simulationComplete: 'Simulação Concluída',
    simulationCompleteDesc: 'A simulação foi concluída com sucesso',
    simulationError: 'Ocorreu um erro durante a simulação'
  },
  theme: {
    themeTitle: 'Trocar Tema',
    light: 'Claro',
    dark: 'Escuro',
    system: 'Sistema'
  }
}
