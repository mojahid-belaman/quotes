import { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSQLiteContext } from "expo-sqlite";

import { Quote } from "../modals/quotes";
import { getFavoriteQuotes } from "../utils/api";
import Loading from "../components/Loading";
import QuoteItem from "../components/Quotes/QuoteItem";
import { useIsFocused } from "@react-navigation/native";
import Banner from "../components/Banner";
import { AdsCtx } from "../store/AdsCtx";
import useInterstitialAds from "../hooks/useInterstitialAds";

function FavoriteScreen() {
  const db = useSQLiteContext();
  const [favoriteQuotes, setFavoriteQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const isFocused = useIsFocused();
  const { toggle } = useContext(AdsCtx);

  useInterstitialAds(toggle);

  useEffect(() => {
    getFavoriteQuotes(db)
      .then((quotes) => setFavoriteQuotes(quotes))
      .finally(() => setLoading(false));
  }, [isFocused]);

  if (loading) {
    return <Loading />;
  }

  if (favoriteQuotes.length === 0) {
    return (
      <View style={styles.containerText}>
        <Text style={styles.emptyText}>No favorite quotes found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteQuotes}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <QuoteItem quote={item} />}
      />
      <View style={styles.ads}>
        <Banner />
      </View>
    </View>
  );
}

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 18,
  },
  containerText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    textAlign: "center",
  },
  ads: {
    justifyContent: "flex-end",
    overflow: "hidden",
  },
});
