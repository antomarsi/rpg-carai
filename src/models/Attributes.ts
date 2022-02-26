

export interface Attributes {
  dexterity: number
  strength: number
  agility: number
  intelligence: number
  astuteness: number
}


export enum AttributesEnum {
  DEXTERITY = "dexterity",
  STRENGTH = "strength",
  AGILITY = "agility",
  INTELLIGENCE = "intelligence",
  ASTUTENESS = "astuteness",
}


export interface FinalAttributes {
}

export enum FinalAttributesEnum {
  PRECISION = "precision",
  REACH = "reach",
  DODGE = "dodge",
  MOVEMENT = "movement",
  DODGE_CHANCE = "dodgeChance",
  PHYSICAL_DEFENSE  = "physicalDefense",
  MAGICAL_DEFENSE  = "magicalDefense",
  PHYSICAL_RESISTANCE = "physicalResistance",
  MAGICAL_RESISTANCE = "magicalResistance",
  MAX_HEALTH = "max_health",
  MAX_MAGIC = "max_magic",
  CRITICAL = "critical",
  CRITICAL_CHANCE = "criticalChance",
  INICIATIVE = "iniciative"
}