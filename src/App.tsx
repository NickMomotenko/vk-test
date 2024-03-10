import { GroupsProvider } from "./context/GroupsContext";

import { Groups } from "./containers/Groups";
import { Container } from "./components/Container";

export const App = () => {
  return (
    <GroupsProvider>
      <Container>
        <Groups />
      </Container>
    </GroupsProvider>
  );
};
