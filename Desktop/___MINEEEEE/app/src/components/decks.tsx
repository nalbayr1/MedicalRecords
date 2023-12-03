import useQueryDecks from "@/hooks/use-query-decks";
import Deck from "./deck";
import { useStore } from "@/lib/store";

const Decks = () => {
  const user = useStore((state) => state.user);
  const decks = useQueryDecks();

  return (
    <div className="flex flex-col gap-y-3 items-center">
      {user 
      ? 
      decks.map((deck) => (
        <div
          className="flex w-full border-b border-gray-300 px-14 py-6 justify-center"
          key={deck.id}
        >
          <Deck deck={deck} />
        </div>
      ))
      :
      <div>
      </div>
    }
    </div>
  );
};

export default Decks;
