export const generateRandomString = () => {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  return (
    characters.charAt(Math.floor(Math.random() * characters.length)) +
    Math.random().toString(36).substring(2, 6)
  );
};
