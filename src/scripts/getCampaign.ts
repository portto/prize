import getAddress from "./getAddress"

const script = `
import BloctoPrize from ${getAddress('BloctoPrize')}

pub fun main(id: Int): BloctoPrize.Campaign {
  return BloctoPrize.getCampaign(id: id)
}`

export default script