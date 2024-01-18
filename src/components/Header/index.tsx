import { Container, Logo, BackButton, BackIcon } from './styles'

import LogoImage from '@assets/logo.png'

type HeaderProps = {
  showBackButton?: boolean 
}

export const Header = ({ showBackButton = false }: HeaderProps) => {
  return (
    <Container>
      {showBackButton && 
        <BackButton>
          <BackIcon />
        </BackButton>
      }
     
      <Logo source={LogoImage} />
    </Container>
  )
}
