import { BaseAttributePort, BaseAttributeType } from "./BaseAttribute";
import { NumberPort, NumberType } from "./Number";
import { PortConfig } from 'flume';



export type PortType = BaseAttributeType | NumberType

export const ports : PortConfig<PortType>[] = [
  BaseAttributePort,
  NumberPort
]
