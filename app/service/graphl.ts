import { ApolloClient, InMemoryCache } from '@apollo/client'

const defautl = new ApolloClient({
	uri: 'https://17jjon4f9f.execute-api.sa-east-1.amazonaws.com/Prod/query',
	cache: new InMemoryCache(),
	headers: {
		Bearer: localStorage.getItem('auth') || '',
	},
})

export { defautl as Client }
