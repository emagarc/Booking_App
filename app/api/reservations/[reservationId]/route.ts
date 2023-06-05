import prisma from "../../../libs/prismadb";
import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
    reservationId?: string;
}

// Ruta que cancela una reserva realizada.

export async function DELETE(
    request: Request,
    { params }: { params: IParams}
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { reservationId } = params;

    if (!reservationId || typeof reservationId !== "string") {
        throw new Error("Invalid ID");
    }

    // Cancelamos la reserva, asegurandonos que sea una reserva creada por el usuario actual.

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                { userId: currentUser.id},
                { listing: { userId: currentUser.id }}
            ]
        }
    });

    return NextResponse.json(reservation);
}