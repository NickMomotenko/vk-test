import { groups } from "../mock/groups";
import { GetGroupsResponse } from "../types/types";

export const getGroups = async (url: string = "") => {
  try {
    let res = await fetch(url);

    let json: GetGroupsResponse = await res.json();

    return json;
  } catch (err) {
    let json: GetGroupsResponse = {
      result: 1,
      data: groups,
    };

    return json;
  }
};
