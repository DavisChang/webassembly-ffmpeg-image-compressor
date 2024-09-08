interface WasmExports extends WebAssembly.Exports {
  // Example addNumber method, modify as needed
  addNumber: (a: number, b: number) => number;
}

class WebAssemblyLoader {
  private static instance: WebAssemblyLoader | null = null;
  private wasmInstance: WebAssembly.Instance | null = null;
  private wasmUrl: string;

  private constructor(wasmUrl: string) {
    this.wasmUrl = wasmUrl;
  }

  public static getInstance(wasmUrl: string): WebAssemblyLoader {
    if (!WebAssemblyLoader.instance) {
      WebAssemblyLoader.instance = new WebAssemblyLoader(wasmUrl);
    }
    return WebAssemblyLoader.instance;
  }

  public async loadWasm(): Promise<
    WebAssembly.Instance & { exports: WasmExports }
  > {
    if (!this.wasmInstance) {
      const response = await fetch(this.wasmUrl);
      const { instance } = await WebAssembly.instantiateStreaming(response);
      this.wasmInstance = instance;
    }
    return this.wasmInstance as WebAssembly.Instance & { exports: WasmExports };
  }
}

export default WebAssemblyLoader;
