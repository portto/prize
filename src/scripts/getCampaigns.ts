import getAddress from "./getAddress"

const script = `
import BloctoPrize from ${getAddress('BloctoPrize')}

pub fun main(): [BloctoPrize.Campaign] {
  return BloctoPrize.getCampaigns()
}`

export default script