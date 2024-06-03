document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("imagesInput")
    .addEventListener("change", function (event) {
      const imageContainer = document.getElementById("img-container");
      const images = Array.from(event.target.files); // Convert FileList to Array
      const lengthImage = images.length;

      if (lengthImage === 0) {
        return;
      }

      if (lengthImage > 12) {
        alert("Any image beyond 12 is discarded");
        // Discard images beyond the 12th
        images = images.slice(0, 12);
      }

      // Clear previous images
      imageContainer.innerHTML = "";

      images.forEach((image, index) => {
        const reader = new FileReader();
        reader.onload = function (e) {
          const imgElement = document.createElement("img");
          imgElement.src = e.target.result;
          imgElement.className = "img-fluid displayImage";
          imgElement.alt = `Image ${index + 1}`;

          const colDiv = document.createElement("div");

          colDiv.className = index === 0 ? "col-12" : "col-6";
          colDiv.style.marginTop = index === 0 ? "0" : "10px";
          colDiv.appendChild(imgElement);

          imageContainer.appendChild(colDiv);
        };
        reader.readAsDataURL(image);
      });
    });
});
