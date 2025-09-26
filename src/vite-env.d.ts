/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TELEGRAM_ENDPOINT: string;
  readonly VITE_CONTACT_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
