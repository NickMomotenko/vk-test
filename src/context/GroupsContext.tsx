import React, { createContext, ReactNode, useEffect, useState } from "react";
import { Group } from "../types/types";
import { getGroups } from "../api/api";
import { debounce } from "../helpers/debounce";

interface GroupsContextProps {
  groups: Group[];
  filteredData: Group[];
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

interface GroupsProviderProps {
  children: ReactNode;
}

export const GroupsContext = createContext<GroupsContextProps>({
  groups: [],
  filteredData: [],
  selectList: {
    avatar_colors: {},
    group_type: {},
    having_friends: {},
  },
  selectedFilter: {
    avatar_colors: {},
    group_type: {},
    having_friends: {},
  },
  filter: () => {},
  submitFilter: () => {},
  resetFilter: () => {},
});

export const GroupsProvider: React.FC<GroupsProviderProps> = ({ children }) => {
  const [groups, setGroups] = useState<Group[]>([]);

  const [selectList, setSelectList] = useState({
    avatar_colors: {
      all: "все",
    },
    group_type: {
      all: "все",
      open: "открытая",
      close: "закрытая",
    },
    having_friends: {
      all: "все",
      has_friends: "есть друзья",
      no_friends: "нет друзей",
    },
  });

  const [selectedFilter, setSelectedFilter] = useState({
    avatar_colors: "all",
    group_type: "all",
    having_friends: "all",
  });

  const [filteredData, setFilteredData] = useState<Group[]>([]);

  useEffect(() => {
    debounce(() => getGroups().then(({ data }: any) => setGroups(data)));
    // getGroups().then(({ data }: any) => setGroups(data));
  }, []);

  useEffect(() => {
    let obj = {};
    let avatarColors = [
      ...new Set(
        groups
          ?.map((user) => user.avatar_color)
          ?.filter((color) => Boolean(color))
      ),
    ];

    avatarColors.forEach((color: string | undefined) => {
      if (!obj[color]) {
        obj[color] = color;
      }
    });

    setSelectList((prevState: any) => {
      return {
        ...prevState,
        avatar_colors: { ...prevState.avatar_colors, ...obj },
      };
    });

    setFilteredData(groups);
  }, [groups]);

  const submitFilter = () => {
    let filteredByTypeOfGroup =
      selectedFilter.group_type === "all"
        ? groups
        : groups.filter((group: any) => {
            if (selectedFilter.group_type === "close") {
              return group.closed === true;
            }

            if (selectedFilter.group_type === "open") {
              return group.closed === false;
            }
          });

    let filteredByAvatarColors =
      selectedFilter.avatar_colors === "all"
        ? filteredByTypeOfGroup
        : filteredByTypeOfGroup.filter(
            (group: any) => group.avatar_color === selectedFilter.avatar_colors
          );

    let filteredByHavingFriends =
      selectedFilter.having_friends === "all"
        ? filteredByAvatarColors
        : filteredByAvatarColors.filter((group: any) => {
            if (selectedFilter.having_friends === "has_friends") {
              return group?.friends && group?.friends !== 0;
            }

            if (selectedFilter.having_friends === "no_friends") {
              return !group?.friends || group?.friends.length === 0;
            }
          });

    setFilteredData(filteredByHavingFriends);
  };

  const resetFilter = () => {
    setSelectedFilter((prevState: any) => {
      return {
        ...prevState,
        avatar_colors: "all",
        group_type: "all",
        having_friends: "all",
      };
    });

    setFilteredData(groups);
  };

  const filter = (stateKey: string, key: string) => {
    setSelectedFilter((prevState: any) => {
      return {
        ...prevState,
        [stateKey]: key,
      };
    });
  };

  return (
    <GroupsContext.Provider
      value={{
        groups,
        selectList,
        filter,
        submitFilter,
        filteredData,
        resetFilter,
        selectedFilter,
      }}
    >
      {children}
    </GroupsContext.Provider>
  );
};
