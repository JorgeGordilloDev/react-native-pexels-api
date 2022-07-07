import { StyleSheet, FlatList, View } from 'react-native'
import CardImage from './CardImage'

const ImageList = ({ photos, next }) => {
	return (
		<View>
			<FlatList
				data={photos}
				renderItem={({ item }) => (
					<CardImage image={item} next={next} />
				)}
				keyExtractor={(item) => item.id}
				numColumns={2}
			/>
		</View>
	)
}

export default ImageList

const styles = StyleSheet.create({})
