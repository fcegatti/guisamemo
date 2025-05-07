import { useGame } from '@context/GameContext'
import { useLanguage } from '@context/LanguageContext'

function StartGameButton () {
  const { players, startGame } = useGame()
  const { t } = useLanguage()

  return (
    <button
      type='button'
      onClick={startGame}
      disabled={players.length === 0}
      className='startscreen__start-btn'
    >
      {t.start.startGame}
    </button>
  )
}

export default StartGameButton
