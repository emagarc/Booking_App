"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { SafeReservation, SafeUser } from "../types";

interface TripsClientProps {
    reservations: SafeReservation[];
    currentUser?: SafeUser | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
    reservations,
    currentUser
}) => {

    const router = useRouter();

    // Creamos el estado que nos va a permitir manejar la cancelación de reserva del current User.

    const [deletingId, setDeletingId] = useState("");

    // Creamos la funcion.

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success("Reservation Cancelled");
            router.refresh();
        })
        .catch((error) => {
            toast.error(error?.response?.data?.error);
        })
        .finally(() => {
            setDeletingId("");
        });
    }, [router]);

  return (
    <Container>
        <Heading 
            title="Trips"
            subtitle="Where you've been and where you're going"
        />
        <div
            className="
                mt-10 grid grid-cols-1 sm:grid-cols-2
                md:grid-cols-3 lg:grid-cols-4 gap-8
                xl:grid-cols-5 2xl:grid-cols-6
            "
        >
            {reservations.map((reservation) => (
                <ListingCard 
                    key={reservation.id}
                    data={reservation.listing}
                    reservation={reservation}
                    actionId={reservation.id}
                    onAction={onCancel}
                    disabled={deletingId === reservation.id}
                    actionLabel="Cancel reservation"
                    currentUser={currentUser}
                />
            ))}
        </div>
    </Container>
  )
}

export default TripsClient;