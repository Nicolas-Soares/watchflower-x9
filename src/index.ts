import { logger } from './logger.js'
import fs from 'fs/promises'

const banner = await fs.readFile("./src/banner.txt", "utf8");

console.log(banner);
logger.info('Starting Watchflower...')
