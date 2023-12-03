import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import useMutationDecks from "@/hooks/use-mutation-decks";
import { useStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import EditDeckDialog from "./edit-deck-dialog";

const DeckActions = ({
  deckId,
  deckTitle,
  username,
}: {
  deckId: string;
  deckTitle: string;
  username?: string;
}) => {
  const { deleteDeckById } = useMutationDecks();
  const { user } = useStore((state) => state);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    setIsOwner(user ? user.username === username : false);

  }, [user, username]);

  const handleDelete = () => {
    deleteDeckById(deckId);
    // Additional logic after deletion (e.g., UI update) can be added here
  };

  // Function to handle opening the edit dialog
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const openEditDialog = () => {
    setIsEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <DotsVerticalIcon className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={openEditDialog}>Edit</DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem className="text-red-500" onSelect={handleDelete}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isEditDialogOpen && (
        <EditDeckDialog
          deckId={deckId}
          deckTitle={deckTitle}
          closeDialog={closeEditDialog}
        />
      )}
    </Dialog>
  );
};

export default DeckActions;
