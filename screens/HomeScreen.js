import { StyleSheet, View, Text } from 'react-native'
import { useEffect, useState } from 'react'
import { Input, Button } from '@rneui/base'

import { getImages } from '../api/pexels'
import ImageList from '../components/ImageList'

const HomeScreen = ({ openSearch }) => {
	const [photos, setphotos] = useState([])
	const [next, setNext] = useState('')
	const [inputSearch, setInputSearch] = useState('')

	const loadImages = async (searchTerm = 'programing') => {
		const response = await getImages(
			`https://api.pexels.com/v1/search?query=${searchTerm}`
		)
		setphotos(response.data.photos)
		setNext(response.data.next_page)
	}

	const handleSearch = async () => {
		await loadImages(inputSearch)
	}

	useEffect(() => {
		loadImages()
	}, [])

	return (
		<>
			{openSearch && (
				<View style={styles.serachForm}>
					<Input
						inputContainerStyle={styles.inputContainerSeach}
						leftIconContainerStyle={styles.searchIcon}
						style={styles.inputSearch}
						placeholder="Seach a term"
						leftIcon={{
							type: 'feather',
							name: 'search',
							color: '#d0d0d0',
						}}
						onChangeText={(value) => setInputSearch(value)}
					/>
					<Button
						title={'Search'}
						buttonStyle={styles.buttonSeach}
						onPress={() => handleSearch()}
					/>
				</View>
			)}
			<View style={styles.container}>
				<Text style={styles.totalResultsText}>1000 Results</Text>
				<ImageList photos={photos} next={next} />
			</View>
		</>
	)
}

export default HomeScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#0d0d0d',
		alignItems: 'center',
		justifyContent: 'center',
	},
	totalResultsText: {
		color: '#d0d0d0',
		textAlign: 'right',
		width: '100%',
		paddingTop: 30,
	},
	serachForm: {
		backgroundColor: '#0d0d0d',
		width: '100%',
		paddingLeft: 5,
		paddingTop: 10,
		paddingRight: 75,
		flex: 1 / 5,
		flexDirection: 'row',
		alignItems: 'center',
	},
	searchIcon: {
		paddingStart: 10,
		marginRight: 7,
	},
	inputContainerSeach: {
		backgroundColor: '#2c292c',
		borderBottomWidth: 0,
		paddingHorizontal: 4,
	},
	inputSearch: {
		color: '#d0d0d0',
	},
	buttonSeach: {
		backgroundColor: '#229783',
		marginBottom: 27,
	},
})
