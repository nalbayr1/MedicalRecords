// feed.tsx
import { useStore } from "@/lib/store";
import Decks from "./decks";
import Header from "./header";

const Feed = () => {
  const user = useStore((state) => state.user);
  return (
    <div className="flex flex-col w-full max-w-xl p-4">
      <Header />
      {user ?
            <Decks /> 
            :
            <div>Please login to view your cards or register to use this app.</div>
      }

    </div>
  );
};

export default Feed;
