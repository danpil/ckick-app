import React from 'react';
import { Text, View, Image, StyleSheet, TouchableHighlight } from 'react-native';
import Images from './images';

export default class JustATributeApp extends React.Component {
  state = {
    index: 0,
    imageWidth: null,
  };

  nextImage(event) {
    //debugger;
    const { index, imageWidth } = this.state,
      X = event.nativeEvent.locationX,
      delta = X < imageWidth / 2 ? -1 : +1;

    let newIndex = (index + delta) % Images.length;

    if (newIndex < 0) {
      newIndex = Images.length - Math.abs(newIndex);
    }

    this.setState({
      index: newIndex,
    });
  }

  onImageLayout(event) {
    this.setState({
      imageWidth: event.nativeEvent.layout.width,
    });
  }

  render() {
    const image = Images[this.state.index];

    return (
      <View style={styles.container}>
        <View style={styles.empty} />
        <TouchableHighlight onPress={this.nextImage.bind(this)} style={styles.image}>
          <Image
            source={{ uri: image.uri }}
            style={styles.image}
            onLayout={this.onImageLayout.bind(this)}
          >
            <Text style={styles.imageLabel}>{image.label}</Text>
          </Image>
        </TouchableHighlight>
        <View style={styles.empty} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#abcdef',
  },
  image: {
    flex: 2,
    width: 320,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageLabel: {
    textAlign: 'center',
    backgroundColor: 'rgba(100, 100, 100, 0.5)',
    color: 'white',
    width: 320,
  },
  empty: {
    flex: 1,
  },
});
