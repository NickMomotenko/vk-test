import { Card, Avatar, Title, Text, Button } from "@vkontakte/vkui";

import "./style.scss";
import { Group } from "../../types/types";
import { useState } from "react";
import { FriendsList } from "../FriendsList";

export const CardBlock: React.FC<Group> = ({
  avatar_color,
  name,
  closed,
  members_count,
  friends,
}) => {
  const [isFriendsListActive, setIsFriendsListActive] =
    useState<boolean>(false);

  let isClosedGroup = !closed ? "открытая" : "закрытая";
  let friendsCounter = friends?.length;

  const toggleFriendsListActive = () => {
    setIsFriendsListActive((prevState) => !prevState);
  };

  return (
    <Card mode="shadow" className="card">
      <div className="card__inner">
        <div className="card__avatar">
          <Avatar
            size={100}
            style={{ background: avatar_color }}
            initials={name.charAt(0)}
          />
        </div>
        <div className="card__content">
          <Title level="1">{name}</Title>
          <Title level="3">Группа {isClosedGroup}</Title>
          {members_count !== 0 && (
            <Text weight="1">Подписчики: {members_count}</Text>
          )}
        </div>
        {friends && (
          <div className="card__friend">
            <Button onClick={toggleFriendsListActive}>
              Друзей: {friendsCounter}
            </Button>
            <div className="card__friend-list">
              {friends && isFriendsListActive && <FriendsList data={friends} />}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
