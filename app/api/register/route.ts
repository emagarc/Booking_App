import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";

import bcrypt from "bcrypt";

// Esta ruta crea un nuevo usuario mediante el form de registro

export async function POST(
    request: Request
) {
    const body = await request.json();
    const {
        email,
        name,
        password
    } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma?.user.create({
        data: {
            email,
            name, 
            hashedPassword
        }
    });

    return NextResponse.json(user);
     
};