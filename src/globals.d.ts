import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
    };
  }
}

declare module "*.woff";
declare module "*.woff2";
