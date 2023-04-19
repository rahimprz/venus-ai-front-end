import { Session, User } from "@supabase/supabase-js";
import { createContext } from "react";
import { getLocalData, LocalData } from "./services/local-data";
import { UserConfig } from "./services/user-config";
import { Profile } from "./types/profile";

interface AppContextType {
  session?: Session | null;
  setSession: (session: Session | null) => void;
  profile?: Profile | null;
  setProfile: (profile: Profile | null) => void;
  config?: UserConfig;
  updateConfig: (config: UserConfig) => void;
  localData: LocalData;
  updateLocalData: (data: Partial<LocalData>) => void;
}

export const AppContext = createContext<AppContextType>({
  setSession: (session) => {},
  setProfile: (profile) => {},
  localData: getLocalData(),
  updateLocalData: (data) => {},
  updateConfig: (config) => {},
});
