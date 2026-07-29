import pino from 'pino'
import pretty from "pino-pretty";

export const logger = pino(
  { level: process.env.LOG_LEVEL ?? 'info' },
  pretty({
    colorize: true,
    colorizeObjects: true,
    sync: true
  })
)

// log examples
// logger.info('oi')
// logger.error({ test: true }, 'this is a test for ERROR')
// logger.debug({ test: true }, 'this is a test for DEBUG')
// logger.warn({ test: true }, 'this is a test for WARN')
// logger.trace({ test: true }, 'this is a test for TRACE')
