const AVATARS = [
  'avatar-1.webp',
  'avatar-2.webp',
  'avatar-3.webp',
  'avatar-4.webp',
  'avatar-10.webp'
]

export default function AvatarSelector ({ onSelect }) {
  return (
    <div className='avatar-selector'>
      {AVATARS.map((filename) => (
        <img
          key={filename}
          src={`/avatars/${filename}`}
          alt={`Avatar ${filename}`}
          className='avatar-selector__option'
          onClick={() => onSelect(filename)}
        />
      ))}
    </div>
  )
}
