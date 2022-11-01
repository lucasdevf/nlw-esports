import { Image, FlatList } from 'react-native';

import logoImg from '../../assets/logo-nlw-esports.png'
import { GameCard, GameProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';

import { styles } from './styles';

import { GAMES } from '../../utils/games';
import { useQuery } from 'react-query';
import { api } from '../../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';
import { useNavigation } from '@react-navigation/native';

export function Home() {

  const navigation = useNavigation()

  const {
    data: games
  } = useQuery<GameProps[]>('@games/home', fetchGames)

  async function fetchGames() {
    const response = await api.get('/games')

    return response.data
  }

  function handleOpenGame(game: GameProps) {

    const { id, title, bannerUrl } = game

    navigation.navigate('game', {
      id, 
      title, 
      bannerUrl
    })
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />

        <Heading 
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList 
          data={games}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <GameCard 
              data={item}
              onPress={() => handleOpenGame(item)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}