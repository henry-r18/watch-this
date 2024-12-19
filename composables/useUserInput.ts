export const useUserInput = () => {
  return useState("userInput", () => ({
    partySize: "",
    maxRuntime: "",
    favoriteMovie: "",
    favoriteActor: "",
    preferredEra: "",
    preferredTone: "",
  }));
};
