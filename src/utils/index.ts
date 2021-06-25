import Web3 from "web3";
import { AbiItem } from "web3-utils";
import daiABI from "../abi/dai.json";
import erc20 from "../abi/usdc.json";

const web3 = new Web3(Web3.givenProvider);
const daiContractAddress = "0x6b175474e89094c44da98b954eedeac495271d0f";
const daiContract = new web3.eth.Contract(
  daiABI as AbiItem[],
  daiContractAddress
);

const usdcContractAddress = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
const usdcContract = new web3.eth.Contract(
  erc20 as AbiItem[],
  usdcContractAddress
);

const getDaiBalance = async (address: string) => {
  try {
    return await daiContract.methods
      .balanceOf(address)
      .call()
      .then((value: any) => {
        return {
          status: true,
          data: web3.utils.fromWei(value, "ether"),
        };
      });
  } catch (err) {
    return {
      status: false,
      data: err,
    };
  }
};

const getUSDCBalance = async (address: string) => {
  try {
    let balance = await usdcContract.methods.balanceOf(address).call();
    balance = web3.utils.hexToNumber(balance) / Math.pow(10, 6);
    return balance;
  } catch (err) {
    console.log(err);
  }
};

export { getDaiBalance, getUSDCBalance };
