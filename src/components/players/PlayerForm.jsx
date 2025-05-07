import { useLanguage } from '@context/LanguageContext'
import { MAX_NAME_LENGTH } from '@constants/game'

function PlayerForm ({
  playerName,
  setPlayerName,
  onAddPlayer,
  isDisabled,
  error
}) {
  const { t } = useLanguage()

  return (
    <>
      <div className='playerform'>
        <label htmlFor='player-name' className='sr-only'>
          {t.start.label}
        </label>
        <input
          name='player-name'
          id='player-name'
          type='text'
          placeholder={isDisabled ? t.start.maxReached : t.start.placeholder}
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          disabled={isDisabled}
          maxLength={MAX_NAME_LENGTH}
          className='playerform__input'
          aria-describedby='player-error'
        />
        <button
          type='button'
          onClick={onAddPlayer}
          disabled={!playerName.trim() || isDisabled}
          className='playerform__button'
        >
          {t.start.addPlayer}
        </button>
      </div>
      {error && (
        <p
          className='playerform__error'
          role='alert'
          aria-live='assertive'
          id='player-error'
        >
          {error}
        </p>
      )}
    </>
  )
}

export default PlayerForm
