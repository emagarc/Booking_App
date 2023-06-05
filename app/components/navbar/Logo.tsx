"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

interface LogoProps {

}

const Logo: React.FC<LogoProps> = ({

}) => {
    const router = useRouter();
  return (
    <Image
        onClick={() => router.push("/")}
        alt="Logo"
        className="hidden md:block cursor-pointer"
        height="45"
        width="45"
        src="/images/logoPlane.png"
    />
  )
}

export default Logo;