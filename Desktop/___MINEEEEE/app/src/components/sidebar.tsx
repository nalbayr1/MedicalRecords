import { useState } from "react";
import {HomeIcon, MagnifyingGlassIcon, PlusCircledIcon} from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import AddDeckDialog from './add-deck-dialog'; // Update the path as necessary
import { useStore } from "@/lib/store";

const Sidebar = () => {

  return (
    <div className="flex flex-col gap-2 p-4">
      <Button variant={"ghost"} size="sm">
        <HomeIcon className="w-5 h-5" />
      </Button>
      <Button variant={"ghost"} size="sm">
        <MagnifyingGlassIcon className="w-5 h-5" />
      </Button>

      <AddDeckDialog />
    </div>
  );
};

export default Sidebar;
