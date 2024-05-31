import { useEffect } from "react";
import {
  AdEventType,
  InterstitialAd,
  TestIds,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : process.env.EXPO_PUBLIC_INTERSTITIAL_AD_ANDROID!;

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  keywords: ["fashion", "clothing"],
});

function useInterstitialAds(isClicked?: boolean) {
  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        interstitial.show();
      }
    );

    interstitial.load();

    return () => {
      unsubscribe();
    };
  }, [isClicked]);
}

export default useInterstitialAds;
