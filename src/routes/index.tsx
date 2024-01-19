import { NavigationContainer } from '@react-navigation/native'
import { useTheme } from 'styled-components/native'
import { AppRoutes } from './app.routes'
import { View } from 'react-native'

export const Routes = () => {
  const { COLORS } = useTheme()
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.GRAY_700 }}>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </View>
  )
}