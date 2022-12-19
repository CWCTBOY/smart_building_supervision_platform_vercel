import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      gray: string;
      white: string;
    };
    fonts: {
      weight: {
        regular: number;
        bold: number;
      };
      size: {
        small: string;
        medium: string;
        large: string;
      };
    };
  }
}
