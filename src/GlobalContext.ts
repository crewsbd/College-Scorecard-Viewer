// Provide a global object to store things in
import { createContext } from "react";

export const GlobalContext = createContext<{
  apiKey: string;
  changeAPIKey: (newKey: string) => void;
  currentSchool: string;
  changeCurrentSchool: (newKey: string) => void;
}>({
  apiKey: "",
  changeAPIKey: () => {},
  currentSchool: "",
  changeCurrentSchool: () => {},
});
