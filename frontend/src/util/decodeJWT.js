export const decodeJWT = (token) => {
  try {
    const [header, payload, signature] = token.split(".");
    const decodedPayload = JSON.parse(atob(payload));
    console.log("Decoded Payload:", decodedPayload);
    return decodedPayload;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
