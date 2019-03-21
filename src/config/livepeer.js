import LivepeerSDK from '@livepeer/sdk';
import Promise from "promise";
import fetch from 'node-fetch';
import { Lokka } from 'lokka';
import { Transport } from 'lokka-transport-http';
import { combinePriceSharesArr } from './utils';
require('dotenv').config();

const client = new Lokka({
  transport: new Transport('https://api.thegraph.com/subgraphs/name/adamsoffer/livepeer-canary')
});

const query = `
  query User($address: String, $index: Int) {
    delegator(id: $address) {
      shares(skip: $index){
        rewardTokens
        round {
          timestamp
        }
      }
    }
  }
`

const graphQLFetch = async (address) => {
  let sharesArr = [];
  let idx = 0
  let run = true;

  while(run) {
    const { delegator } = await client.query(query, {
      address: address.toLowerCase(),
      index: idx
    })

    if(delegator.shares.length === 0){
      run = false;
    }
    sharesArr = [...sharesArr, ...delegator.shares]
    idx += 100;
  }

  return sharesArr
}

export const fetchData = async (address) => {
  const sdk = await LivepeerSDK();
  const { rpc } = sdk;

  const user_req = rpc.getDelegator(address.toLowerCase());
  const results = await Promise.all([user_req, graphQLFetch(address)])

  const user = results[0]
  const sharesData = results[1]

  const histo_req = await fetch(`https://min-api.cryptocompare.com/data/histoday?fsym=LPT&tsym=USD&limit=${sharesData.length + 20}&api_key=${process.env.CRYPTO_COMPARE_KEY}`)
  const { Data } = await histo_req.json()

  let sharesPrice = await combinePriceSharesArr(sharesData, Data)

  const totalRewardsLPT = sharesPrice.reduce((prev, curr) => {
    return prev + curr.convertedReward;
  }, 0);

   // percent change LPT
  let percentChange = (totalRewardsLPT / (user.bondedAmount * 0.000000000000000001)) * 100
  const totalLPT =  (user.bondedAmount * 0.000000000000000001) + totalRewardsLPT;
  const totalUSD = totalLPT * Data[Data.length-1].close;

  return {
    ...user,
    percentChangeLPT: percentChange,
    stakedLPT: user.bondedAmount * 0.000000000000000001,
    price: Data[Data.length-1].close,
    totalRewardsLPT,
    totalRewardsUSD: totalRewardsLPT * Data[Data.length - 1].close,
    totalLPT,
    totalUSD,
    shares: sharesPrice
  }
};