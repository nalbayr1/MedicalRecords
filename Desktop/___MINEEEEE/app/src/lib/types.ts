export type Deck = {
  id: string;
  title: string;
  image?: string;
  numCards: number;
  timestamp: string;
};

export type User = {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
};

export type DeckWithUserData = Deck & { user?: User };
