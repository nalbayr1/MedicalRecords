import { updateDeckTitle, deleteDeck, createDeck } from "@/lib/api";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";

// Custom hooks that make the appropriate api endpoint call, and then updates the state accordingly
function useMutationDecks() {
  const { toast } = useToast();
  const removeDeck = useStore((state) => state.removeDeck);
  const addDeck = useStore((state) => state.addDeck);
  const decks = useStore((state) => state.decks);

  const addNewDeck = async (title: string, image?: string) => {
    try {
      const newDeck = await createDeck(title, image);
      addDeck(newDeck);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to create your deck",
        description:
          (error as Error).message ||
          "There was an error creating your deck. Please try again later.",
      });
    }
  };

  const deleteDeckById = async (deckId: string) => {
    try {
      await deleteDeck(deckId);
      removeDeck(deckId);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete the deck",
        description:
          (error as Error).message ||
          "There was an error deleting the deck. Please try again later.",
      });
    }
  };

  const editDeckTitleById = async (deckId: string, title: string) => {
    try {
      // Set new deck title in backend
      await updateDeckTitle(deckId, title);

      const targetIndex = decks.findIndex((deck) => deck.id === deckId);
      const target = decks[targetIndex];
      const updatedTarget = { ...target, title: title };

      useStore.setState((state) => {
        state.decks[targetIndex] = updatedTarget;
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to update the title",
        description:
          (error as Error).message ||
          "There was an error updating the deck's title. Please try again later.",
      });
    }
  };

  return { deleteDeckById, addNewDeck, editDeckTitleById };
}

export default useMutationDecks;
