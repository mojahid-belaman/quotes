import { StyleSheet, View } from "react-native";

import { Quote } from "../../modals/quotes";
import Button from "../Button";
import QuoteImage from "./QuoteImage";
import useQuoteActions from "../../hooks/useQuoteActions";

type QuoteItemProps = {
  quote: Quote;
  isFavBtn?: boolean;
};

function QuoteItem(props: QuoteItemProps) {
  const { quote, isFavBtn } = props;
  const {
    viewShotRef,
    isFavorite,
    favoriteQuoteHandler,
    saveToFile,
    copyToClipboard,
    shareQuoteHandler,
  } = useQuoteActions(quote);

  return (
    <View style={styles.container}>
      <QuoteImage quote={quote.quote} viewShotRef={viewShotRef} />
      <View style={styles.actions}>
        {isFavBtn && (
          <Button
            icon={`${isFavorite ? "heart" : "heart-outline"}`}
            size={24}
            onPress={favoriteQuoteHandler}
          >
            Like
          </Button>
        )}
        <Button
          icon="save-outline"
          size={24}
          onPress={() => {
            saveToFile();
          }}
        >
          Save
        </Button>
        <Button icon="copy-outline" size={24} onPress={copyToClipboard}>
          Copy
        </Button>
        <Button icon="share-social" size={24} onPress={shareQuoteHandler}>
          Share
        </Button>
      </View>
    </View>
  );
}

export default QuoteItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    borderRadius: 12,
    overflow: "hidden",
  },
  actions: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
  },
});
