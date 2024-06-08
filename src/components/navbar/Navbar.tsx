
import "./navbar.scss"

export const Navbar = () => {
    return(
        <div className="navbar">
      <div className="logo">
        <img src="logo.svg" alt="" />
        <span>Chill</span>
      </div>
      <div className="icons">
        <div className="user">
          <img
            src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            alt=""
          />
          <span>Bansua</span>
        </div>
      </div>
    </div>
    )
}