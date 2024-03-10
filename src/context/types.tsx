import { ReactNode } from "react";
import { Group } from "../types/types";

export interface GroupsContextProps {
  groups: Group[];
  filteredData: Group[];
  isLoading: boolean;
  selectList: {
    avatar_colors: {};
    group_type: {};
    having_friends: {};
  };
  selectedFilter: {
    avatar_colors: {};
    group_type: {};
    having_friends: {};
  };
  filter: (stateKey: string, key: string) => void;
  submitFilter: () => void;
  resetFilter: () => void;
}

export interface GroupsProviderProps {
  children: ReactNode;
}
