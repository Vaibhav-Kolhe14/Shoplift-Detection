import React from 'react'
import LiveFeed from './LiveFeed'
import Alerts from './Alerts'
import Dashboard from './Dashboard'
import UploadFile from './UploadFile'

function MainPage() {
  return (
    <div style={{ backgroundColor: 'white' }}>
      <LiveFeed />
      <UploadFile/>
      <Alerts />
      <Dashboard />
    </div>
  )
}

export default MainPage
