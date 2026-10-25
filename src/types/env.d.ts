declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_SECRET: string;
      DISCORD_CLIENT_ID: string;
      DISCORD_CLIENT_SECRET: string;
      DISCORD_GUILD_ID: string;
      DISCORD_TOKEN: string;
      E621_BASE_URL: string;
      E926_BASE_URL: string;
      GIT_REPO_BASE_URL: string;
      LINK_SECRET: string;
      PORT: number;
      PRIVACY_POLICY_URL: string;
      REDIS_URL: string;
      RELEASE_SECRET: string;
    }
  }
}

export { };
