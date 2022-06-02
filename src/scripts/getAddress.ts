


const getAddress = (key: string) => {
  const isMainnet = process.env.REACT_APP_NETWORK === 'mainnet'
  if(isMainnet) {
    switch(key) {
      case 'BloctoPrize':
        return '0xa9ea962dd3e75ee5'
      case 'FungibleToken':
        return '0xf233dcee88fe0abe'
      default:
        return ''
    }

  } else {
    switch(key) {
      case 'BloctoPrize':
        return '0xc52330593c1d935f'
      case 'FungibleToken':
        return '0x9a0766d93b6608b7'
      default:
        return ''
    }
  }

}

export default getAddress