import React, { createContext } from 'react'
import { v4 } from 'uuid'
import Character from '../models/Character'
import Player from '../models/Player'


interface PlayerContextProps {
    player?: Player
    character?: Character
    setSelectedCharacter: (id: string) => void
}

const testPlayer = new Player(v4(), "Gedervaldo")
const testCharacter1 = new Character(v4(), "O Bugre", 10, 5)
const testCharacter2 = new Character(v4(), "O Mago", 5, 10)

testPlayer.characters = [
    testCharacter1,
    testCharacter2
]

export const PlayerContext = createContext<PlayerContextProps>({} as PlayerContextProps)

export const PlayerProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {

    const [player, setPlayer] = React.useState<Player>(testPlayer)
    const [character, setCharacter] = React.useState<Character>()

    const setSelectedCharacter = (id: string) => {
        const selected = player.characters.find(v => v.id === id)
        if (!selected) {
            throw new Error("Character not found")
        }
        setCharacter(selected)
    }


    return <PlayerContext.Provider value={{
        player,
        character,
        setSelectedCharacter
    }}>
        {children}
    </PlayerContext.Provider>
}

