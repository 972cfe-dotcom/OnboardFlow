import { useState, useEffect } from 'react'
import { onAuthChanged } from './services/auth'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthChanged((user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Base44 App</h1>
        
        {user ? (
          <div>
            <p className="text-lg mb-4">Welcome, {user.displayName || user.email}!</p>
            <p className="text-sm text-muted-foreground">
              You are logged in. This app is ready for Firebase integration.
            </p>
          </div>
        ) : (
          <div>
            <p className="text-lg mb-4">Welcome to Base44 App</p>
            <p className="text-sm text-muted-foreground">
              Please configure Firebase authentication to get started.
            </p>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Next Steps:</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Configure Firebase project settings in .env file</li>
            <li>Set up Firebase Authentication</li>
            <li>Configure Firestore Database</li>
            <li>Build your application features</li>
            <li>Deploy to Firebase Hosting</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
