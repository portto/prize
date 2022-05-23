
const script = `
import BloctoPrize from 0xb096b7a81df21336

pub fun main(id: Int): BloctoPrize.Campaign {
  return BloctoPrize.getCampaign(id: id)
}`

export default script