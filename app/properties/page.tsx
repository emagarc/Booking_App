import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {

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

    const listings = await getListings({
        userId: currentUser.id
    });

    // Verificamos si NO tiene.

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState 
                    title="No properties found"
                    subtitle="looks like you have no properties."
                />
            </ClientOnly>
        )
    }

    // ... GET

    return (
        <ClientOnly>
            <PropertiesClient 
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )

}

export default PropertiesPage;