
import BloctoPrize from 0xf8d6e0586b0a20c7

pub fun main(id: Int): BloctoPrize.Campaign {
  return BloctoPrize.getCampaign(id: id)
}