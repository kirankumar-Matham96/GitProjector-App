export const decodeJWT = (token) => {
  try {
    const [header, payload, signature] = token.split(".");
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload;
  } catch (error) {
    console.error(error);
    return null;
  }
};
