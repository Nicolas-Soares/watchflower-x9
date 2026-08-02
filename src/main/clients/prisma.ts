import path from 'node:path';
import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

const dbPath = path.resolve(process.cwd(), 'prisma', 'watchflower.db');

const adapter = new PrismaLibSql({
  url: `file:${dbPath}`,
});

export const prisma = new PrismaClient({ adapter });
