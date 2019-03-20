import dayjs from 'dayjs';

export const combinePriceSharesArr = (sharesHistory, priceHistory) => {
  let results = []

  sharesHistory.map(el1 => {
    priceHistory.filter(el2 => {
      if (sameDay(el2.time, el1.round.timestamp)) {
        results.push({
          rewardTokens: el1.rewardTokens,
          timestamp: dayjs.unix(el1.round.timestamp),
          convertedReward: el1.rewardTokens * 0.000000000000000001,
          rewardUSD: el2.close * (el1.rewardTokens * 0.000000000000000001),
          close: el2.close
        })
      }
    });
  })

  return results.filter(el => el.close !== 0)
}

const sameDay = (d1Unix, d2Unix) => {
  let d1 = dayjs.unix(d1Unix)
  let d2 = dayjs.unix(d2Unix)

  return (d1.year() === d2.year()) &&
    (d1.month() === d2.month()) &&
    (d1.date() == d2.date());
}