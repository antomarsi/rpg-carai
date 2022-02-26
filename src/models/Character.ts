import { Attributes } from './Attributes';
class Character implements Attributes{
  id: string;
  name: string;

  strength: number;
  dexterity: number;
  agility: number;
  intelligence: number;
  astuteness: number;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}


export default Character;
