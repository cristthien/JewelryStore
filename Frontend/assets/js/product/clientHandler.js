document.addEventListener("DOMContentLoaded", () => {
  const user = getItemWithExpiry("user");
  const buyBtn = document.querySelector(".product-detail__buy-btn");
  const sizeSelector = document.getElementById("sel-size");
  const slug = buyBtn.value;

  //controller

  buyBtn.addEventListener("click", async () => {
    if (!user) {
      window.location.href = "/login";
    }
    let size;
    const { token } = user;
    if (sizeSelector) {
      size = sizeSelector.options[sizeSelector.selectedIndex].value;
      if (size === "Choose Size") {
        alert("Please select a size.");
      } else {
        try {
          const response = await axios.post(
            `${SERVER}/cart`,
            // { slug: slug, size: size, quantity: 1 },
            {
              slug: slug,
              size: size,
              quantity: 1,
              more: true,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.error) {
            alert(response.data.message);
          } else {
            window.location.reload();
          }
        } catch (error) {
          console.error("Error adding to cart:", error);
        }
      }
    } else {
      try {
        const response = await axios.post(
          `${SERVER}/cart`,
          { slug: slug, quantity: 1, more: true },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.error) {
          alert(response.data.message);
        } else {
          window.location.reload();
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  });
});
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
