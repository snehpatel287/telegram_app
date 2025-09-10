'use client'
import { useEffect, useState } from 'react'

interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
}

interface TelegramWebApp {
  ready: () => void
  initDataUnsafe: {
    user?: TelegramUser
  }
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp
    }
  }
}

interface UserData {
  id: number
  name: string
  username: string | null
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    const initTelegram = async () => {
      if (!window.Telegram?.WebApp) {
        console.warn("Telegram WebApp is not available. Are you testing outside Telegram?")
        return
      }

      const tg = window.Telegram.WebApp
      tg.ready()

      const user = tg.initDataUnsafe?.user
      if (user) {
        setUserData({
          id: user.id,
          name: `${user.first_name} ${user.last_name || ''}`.trim(),
          username: user.username || null,
        })
      }
    }

    initTelegram()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Your Telegram info is :</h1>
      <div className="space-y-2">
        <p>ID: {userData?.id ?? 'N/A'}</p>
        <p>Name: {userData?.name ?? 'N/A'}</p>
        <p>Username: {userData?.username ? `@${userData.username}` : 'N/A'}</p>
      </div>
    </div>
  )
}
