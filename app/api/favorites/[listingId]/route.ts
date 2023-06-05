import prisma from "../../../libs/prismadb";
import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
    listingId?: string;
}

// Maneja la solicitud POST para agregar un listado a los favoritos del usuario

export async function POST(
    request: Request,
    { params }: {params: IParams}
) {

    // Obtiene el usuario actual

    const currentUser = await getCurrentUser();

    // Verifica si el usuario está autenticado

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
        throw new Error("Invalid ID");
    }

    // Obtiene los IDs de favoritos actuales del usuario y pushea el nuevo

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds.push(listingId);

    // Actualiza los favoritos del usuario en la base de datos y retorna respuesta

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds: favoriteIds
        }
    });

    return NextResponse.json(user);
};

// Realizamos los mismos pasos anterior pero para borrar un anuncio de favoritos

export async function DELETE(
    request: Request,
    { params }: {params: IParams}
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
        throw new Error("Invalid ID");
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds = favoriteIds.filter((id) => id !== listingId);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds
        }
    });

    return NextResponse.json(user);
}