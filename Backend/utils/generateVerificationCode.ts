import crypto from 'crypto';

export const generateVerificationCode = (
  length: number = 6,
  type: 'alphanumeric' | 'numeric' | 'alphabetic' = 'alphanumeric'
): string => {
  let characters: string;
  switch (type) {
    case 'numeric':
      characters = '0123456789';
      break;
    case 'alphabetic':
      characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      break;
    case 'alphanumeric':
    default:
      characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  }

  const randomBytes = crypto.randomBytes(length);
  const result = new Array(length);
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result[i] = characters[randomBytes[i] % charactersLength];
  }

  return result.join('');
};