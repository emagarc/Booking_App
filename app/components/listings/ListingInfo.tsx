"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import dynamic from "next/dynamic";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";

const Map = dynamic(() => import("../Map"), {
    ssr: false
});

interface ListingInfoProps {
    user: SafeUser | undefined;
    description: string | undefined;
    guestCount: number | undefined;
    roomCount: number | undefined;
    bathroomCount: number | undefined;
    locationValue: string 
    category: {
        icon: IconType;
        label: string;
        description: string;
    } | undefined;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
    user,
    description,
    guestCount,
    roomCount,
    bathroomCount,
    locationValue,
    category
}) => {

    const { getByValue } = useCountries();
    const cordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
            <div
                className="
                    text-xl font-semibold gap-2
                    flex flex-row items-center
                "
            >
                <div>Hosted by {user?.name}</div>
                <Avatar src={user?.image}/>
            </div>
            <div
                className="
                    flex flex-row items-center
                    gap-4 font-light text-neutral-500
                "
            >
                <div>
                    {guestCount} guests
                </div>
                <div>
                    {roomCount} rooms
                </div>
                <div>
                    {bathroomCount} bathrooms
                </div>
            </div>
        </div>
        <hr />
        {category && (
            <ListingCategory 
                icon={category.icon}
                label={category.label}
                description={category.description}
            />
        )}
        <hr />
        <div className="text-lg font-light text-neutral-500">
            {description}
        </div>
        <hr />
        <Map center={cordinates}/>
    </div>
  )
}

export default ListingInfo;