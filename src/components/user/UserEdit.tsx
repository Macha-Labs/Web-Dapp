import useLensProfileUpdate from "@/hooks/lens/useLensProfileUpdate";
import LayoutInputs from "@/layouts/options/LayoutInputs";
import { Row } from "@/styles/StyledComponents";
import { Avatar } from "@chakra-ui/react";


const UserEdit =  ()=>{
    const hookLensProfileUpdate = useLensProfileUpdate()
    const data = [
        {label: 'Name', value: hookLensProfileUpdate?.userLens?.name},        
        {label:"Bio", value: hookLensProfileUpdate?.userLens?.bio},
        {label:"Post Description", value:'null'},
        {label:"Address", value:null},
        {label:"User Name", value:null}        
    ]
    
return (
  <>
    <Row className="hr-center w-100 m-b-1">
      <Avatar size="2xl" />
    </Row>
    <LayoutInputs data={data.slice(0, 2)} style={{ class: "m-b-1" }} />
    <LayoutInputs data={data.slice(2, 4)} style={{ class: "m-b-1" }} />
    <LayoutInputs data={data.slice(4)} style={{ class: "m-b-1" }} />
  </>
);
}
export default UserEdit;
