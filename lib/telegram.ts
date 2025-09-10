export type TelegramUser = {
  id: string;
  first_name: string;
  last_name?: string;
  username?: string;
};

export function getTelegramUser(): TelegramUser | null {
  if (typeof window === "undefined") return null;
  const tg = (window as any).Telegram?.WebApp;
  return tg?.initDataUnsafe?.user || null;
}
