
import BloctoPrize from 0xf8d6e0586b0a20c7

transaction(id: Int) {
  prepare(signer: AuthAccount) {
    let claimerRef = signer.borrow<&BloctoPrize.Claimer>(from: BloctoPrize.ClaimerStoragePath)
      ?? panic("Can't borrow claimer ref")
    claimerRef.claimPrizes(id: id)
  }
}