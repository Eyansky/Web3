import React, { useState } from "react";
import axios from "axios";
import currencies from "../utils/currencies";

interface Props {
  balance: number;
  copiedBal: number;
}

const Balance: React.FC<Props> = (props: Props) => {
  const { balance, copiedBal } = props;

  const [copiedBalance, setCopiedBalance] = useState(copiedBal);

  const [currency, setCurrency] = useState<any>({
    currencyName: "US Dollar",
    currencyCode: "USD",
    flag: {
      path: "./flags/US.png",
      url: "https://www.countryflags.io/US/flat/64.png",
    },
    name: "United States",
  });

  const nf = new Intl.NumberFormat();

  const currencyConvertion = async (toCurrency: string) => {
    try {
      const fromCurrency = "USD";
      const { data } = await axios(
        `https://v6.exchangerate-api.com/v6/0fc92310d74a8f8058dfbb7a/pair/${fromCurrency}/${toCurrency}/${balance}`
      );

      setCopiedBalance(data.conversion_result);
      // filter currency
      const filtered = currencies.filter(
        (currency) => currency.currencyCode === toCurrency
      );
      setCurrency(filtered[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const currencyData = currencies.map(({ currencyName, currencyCode }) => {
    return (
      <option key={currencyCode} value={currencyCode}>
        {currencyName}
      </option>
    );
  });
  return (
    <>
      {balance && (
        <div className="flex justify-center mt-20 bg-gray-100 rounded-lg p-10">
          <div className="flex items-center">
            <div className="p-2">Current Balance:</div>
            <img className="p-2 h-12 w-12" src={currency.flag.url} alt="flag" />
            <div className="p-2 text-2xl">
              {currency.currencyCode}{" "}
              {copiedBalance ? nf.format(copiedBalance) : nf.format(balance)}
            </div>
            <div>
              <select
                className="border-2 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-700 focus:bg-white text-gray-700 pr-16 font-mono"
                onChange={(e) => currencyConvertion(e.target.value)}
              >
                <option value="USD">US Dollar</option>
                {currencyData}
              </select>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Balance;
