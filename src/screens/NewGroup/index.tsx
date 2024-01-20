import { useState } from 'react'
import { Alert, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AppError } from '@utils/AppError'

import { Header } from "@components/Header"
import { Highlight } from "@components/Highlight"
import { Button } from "@components/Button"
import { Input } from "@components/Input"

import { Container, Content, Icon } from "./styles"
import { groupCreate } from '@storage/group/groupCreate'

export const NewGroup = () => {
  const [group, setGroup] = useState('')

  const navigation = useNavigation()

  const handleNew = async () => {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('Novo grupo', 'Informe o nome da turma.')
      }

      await groupCreate(group)
      navigation.navigate('players', { group })

    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert('Novo grupo', error.message)
      }
      Alert.alert('Novo grupo', 'Não foi possível criar um novo grupo.')
    }
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