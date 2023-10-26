import prisma from '@/lip/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import requestIp from 'request-ip';

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: '',
      credentials: {},
      async authorize(credentials: any, req: any) {
      
        const detectedIp = requestIp.getClientIp(req);
  console.log('YOYO', detectedIp);
        if (!detectedIp) {
          throw new Error();
        }

        const plant = prisma.authorizedIpAddress.findFirst({
          where: {
            Ip: detectedIp,
          },
          include: {
            Plant: true,
          },
        });

        if (!plant) {
          throw new Error();
        }

        return plant as any;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  pages: {
    signIn: '/auth',
    error: '/unauthorized',
  },
});

export { handler as GET, handler as POST };
