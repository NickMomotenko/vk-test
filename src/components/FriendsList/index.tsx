import { Avatar, Card, SimpleCell } from "@vkontakte/vkui";
import { User } from "../../types/types";

type FriendsListProps = {
  data: User[];
};

export const FriendsList: React.FC<FriendsListProps> = ({ data }) => {
  return (
    <div className="friends">
      <Card mode="shadow">
        {data?.map(({ first_name, last_name }, index) => (
          <SimpleCell key={index} before={<Avatar src="" size={30} />}>
            {first_name} {last_name}
          </SimpleCell>
        ))}
      </Card>
    </div>
  );
};
