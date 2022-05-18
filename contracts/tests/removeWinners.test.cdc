
import BloctoPrize from 0xf8d6e0586b0a20c7

transaction(id: Int, addresses: [Address], prizeIndex: Int) {
  prepare(signer: AuthAccount) {
    let adminRef = signer.borrow<&BloctoPrize.Admin>(from: BloctoPrize.AdminStoragePath)
      ?? panic("Can't borrow admin ref")
    adminRef.removeWinners(
      id: id,
      addresses: addresses,
      prizeIndex: prizeIndex
    )
  }
}