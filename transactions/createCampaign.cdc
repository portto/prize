
import BloctoPrize from "../contracts/BloctoPrize.cdc"

transaction {
  prepare(signer: AuthAccount) {
    let adminRef = signer.borrow<&BloctoPrize.Admin>(from: BloctoPrize.AdminStoragePath)
      ?? panic("Can't borrow admin ref")
    adminRef.createCampaign(
      title: "test",
      description: "test",
      bannerUrl: "test",
      partner: "test",
      partnerLogo: "test",
      startAt: 0.0,
      endAt: 0.0,
      cancelled: false
    )
  }
}
