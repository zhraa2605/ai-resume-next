'use client';

import { account, databases } from './appwrite';
import { ID, Query } from 'appwrite';

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const USERS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!;


type SignUpInput = {
  name: string;
  email: string;
  password: string;
};

type logInInput = {
  email: string;
  password: string;
}
// // ✅ Create user profile in database
// const createUserProfile = async ({
//   userId,
//   name,
//   email,
// }: {
//   userId: string;
//   name: string;
//   email: string;
// }) => {
//   try {
//     await databases.createDocument(DB_ID, USERS_COLLECTION_ID, ID.unique(), {
//       userId,
//       name,
//       email,
//     });
//   } catch (error) {
//     console.error('Failed to create user profile:', error);
//     throw error;
//   }
// };



// ✅ Sign up + create user profile
export const signUp = async ({ email, password, name }: SignUpInput) => {
  try {
    const user = await account.create(ID.unique(), email, password, name);
    console.log("user created")
    await databases.createDocument(DB_ID, USERS_COLLECTION_ID, ID.unique(), {
      name,
      email,
    });
    return user;

  } catch (error) {
    throw error;
  }

};

export const logIn = async ({email , password} : logInInput) => {
  try {
    const user = await account.createEmailPasswordSession(
      email,
      password
    )
    console.log("user logged in function")
    return user;
    } catch (error) {
      throw error;
      }
    }


// 🔍 Fetch user profile by userId
export const getUserProfile = async (userId: string) => {
  try {
    const res = await databases.listDocuments(DB_ID, USERS_COLLECTION_ID, [
      Query.equal('', userId),
      Query.limit(1),
    ]);
    return res.documents[0] || null;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    throw error;
  }
};
