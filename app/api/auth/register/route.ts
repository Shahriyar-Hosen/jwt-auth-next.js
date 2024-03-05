import { getEnvVariable, getErrorResponse } from "@/lib/helpers";
import { prisma } from "@/lib/prisma";
import { signJWT } from "@/lib/token";
import {
  RegisterUserInput,
  RegisterUserSchema,
} from "@/lib/validations/user.schema";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RegisterUserInput;
    const { name, email, password } = RegisterUserSchema.parse(body);

    const hashedPassword = await hash(password, 12);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    const JWT_EXPIRES_IN = getEnvVariable("JWT_EXPIRES_IN");

    const token = await signJWT(
      { sub: user.id },
      { exp: `${JWT_EXPIRES_IN}m` }
    );

    const tokenMaxAge = parseInt(JWT_EXPIRES_IN) * 60;
    const cookieOptions = {
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV !== "development",
      maxAge: tokenMaxAge,
    };

    const response = new NextResponse(
      JSON.stringify({
        status: "success",
        data: { user: { ...user, password: undefined } },
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );

    await Promise.all([
      response.cookies.set(cookieOptions),
      response.cookies.set({
        name: "logged-in",
        value: "true",
        maxAge: tokenMaxAge,
      }),
    ]);

    return response;
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, "Failed validations", error);
    }

    if (error.code === "P2002") {
      return getErrorResponse(409, "User with that email already exists");
    }

    return getErrorResponse(500, error.message);
  }
}
