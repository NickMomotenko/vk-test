import { groups } from "../mock/groups";
import { GetGroupsResponse } from "../types/types";

export const getGroups = async (url: string = "") => {
  try {
    let res = await fetch(url);

    let json: GetGroupsResponse = await res.json();

    if (json.result === 0 || !json.data) {
      throw new Error("чего то не так...");
    }

    return json;
  } catch (err) {
    let json: GetGroupsResponse = {
      result: 1,
      data: groups,
    };

    return json;
  }
};
