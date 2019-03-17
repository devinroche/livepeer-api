import LivepeerSDK from '@livepeer/sdk';
const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

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
  const user = await rpc.getDelegator(address.toLowerCase());

  const vars = {
    address: user.address
  }

  const { delegator } = await client.query(query, vars)

  return { ...user, ...delegator }
}