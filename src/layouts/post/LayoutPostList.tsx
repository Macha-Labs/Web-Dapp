import LayoutCard from "../LayoutCard";
import LayoutPostCard from "./LayoutPostCard";
import LayoutPostLoading from "./LayoutPostLoading";

interface Props {
    [key: string]: any
}



const LayoutPostList = ({ ...props }) => {

    const template = () => {
        if (props?.isLoading) {
            return (
                <LayoutPostLoading />
            )
        } else if (props?.list?.length) {
            return (
                <>
                    {
                        props.list.map((item, index) =>
                            <LayoutPostCard item={item} />
                        )
                    }
                </>
            )
        } else {
            return (
                <LayoutCard size="lg" hr='center' vr='center' children={'No Posts Yet'}></LayoutCard>
            )
        }
    }

    return (
        <>
            {template()}
        </>
    )
}

export default LayoutPostList;