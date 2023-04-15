import { Dialogue } from "../..";
import { IWarningReferenceNotFound } from "./IWarningReferenceNotFound";

export interface IResult {
  dialogue: Dialogue,
  warnings: (IWarningReferenceNotFound)[]
}
