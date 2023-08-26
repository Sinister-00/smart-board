'use client'

import StyledBoard from '@server/lib/ludo'

const Page = () => {
  console.log('log')

  return (
    <div style={{background: 'white', height: '100vh'}}>
      <StyledBoard />
    </div>
  )
}

export default Page
