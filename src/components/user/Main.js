import React, { Fragment } from 'react'
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

const Main = () => {

  return (
    <Fragment>
      <Header />
      <div style={{minHeight:"500px"}}>
        <Content />
      </div>
      <Footer />
    </Fragment>
  )
}

export default Main;
