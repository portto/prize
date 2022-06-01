export interface Path {
  domain: string
  identifier: string
}

export interface Token {
  name: string
  contractName: string
  vaultPath: Path
  balancePath: Path
  receiverPath: Path
  address: string
}
export interface Campaign {
  id: number
  title: string
  description: string
  bannerUrl: string
  partner: string
  partnerLogo: string
  prizes: Array<{
    name: string
    token: Token
    amount: number
  }>
  winners: {
    [key: string]: number[] | undefined
  }
  claimed: {
    [key: string]: boolean | undefined
  }
  startAt: number
  endAt: number
}
