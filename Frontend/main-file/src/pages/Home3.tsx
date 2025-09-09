import React from "react";
import InnerLayout from "../component/layout/InnerLayout";
import EVBatteryHero from "../component/ev-battery/EVBatteryHero";
import BlockchainStats from "../component/ev-battery/BlockchainStats";

const Home3 = () => {
  return (
    <main>
      <InnerLayout>
        <div className="landing-page-container">
          <EVBatteryHero />
          <BlockchainStats />
        </div>
      </InnerLayout>
    </main>
  );
};

export default Home3;
