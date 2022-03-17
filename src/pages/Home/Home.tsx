import React from 'react';
import { PageAndSidebarWrapper, Swap } from "../../components";

const Home = () => {

  const HomeComponent = () => (
    <div>
      {/*<h2>Hello</h2>*/}
    </div>
  )

  return (
    <div>
      <PageAndSidebarWrapper>
        <HomeComponent />
        <Swap />
      </PageAndSidebarWrapper>
    </div>
  );
};

export default Home;
