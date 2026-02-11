import cron from 'node-cron'

export interface ScheduleConfig {
  cronExpression: string // "0 9 * * *" 
}

export function parseCron(expression: string): {
  nextRun: Date
  humanReadable: string
} {
  const task = cron.parseExpression(expression)
  const nextRun = task.nextDate().toDate()
  
  // Convert to human readable
  const parts = expression.split(' ')
  const [minute, hour] = parts
  
  return {
    nextRun,
    humanReadable: `每天 ${hour.padStart(2, '0')}:${minute.padStart(2, '0')} (${hour}:${minute})`,
  }
}

export function createSchedule(expression: string, callback: () => void): cron.ScheduledTask {
  return cron.schedule(expression, callback)
}

export function validateCron(expression: string): boolean {
  return cron.validate(expression)
}
