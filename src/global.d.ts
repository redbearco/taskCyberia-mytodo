declare module "*.css";

declare module "next" {
  interface ExperimentalConfig {
    turbopack?: {
      root?: string;
    };
  }
}