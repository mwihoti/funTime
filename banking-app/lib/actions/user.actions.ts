'use server'
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { parseStringify } from "../utils";
import { ID } from "node-appwrite";
import { CountryCode, Products } from "plaid";
import { Languages } from "lucide-react";
import { plaidClient } from "../plaid";

export const signIn = async ({email, password}: signInProps) => {
    try {
        const { account} = await createAdminClient();
        const response = await account.createEmailPasswordSession(email, password)
        return parseStringify(response)

    } catch (error) {
        console.error('Error', error);
    }
}

export const signUp = async (userData : SignUpParams) => {
    const { email, firstName, password, lastName } = userData;
    let newUserAccount;

    try {

        const { account } = await createAdminClient();
    

        newUserAccount = await account.create(
            ID.unique(), 
            email, 
            password, 
            `${firstName} ${lastName}`
          );
      
          if(!newUserAccount) throw new Error('Error creating user')

        const session = await account.createEmailPasswordSession(email, password);
        cookies().set("my-custom-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        })
        return parseStringify(newUserAccount)
        redirect('/account');


    } catch (error) {
        console.error('Error', error);
    }
}

export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        const user =  await account.get();

        return parseStringify(user)

    } catch (error) {
        return null;
    }
}

export const logoutAccount = async () => {
    try {
        const {account} = await createSessionClient();
        cookies().delete('my-custom-session');

        await account.deleteSession('current')
    } catch (error) {
        return null;
    }
}
export const createLinkToken = async (user: User) => {
    try {
        const tokenParams = {
            user : {
                client_user_id: user.$id
            },
            client_name: user.name,
            products: ['auth'] as Products[],
            language: 'en',
            country_codes: ['KE'] as unknown as CountryCode[], 
        }
        const response = await plaidClient.linkTokenCreate(tokenParams);

        return parseStringify({linkToken: response.data.link_token})
    } catch (error) {

    }

}

export const exchangePublicToken = async ({
    publicToken,
    user,
}: exchangePublicTokenProps) => {
    try {
        //Exchange public token for access token and item id
        const response = await plaidClient.itemPublicTokenExchange({
            public_token: publicToken,
        })
        const accessToken = response.data.access_token;
        const itemId = response.data.item_id;

        //Get account information from plaid using access token
        const accountResponse = await plaidClient.accountsGet({
            access_token: accessToken,
        })
     } catch (error) {
    console.error("An error occcurred while creating exchange token", error)
 }
    } 
}