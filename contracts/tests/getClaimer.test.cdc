

import BloctoPrize from 0xf8d6e0586b0a20c7

pub fun main(address: Address): Bool {
  let claimerRef = getAccount(address)
    .getCapability(BloctoPrize.ClaimerPublicPath)!
    .borrow<&BloctoPrize.Claimer{BloctoPrize.ClaimerPublic}>()
      ?? panic("Can't borrow claimer public ref")
  return claimerRef != nil
}