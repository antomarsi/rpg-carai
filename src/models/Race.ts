import { Skill } from "./Skill"

export interface Race {
  healthMod: number
  magicMod: number
  skills: Record<string, Skill>
}