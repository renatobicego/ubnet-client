"use server";
import { API_URL } from "@/utils/urls";
import axios from "axios";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthUser {
  access_token: string;
  user: User;
}

export async function loginUser(
  email: string,
  password: string,
): Promise<AuthUser | null> {
  try {
    const { data: user }: { data: AuthUser } = await axios.post(
      `${API_URL}/auth/login`,
      {
        email,
        password,
      },
    );
    return user;
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error(error as string);
  }
}

// export async function createUser(userData: {
//   name: string;
//   email: string;
//   password: string;
// }): Promise<User> {
//   // // Check if user already exists
//   // const existingUser = await getUserByEmail(userData.email);

//   // if (existingUser) {
//   //   throw new Error("User already exists");
//   // }

//   // // Hash password
//   // const hashedPassword = await hash(userData.password, 10);

//   // // Create new user
//   const newUser: User = {
//     id: Date.now().toString(),
//     name: userData.name,
//     email: userData.email,
//     password: "",
//   };

//   // Save user to database
//   users.push(newUser);

//   return newUser;
// }

// export async function registerUser(userData: {
//   name: string;
//   email: string;
//   password: string;
// }) {
//   try {
//     // Check if user already exists
//     const existingUser = await getUserByEmail(userData.email);

//     if (existingUser) {
//       return { error: "Email already in use" };
//     }

//     // Create new user
//     const user = await createUser(userData);

//     return { success: true, userId: user.id };
//   } catch (error) {
//     console.error("Registration error:", error);
//     return { error: "Failed to create account" };
//   }
// }
