import { gzip } from "zlib";
import { promisify } from "util";

const gzipAsync = promisify(gzip);

export async function compress(data: string): Promise<Buffer> {
  return gzipAsync(data);
}
