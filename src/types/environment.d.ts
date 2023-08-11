export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_MAPON_API: string;
      REACT_APP_GOOGLE_API: string;
    }
  }
}
