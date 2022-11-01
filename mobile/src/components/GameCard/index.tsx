import { TouchableOpacity, TouchableOpacityProps, ImageBackground, ImageSourcePropType, Text } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { styles } from './styles';
import { THEME } from '../../theme';

export interface GameProps {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

interface Props extends TouchableOpacityProps {
  data: GameProps
}

export function GameCard({ data, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <ImageBackground 
        source={{ uri: data.bannerUrl }}
        style={styles.cover}
      >
        <LinearGradient
          colors={THEME.COLORS.FOOTER}
          style={styles.footer}
        >
          <Text style={styles.name}>
            {data.title}
          </Text>

          <Text style={styles.ads}>
            {
              data._count.ads === 0 ?
              'Nenhum anúncio' :
              data._count.ads > 1 ? `${data._count.ads} anúncios` : `${data._count.ads} anúncio`
            }
          </Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}