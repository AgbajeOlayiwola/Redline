import BurgerMenuSVg from "@/component/SVGs/burgerMenuSVg"
import Logosvg from "@/component/SVGs/logosvg"
import { clearProfile } from "@/redux/slices/profileSlice"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { IoLogOutOutline } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import Cover from "../cover"
import styles from "./styles.module.css"
const Navbar = () => {
  const { profile }: any = useSelector((store) => store)
  const navigation = usePathname()
  const dispatch = useDispatch()
  const router = useRouter()
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [mobileMenu, setMobileMenu] = useState(false)
  const handleWindowResize = () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }
  const Logout = async () => {
    await dispatch(clearProfile())
    router.push("/", { scroll: false })
  }
  useEffect(() => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
    handleWindowResize()
    window.addEventListener("resize", handleWindowResize)
    return () => window.removeEventListener("resize", handleWindowResize)
  }, [width])
  console.log(navigation)
  const navData = [
    {
      title: "Dashboard",
      link: "/admin/dashboard",
      active: true,
    },
    {
      title: "Ticket Sales management",
      link: "/admin/transactions",
      active: true,
    },
    {
      title: "Trips",
      link: "/admin/trips",
      active: true,
    },
    {
      title: "User Management",
      link: "#",
      active: true,
    },
    {
      title: "Complaint",
      link: "/admin/complaint",
      active: true,
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
            <Link href="/admin/dashboard">
              <Logosvg wid="78" hei="32" />
            </Link>
          </div>
          {width > 900 ? (
            <>
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
                <Link href="/admin/profile">
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
                </Link>
                <div>
                  <h1>{profile?.user?.fullName}</h1>
                  <p>{profile?.user?.role.replace("_", " ")}</p>
                </div>
                <IoLogOutOutline onClick={() => Logout()} />
              </div>
            </>
          ) : (
            <div className={styles.mobileMenu}>
              <BurgerMenuSVg onClick={() => setMobileMenu((prev) => !prev)} />
              {mobileMenu ? (
                <>
                  <div className={styles.MobilenavLinks}>
                    {navData?.map((item, index) => {
                      return (
                        <p
                          key={index}
                          id={
                            navigation === item?.link
                              ? styles.linkactive
                              : styles.linkInactive
                          }
                          className={
                            item?.active ? styles.active : styles.inactive
                          }
                        >
                          <Link href={item?.link}> {item?.title}</Link>
                        </p>
                      )
                    })}
                  </div>
                  <div className={styles.userSect}>
                    <Link href="/admin/profile">
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
                    </Link>
                    <div>
                      <h1>{profile?.user?.fullName}</h1>
                      <p>{profile?.user?.role.replace("_", " ")}</p>
                    </div>
                    <IoLogOutOutline />
                  </div>
                </>
              ) : null}
            </div>
          )}
        </div>
      </Cover>
    </div>
  )
}

export default Navbar
