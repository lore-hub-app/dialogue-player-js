import { DialogueNode } from "..";
import { EventTypes } from "./EventTypes";

export interface IEvent {
  eventName: EventTypes
  callback: (node: DialogueNode | null) => void;
}
