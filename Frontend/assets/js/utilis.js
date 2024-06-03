function getItemWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function splitAddress(address) {
  if (!address) {
    return [null, null];
  }
  const parts = address.split(", ");
  const firstPart = parts[0];
  const secondPart = parts.slice(1).join(", ");
  return [firstPart, secondPart];
}
