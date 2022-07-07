import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Avatar, Button } from '@rneui/base'
import ImageList from '../components/ImageList'
import { useEffect, useState } from 'react'
import { getImages } from '../api/pexels'
import * as WebBrowser from 'expo-web-browser'
import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'

const ImageScreen = ({ route }) => {
	const [photos, setphotos] = useState([])

	const { image, next } = route.params

	const _handlePressButtonAsync = async () => {
		await WebBrowser.openBrowserAsync(image.photographer_url)
	}

	const downloadFile = async () => {
		try {
			let fileUri = FileSystem.documentDirectory + image.id + '.jpg'
			const { uri } = await FileSystem.downloadAsync(
				image.src.original,
				fileUri
			)
			saveFile(uri)
		} catch (error) {
			console.log(error)
		}
	}

	const saveFile = async (fileUri) => {
		const { status } = await MediaLibrary.requestPermissionsAsync()
		if (status === 'granted') {
			const asset = await MediaLibrary.createAssetAsync(fileUri)
			await MediaLibrary.createAlbumAsync('Download', asset, false)
		}
	}

	const handleDonwload = () => {
		downloadFile()
	}

	const loadImages = async () => {
		const response = await getImages(next)
		setphotos(response.data.photos)
	}
	useEffect(() => {
		loadImages()
	}, [])

	return (
		<View style={styles.headerPhotographer}>
			<Image source={{ uri: image.src.large2x }} style={styles.image} />
			<View style={styles.container}>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<Avatar
						title={image.photographer
							.split(' ')
							.map((str) => str[0])
							.join('')
							.toUpperCase()}
						rounded
						containerStyle={{ backgroundColor: 'red' }}
					/>
					<TouchableOpacity onPress={_handlePressButtonAsync}>
						<Text style={styles.textPhotographer}>
							{image.photographer}
						</Text>
					</TouchableOpacity>
				</View>
				<Button
					title={'Donwload'}
					onPress={() => handleDonwload()}
					buttonStyle={{ backgroundColor: '#229783' }}
				/>
			</View>
			<Text style={{ color: '#fff', marginVertical: 15 }}>
				Desciption: {image.alt}
			</Text>
			<View>
				<ImageList photos={photos} />
			</View>
		</View>
	)
}

export default ImageScreen

const styles = StyleSheet.create({
	image: {
		height: 250,
	},
	headerPhotographer: {
		backgroundColor: '#0d0d0d',
		flex: 1,
		flexDirection: 'column',
		padding: 10,
	},
	container: {
		display: 'flex',
		paddingVertical: 18,
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
	},
	textPhotographer: {
		color: '#fff',
		fontWeight: 'bold',
		marginStart: 5,
		fontSize: 18,
	},
})
