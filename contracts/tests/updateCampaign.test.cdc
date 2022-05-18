
import BloctoPrize from 0xf8d6e0586b0a20c7

transaction(id: Int, title: String?, description: String?, bannerUrl: String?, partner: String?, partnerLogo: String?, startAt: UFix64?, endAt: UFix64?, cancelled: Bool?) {
  prepare(signer: AuthAccount) {
    let adminRef = signer.borrow<&BloctoPrize.Admin>(from: BloctoPrize.AdminStoragePath)
      ?? panic("Can't borrow admin ref")
    adminRef.updateCampaign(
      id: id,
      title: title,
      description: description,
      bannerUrl: bannerUrl,
      partner: partner,
      partnerLogo: partnerLogo,
      startAt: startAt,
      endAt: endAt,
      cancelled: cancelled
    )
  }
}