
import BloctoPrize from 0xf8d6e0586b0a20c7

transaction(id: Int, name: String, tokenKey: String, amount: UFix64) {
  prepare(signer: AuthAccount) {
    let adminRef = signer.borrow<&BloctoPrize.Admin>(from: BloctoPrize.AdminStoragePath)
      ?? panic("Can't borrow admin ref")
    adminRef.addPrize(
      id: id,
      name: name,
      tokenKey: tokenKey,
      amount: amount,
    )
  }
}