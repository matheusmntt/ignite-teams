import { useEffect, useRef, useState } from "react"
import { Alert, FlatList, Keyboard, TextInput } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"

import { playerAddByGroup } from "@storage/player/playerAddByGroup" 
import { PlayerStorageDTO } from "@storage/player/playerStorageDTO"
import { groupRemoveByName } from "@storage/group/groupRemoveByName"
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup"
import { playersGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam"

import { AppError } from "@utils/AppError"

import { Input } from "@components/Input"
import { Filter } from "@components/Filter"
import { Header } from "@components/Header"
import { Button } from "@components/Button"
import { Highlight } from "@components/Highlight"
import { ListEmpty } from "@components/ListEmpty"
import { ButtonIcon } from "@components/ButtonIcon"
import { PlayerCard } from "@components/PlayerCard"

import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles"
import { Loading } from "@components/Loading"

type RouteParams = {
  group: string
}

export const Players = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
  const [newPlayerName, setNewPlayerName] = useState('')

  const newPlayerNameInputRef = useRef<TextInput>(null)

  const { alert } = Alert

  const { navigate } = useNavigation()

  const route = useRoute()
  const { group } = route.params as RouteParams

  const handleAddPlayer = async () => {
    if (newPlayerName.trim().length === 0) {
      return alert('Nova pessoa', 'Informe o nome da pessoa para adicionar.')
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {
      await playerAddByGroup(newPlayer, group)

      newPlayerNameInputRef.current?.blur()
      Keyboard.dismiss()

      setNewPlayerName('')
      fetchPlayersByTeam()

    } catch (error) {
       if(error instanceof AppError){
        alert('Nova pessoa', error.message)
      } else { 
        alert('Nova pessoa', 'Não foi possível adicionar.')
      }
    }
  }

  const fetchPlayersByTeam = async () => {
    try {
      setIsLoading(true)
      const playersByTeam = await playersGetByGroupAndTeam(group, team)
      setPlayers(playersByTeam)
      
    } catch (error) {
      alert('Pessoas', 'Não foi possível carregar as pessoas do time selecionado')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePlayerRemove = async (playerName: string) => {
    try {
      await playerRemoveByGroup(playerName, group)
      fetchPlayersByTeam()
    } catch (error) {
      alert('Remover pessoa', 'Não foi possível remover essa pessoa.')
    }
  }

  const groupRemove = async () => {
    try {
      await groupRemoveByName(group)
      navigate('groups')
    } catch (error) {
      alert('Remover grupo', 'Não foi possível remover o grupo.')
    }
  }

  const handleGroupRemove = () => {
    alert('Remover', 'Deseja remover o grupo', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => groupRemove() }
    ]) 
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])

  return (
    <Container>
      <Header showBackButton />
      
      <Highlight
        title={group}
        subtitle="Adicione a galera e separe os times"
      />

      <Form>
        <Input
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          inputRef={newPlayerNameInputRef}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />

        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <NumbersOfPlayers>
          {players?.length}
        </NumbersOfPlayers>
      </HeaderList>

      {isLoading && <Loading />}

      {!isLoading && (
        <FlatList
          data={players}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => handlePlayerRemove(item.name)}
            />
          )}
          ListEmptyComponent={() => <ListEmpty message="Não há pessoas nesse time." />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players?.length === 0 && { flex: 1 }
          ]}
        />
      )}

      <Button title="Remover turma" type="SECONDARY" onPress={handleGroupRemove}/>
      
    </Container>
  )
}