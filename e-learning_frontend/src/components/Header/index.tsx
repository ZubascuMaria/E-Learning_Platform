
const Header = () => {
  
const handleSignOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("role");
};

    return (
      <div className="relative bg-cloud h-16 overflow-visible flex items-center justify-between px-6">
        <div className="h-full flex items-center pl-6">
          <img
            src="/E-DUCATION.svg"
            alt="Logo"
            className="relative -mb-28 h-60"
          />
        </div>
        <div>
        <a href="/" className="mr-8 text-xl text-gray-800 hover:opacity-70 underline">
          Home
        </a>
        <a href="/sign-in" onClick={handleSignOut} className="m-8 text-xl text-gray-800 hover:opacity-70 underline">
          Sign out
        </a>
        </div>
      </div>
    );
  };
  
  export default Header;
  