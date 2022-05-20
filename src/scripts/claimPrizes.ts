
const script = `
import BloctoPrize from 0x4669f975288067df
    
transaction(id: Int) {
  prepare(signer: AuthAccount) {
    if(signer.borrow<&BloctoPrize.Claimer>(from: BloctoPrize.ClaimerStoragePath) == nil) {
      let claimer <- BloctoPrize.initClaimer()
      signer.save(<- claimer, to: BloctoPrize.ClaimerStoragePath)
      signer.link<&BloctoPrize.Claimer{BloctoPrize.ClaimerPublic}>(BloctoPrize.ClaimerPublicPath, target: BloctoPrize.ClaimerStoragePath)
    }

    let claimerRef = signer.borrow<&BloctoPrize.Claimer>(from: BloctoPrize.ClaimerStoragePath)
      ?? panic("Can't borrow claimer ref")
    claimerRef.claimPrizes(id: id)
  }
}`

export default script