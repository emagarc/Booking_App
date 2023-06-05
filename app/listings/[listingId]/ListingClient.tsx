"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

import { useCallback, useEffect, useMemo, useState } from "react";
import { SafeListing, SafeUser, SafeReservation } from "@/app/types";
import { categories } from "../../components/navbar/Categories";
import toast from "react-hot-toast";
import { Range } from "react-date-range";

import Container from "@/app/components/Container";
import ListingHead from "../../components/listings/ListingHead";
import ListingInfo from "../../components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";

import useLoginModal from "@/app/hooks/useLoginModal";

import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";

const InitialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection"
}

interface ListingClientProps {
    reservations?: SafeReservation[];
    listing?: SafeListing & {
        user: SafeUser
    };
    currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
    reservations = [],
    listing,
    currentUser
}) => {
    
    const loginModal = useLoginModal();
    const router = useRouter();

    // creamos la constante que va a iterar sobre reservations y verifica si las fechas están tomadas.

    const disabledDates = useMemo(() => {

        let dates: Date[] = [];

        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            });

            dates = [...dates, ...range];
        });

        return dates;

    }, [reservations]);

    // Creamos los estados necesarios para controlar la reserva.

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing?.price);
    const [dateRange, setDateRange] = useState<Range>(InitialDateRange);

    // Funcion que crea la reserva

    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        setIsLoading(true);

        axios.post("/api/reservations", {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        })
        .then(() => {
            toast.success("Listing reserved!");
            setDateRange(InitialDateRange);
            router.push("/trips");
        })
        .catch(() => {
            toast.error("Something went wrong.");
        })
        .finally(() => {
            setIsLoading(false);
        })

    }, [
        totalPrice,
        dateRange,
        listing?.id,
        router,
        currentUser,
        loginModal
    ]);

    // Creamos un useEffect que setea el precio de la reserva

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {

            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            );

            if (dayCount && listing?.price) {
                setTotalPrice(dayCount * listing.price);
            } else {
                setTotalPrice(listing?.price)
            }
        }
    }, [dateRange, listing?.price]);

    const category = useMemo(() => {
        return categories.find((item) => item.label === listing?.category);
    }, [listing?.category]);



  return (
    <Container>
        <div className="max-w-screen-lg mx-auto">
            <div className="flex flex-col gap-6">
                <ListingHead 
                    title={listing?.title ?? ""}
                    imageSrc={listing?.imageSrc ?? ""}
                    locationValue={listing?.locationValue ?? ""}
                    id={listing?.id ?? ""}
                    currentUser={currentUser}
                />
                <div
                    className="
                        grid grid-cols-1
                        md:grid-cols-7
                        md:gap-10 mt-6
                    "
                >
                    <ListingInfo 
                        user={listing?.user}
                        category={category}
                        description={listing?.description}
                        roomCount={listing?.roomCount}
                        guestCount={listing?.guestCount}
                        bathroomCount={listing?.bathroomCount}
                        locationValue={listing?.locationValue ?? ""}
                    />
                    <div
                        className="
                            order-first mb-10
                            md:order-last md:col-span-3
                        "
                    >
                        <ListingReservation 
                            price={listing?.price}
                            totalPrice={totalPrice}
                            onChangeDate={(value) => setDateRange(value)}
                            dateRange={dateRange}
                            onSubmit={onCreateReservation}
                            disabled={isLoading}
                            disabledDates={disabledDates}
                        />
                    </div>
                </div>
            </div>
        </div>
    </Container>
  )
}

export default ListingClient;