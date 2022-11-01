import { SafeAreaView } from 'react-native-safe-area-context';

import { TouchableOpacity, View, Image, FlatList, Text } from 'react-native'

import { Entypo } from '@expo/vector-icons'

import { useRoute, useNavigation } from '@react-navigation/native'

import { Background } from '../../components/Background';
import { DuoMatch } from '../../components/DuoMatch';

import { styles } from './styles';
import { THEME } from '../../theme';

import logoImg from '../../assets/logo-nlw-esports.png'

import { GameParams } from '../../@types/navigation';
import { Heading } from '../../components/Heading';
import { AdCard, AdProps } from '../../components/AdCard';

import { useQuery } from 'react-query';
import { api } from '../../services/api';
import { useState } from 'react';

export function Game() {

  const navigation = useNavigation()

  const route = useRoute()
  const game = route.params as GameParams

  const { data: ads } = useQuery<AdProps[]>('@ads/game', fetchAds)

  const [discordDuoSelected, setDiscordDuoSelected] = useState('')

  async function fetchAds() {
    const response = await api.get(`/games/${game.id}/ads`)

    return response.data
  }

  async function getDiscordAd(adId: string) {
    const response = await api.get(`/ads/${adId}/discord`)

    setDiscordDuoSelected(response.data.discord)
  }

  function handleGoBack(){
    navigation.goBack()
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo 
              name="chevron-thin-left" 
              color={THEME.COLORS.CAPTION_300} 
              size={20}
            />
          </TouchableOpacity>

          <Image 
            source={logoImg}
            style={styles.logo}
          />

          <View style={styles.right} />
        </View>

        <View style={styles.containerCover}>
          <Image  
            source={{ uri: game.bannerUrl }}
            style={styles.cover}
            resizeMode="cover"
          />
        </View>

        <Heading 
          title={game.title}
          subtitle="Conecte-se e comece a jogar"
        />
        
        <FlatList 
          data={ads}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <AdCard 
              data={item} 
              onConnect={() => getDiscordAd(item.id)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[Number(ads?.length) > 0 ? styles.contentList : styles.emptyListContent]}
          style={styles.containerList}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          )}
        />

        <DuoMatch 
          visible={!!discordDuoSelected}
          discord={discordDuoSelected}
          onClose={() => setDiscordDuoSelected('')}
        />
      </SafeAreaView>
    </Background>
  );
}