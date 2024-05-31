import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import ViewShot from "react-native-view-shot";

import { images } from "../../constants";

interface QuoteImageProps {
  quote: string;
  viewShotRef: any;
}

function QuoteImage(props: QuoteImageProps) {
  const { quote, viewShotRef } = props;
  const [imgIndex, setImgIndex] = useState(4);

  function randomImageHandler() {
    const index = Math.floor(Math.random() * images.length);
    if (imgIndex === index) {
      return randomImageHandler();
    }
    setImgIndex(index);
  }

  return (
    <Pressable onPress={randomImageHandler}>
      <ViewShot ref={viewShotRef} style={styles.quoteContainer}>
        <Image
          source={images[imgIndex]}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{quote}</Text>
        </View>
      </ViewShot>
    </Pressable>
  );
}

export default QuoteImage;

const styles = StyleSheet.create({
  quoteContainer: {
    width: "100%",
    height: 300,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#FFF",
    padding: 10,
    letterSpacing: 0.5,
  },
});
