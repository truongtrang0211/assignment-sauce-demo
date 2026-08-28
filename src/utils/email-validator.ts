export interface EmailValidationResult {
  validEmails: string[];
  invalidEmails: string[];
  duplicateEmails: string[];
}

export function validateEmailList(emails: string[]): EmailValidationResult {
  const strictEmailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  const validEmails: string[] = [];
  const invalidEmails: string[] = [];
  const duplicateSet = new Set<string>();
  const seenSet = new Set<string>();

  for (const rawEmail of emails) {
    const email = rawEmail.trim();

    if (seenSet.has(rawEmail)) {
duplicateSet.add(rawEmail);
    } else {
      seenSet.add(rawEmail);
    }

    if (rawEmail.includes(' ') || rawEmail !== rawEmail.toLowerCase() || !strictEmailRegex.test(email)) {
      invalidEmails.push(rawEmail);
    } else {
      validEmails.push(rawEmail);
    }
  }

  return {
    validEmails,
    invalidEmails,
    duplicateEmails: Array.from(duplicateSet)
  };
}
      