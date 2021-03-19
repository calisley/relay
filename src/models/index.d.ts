import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Glowsick {
  readonly id: string;
  readonly dedication: string;
  readonly note?: string;
  readonly image?: Image;
  constructor(init: ModelInit<Glowsick>);
  static copyOf(source: Glowsick, mutator: (draft: MutableModel<Glowsick>) => MutableModel<Glowsick> | void): Glowsick;
}

export declare class Image {
  readonly id: string;
  readonly image: string;
  readonly comments?: (Glowsick | null)[];
  constructor(init: ModelInit<Image>);
  static copyOf(source: Image, mutator: (draft: MutableModel<Image>) => MutableModel<Image> | void): Image;
}