import { View, Text, Image } from '@tarojs/components'
import hairImg from '@/assets/modules/module-hair.png'
import fitnessImg from '@/assets/modules/module-fitness.png'
import reportImg from '@/assets/modules/module-report.png'
import './index.scss'

export type ModuleVariant = 'hair' | 'fitness' | 'report'

const MODULE_IMAGES: Record<ModuleVariant, string> = {
  hair: hairImg,
  fitness: fitnessImg,
  report: reportImg
}

interface ModuleCardProps {
  variant: ModuleVariant
  title: string
  subtitle: string
  onClick?: () => void
}

export default function ModuleCard({
  variant,
  title,
  subtitle,
  onClick
}: ModuleCardProps) {
  return (
    <View className={`module-card module-card--${variant}`} onClick={onClick}>
      <View className='module-card__glow' />
      <View className='module-card__shine' />
      <View className='module-card__illus-wrap'>
        <Image
          className='module-card__illus'
          src={MODULE_IMAGES[variant]}
          mode='aspectFill'
        />
      </View>
      <View className='module-card__body'>
        <Text className='module-card__title'>{title}</Text>
        <Text className='module-card__subtitle'>{subtitle}</Text>
        <View className='module-card__cta'>
          <Text className='module-card__cta-text'>立即进入</Text>
          <Text className='module-card__cta-arrow'>→</Text>
        </View>
      </View>
    </View>
  )
}
