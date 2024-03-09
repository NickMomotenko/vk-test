import { GroupsProvider } from "./context/GroupsContext";

import { Groups } from "./containers/Groups";

export const App = () => {
  return (
    <GroupsProvider>
      <Groups />
    </GroupsProvider>
  );
};
