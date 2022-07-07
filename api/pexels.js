import axios from 'axios'

// Api Key: 563492ad6f91700001000001b589f0dfce1a4039b56261207468fe05

export const getImages = async (url) =>
	await axios.get(url, {
		headers: {
			Authorization:
				'563492ad6f91700001000001b589f0dfce1a4039b56261207468fe05',
		},
	})
