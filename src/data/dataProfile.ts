export const dataProfile: any = {
    'account': {
        condition: true,
        value: 'Account',
        href: ''
    },
    'wallet': {
        condition: false,
        value: 'Wallet',
        href: ''
    },
    'privacy': {
        condition: false,
        value: 'Privacy',
        href: ''
    }
}

export const dataProfileArr = Object.keys(dataProfile).map((key: string) => dataProfile[key]);