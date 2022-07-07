import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const CardImage = ({ image, next }) => {
	const navigation = useNavigation()
	return (
		<TouchableOpacity
			style={styles.cardImage}
			onPress={() => navigation.navigate('ImageScreen', { image, next })}
		>
			<Image
				source={{
					uri: image.src.portrait
						? image.src.portrait
						: 'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg',
				}}
				style={{ height: 180, width: '100%' }}
			/>
		</TouchableOpacity>
	)
}

export default CardImage

const styles = StyleSheet.create({
	cardImage: {
		display: 'flex',
		width: '49.5%',
		margin: 4,
		justifyContent: 'space-between',
		backgroundColor: '#2c292c',
		borderWidth: 0,
		borderRadius: 5,
	},
})
