import { useContext } from "react";
import { GroupsContext } from "../../context/GroupsContext";

import { CardBlock } from "../../components/CardBlock";
import { Select } from "../../components/Select";
import { Loader } from "../../components/Loader";

import { Button, Text } from "@vkontakte/vkui";

import { filterKey } from "../../helpers/filter";

import "./style.scss";

export const Groups = () => {
  const {
    filteredData,
    selectList,
    selectedFilter,
    isLoading,
    filter,
    submitFilter,
    resetFilter,
  } = useContext(GroupsContext);

  return (
    <div className="groups">
      <div
        className="groups__head"
        style={{ pointerEvents: isLoading ? "none" : "auto" }}
      >
        <Select
          id="select-groups"
          data={selectList?.group_type}
          labelText="Выбери тип группы"
          selectedItem={selectedFilter?.group_type}
          onChangeCallback={(key: string) => filter(filterKey.group_type, key)}
        />
        <Select
          id="select-avatars"
          data={selectList?.avatar_colors}
          labelText="Выбери цвет аватарок"
          selectedItem={selectedFilter.avatar_colors}
          onChangeCallback={(key: string) =>
            filter(filterKey.avatar_colors, key)
          }
        />
        <Select
          id="select-friends"
          data={selectList?.having_friends}
          labelText="Наличие друзей"
          selectedItem={selectedFilter.having_friends}
          onChangeCallback={(key: string) =>
            filter(filterKey.having_friends, key)
          }
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
        {isLoading ? (
          <Loader />
        ) : filteredData.length ? (
          filteredData?.map((group) => <CardBlock key={group.id} {...group} />)
        ) : (
          <Text style={{ textAlign: "center" }}>Ничего не нашел</Text>
        )}
      </div>
    </div>
  );
};
