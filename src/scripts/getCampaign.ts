
const script = `
import BloctoPrize from 0x4669f975288067df

pub fun main(id: Int): BloctoPrize.Campaign {
  return BloctoPrize.getCampaign(id: id)
}`

export default script