import { Deck, DeckWithUserData, User } from "@/lib/types";
import {
  storeAuthenticatedUserToken,
  getAuthenticatedUser,
  getAuthenticatedUserToken,
  removeAuthenticatedUserToken,
} from "./auth";

const API_URL = import.meta.env.VITE_API_URL;

// API endpoint for updating a deck's title
export const updateDeckTitle = async (
  deckId: string,
  title: string,
): Promise<DeckWithUserData> => {
  const user = getAuthenticatedUser();
  const token = getAuthenticatedUserToken();
  const response = await fetch(`${API_URL}/decks/${deckId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });
  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${
        responseJson.message || response.statusText
      }`,
    );
  }

  return {
    ...responseJson.data,
    user: user,
  };
};

// API endpoint for adding a new deck.
export const createDeck = async (
  title: string,
  image?: string,
): Promise<DeckWithUserData> => {
  const user = getAuthenticatedUser();
  const token = getAuthenticatedUserToken();

  const response = await fetch(`${API_URL}/decks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, image }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${
        responseJson.message || response.statusText
      }`,
    );
  }

  return {
    ...responseJson.data,
    user: user,
  };
};

// Basic fetching of the Deck array in our mock db
export const fetchDecks = async (): Promise<Deck[]> => {
  const user = getAuthenticatedUser();
  const response = await fetch(
    `${API_URL}/decks?withUserData=true&username=${user.username}`,
  );
  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${
        responseJson.message || response.statusText
      }`,
    );
  }

  return responseJson.data;
};

// API endpoint for Deletion of a Deck
export const deleteDeck = async (id: string): Promise<void> => {
  const token = getAuthenticatedUserToken();

  const response = await fetch(`${API_URL}/decks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${
        responseJson.message || response.statusText
      }`,
    );
  }
};

export const login = async (
  username: string,
  password: string,
): Promise<User> => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${
        responseJson.message || response.statusText
      }`,
    );
  }

  const { access_token } = responseJson.data;

  if (!access_token) {
    throw new Error("Authentication token is missing from the response!");
  }

  storeAuthenticatedUserToken(access_token);
  const user = getAuthenticatedUser();
  return user;
};

export const logout = async (): Promise<void> => {
  removeAuthenticatedUserToken();
};

export const register = async (
  username: string,
  password: string,
  displayName: string,
  avatar?: string,
): Promise<void> => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, displayName, avatar }),
  });
  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${
        responseJson.message || response.statusText
      }`,
    );
  }
};
