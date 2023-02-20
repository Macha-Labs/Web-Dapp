import { StyledCard } from "@/styles/StyledComponents";
import { Input } from "@chakra-ui/react";

const LayoutInputs = (props:any)=>{
    return (
        <div className={props.style.class}>
            {
                props.data.map((item:any) => {
                    // console.log("propsoflayoutinput",item?.onChangeText);
                    return (
                        <Input placeholder={item?.label} value={item?.value} onChange={(e) => {item?.onChangeText(e.target.value)}} disabled={item.disabled} className="m-b-0-5"/>
                    )
                })
            }
        </div>
    )
}
export default LayoutInputs;