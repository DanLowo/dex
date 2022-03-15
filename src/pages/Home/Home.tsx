import React from 'react';
import { PageAndSidebarWrapper } from "../../components";

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
        <h4>Sure</h4>
      </PageAndSidebarWrapper>
    </div>
  );
};

export default Home;
