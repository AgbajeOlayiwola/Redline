import Logosvg from "@/component/SVGs/logosvg"
import Image from "next/image"
import Link from "next/link"
import Cover from "../cover"
import styles from "./styles.module.css"

const Navbar = () => {
  const navData = [
    {
      title: "Dashboard",
      link: "/admin/dashboard",
    },
    {
      title: "Ticket sales",
      link: "/admin/ticket-sales",
    },
    {
      title: "Payment",
      link: "/admin/payment",
    },
    {
      title: "Complaint",
      link: "/admin/complaint",
    },
    {
      title: "Agents",
      link: "/admin/agents",
    },
    {
      title: "Ticket management",
      link: "/admin/ticket-management",
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
                <p key={index}>
                  <Link href={item?.link}> {item?.title}</Link>
                </p>
              )
            })}
          </div>
          <div className={styles.userSect}>
            <Image
              src="/images/user_avatar.png"
              width={32}
              height={32}
              alt="user"
            />
            <div>
              <h1>Temidayo Odugbetan</h1>
              <p>Super admin</p>
            </div>
          </div>
        </div>
      </Cover>
    </div>
  )
}

export default Navbar
