import { Event, EventNames } from "../event";

export enum ElementType {
  "pure-text" = "pure-text",
  div = "div",
  button = "button",
}

export interface AstElementSharedProps {
  uuid: string;
  parent: string | undefined;
}

export interface AstElement extends AstElementSharedProps {
  type: "div" | "button";
  props: Record<string, any>; // FIXME: type is not correct.
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
