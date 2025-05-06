// This is a mock database implementation
// In a real application, you would use a database like MongoDB, PostgreSQL, etc.

import { hash } from "bcrypt";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

// In-memory database for demonstration
const users: User[] = [];

export async function getUserByEmail(email: string): Promise<User | null> {
  return users.find((user) => user.email === email) || null;
}

export async function getUserById(id: string): Promise<User | null> {
  return users.find((user) => user.id === id) || null;
}

export async function createUser(userData: {
  name: string;
  email: string;
  password: string;
}): Promise<User> {
  // Check if user already exists
  const existingUser = await getUserByEmail(userData.email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash password
  const hashedPassword = await hash(userData.password, 10);

  // Create new user
  const newUser: User = {
    id: Date.now().toString(),
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
  };

  // Save user to database
  users.push(newUser);

  return newUser;
}

export async function registerUser(userData: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    // Check if user already exists
    const existingUser = await getUserByEmail(userData.email);

    if (existingUser) {
      return { error: "Email already in use" };
    }

    // Create new user
    const user = await createUser(userData);

    return { success: true, userId: user.id };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Failed to create account" };
  }
}
