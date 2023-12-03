import { Button } from "./ui/button";

const Header = () => {
  return (
    <div className="flex justify-center gap-3 p-4 border-b border-slate-400">
      <Button variant={"link"} className="font-semibold">
        Decks
      </Button>
      <Button variant={"link"} disabled={true} className="font-semibold">
        Cards
      </Button>
    </div>
  );
};

export default Header;
