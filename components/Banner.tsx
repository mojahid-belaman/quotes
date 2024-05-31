import { StyleSheet, View } from "react-native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__
  ? TestIds.BANNER
  : process.env.EXPO_PUBLIC_BANNER_AD_ANDROID!;

function Banner() {
  return (
    <View style={styles.ads}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.LARGE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
}

export default Banner;

const styles = StyleSheet.create({
  ads: {
    justifyContent: "center",
    alignItems: "center",
  },
});
