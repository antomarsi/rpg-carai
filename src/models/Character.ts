import { Attributes } from "./Attributes";
class Character implements Attributes {
  id: string;
  name: string;
  photoURL?: string;

  strength: number;
  dexterity: number;
  agility: number;
  intelligence: number;
  astuteness: number;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.strength = 0;
    this.dexterity = 0;
    this.agility = 0;
    this.intelligence = 0;
    this.astuteness = 0;
  }
}

export default Character;
