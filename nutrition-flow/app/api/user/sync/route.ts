import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/app/lib/prisma";

//checks whether user exists in database
export async function POST() {
	try {
		//check user authentication
		const user = await currentUser();
		if (!user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		//look up user in DB using Clerk ID
		const existingUser = await prisma.user.findUnique({
			where: { id: user.id },
		});

		//if user exists, return success
		if (existingUser) {
			return NextResponse.json({ synced: true, user: existingUser });
		}

		//if user is authenticated but not found in DB, prompt client to create account
		return NextResponse.json(
			{
				synced: false,
				error: "Account not found",
				message: "Account does not exist. Please create an account.",
				action: "signup",
			},
			{ status: 404 }
		);
	} catch (error) {
		console.error("User Sync Error:", error);
		return NextResponse.json({ error: "Failed to sync user" }, { status: 500 });
	}
}