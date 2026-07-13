import bcrypt from "bcryptjs";
import { User } from "./auth.model.js";
import { UserRole } from "./auth.interface.js";
import { generateToken } from "../../shared/helpers/jwt.js";

interface RegisterUserInput {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export const registerUser = async (data: RegisterUserInput) => {
  // Check if email already exists
  const existingUser = await User.findOne({ email: data.email });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  // Check if phone already exists
  const existingPhone = await User.findOne({ phone: data.phone });

  if (existingPhone) {
    throw new Error("Phone number already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // Create user
  const user = await User.create({
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    password: hashedPassword,
    role: UserRole.STAFF,
  });

  // Remove password before returning
  const userObject = user.toObject();
  delete userObject.password;

  return userObject;
};

export const loginUser = async (
  email: string,
  password: string
) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(
    user._id.toString(),
    user.role
  );

  return {
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
  };
};