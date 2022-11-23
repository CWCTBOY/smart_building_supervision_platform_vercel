import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      black: "#000000";
      white: "#ffffff";
    };
    fonts: {};
    ui: {};
  }
}
