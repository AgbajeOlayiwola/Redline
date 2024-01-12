"use client"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"
import Navbar from "../navbar"
const Layout = ({ children }: { children: ReactNode }) => {
  const navigation = usePathname()
  console.log(navigation)
  return (
    <>
      {navigation.includes("admin") ? <Navbar /> : null}
      {children}
    </>
  )
}

export default Layout
