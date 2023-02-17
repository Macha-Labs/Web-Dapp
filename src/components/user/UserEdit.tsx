import useLensProfileUpdate from "@/hooks/lens/useLensProfileUpdate";
import LayoutInputs from "@/layouts/options/LayoutInputs";
import { Row } from "@/styles/StyledComponents";
import { Avatar } from "@chakra-ui/react";


const UserEdit =  ()=>{
    const hookLensProfileUpdate = useLensProfileUpdate()

    const handleChange = (e: any, val: any) => {
      hookLensProfileUpdate.setUserLens({
        val: e.target.value,
        ...hookLensProfileUpdate?.userLens,
      });
    }; 

    const data = [
        {label: 'Name', value: hookLensProfileUpdate?.userLens?.name, onChange: (e: any) => {handleChange(e, 'name')}, disabled: false},        
        {label:"Bio", value: hookLensProfileUpdate?.userLens?.bio, onChange: (e: any) => {handleChange(e, 'bio')}, disabled: false},
        {label:"Address", value: hookLensProfileUpdate?.userLens?.ownedBy, onChange: (e: any) => {handleChange(e, 'ownedBy')}, disabled: true},
        {label:"Handle", value: hookLensProfileUpdate?.userLens?.handle, onChange: (e: any) => {handleChange(e, 'handle')}, disabled: true}        
    ]
  
return (
  <>
    <Row className="hr-center w-100 m-b-1">
      <Avatar size="2xl" src={hookLensProfileUpdate?.userLens?.image}/>
    </Row>
    <LayoutInputs data={data.slice(0, 2)} style={{ class: "m-b-1" }}/>
    <LayoutInputs data={data.slice(2, 4)} style={{ class: "m-b-1" }} />
    <LayoutInputs data={data.slice(4)} style={{ class: "m-b-1" }} />
  </>
);
}
export default UserEdit;
