import prisma from "../libs/prismadb";

interface IParams {
    listingId?: string;
    userId?: string;
    authorId?: string;
}

export default async function getReservations(
    params: IParams
) {
    try {
        const { listingId, userId, authorId } = params;

        const query: any = {};

        // realizamos el GET de acuerdo a los parametros seleccionados.


        // id de aviso

        if (listingId) {
            query.listingId = listingId;
        }

        // id de usuario

        if (userId) {
            query.userId = userId;
        }

        // id de otros usuarios

        if (authorId) {
            query.listing = { userId: authorId}
        }

        // Ahora buscamos todas las reservas filtradas por query

        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true,
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        // ahora fixeamos algunas props del array de reservas al formato correcto

        const safeReservations = reservations.map(
            (reservation) => ({
                ...reservation,
                createdAt: reservation.createdAt.toISOString(),
                startDate: reservation.startDate.toISOString(),
                endDate: reservation.endDate.toISOString(),
                listing: {
                    ...reservation.listing,
                    createdAt: reservation.listing.createdAt.toISOString(),
                }
            })
        );

        // retornamos las reservas fixeadas.

        return safeReservations;

    } catch(error: any) {
        throw new Error(error);
    }
}