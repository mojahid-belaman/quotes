import { useContext, useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import * as Clipboard from "expo-clipboard";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

import { updateQuoteFavoriteStatus } from "../utils/api";
import { useSQLiteContext } from "expo-sqlite";
import { Quote } from "../modals/quotes";
import { AdsCtx } from "../store/AdsCtx";

function useQuoteActions(quote: Quote) {
  const db = useSQLiteContext();
  const [isFavorite, setIsFavorite] = useState(quote.is_favorite);
  const [isSharing, setIsSharing] = useState(false);
  const viewShotRef = useRef(null);
  const { toggleAds } = useContext(AdsCtx);

  async function favoriteQuoteHandler() {
    setIsFavorite((prev) => !prev);
  }

  async function shareQuoteHandler() {
    if (isSharing) {
      return; // Prevent new share request if one is already in progress
    }

    setIsSharing(true);

    try {
      toggleAds();
      const uri = await captureRef(viewShotRef, {
        format: "jpg",
        quality: 0.8,
      });
      await Sharing.shareAsync(uri, {
        mimeType: "image/jpeg",
        dialogTitle: "quote",
      });
    } catch (error) {
      console.error("Error sharing quote:", error);
    } finally {
      setIsSharing(false);
    }
  }

  async function copyToClipboard() {
    await Clipboard.setStringAsync(quote.quote);
  }

  async function saveToFile() {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "We need permission to access your media library to save the file."
        );
        return;
      }

      const uri = await captureRef(viewShotRef, {
        format: "jpg",
        quality: 0.8,
      });
      const fileUri = `${FileSystem.documentDirectory}quote-${Date.now()}.jpg`;
      await FileSystem.moveAsync({
        from: uri,
        to: fileUri,
      });

      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync("Images", asset, false);
      Alert.alert("Saved to device!", `File saved to Images.`);
    } catch (error) {
      Alert.alert("Error", "Failed to save the image.");
    }
  }

  useEffect(() => {
    updateQuoteFavoriteStatus(db, parseInt(quote.id), isFavorite);
  }, [isFavorite]);

  return {
    favoriteQuoteHandler,
    shareQuoteHandler,
    copyToClipboard,
    saveToFile,
    viewShotRef,
    isFavorite,
  };
}

export default useQuoteActions;
