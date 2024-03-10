import { FormItem, NativeSelect } from "@vkontakte/vkui";

type SelectProps = {
  id: string;
  data: {};
  labelText?: string;
  selectedItem: string | any;
  onChangeCallback: (key: string) => void;
};

export const Select: React.FC<SelectProps> = ({
  id,
  data = {},
  labelText,
  selectedItem,
  onChangeCallback,
}) => {
  let renderData = Object.entries(data);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    onChangeCallback(event.target.value);

  return (
    <FormItem top={labelText} htmlFor={id} style={{ padding: `0 16px` }}>
      <NativeSelect
        id={id}
        className="select"
        onChange={handleChange}
        value={selectedItem}
      >
        {renderData?.map(([key, title]: [string, string | any], index) => (
          <option value={key} key={index}>
            {title}
          </option>
        ))}
      </NativeSelect>
    </FormItem>
  );
};
