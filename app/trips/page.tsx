import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";

import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import TripsClient from "./TripsClient";

const TripsPage = async () => {

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState 
                    title="Unauthorized"
                    subtitle="Please login"
                />
            </ClientOnly>
        )
    }

    // Hacemos un GET a las reservas o trips del usuario logueado actual.

    const reservations = await getReservations({
        userId: currentUser.id
    });

    // Verificamos si NO tiene.

    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState 
                    title="No trips found"
                    subtitle="looks like you havent reserved any trips."
                />
            </ClientOnly>
        )
    }

    // ... GET

    return (
        <ClientOnly>
            <TripsClient 
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    )

}

export default TripsPage;