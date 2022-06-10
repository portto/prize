import BloctoPrize from "../contracts/BloctoPrize.cdc"
import FungibleToken from "../contracts/FungibleToken.cdc"
import BloctoToken from "../contracts/BloctoToken.cdc"

transaction(tokenKey: String) {
  prepare(signer: AuthAccount) {
    let adminRef = signer.borrow<&BloctoPrize.Admin>(from: BloctoPrize.AdminStoragePath)
      ?? panic("Can't borrow admin ref")
    adminRef.removeToken(tokenKey: tokenKey)
  }
}
