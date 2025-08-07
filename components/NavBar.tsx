import { BotMessageSquare } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"

const NavBar = ({ setOpenDialog} :{
    setOpenDialog: (value: boolean) => void
}) => {


    const handleOpenDialog = () => {
        setOpenDialog(true)
        }
    

  return (
    <nav className="navbar ">
        <Link href="/" >
        <div className="rounded-full bg-peach-dark-200 size-14 mx-auto flex justify-center items-center">
            <BotMessageSquare size={32} className="text-white" />
          </div>
        </Link>
        <Button className="bg-peach-dark-200 text-warm-gray hover:bg-peach-dark rounded-4xl py-2 px-4" onClick={handleOpenDialog} >
        Upload Resume
        </Button>
    </nav>
  )
}

export default NavBar
