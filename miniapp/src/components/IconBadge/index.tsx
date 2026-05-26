import { View, Image } from '@tarojs/components'
import { getIconSrc, isPhotoIcon, type AppIconKey } from '@/constants/icons'
import './index.scss'

interface IconBadgeProps {
  iconKey: AppIconKey
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export default function IconBadge({
  iconKey,
  size = 'md',
  className = ''
}: IconBadgeProps) {
  const photo = isPhotoIcon(iconKey)

  return (
    <View
      className={`icon-badge icon-badge--${size} ${photo ? 'icon-badge--photo' : ''} ${className}`.trim()}
    >
      <Image
        className='icon-badge__img'
        src={getIconSrc(iconKey)}
        mode={photo ? 'aspectFill' : 'aspectFit'}
      />
    </View>
  )
}
