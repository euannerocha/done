import Header from "../components/Header";
import MainContainer from "../components/MainContainer";
import Modal from "../components/Modal";
import SideContainer from "../components/SideContainer";

function Home() {
    return (
        <div className="">
            <Modal bgColor={'bg-primary'} />
            <Header />
            <MainContainer />
            <SideContainer />
        </div>
    )
}

export default Home;