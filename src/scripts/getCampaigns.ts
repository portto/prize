
const script = `
import BloctoPrize from 0x4669f975288067df

pub fun main(): [BloctoPrize.Campaign] {
  return BloctoPrize.getCampaigns()
}`

export default script