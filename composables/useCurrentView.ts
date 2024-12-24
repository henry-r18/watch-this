export const useCurrentView = () => {
  return useState("currentView", () => "start");
};
