import { useEffect } from "react";
import useTodos from "../store/useTodos";
import Header from "../components/Header";
import MainContainer from "../components/MainContainer";
import SideContainer from "../components/SideContainer";

function Home() {
    const init = useTodos((s) => s.init);
    const loading = useTodos((s) => s.loading);

    useEffect(() => { init(); }, [init]);

    return (
        <div>
            <Header />
            {loading ? <div className="p-4">Carregando…</div> : <MainContainer />}
            <SideContainer />
        </div>
    );
}

export default Home;




// tirei o modal daqui
// import Header from "../components/Header";
// import MainContainer from "../components/MainContainer";
// import SideContainer from "../components/SideContainer";

// function Home() {
//     return (
//         <div className="">
//             <Header />
//             <MainContainer />
//             <SideContainer />
//         </div>
//     )
// }

// export default Home;