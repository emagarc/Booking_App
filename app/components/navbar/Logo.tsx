"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

interface LogoProps {

}

const Logo: React.FC<LogoProps> = ({

}) => {
    const router = useRouter();
  return (
    <div className="flex flex-row items-center text-rose-500 font-extrabold gap-4">
      <Image
          onClick={() => router.push("/")}
          alt="Logo"
          className="hidden md:block cursor-pointer"
          height="42"
          width="45"
          src="/images/logoPlane.png"
      />
      BOOKING APP
    </div>
    
  )
}

export default Logo;