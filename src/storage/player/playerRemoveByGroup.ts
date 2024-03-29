import AsyncStorage from "@react-native-async-storage/async-storage"

import { PLAYER_COLLECTION } from "@storage/config"
import { playersGetByGroup } from './playersGetByGroup'

export const playerRemoveByGroup = async (playerName: string, group: string) => {
  try {
    const stored = await playersGetByGroup(group) 

    const filtered = stored.filter(player => player.name !== playerName)
    const players = JSON.stringify(filtered)

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, players)
  } catch (error) {
    throw error
  }
}