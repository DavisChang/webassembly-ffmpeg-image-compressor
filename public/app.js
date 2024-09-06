// Load FFmpeg
const { createFFmpeg, fetchFile } = FFmpeg;
const ffmpeg = createFFmpeg({ log: true }); // Enable logging for debugging

async function compressImage() {
  const inputFile = document.getElementById("input-file").files[0];
  if (!inputFile) {
    alert("Please select an image file.");
    return;
  }

  const reader = new FileReader();
  reader.onload = async function (e) {
    // Display the original image
    const originalImageURL = URL.createObjectURL(inputFile);
    document.getElementById("original-image").src = originalImageURL;

    // Load FFmpeg.wasm
    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
    }

    // Read the image and write it to FFmpeg.wasm's virtual filesystem
    await ffmpeg.FS("writeFile", "input.png", await fetchFile(inputFile));

    // Run FFmpeg to compress the image (reduce quality to 50%)
    await ffmpeg.run("-i", "input.png", "-q:v", "50", "output.jpg");

    // Read the compressed image from the virtual filesystem
    const data = ffmpeg.FS("readFile", "output.jpg");

    // Convert the compressed image data to a Blob
    const compressedBlob = new Blob([data.buffer], { type: "image/jpeg" });
    const compressedImageURL = URL.createObjectURL(compressedBlob);

    // Display the compressed image
    document.getElementById("compressed-image").src = compressedImageURL;
  };

  reader.readAsArrayBuffer(inputFile);
}
