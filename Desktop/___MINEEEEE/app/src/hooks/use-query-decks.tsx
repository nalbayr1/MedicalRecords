import { fetchDecks } from "@/lib/api";
import { useStore } from "@/lib/store";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const useQueryDecks = () => {
  const user = useStore((state) => state.user);
  const setDecks = useStore((state) => state.setDecks);
  const decks = useStore((state) => state.decks);
  const { toast } = useToast();

  const loadDecks = async () => {
    if (user) {
      try {
        const fetchedDecks = await fetchDecks();
        setDecks(fetchedDecks);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Failed to fetch decks",
          description:
            (error as Error).message ||
            "There was an error loading the decks. Please try again later.",
        });
      }
    }
  };

  useEffect(() => {
    loadDecks();
  }, [user]);

  return decks;
};

export default useQueryDecks;
