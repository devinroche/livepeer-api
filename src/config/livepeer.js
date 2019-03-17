import LivepeerSDK from '@livepeer/sdk';
import { Lokka } from 'lokka';
import fetch from 'node-fetch';
import {Transport} from 'lokka-transport-http';
import Promise from "promise";

const client = new Lokka({
  transport: new Transport('https://api.thegraph.com/subgraphs/name/adamsoffer/livepeer-canary')
});

const query = `
  query User($address: String!) {
    delegator(first: 1, id: $address) {
      shares {
        rewardTokens
        round {
          timestamp
        }
      }
    }
  }
`

export const fetchData = async (address) => {
  const sdk = await LivepeerSDK();
  const { rpc } = sdk;

  const user_req = rpc.getDelegator(address.toLowerCase());
  const qraph_req = client.query(query, {
    address: address.toLowerCase()
  })
  const price_req = fetch("https://api.cryptonator.com/api/ticker/lpt-usd");

  const results = await Promise.all([user_req, qraph_req, price_req])

  const user = results[0]
  const { delegator } = results[1]
  const { ticker: {price}} = await results[2].json()

  return { ...user, ...delegator, price: price }
}