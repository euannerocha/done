import logo from "../../assets/done_logo.svg"

function Header() {
    return (
      <div className="bg-transparent w-screen h-16 absolute top-0">
        <img src={logo} alt="logo done." className="ml-10 w-[132px] h-[76px]" />
      </div>
    )
}

export default Header;