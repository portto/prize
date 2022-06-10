
import BloctoPrize from "../contracts/BloctoPrize.cdc"

pub fun main(id: Int): BloctoPrize.Campaign {
  return BloctoPrize.getCampaign(id: id)
}