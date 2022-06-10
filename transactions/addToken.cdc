import BloctoPrize from "../contracts/BloctoPrize.cdc"
import FungibleToken from "../contracts/FungibleToken.cdc"
import BloctoToken from "../contracts/BloctoToken.cdc"

transaction() {
  prepare(signer: AuthAccount) {
    let adminRef = signer.borrow<&BloctoPrize.Admin>(from: BloctoPrize.AdminStoragePath)
      ?? panic("Can't borrow admin ref")
    let vault <- BloctoToken.createEmptyVault() as @FungibleToken.Vault
    adminRef.addToken(
      tokenKey: "BLT",
      name: "BLT",
      contractName: "BloctoToken",
      vaultPath: BloctoToken.TokenStoragePath, 
      receiverPath: BloctoToken.TokenPublicReceiverPath,
      balancePath: BloctoToken.TokenPublicBalancePath,
      address: 0x0f9df91c9121c460,
      vault: <- vault
    )
  }
}
