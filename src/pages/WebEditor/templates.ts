import { ElementType } from "./types";
import { EventNames } from "../../utils/event";

export const template1 = {
  uuid: "1",
  parent: undefined,
  type: ElementType.div,
  props: {
    key: "key_1",
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
      uuid: "adsf",
      parent: "1",
      type: ElementType.div,
      props: {
        key: "key_adsf",
        className: "",
        style: {
          width: "300px",
          height: "300px",
          backgroundColor: "blue",
        },
      },
      events: {
      },
      children: [],
    },
    {
      uuid: "2",
      parent: "1",
      type: ElementType.button,
      props: {
        key: "key_2",
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
          uuid: "3",
          parent: "2",
          type: ElementType["pure-text"],
          content: "Click Me",
        },
        {
          uuid: "4",
          parent: "2",
          type: ElementType.div,
          props: {
            key: "key_4",
            className: "",
            style: {},
          },
          events: {},
          children: [
            {
              uuid: "5",
              parent: "4",
              type: ElementType.div,
              props: {
                key: "key_5",
                className: "",
                style: {},
              },
              events: {},
              children: [],
            },
          ],
        },
      ],
    },
  ],
};
