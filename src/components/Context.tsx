import { devNull } from "os";
import { createContext, useState } from "react";

export interface UserContextType {
  p1: string;
  setP1: (value: string) => void;
  p2: string;
  setP2: (value: string) => void;
  value: number;
  setValue: (value: number) => void;
}

export const userContext = createContext<UserContextType>({
  p1: "player1",
  p2: "player2",
  setP1: () => {},
  setP2: () => {},
  value: 3,
  setValue: () => {},
});
function Context({ children }: { children: React.ReactNode }) {
  const [p1, setP1] = useState<string>("P1");
  const [p2, setP2] = useState<string>("P2");
  const [value, setValue] = useState<number>(3);

  return (
    <userContext.Provider value={{ p1, setP1, p2, setP2, value, setValue }}>
      {children}
    </userContext.Provider>
  );
}
export default Context;
