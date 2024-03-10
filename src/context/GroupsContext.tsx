import React, { createContext, ReactNode, useEffect, useState } from "react";

import { Group } from "../types/types";

import { getGroups } from "../api/api";

import { debounce } from "../helpers/debounce";
import {
  filterByAvatarColors,
  filterByGroup,
  filterByHavingFriends,
} from "../helpers/filter";

interface GroupsContextProps {
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

interface GroupsProviderProps {
  children: ReactNode;
}

export const GroupsContext = createContext<GroupsContextProps>({
  groups: [],
  filteredData: [],
  isLoading: false,
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
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    debounce(() =>
      getGroups().then(({ data }) => {
        if (data) {
          setGroups(data);
          setIsLoading(false);
        }
      })
    );
  }, []);

  useEffect(() => {
    setSelectList((prevState: any) => {
      return {
        ...prevState,
        avatar_colors: { ...prevState.avatar_colors, ...getAllColors() },
      };
    });

    setFilteredData(groups);
  }, [groups]);

  const getAllColors = () => {
    let otherColors: { [key: string]: string } = {};
    let avatarColors = [
      ...new Set(
        groups
          ?.map((user) => user.avatar_color)
          ?.filter((color) => Boolean(color))
      ),
    ];

    avatarColors.forEach((color: string | undefined) => {
      if (color) {
        if (!otherColors[color]) {
          otherColors[color] = color;
        }
      }
    });

    return otherColors;
  };

  const submitFilter = () => {
    let filteredByTypeOfGroup = filterByGroup(
      groups,
      selectedFilter.group_type
    );

    let filteredByAvatarColors = filterByAvatarColors(
      filteredByTypeOfGroup,
      selectedFilter.avatar_colors
    );

    let filteredByHavingFriends = filterByHavingFriends(
      filteredByAvatarColors,
      selectedFilter.having_friends
    );

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
        isLoading,
      }}
    >
      {children}
    </GroupsContext.Provider>
  );
};
