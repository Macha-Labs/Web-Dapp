import { Input } from "@chakra-ui/react";

const LayoutInputs = (props: any) => {
  return (
    <div className={props.style.class}>
      {props.data.map((item: any, index: any) => {
        return (
          <Input
            key={index}
            placeholder={item?.label}
            value={item?.value}
            onChange={e => item?.onChange(e.target.value)}
            disabled={item.disabled}
            className="m-b-0-5"
          />
        );
      })}
    </div>
  );
};
export default LayoutInputs;
