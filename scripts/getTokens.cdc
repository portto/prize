
import BloctoPrize from "../contracts/BloctoPrize.cdc"

pub fun main(): {String: BloctoPrize.Token} {
  return BloctoPrize.getTokens()
}
