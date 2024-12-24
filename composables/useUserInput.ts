export const useUserInput = () => {
  return useState("userInput", () => ({
    partySize: 1,
    maxRuntime: "120",
    favoriteMovie: "",
    favoriteActor: "",
    prefersRecent: "",
    keywords: [],
  }));
};
