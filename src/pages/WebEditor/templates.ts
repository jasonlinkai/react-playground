import { ElementType } from "./types";
import { EventNames } from "../../utils/event";

export const template1 = {
  uuid: "5c5094a8-96a0-4467-aea4-5dec09b80582",
  parent: undefined,
  type: ElementType.div,
  props: {
    className: "container",
    style: {
      width: "100%",
      height: "100%",
      backgroundColor: "yellow",
    },
  },
  events: {
    onClick: {
      type: EventNames.NAVIGATE,
      payload: { path: "/about!" },
    },
  },
  children: [
    {
      uuid: "561773be-c7c9-4458-9cfb-c3db5972e5e9",
      parent: "5c5094a8-96a0-4467-aea4-5dec09b80582",
      type: ElementType.div,
      props: {
        className: "",
        style: {
          width: "300px",
          height: "300px",
          backgroundColor: "blue",
        },
      },
      events: {},
      children: [],
    },
    {
      uuid: "a6ccca86-655b-4907-98f9-9aeee1b51f9f",
      parent: "5c5094a8-96a0-4467-aea4-5dec09b80582",
      type: ElementType.button,
      props: {
        style: {
          color: "blue",
          width: "100px",
        },
      },
      events: {
        onClick: {
          type: EventNames.NAVIGATE,
          payload: { path: "/test!" },
        },
      },
      children: [
        {
          uuid: "40dfd631-0a98-4c4e-9693-951278f68689",
          parent: "a6ccca86-655b-4907-98f9-9aeee1b51f9f",
          type: ElementType["pure-text"],
          content: "Click Me",
        },
        {
          uuid: "e04c3fca-1b83-4471-bc66-f2b35d279170",
          parent: "a6ccca86-655b-4907-98f9-9aeee1b51f9f",
          type: ElementType.div,
          props: {
            className: "",
            style: {},
          },
          events: {},
          children: [],
        },
      ],
    },
  ],
};
