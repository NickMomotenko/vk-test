import { FormItem, NativeSelect } from "@vkontakte/vkui";
import { useState } from "react";

type SelectProps = {
  data: any[];
  labelText?: string;
};

export const Select: React.FC<SelectProps> = ({ data = [], labelText }) => {
  const [value, setValue] = useState("");

  let renderData = data.map((item) => Object.keys(item));

  console.log(renderData);
  

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(event.target.value);
  };

  return (
    <FormItem top={labelText} htmlFor="select-id" style={{ padding: `0 16px` }}>
      <NativeSelect id="select-id" className="select" onChange={handleChange}>
        {renderData?.map((key, index) => (
          <option value={key} key={index}>
            {renderData[key]}
          </option>
        ))}
      </NativeSelect>
    </FormItem>
  );
};
