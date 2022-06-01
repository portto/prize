
const script = `
import BloctoPrize from 0xc52330593c1d935f

pub fun main(): [BloctoPrize.Campaign] {
  return BloctoPrize.getCampaigns()
}`

export default script