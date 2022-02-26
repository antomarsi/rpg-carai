import React, { createContext } from 'react'
import Character from '../models/Character'
import Player from '../models/Player'


interface PlayerContextProps {
    player?: Player
    character?: Character
    setSelectedCharacter: (id: string) => void
}

const testPlayer = new Player("1234", "Gedervaldo")
const testCharacter1 = new Character("1234-1234", "O Bugre")
const testCharacter2 = new Character("1234-4321", "O Mago")

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

