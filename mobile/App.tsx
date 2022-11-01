import { useRef, useEffect } from 'react'
import { StatusBar } from 'react-native'

import * as Notifications from 'expo-notifications'

import { 
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter'

import { Subscription } from 'expo-modules-core'

import { Background } from './src/components/Background';
import { Loading } from './src/components/Loading';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './src/services/queryClient';
import { Routes } from './src/routes';

import './src/utils/notifications/notification-configs'
import { getPushNotificationToken } from './src/utils/notifications/get-push-notification-token';

export default function App() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  })

  const getNotificationListener = useRef<Subscription>()
  const responseNotificationListener = useRef<Subscription>()

  useEffect(() => {
    getPushNotificationToken()
  })

  useEffect(() => {
    getNotificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification)
    })

    responseNotificationListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response)
    })

    return () => {
      if(getNotificationListener.current && responseNotificationListener.current) {
        Notifications.removeNotificationSubscription(getNotificationListener.current)
        Notifications.removeNotificationSubscription(responseNotificationListener.current)
      }
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Background>
        <StatusBar 
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={true}
        />

        {
          fontsLoaded ? <Routes /> : <Loading />
        }

      </Background>
    </QueryClientProvider>
  );
}