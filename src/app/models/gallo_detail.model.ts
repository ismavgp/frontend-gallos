import { Gallo } from "./gallo.model";

export interface GalloDetail extends Gallo {
  peleas?: string[];
  padre?: Gallo;
  madre?: Gallo;
}