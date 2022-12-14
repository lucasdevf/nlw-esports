import { Image, TouchableOpacity, Text } from 'react-native';

import * as AuthSession from 'expo-auth-session'

import logoImg from '../../assets/logo-nlw-esports.png'
import { Heading } from '../../components/Heading';

import { styles } from './styles';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';
import { useNavigation } from '@react-navigation/native';
import { DiscordLogo } from 'phosphor-react-native';

export function SignIn() {

  const navigation = useNavigation()

  async function handleDiscordSignIn() {  

    const response = await AuthSession.startAsync({
      authUrl: 'https://discord.com/api/oauth2/authorize?client_id=1028679320086007869&redirect_uri=https%3A%2F%2Fauth.expo.io%2F%40blackfev%2Fmobile&response_type=token&scope=identify'
    })

    fetch('https://discord.com/api/users/@me', {
      headers: {
        'authorization': `Bearer ${response.params.access_token}`
      }
    }).then(response => response.json())
    .then(data => console.log(data))

    console.log(response)

  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />

        <Heading 
          title="Entrar"
          subtitle="Encontre o seu duo e bora jogar!"
        />

        <TouchableOpacity 
          style={styles.signInButton}
          onPress={handleDiscordSignIn}
        >
          <DiscordLogo size={20} color="white" weight="fill" />
          <Text style={styles.signInButtonText}>Entrar com Discord</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Background>
  );
}