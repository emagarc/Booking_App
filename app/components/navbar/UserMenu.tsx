"use client";

import { useRouter } from "next/navigation";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";

import { useCallback, useState } from "react";
import { signOut } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai";

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

interface UserMenuProps {
    currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const onRent = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        rentModal.onOpen();


    }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
        <div className="flex flex-row items-center gap-3">
            <div
                onClick={onRent}
                className="
                    hidden md:block text-sm
                    font-semibold py-3 px-4
                    hover:bg-neutral-100
                    transition cursor-pointer
                    rounded-full
                "
            >
                Airbnb your home
            </div>
            <div
                onClick={toggleOpen}
                className="
                    p-4 md:py-1 md:px-2 items-center 
                    border-[1px] gap-3 rounded-full
                    border-neutral-200 cursor-pointer
                    flex flex-row hover:shadow-md
                    transition
                "
            >
                <AiOutlineMenu />
                <div className="hidden md:block">
                    <Avatar src={currentUser?.image}/>
                </div>
            </div>
        </div>
        {isOpen && (
            <div
                className="
                    absolute rounded-xl shadow-md
                    w-[40vw] md:w-3/4 bg-white
                    overflow-hidden right-0 top-12
                    text-sm
                "
            >
                <div className="flex flex-col cursor-pointer">
                    {currentUser ? (
                        <>
                            <MenuItem
                                onClick={() => router.push("/trips")}
                                label="My trips"
                            />
                            <MenuItem
                                onClick={() => router.push("/favorites")}
                                label="My favorites"
                            />
                            <MenuItem
                                onClick={() => router.push("/reservations")}
                                label="My reservations"
                            />
                            <MenuItem
                                onClick={() => router.push("/properties")}
                                label="My properties"
                            />
                            <MenuItem
                                onClick={rentModal.onOpen}
                                label="Airbnb my home"
                            />
                            <hr />
                            <MenuItem
                                onClick={() => signOut()}
                                label="Logout"
                            />
                        </>
                    ) : (
                        <>
                            <MenuItem
                                onClick={loginModal.onOpen}
                                label="Login"
                            />
                            <MenuItem
                                onClick={registerModal.onOpen}
                                label="Sign Up"
                            />
                        </>
                    )}
                </div>
            </div>
        )}
    </div>
  )
}

export default UserMenu;