
import BloctoPrize from 0xf8d6e0586b0a20c7
import BloctoToken from 0xf8d6e0586b0a20c7
import FungibleToken from 0xee82856bf20e2aa6
transaction() {
  prepare(signer: AuthAccount) {
    let adminRef = signer.borrow<&BloctoPrize.Admin>(from: BloctoPrize.AdminStoragePath)
      ?? panic("Can't borrow admin ref")
    adminRef.removeToken(tokenKey: "BLT")
  }
}
