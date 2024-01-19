import { TouchableOpacityProps } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons' 

import { Container, Icon, ButtonIconStyleProps } from "./styles"

type ButtonIconProps = TouchableOpacityProps & {
  icon: keyof typeof MaterialIcons.glyphMap
  type?: ButtonIconStyleProps
}

export const ButtonIcon = ({ icon, type = 'PRIMARY' }: ButtonIconProps) => {
  return (
    <Container>
      <Icon name={icon} type={type} />
    </Container>
  )
}