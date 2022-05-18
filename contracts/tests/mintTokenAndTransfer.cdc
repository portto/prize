

import FungibleToken from 0xee82856bf20e2aa6
import BloctoPrize from 0xf8d6e0586b0a20c7
import BloctoToken from 0xf8d6e0586b0a20c7

transaction() {
  prepare(signer: AuthAccount) {
    let adminRef = signer.borrow<&BloctoToken.Administrator>(from: /storage/bloctoTokenAdmin)
			?? panic("Could not borrow admin reference to the recipient's Vault")
    let minter <- adminRef.createNewMinter(allowedAmount: 1000000.0)
    let vault <- minter.mintTokens(amount: 1000000.0)
    let receiverRef = signer.getCapability(BloctoToken.TokenPublicReceiverPath)!.borrow<&{FungibleToken.Receiver}>()
			?? panic("Could not borrow receiver reference to the recipient's Vault")
    receiverRef.deposit(from: <- vault)
    destroy minter
  }
}