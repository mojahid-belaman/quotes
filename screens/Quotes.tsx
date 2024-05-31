import { useSQLiteContext } from "expo-sqlite";
import { RouteProp, useRoute } from "@react-navigation/native";

import { RootStackScreen } from "../types";
import QuoteList from "../components/Quotes/QuoteList";
import { StyleSheet, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { Quote } from "../modals/quotes";
import { getQuotes } from "../utils/api";
import Loading from "../components/Loading";
import Banner from "../components/Banner";
import useInterstitialAds from "../hooks/useInterstitialAds";
import { AdsCtx } from "../store/AdsCtx";

function QuoteScreen() {
  const db = useSQLiteContext();
  const route = useRoute<RouteProp<RootStackScreen>>();
  const categoryId = route.params?.id!;
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const { toggle } = useContext(AdsCtx);

  useInterstitialAds(toggle);

  useEffect(() => {
    getQuotes(db, parseInt(categoryId))
      .then((res) => setQuotes(res))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (quotes.length === 0) {
    return (
      <View style={styles.containerText}>
        <Text style={styles.emptyText}>
          No quotes found for the selected category.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <QuoteList quotes={quotes} />
      <Banner />
    </View>
  );
}

export default QuoteScreen;

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
});
