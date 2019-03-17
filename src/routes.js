import { client, save } from './config/cache';
import { fetchData } from './config/livepeer'
import logger from './config/winston';

export default (router) => {
    router.get('/:address', async (req, res) => {
      const address = req.params.address.toLowerCase()
      client.get(address, async (err,value) => {
        if (err) {
          logger.error("ERR")
          res.send(err)
          throw err
        } else if(value === null) {
          logger.info("ADDING USER TO CACHE")
          const data = await fetchData(address)
          save(address, JSON.stringify(data));
          res.send(data)
        } else {
          logger.info("USER FETCHED FROM CACHE")
          res.send(JSON.parse(value));
        }
      });
    })
}