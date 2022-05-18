

import BloctoPrize from 0xf8d6e0586b0a20c7

transaction() {
  prepare(signer: AuthAccount) {
    let claimer <- BloctoPrize.initClaimer()
    signer.save(<- claimer, to: BloctoPrize.ClaimerStoragePath)
    signer.link<&BloctoPrize.Claimer{BloctoPrize.ClaimerPublic}>(BloctoPrize.ClaimerPublicPath, target: BloctoPrize.ClaimerStoragePath)
  }
}