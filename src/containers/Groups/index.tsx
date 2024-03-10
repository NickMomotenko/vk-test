import { useContext } from "react";
import { GroupsContext } from "../../context/GroupsContext";
import { CardBlock } from "../../components/CardBlock";
import { Select } from "../../components/Select";

import { Button } from "@vkontakte/vkui";

import "./style.scss";
import { Loader } from "../../components/Loader";

export const Groups = () => {
  const {
    filteredData,
    selectList,
    filter,
    submitFilter,
    resetFilter,
    selectedFilter,
  } = useContext(GroupsContext);

  return (
    <div className="groups">
      <div className="groups__head">
        <Select
          data={selectList?.group_type}
          labelText="Выбери тип группы"
          selectedItem={selectedFilter?.group_type}
          onChangeCallback={(key: string) => filter("group_type", key)}
        />
        <Select
          data={selectList?.avatar_colors}
          labelText="Выбери цвет аватарок"
          selectedItem={selectedFilter.avatar_colors}
          onChangeCallback={(key: string) => filter("avatar_colors", key)}
        />
        <Select
          data={selectList?.having_friends}
          labelText="Наличие друзей"
          selectedItem={selectedFilter.having_friends}
          onChangeCallback={(key: string) => filter("having_friends", key)}
        />
        <div className="groups__head-btns">
          <Button style={{ minHeight: 36 }} onClick={submitFilter}>
            Фильтровать
          </Button>
          <Button
            style={{ minHeight: 36, marginLeft: 10 }}
            onClick={resetFilter}
          >
            Сбросить
          </Button>
        </div>
      </div>
      <div className="group__list">
        {!filteredData.length ? (
          <Loader />
        ) : (
          filteredData?.map((group) => <CardBlock key={group.id} {...group} />)
        )}
      </div>
    </div>
  );
};
