import { Link } from "react-router-dom"
import logo from "../../assets/dolphin.png"
import { useAuth } from "../../Context/useAuth"

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <nav className="w-full bg-[#0b0f19] border-b border-gray-800/50 px-6 py-4 flex items-center justify-center font-sans relative z-50">
      <div className="w-full max-w-6xl flex items-center justify-between">

        <div className="flex items-center space-x-10">
          <Link to="/" className="flex items-center space-x-3 group">
            <img src={logo} alt="DOLFIN Logo" className="h-9 object-contain" />
            <span className="text-2xl font-black italic tracking-wider text-emerald-400 font-mono uppercase select-none group-hover:text-emerald-300 transition-colors">
              DOL-FIN
            </span>
          </Link>

          <div className="flex items-center space-x-8">
            <Link
              to="/search"
              className="text-base font-bold text-gray-300 hover:text-emerald-400 transition-colors"
            >
              Search
            </Link>

            {user && (
              <Link
                to="/wallet"
                className="text-base font-bold text-gray-300 hover:text-emerald-400 transition-colors"
              >
                Wallet
              </Link>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-8">
          <span className="text-sm font-bold text-gray-400 tracking-wide">
            Welcome,{" "}
            <span className="text-gray-200 capitalize font-extrabold">
              {user ? user.userName : "Guest"}
            </span>
          </span>

          {user ? (
            <button
              onClick={logout}
              className="py-2.5 px-6 text-sm font-black text-white bg-rose-500 hover:bg-rose-400 rounded-xl shadow-md shadow-rose-500/10 transition-all duration-200 cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="py-2.5 px-6 text-sm font-black text-black bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-md shadow-emerald-500/10 transition-all duration-200 text-center cursor-pointer"
            >
              Login
            </Link>
          )}
        </div>

      </div>
    </nav>
  )
}

export default Navbar