import {signInEmailPassword} from '@/auth/actions/auth-actions';
import Credentials from "next-auth/providers/credentials"
import {PrismaAdapter} from '@auth/prisma-adapter';
import Google from '@auth/core/providers/google';
import GitHub from 'next-auth/providers/github';
import NextAuth from "next-auth";
import prisma from '@/lib/prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHub,
        Google,
        Credentials({
            credentials: {
                email: { label: "Email", type: 'email' , placeholder: 'youremail@email.com'},
                password: { label: 'Password', type: 'password', placeholder: '*****' },
            },
            async authorize(credentials, request) {

                const user = await signInEmailPassword(credentials.email as string, credentials.password as string);
                if (user) {
                    return user;
                }
                return null;
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async signIn({user, account, profile}) {
            return true;
        },

        async jwt({token, user, account, profile, isNewUser}) {
            const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? 'No email' } });
            if ( !dbUser?.isActive ) {
                throw new Error('User is not active');
            }
            token.roles = dbUser?.roles ?? ['no-roles'];
            token.id = dbUser?.id ?? 'no-uuid';
            return token;
        },

        async session({session, token, user}) {
            console.log(token);
            if ( session && session.user) {
                session.user.roles = token.roles;
                session.user.id = token.id;
            }
            return session;
        }
    }
})
