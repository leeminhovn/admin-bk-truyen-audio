export function getCookie(cookieName) {
  // Split the document.cookie string into individual cookies
  const cookiesArray = document.cookie.split("; ");
  // Iterate through the cookies to find the one with the given name
  for (let i = 0; i < cookiesArray.length; i++) {
    const cookie = cookiesArray[i];
    const [name, value] = cookie.split("=");
    // Remove leading spaces from the cookie name
    const trimmedName = name.trim();
    if (trimmedName === cookieName) {
      // Return the value of the cookie if the name matches
      return value ? JSON.parse(value) : null;
    }
  }
  // Return null if the cookie with the given name is not found
  return null;
}

export function setCookie(name, value, secondsExpires) {
  // Create a new Date object for the expiration date
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + secondsExpires * 1000);
  // Convert the expiration date to the UTC format
  const expires = "expires=" + expirationDate.toUTCString();
  // Encode the name and value of the cookie
  const encodedName = name;
  const encodedValue = JSON.stringify(value);
  // Set the cookie with the specified name, value, and expiration date
  document.cookie = `${encodedName}=${encodedValue}; ${expires}; path=/`;
}

export function deleteCookie(name) {
  // Set the expiration date to a date in the past
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
