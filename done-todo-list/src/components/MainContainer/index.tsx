import GenericButton from "../Button/GenericButton";
import IconButton from "../Button/IconButton";
import CardContainer from "../Card/CardContainer";

function MainContainer() {
    return (
        <div className="absolute top-28 w-[60vw] flex-row right-10">
            <div className="flex justify-between mb-16">
                <h2>To-do List</h2>
                <div className="flex gap-2">
                    <GenericButton text={"Clean All"} bgColor={"bg-light-red-1"} textColor={"text-dark-red"} onClick={() => { }} />
                    <IconButton text={"A-Z"} bgColor={"bg-light-primary-2"} textColor={"text-primary"} onClick={() => { }} />
                </div>
            </div>
            <CardContainer />
        </div>
    )
}

export default MainContainer;