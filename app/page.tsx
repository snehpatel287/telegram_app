'use client'
import { useEffect, useState } from 'react'

declare global {
  interface Window {
    Telegram?: {
      WebApp?: any
    }
  }
}

export default function Home() {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const initTelegram = async () => {
      if (!window.Telegram?.WebApp) {
        const script = document.createElement('script')
        script.src = 'https://telegram.org/js/telegram-web-app.js'
        document.head.appendChild(script)
        
        await new Promise(resolve => {
          script.onload = () => {
            const check = () => window.Telegram?.WebApp ? resolve() : setTimeout(check, 100)
            check()
          }
        })
      }

      const tg = window.Telegram.WebApp
      tg.ready()
      
      const user = tg.initDataUnsafe?.user
      if (user) {
        setUserData({
          id: user.id,
          name: `${user.first_name} ${user.last_name || ''}`.trim(),
          username: user.username || null
        })
      }
    }
    initTelegram()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">User Info</h1>
      <div className="space-y-2">
        <p>ID: {userData?.id || 'N/A'}</p>
        <p>Name: {userData?.name || 'N/A'}</p>
        <p>Username: {userData?.username ? `@${userData.username}` : 'N/A'}</p>
      </div>
    </div>
  )
}