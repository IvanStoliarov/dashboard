const USERNAME_PATTERN = /^[A-Za-z0-9_ -]+$/;

type UsernameValidationResult = {
  username: string;
  error?: string;
};

export function validateUsername(
  value: FormDataEntryValue | null,
): UsernameValidationResult {
  const username = typeof value === 'string' ? value.trim() : '';

  if (username.length < 3 || username.length > 30) {
    return {
      username,
      error: 'Username must be between 3 and 30 characters.',
    };
  }

  if (!USERNAME_PATTERN.test(username)) {
    return {
      username,
      error: 'Use only letters, numbers, spaces, underscores, and hyphens.',
    };
  }

  return { username };
}
