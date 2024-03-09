import { useContext } from "react";
import { GroupsContext } from "../../context/GroupsContext";
import { CardBlock } from "../../components/CardBlock";
import { Select } from "../../components/Select";

import { Button } from "@vkontakte/vkui";

import "./style.scss";

export const Groups = () => {
  const { groups, selectList , resetFilter , setSelectedFilter } = useContext(GroupsContext);

  return (
    <div className="groups">
      <div className="groups__head">
        <Select data={selectList?.group_type} labelText="Выбери тип группы" />
        {/* <Select
          data={selectList?.avatar_colors}
          labelText="Выбери цвет аватарок"
        />
        <Select data={selectList?.having_friends} labelText="Наличие друзей" /> */}

        <div className="groups__head-btns">
          <Button style={{ minHeight: 36 }}>Фильтровать</Button>
          <Button style={{ minHeight: 36, marginLeft: 10 }} onClick={resetFilter}>Сбросить</Button>
        </div>
      </div>
      <div className="group__list">
        {groups &&
          groups?.map((group) => <CardBlock key={group.id} {...group} />)}
      </div>
    </div>
  );
};
