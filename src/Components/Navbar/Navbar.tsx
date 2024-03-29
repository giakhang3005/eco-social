import LoginBtn from "../LoginBtn/LoginBtn"
import ThemeToggle from "../ThemeToggle/ThemeToggle"
import "./Navbar.scss"

type Props = {}

const Navbar = (props: Props) => {
  return (
    <div className="navPC">
        <LoginBtn showText={false} style={Object.assign({border: 'none'})} />
        <ThemeToggle style={Object.assign({bottom: '20px'})} />
    </div>
  )
}

export default Navbar