
const script = `
import BloctoPrize from 0xb096b7a81df21336

pub fun main(): [BloctoPrize.Campaign] {
  return BloctoPrize.getCampaigns()
}`

export default script