import React, { createContext, ReactNode, useEffect, useState } from "react";
import { Group } from "../types/types";
import { getGroups } from "../api/api";
// import { debounce } from "../helpers/debounce";

interface GroupsContextProps {
  groups: Group[];
  selectList: {
    avatar_colors: any[];
    group_type: any[];
    having_friends: any[];
  };
}

interface GroupsProviderProps {
  children: ReactNode;
}

export const GroupsContext = createContext<GroupsContextProps>({
  groups: [],
  selectList: {
    avatar_colors: [],
    group_type: [],
    having_friends: [],
  },
});

export const GroupsProvider: React.FC<GroupsProviderProps> = ({ children }) => {
  const [groups, setGroups] = useState<Group[]>([]);

  const [selectList, setSelectList] = useState<{}>({
    avatar_colors: [
      {
        all: "все",
      },
    ],
    group_type: [
      {
        all: "все",
      },
      {
        open: "открытая",
      },
      {
        close: "закрытая",
      },
    ],
    having_friends: [
      {
        all: "все",
      },
      {
        has_friends: "есть друзья",
      },
      {
        no_friends: "нет друзей",
      },
    ],
  });

  const [selectedFilter, setSelectedFilter] = useState({
    avatar_color: "все",
    group_type: "все",
    having_friends: "все",
  });

  const [filteredList, setFilteredList] = useState<Group[]>([]);

  useEffect(() => {
    // debounce(() => getGroups().then(({ data }: any) => setGroups(data)));
    getGroups().then(({ data }: any) => setGroups(data));
  }, []);

  useEffect(() => {
    let avatarColors = [
      ...new Set(
        groups
          ?.map((user) => user.avatar_color)
          ?.filter((color) => Boolean(color))
      ),
    ];

    setSelectList((prevState: any) => {
      return {
        ...prevState,
        avatar_colors: [...prevState.avatar_colors, ...avatarColors],
      };
    });
  }, [groups]);

  const submitFilter = () => {};

  const resetFilter = () => {
    setSelectedFilter((prevState) => {
      return {
        ...prevState,
        avatar_color: "все",
        group_type: "все",
        having_friends: "все",
      };
    });
  };

  return (
    <GroupsContext.Provider
      value={{ groups, selectList, resetFilter, setSelectedFilter }}
    >
      {children}
    </GroupsContext.Provider>
  );
};
