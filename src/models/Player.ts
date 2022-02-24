import Character from "./Character"

class Player {
    id: string
    name: string
    characters: Character[] = []

    constructor(id: string, name: string) {
        this.id = id
        this.name = name
    }
}

export default Player