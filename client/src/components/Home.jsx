import React from 'react'
import LiveFeed from './LiveFeed'
import Alerts from './Alerts'
import Dashboard from './Dashboard'
import Hero from './Hero'

function Home() {
  return (
    <div>
       <Hero /> {/* Make sure Hero is included here */}
      <LiveFeed />
      <Alerts />
      <Dashboard />
    </div>
  )
}

export default Home
