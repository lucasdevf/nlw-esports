import * as Dialog from '@radix-ui/react-dialog'

import { GamerBanner } from './components/GameBanner'

import './styles/main.css'

import logo from './assets/logo.svg'
import { CreateAdBanner } from './components/CreateAdBanner'
import { useQuery } from 'react-query'
import { api } from './services/api'
import { CreateAdModal } from './components/CreateAdModal'

export interface GameProps {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

export default function App() {

  const {
    data: games
  } = useQuery<GameProps[]>('@games/home', async () => {
    const response = await api.get('/games')

    return response.data
  }, {
    refetchOnWindowFocus: true
  })

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logo} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="bg-nlw-gradient bg-clip-text text-transparent">duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games?.map(game => (
          <GamerBanner 
            key={game.id}
            bannerUrl={game.bannerUrl}
            title={game.title}
            adsCount={game._count.ads}
          />
        ))}
      </div>
      
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}