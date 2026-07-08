import logo from "../../assets/images/logo.png";

function Navbar() {
  return (
    <header className="flex justify-between items-center p-6">
      

      <img
        src={logo}
        className="w-12 h-12 rounded-full"
        alt="logo"
      />
    </header>
  );
}

export default Navbar;