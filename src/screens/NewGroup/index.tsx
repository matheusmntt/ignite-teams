import { Platform } from 'react-native'

import { Header } from "@components/Header"
import { Highlight } from "@components/Highlight"
import { Button } from "@components/Button"
import { Input } from "@components/Input"

import { Container, Content, Icon } from "./styles"

export const NewGroup = () => {
  return ( 
    <Container
      enabled={Platform.OS === 'ios'}
      behavior="padding"
    >
      <Header showBackButton />
      
      <Content>
        <Icon />

        <Highlight
          title="Nova Turma"
          subtitle="Crie a turma para adicionar as pessoas"
        />

        <Input
          placeholder='Nome da turma'
        />
        
        <Button title="Criar"/>
      </Content>
    </Container> 
  )
}