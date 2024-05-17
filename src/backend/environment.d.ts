declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      FRONT_URL: string;
      BACK_URL: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      GITHUB_CLIENT_ID: string;
      GITHUB_CLIENT_SECRET: string;
      SESSION_SECRET_KEY: string;
      SESSION_EXPIRATION_TIME: string;
      JWT_SECRET_KEY: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
