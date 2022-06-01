import { Token, Path } from "../../types"

const makeScript = ({ vaultPath, receiverPath, balancePath, contractName, address }: Token) => {
  const pathToString = (path: Path) => `/${path.domain}/${path.identifier}`
  const tokenVaultPath = pathToString(vaultPath)
  const tokenReceiverPath = pathToString(receiverPath)
  const tokenBalancePath = pathToString(balancePath)
  return `
  import BloctoPrize from 0xc52330593c1d935f
  import ${contractName} from ${address}
  import FungibleToken from 0x9a0766d93b6608b7
      
  transaction(id: Int) {
    prepare(signer: AuthAccount) {

      // check claimer resource exist
      if(signer.borrow<&BloctoPrize.Claimer>(from: BloctoPrize.ClaimerStoragePath) == nil) {
        let claimer <- BloctoPrize.initClaimer()
        signer.save(<- claimer, to: BloctoPrize.ClaimerStoragePath)
        signer.link<&BloctoPrize.Claimer{BloctoPrize.ClaimerPublic}>(BloctoPrize.ClaimerPublicPath, target: BloctoPrize.ClaimerStoragePath)
      }

      // check vault resource exist
      if(signer.borrow<&FungibleToken.Vault>(from: ${tokenVaultPath}) == nil) {
        signer.save(<- ${contractName}.createEmptyVault(), to: ${tokenVaultPath})
        signer.link<&${contractName}.Vault{FungibleToken.Receiver}>(
          ${tokenReceiverPath},
          target: ${tokenVaultPath}
        )
  
        // Create a public capability to the Vault that only exposes
        // the balance field through the Balance interface
        signer.link<&${contractName}.Vault{FungibleToken.Balance}>(
          ${tokenBalancePath},
          target: ${tokenVaultPath}
        )
      }

      let claimerRef = signer.borrow<&BloctoPrize.Claimer>(from: BloctoPrize.ClaimerStoragePath)
        ?? panic("Can't borrow claimer ref")
      claimerRef.claimPrizes(id: id)
    }
}`
}

export default makeScript