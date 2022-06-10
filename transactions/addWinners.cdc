
import BloctoPrize from "../contracts/BloctoPrize.cdc"

transaction(id: Int) {
  prepare(signer: AuthAccount) {
    let campaigns = BloctoPrize.getCampaigns()

    campaigns[id].addWinners(
      addresses: [Address(0x9527c6c9a6f2bf0f)],
      prizeIndex: 0
    )
  }
}