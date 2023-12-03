import DeckActions from "./deck-actions";
import type { DeckWithUserData } from "@/lib/types";

/**
 * The Deck component function responsible for rendering an individual deck
 * based on the data passed to it from Decks.
 * @param props the deck properties.
 * @returns the Deck component.
 */
const Deck = ({ deck }: { deck: DeckWithUserData }) => {
  return (
    <div className="p-6 border rounded-lg border-slate-400 flex-1 h-full shadow-lg">
      <div className="flex justify-between text-xl font-semibold">
        <div>{deck.title}</div>
        <DeckActions deckId={deck.id} deckTitle={deck.title}/>
      </div>
      <div className="text-sm">{deck.numCards} cards</div>
    </div>
  );
};

export default Deck;
