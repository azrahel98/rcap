import { ApolloClient, InMemoryCache } from '@apollo/client'

const defautl = new ApolloClient({
	uri: 'https://jesadampve.execute-api.sa-east-1.amazonaws.com/v1/query',
	cache: new InMemoryCache(),
	headers: {
		Bearer: localStorage.getItem('auth') || '',
	},
})

export { defautl as Client }
