import React from 'react'

import Layout from 'components/layout'
import { Content, Intro, Button } from './style'

const HomePage: React.FC<{}> = ({}) => {
  return (
    <Layout>
      <Intro>
        <Content>
          <h1>
            Our experts work with
            <br /> you for best results.
          </h1>
          <p>to design a tailored transformation deliver next-level business</p>
          <Button to="/courses" size="large">
            Explore our courses
          </Button>
        </Content>
      </Intro>
    </Layout>
  )
}

export default HomePage
