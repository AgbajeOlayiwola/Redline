import Logosvg from "@/component/SVGs/logosvg"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSelector } from "react-redux"
import Cover from "../cover"
import styles from "./styles.module.css"

const Navbar = () => {
  const { profile }: any = useSelector((store) => store)
  const navigation = usePathname()
  console.log(navigation)
  const navData = [
    {
      title: "Dashboard",
      link: "/admin/dashboard",
      active: true,
    },
    {
      title: "Trips",
      link: "#",
      active: false,
    },
    {
      title: "Payment",
      link: "#",
      active: false,
    },
    {
      title: "Complaint",
      link: "#",
      active: false,
    },
    {
      title: "Ticket management",
      link: "/admin/ticket-management",
      active: true,
    },
    {
      title: "Agents",
      link: "/admin/agents",
      active: true,
    },
  ]
  return (
    <div className={styles.nav_bar}>
      <Cover>
        <div className={styles.navCov}>
          <div>
            <Logosvg wid="78" hei="32" />
          </div>
          <div className={styles.navLinks}>
            {navData?.map((item, index) => {
              return (
                <p
                  key={index}
                  id={
                    navigation === item?.link
                      ? styles.linkactive
                      : styles.linkInactive
                  }
                  className={item?.active ? styles.active : styles.inactive}
                >
                  <Link href={item?.link}> {item?.title}</Link>
                </p>
              )
            })}
          </div>
          <div className={styles.userSect}>
            <Image
              src={
                profile?.user?.profileImage == ""
                  ? "/images/user_avatar.png"
                  : profile?.user?.profileImage
              }
              width={32}
              height={32}
              alt="user"
            />
            <div>
              <h1>{profile?.user?.fullName}</h1>
              <p>{profile?.user?.role.replace("_", " ")}</p>
            </div>
          </div>
        </div>
      </Cover>
    </div>
  )
}

export default Navbar
