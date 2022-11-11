/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as winston from 'winston'

import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { Logger, ValidationPipe } from '@nestjs/common'

import { AppModule } from './app/app.module'
import { NestFactory } from '@nestjs/core'
import { WinstonModule } from 'nest-winston'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    cors: true,
    logger: WinstonModule.createLogger({
      transports: [new winston.transports.Console(), new winston.transports.File({ filename: 'logfile.log' })],
    }),
  })
  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      whitelist: true,
    })
  )
  const port = process.env.PORT || 3000
  await app.listen(port, 'localhost')
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`)
}

bootstrap()
