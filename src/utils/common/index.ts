export const isEmail = (email: string): boolean => {
  const re =
    // eslint-disable-next-line no-useless-escape
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  if (!email) return false;

  const emailParts: string[] = email.split('@');

  if (emailParts.length !== 2) return false;

  const account: string = emailParts[0];
  const address: string = emailParts[1];

  if (account.length > 64) return false;
  if (address.length > 255) return false;

  const domainParts: string[] = address.split('.');

  if (domainParts.some((part: string) => part.length > 63)) {
    return false;
  }

  return re.test(String(email).toLowerCase());
};
