"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { validateUsername } from "@/lib/validation/username";

type FieldErrors = {
  username?: string;
  email?: string;
  password?: string;
};

export type AuthActionState = {
  errors?: FieldErrors;
  message?: string;
};

function validateCredentials(formData: FormData) {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");
  const errors: FieldErrors = {};

  if (
    !email ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    errors.email = "Enter a valid email address.";
  }

  if (password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  return {
    credentials: { email, password },
    errors,
  };
}

export async function login(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const { credentials, errors } = validateCredentials(formData);

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.signInWithPassword(credentials);

    if (error) {
      return { message: "Email or password is incorrect." };
    }
  } catch {
    return {
      message: "Unable to reach the authentication service. Try again.",
    };
  }

  redirect("/dashboard");
}

export async function signup(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const { credentials, errors } = validateCredentials(formData);
  const usernameResult = validateUsername(formData.get("username"));

  if (usernameResult.error) {
    errors.username = usernameResult.error;
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const { username } = usernameResult;
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.auth.signUp({
      ...credentials,
      options: {
        data: { username },
      },
    });

    if (error) {
      return {
        message:
          "Unable to create the account. The email may already be registered.",
      };
    }

    if (!data.session) {
      return {
        message: "Check your email to finish creating your account.",
      };
    }
  } catch {
    return {
      message: "Unable to reach the authentication service. Try again.",
    };
  }

  redirect("/dashboard");
}

export async function logout() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (data?.claims) {
    await supabase.auth.signOut();
  }

  redirect("/login");
}
