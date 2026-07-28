import pino from 'pino'

export const logger = pino({
  level: "trace",
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      colorizeObjects: true
    }
  }
})

// log examples
// logger.info('oi')
// logger.error({ test: true }, 'this is a test for ERROR')
// logger.debug({ test: true }, 'this is a test for DEBUG')
// logger.warn({ test: true }, 'this is a test for WARN')
// logger.trace({ test: true }, 'this is a test for TRACE')
