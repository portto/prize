
const script = `
import BloctoPrize from 0xc52330593c1d935f

pub fun main(id: Int): BloctoPrize.Campaign {
  return BloctoPrize.getCampaign(id: id)
}`

export default script