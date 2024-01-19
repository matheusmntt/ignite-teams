import { useState } from 'react'
import { Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Header } from "@components/Header"
import { Highlight } from "@components/Highlight"
import { Button } from "@components/Button"
import { Input } from "@components/Input"

import { Container, Content, Icon } from "./styles"

export const NewGroup = () => {
  const [group, setGroup] = useState('')

  const navigation = useNavigation()

  const handleNew = () => {
    navigation.navigate('players', { group })
  }

  return ( 
    <Container>
      <Header showBackButton />
      
      <Content
        enabled={Platform.OS === 'ios'}
        behavior="padding"
      >
        <Icon />

        <Highlight
          title="Nova Turma"
          subtitle="Crie a turma para adicionar as pessoas"
        />

        <Input
          placeholder='Nome da turma'
          onChangeText={setGroup}
          value={group}
        />
        
        <Button
          title="Criar"
          onPress={handleNew}
          style={{ marginTop: 12 }}
        />
      </Content>
    </Container> 
  )
}