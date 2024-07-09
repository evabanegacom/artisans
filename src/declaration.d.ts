declare module "psd.js" {
  export default class PSD {
    static fromArrayBuffer(arrayBuffer: ArrayBuffer): Promise<PSD>;
    image: {
      toPng(): Blob;
    };
  }
}

declare module 'psd'
declare module 'file-saver'