import { useState } from "react";
import useMutationDecks from "@/hooks/use-mutation-decks";
import { useToast } from "@/components/ui/use-toast";
import { DialogContent, DialogTitle, DialogDescription, DialogClose } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { DialogHeader, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";

type EditDeckDialogProps = {
  deckId: string;
  deckTitle: string;
  closeDialog: () => void; // Add this line
};



const EditDeckDialog = ({ deckId, deckTitle, closeDialog }: EditDeckDialogProps) => {
  const { toast } = useToast();
  const [title, setTitle] = useState(deckTitle);
  const [isLoading, setIsLoading] = useState(false);
  const { editDeckTitleById } = useMutationDecks();

  const handleSubmit = async () => {
    if (!title.trim()) {
      // Close the dialog immediately
    
      // Show the toast after a short delay to ensure it's seen by the user
      setTimeout(() => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please provide a title for the deck.",
          duration: 5000, // The toast will be visible for 5 seconds
        });
      }, 300); // Delay in milliseconds
    
      return;
    }
    
    try {
      // Set loading state
      setIsLoading(true);
    
      // Update the deck title by using the editDeckTitleById function
      await editDeckTitleById(deckId, title);
    
      // Reset the loading state
      setIsLoading(false);
    
      // Close the dialog
    } catch (error) {
      // Reset the loading state
      setIsLoading(false);
    
      // Handle errors with a toast message
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while updating the deck.",
        duration: 5000, // The toast will be visible for 5 seconds
      });
    }
  };
  
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add Deck</DialogTitle>
        <DialogDescription>Give the title of your deck here.</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid items-center grid-cols-4 gap-4">
          <label htmlFor="title" className="text-right">
            Title
          </label>
          <Input
            id="title"
            value={title}
            className="col-span-3"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button
            variant={"secondary"}
            type="reset"
            onClick={() => setTitle(deckTitle)}
          >
            Cancel
          </Button>
        </DialogClose>
        <DialogClose asChild>
        <Button type="submit" onClick={handleSubmit}>
          Save
        </Button>

        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default EditDeckDialog;
