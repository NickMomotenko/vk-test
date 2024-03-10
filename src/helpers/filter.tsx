import { Group } from "../types/types";

export const filterKey = {
  group_type: "group_type",
  avatar_colors: "avatar_colors",
  having_friends: "having_friends",
};

export const filterByGroup = (data: Group[], filterName: string) => {
  return filterName === "all"
    ? data
    : data.filter((group: Group) => {
        if (filterName === "close") {
          return group.closed === true;
        }

        if (filterName === "open") {
          return group.closed === false;
        }
      });
};

export const filterByAvatarColors = (data: Group[], filterName: string) => {
  return filterName === "all"
    ? data
    : data.filter((group: Group) => group.avatar_color === filterName);
};

export const filterByHavingFriends = (data: Group[], filterName: string) => {
  return filterName === "all"
    ? data
    : data.filter((group: Group) => {
        if (filterName === "has_friends") {
          return group?.friends && group?.friends.length !== 0;
        }

        if (filterName === "no_friends") {
          return !group?.friends || group?.friends.length === 0;
        }
      });
};
