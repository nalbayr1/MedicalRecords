import { DeckWithUserData, User } from "./types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// Store the state of decks
type State = {
  decks: DeckWithUserData[];
  user: User | null;
};

// All the actions that can update our decks state
type Action = {
  setDecks: (decks: DeckWithUserData[]) => void;
  removeDeck: (deckId: string) => void;
  addDeck: (deck: DeckWithUserData) => void;
  updateDeckTitle: (deckId: string, newTitle: string) => void;
  setUser: (user: User) => void;
  clearUser: () => void;
};

// Initialize initial state as empty array
const initialState: State = {
  decks: [],
  user: null,
};

// The useStoreHook with the implementations of the state modification functions
export const useStore = create<State & Action>()(
  immer((set, get) => ({
    ...initialState,
    setDecks: (decks) => set({ decks }),

    removeDeck: (deckId) => {
      const newDecks = get().decks.filter((deck) => deck.id !== deckId);
      set({ decks: newDecks });
    },

    addDeck: (deck) => {
      set({ decks: [deck, ...get().decks] });
    },

    updateDeckTitle: (deckId, newTitle) => {
      const newDecks = get().decks.map((deck) => {
        if (deck.id === deckId) {
          // If deck id matches the one we pass in, then return a new deck with the desired new title.
          return { ...deck, title: newTitle };
        }
        return deck;
      });
      set({ decks: newDecks });
    },

    setUser: (user) => set({ user }),

    clearUser: () => set({ user: null }),
  })),
);
