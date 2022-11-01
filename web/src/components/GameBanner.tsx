
interface GameBannerProps {
  bannerUrl: string
  title: string
  adsCount: number
}

export function GamerBanner({ bannerUrl, title, adsCount }: GameBannerProps) {
  return (
    <a href="#" className="relative rounded-lg overflow-hidden">
      <img src={bannerUrl} alt="" />

      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 right-0 left-0">
        <strong className="text-white block">{title}</strong>
        <span className="text-zinc-300 text-sm block">
          {adsCount === 0 ?
            'Nenhum anúncio' :
            adsCount > 1 ? `${adsCount} anúncios` : `${adsCount} anúncio`
          }
        </span>
      </div>
    </a>
  )
}