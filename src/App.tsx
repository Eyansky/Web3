import React, { useState } from "react";
import Balance from "./components/Balance";
import Search from "./components/Search";

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [balance, setBalance] = useState<any>();

  return (
    <div className="w-3/5 mx-auto">
      <Search
        loading={loading}
        setLoading={setLoading}
        setBalance={setBalance}
      />
      <Balance balance={balance} copiedBal={balance} />
    </div>
  );
};

export default App;
