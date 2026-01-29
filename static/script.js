async function processImage() {
  const input = document.getElementById("imageInput");
  const bgColor = document.getElementById("bgColor").value;
  const result = document.getElementById("result");
  const loading = document.getElementById("loading");

  if (!input.files[0]) {
    alert("Pilih gambar dulu!");
    return;
  }

  loading.style.display = "block";
  result.style.display = "none";

  const formData = new FormData();
  formData.append("image", input.files[0]);

  const response = await fetch("http://127.0.0.1:5000/remove-bg", {
    method: "POST",
    body: formData
  });

  const blob = await response.blob();
  const imgURL = URL.createObjectURL(blob);

  // 1. Load image dari hasil rembg
  const img = new Image();
  img.src = imgURL;

  img.onload = () => {
    // 2. Buat canvas baru
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = img.width;
    canvas.height = img.height;

    // 3. Isi background dengan warna yang dipilih
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 4. Gambar hasil rembg di atas background
    ctx.drawImage(img, 0, 0);

    // 5. Convert ke dataURL
    const finalURL = canvas.toDataURL("image/png");

    // 6. Tampilkan hasil
    result.src = finalURL;
    result.style.display = "block";
    loading.style.display = "none";
  };
}
