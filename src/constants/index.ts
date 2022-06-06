const currentEnv = process.env.REACT_APP_NETWORK === 'mainnet' ? 'mainnet' : 'testnet'
const GTM_ARG_LIST = {
    mainnet: {
        gtmId: 'GTM-WSC842V',
        auth: 't97hAg-fmSPC7LsnahvMnQ',
        preview: 'env-1'
    },
    testnet: {
        gtmId: 'GTM-WSC842V',
        auth: '2bzjsK5Ktcef65wVwYnWMw',
        preview: 'env-2'
    }
}

export const tagManagerArgs = GTM_ARG_LIST[currentEnv]
