import { Plant } from "@prisma/client";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import type { IronSessionOptions } from "iron-session";

interface Device {
    Ip: string,
    Plant: Plant
}

declare module "iron-session" {
    interface IronSessionData {
        device?: Device;
    }
}

const sessionOptions: IronSessionOptions = {
    password: process.env.COOKIE_SECRET as string,
    cookieName: "hunter_device_session",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
};

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
    const { username } = await req.body;
    console.log('HEREEE')
    //   try {
    //     const {
    //       data: { login, avatar_url },
    //     } = await octokit.rest.users.getByUsername({ username });

    //     const user = { isLoggedIn: true, login, avatarUrl: avatar_url } as User;
    //     req.session.user = user;
    //     await req.session.save();
    //     res.json(user);
    //   } catch (error) {
    //     res.status(500).json({ message: (error as Error).message });
    //   }
}

const handler = withIronSessionApiRoute(loginRoute, sessionOptions);

export { handler as GET, handler as POST }