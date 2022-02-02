import React from 'react'
import styled from 'styled-components'

const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: red;
`

const Home = () => {
  return (
    <div>
      Home
      <Box />
    </div>
  )
}

export default Home
