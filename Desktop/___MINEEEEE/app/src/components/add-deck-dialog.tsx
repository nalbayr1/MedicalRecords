import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useMutationDecks from "@/hooks/use-mutation-decks";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import { useStore } from "@/lib/store";

const AddDeckDialog = () => {
  const { addNewDeck } = useMutationDecks();
  const [title, setTitle] = useState("");
  const { toast } = useToast();
  const user = useStore((state) => state.user);

  const handleSave = async () => {
    if (!title) {
      toast({
        variant: "destructive",
        title: "Oops deck title is missing 🙁",
        description: `Please enter content of deck`,
      });
      return;
    }
    await addNewDeck(title);
    setTitle("");
  };

  const handleCancel = () => {
    setTitle("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button aria-label={"Make a deck"} variant="default" size="sm">
          <PlusCircledIcon className="w-5 h-5"></PlusCircledIcon>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add Deck</DialogTitle>
          <DialogDescription>
            {user
              ? "Give a title to your deck here."
              : "Please login to make a deck."}
          </DialogDescription>
        </DialogHeader>
        {user && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                className="col-span-3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
        )}

        <DialogFooter>
          {!user && (
            <DialogClose asChild>
              <Button>Okay</Button>
            </DialogClose>
          )}
          {user && (
            <DialogClose asChild>
              <Button variant={"secondary"} type="reset" onClick={handleCancel}>
                Cancel
              </Button>
            </DialogClose>
          )}
          {user && (
            <DialogClose asChild>
              <Button type="submit" onClick={handleSave}>
                Save
              </Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddDeckDialog;
