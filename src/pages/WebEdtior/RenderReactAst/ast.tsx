import { Event, EventNames } from "../event";

export interface AstElementSharedProps {
  uuid: string;
  parentUuid: string;
}

export interface AstElement extends AstElementSharedProps {
  type: keyof React.ReactHTML;
  props: any; // FIXME: type is not correct.
  events: {
    onClick?: Event<EventNames>;
  };
  children: AstNode[];
}

export interface AstTextElement extends AstElementSharedProps {
  innerType: string;
  content: string;
}
export type AstNode = AstElement | AstTextElement;