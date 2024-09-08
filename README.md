# WebAssembly FFmpeg Image Compressor + Compile Emscripten from the command line

WebAssembly FFmpeg Image Compressor is a web-based tool that allows you to compress images directly in the browser using FFmpeg.wasm—a WebAssembly version of FFmpeg. You can use this project to compress images without needing to install or run FFmpeg on your local machine, making it suitable for client-side image processing.


Compile your first Emscripten examples from the command line. Folder webAssembly.

## Features
- Client-side compression: Compress images in the browser using WebAssembly without server-side processing.
- Minimal quality loss: Compress images with high-quality settings to reduce file size while maintaining visual fidelity.
- Cross-format support: Works with various image formats like JPEG, PNG, and WebP.

## How It Works
This project uses FFmpeg.wasm to provide a simplified API for working with multimedia files in the browser. Users can upload an image, compress it, and download the compressed version—all without the need for server-side code.

### Steps to Use FFmpeg.wasm to Compress an Image:
- Add FFmpeg.wasm to Your Project:
  - Include FFmpeg.wasm via a CDN or download it locally.
- Load and Compress an Image Using FFmpeg:
  - Use FFmpeg's WebAssembly API to process and compress the image.
- Display Both the Original and Compressed Images:
  - Show both the original and the compressed image along with their sizes to provide a comparison.


### Getting Start
To start the project, follow these commands:
```
$ npm i
$ npm run start
```
This will set up the development server and launch the application.

### Include FFmpeg.wasm
First, include FFmpeg.wasm in your project by either downloading it or using a CDN.

```html
<!-- Add FFmpeg.wasm via CDN -->
<script src="https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.10.0/dist/ffmpeg.min.js"></script>

```
For more detailed information, visit the official documentation: [FFmpeg.wasm Documentation](https://ffmpegwasm.netlify.app/docs/getting-started/usage).


### HTML Structure
Create a basic HTML structure with a file input to allow users to upload an image. You will also need two image elements: one to display the original image and another for the compressed image.

### JavaScript for Image Compression
Use FFmpeg.wasm to load the image, compress it, and display both the original and compressed versions of the image.

### Adjust Image Size Slightly
Compress an image without visible quality degradation is to slightly reduce the image’s resolution. A small reduction in dimensions (e.g., scaling down by 5% or 10%) can significantly reduce file size while having a minimal visual impact.

Example of Reducing Image Dimensions by 10%:
```js
await ffmpeg.run('-i', 'input.png', '-vf', 'scale=iw*0.9:ih*0.9', 'output.jpg');
```
This command reduces both the width (iw) and height (ih) by 10%.


### Cross-Origin Isolation
To use SharedArrayBuffer, your server must serve the following HTTP headers for cross-origin isolation

- Cross-Origin-Opener-Policy: same-origin
- Cross-Origin-Embedder-Policy: require-corp


Make sure these headers are configured on your server to allow WebAssembly to function properly. If you're using Express.js, here’s an example:

```js
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});
```