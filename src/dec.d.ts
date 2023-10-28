declare module "get-contrast" {
  interface Options {
    ignoreAlpha?: boolean;
  }
  function ratio(colorOne: string, colorTwo: string, options?: Options): number;
  function score(colorOne: string, colorTwo: string, options?: Options): string;
  function isAccessible(colorOne: string, colorTwo: string, options?: Options): boolean;
  function isNotTransparent(colorOne: string, colorTwo: string, options?: Options): boolean;
}
