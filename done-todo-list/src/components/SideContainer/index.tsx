import RingProgress from "../Progress";

function SideContainer() {
    return (
        <div className="bg-primary flex-col justify-center rounded-tr-[24px] rounded-br-[24px] w-[32vw] absolute left-0 top-28 h-screen">
            <h3 className="flex mb-10 mt-28 w-[80%] ml-10 font-bebas text-5xl text-white">HERE IS THE STATUS OF YOUR TASKS!</h3>
            <RingProgress />
        </div>
    )
}

export default SideContainer;