import { FlatList } from "react-native";

import { Quote } from "../../modals/quotes";
import QuoteItem from "./QuoteItem";

type QuoteListProps = {
  quotes: Quote[];
};

function QuoteList(props: QuoteListProps) {
  const { quotes } = props;
  return (
    <FlatList
      data={quotes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <QuoteItem quote={item} isFavBtn />}
    />
  );
}

export default QuoteList;
