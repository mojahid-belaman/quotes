import { createContext, useState } from "react";

interface favoriteState {
  toggle: boolean;
  toggleAds: () => void;
}

export const AdsCtx = createContext<favoriteState>({
  toggle: false,
  toggleAds: () => {},
});

function AdsProvider({ children }: { children: React.ReactNode }) {
  const [toggle, setToggle] = useState<boolean>(false);

  function toggleAds() {
    setToggle((prev) => !prev);
  }

  const value = {
    toggle,
    toggleAds,
  };

  return <AdsCtx.Provider value={value}>{children}</AdsCtx.Provider>;
}

export default AdsProvider;
