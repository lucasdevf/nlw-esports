import express from 'express'

import cors from 'cors'

import { PrismaClient } from '@prisma/client'
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-hour-string'
import { convertMinutesToHourString } from './utils/convert-minutes-to-hours'

const app = express()

app.use(express.json())

app.use(cors())

const prisma = new PrismaClient()

app.get('/games', async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    }
  })

  return response.json(games)
})

app.post('/games/:id/ads', async (request, response) => {
  
  const gameId = request.params.id

  const body = request.body

  const {
    name,
    yearsPlaying,
    discord,
    weekDays,
    hourStart,
    hourEnd,
    useVoiceChannel
  } = body

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name,
      yearsPlaying,
      discord,
      weekDays,
      hourStart: convertHourStringToMinutes(hourStart),
      hourEnd: convertHourStringToMinutes(hourEnd),
      useVoiceChannel
    }
  })

  return response.status(201).json(ad)
})

app.get('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true
    },
    where: {
      gameId
    }
  })

  return response.json(ads.map(ad => {
    return {
      ...ad,
      hourStart: convertMinutesToHourString(ad.hourStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd)
    }
  }))
})

app.get('/ads/:id/discord', async (request, response) => {

  const adId = request.params.id

  const ad = await prisma.ad.findUnique({
    select: {
      discord: true
    },
    where: {
      id: adId
    }
  })

  if(!ad) {
    return response.status(404).json({ error: 'Ad not found'})
  }

  const { discord } = ad

  return response.json({ discord })

})

app.listen(3333, () => console.log('Server is running on PORT 3333'))
