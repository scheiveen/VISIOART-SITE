// Preparo e envio de filmes do portfólio direto do navegador para o Cloudinary.
//
// O plano Free do Cloudinary recusa vídeos acima de 100 MB. Vídeos maiores
// que isso (ou acima de 1080p) são convertidos aqui mesmo no navegador para
// MP4 H.264 1080p sem áudio — no site o portfólio toca sempre mudo.

import api from "../lib/api";

const MAX_UPLOAD_BYTES = 95 * 1024 * 1024; // folga sob o limite de 100 MB
const MAX_DIMENSION = 1920;
const MAX_BITRATE = 8_000_000;
const CHUNK_SIZE = 20 * 1024 * 1024;

export const formatBytes = (bytes) => `${(bytes / 1024 / 1024).toFixed(0)} MB`;

/**
 * Lê o vídeo e, se precisar, converte. `onProgress` recebe 0..1.
 * Retorna { blob, duration, converted }.
 */
export async function prepareVideo(file, onProgress) {
  const {
    ALL_FORMATS,
    BlobSource,
    BufferTarget,
    Conversion,
    Input,
    Mp4OutputFormat,
    Output,
    Quality,
  } = await import("mediabunny");

  const input = new Input({ source: new BlobSource(file), formats: ALL_FORMATS });
  const track = await input.getPrimaryVideoTrack();
  if (!track) throw new Error("Não encontrei uma faixa de vídeo nesse arquivo.");

  const duration = await input.computeDuration();
  const { displayWidth: width, displayHeight: height } = track;
  const tooBig = file.size > MAX_UPLOAD_BYTES;
  const tooLarge = Math.max(width, height) > MAX_DIMENSION;

  if (!tooBig && !tooLarge) {
    onProgress?.(1);
    return { blob: file, duration, converted: false };
  }

  // Bitrate que garante caber no limite, com teto de qualidade de 8 Mbps.
  const bitrate = Math.min(MAX_BITRATE, Math.floor((MAX_UPLOAD_BYTES * 8 * 0.9) / duration));
  const resize = !tooLarge ? {} : width >= height ? { width: MAX_DIMENSION } : { height: MAX_DIMENSION };

  const output = new Output({
    format: new Mp4OutputFormat({ fastStart: "in-memory" }),
    target: new BufferTarget(),
  });
  const conversion = await Conversion.init({
    input,
    output,
    video: {
      ...resize,
      codec: "avc",
      quality: new Quality({ bitrate }),
      forceTranscode: true,
    },
    audio: { discard: true },
  });
  if (!conversion.isValid) {
    throw new Error(
      "Este navegador não consegue converter o vídeo. Use o Google Chrome atualizado " +
        "ou exporte o vídeo em 1080p com menos de 100 MB.",
    );
  }
  conversion.onProgress = (p) => onProgress?.(p);
  await conversion.execute();

  const blob = new Blob([output.target.buffer], { type: "video/mp4" });
  if (blob.size > 100 * 1024 * 1024) {
    throw new Error(`O vídeo convertido ficou com ${formatBytes(blob.size)}, acima do limite de 100 MB.`);
  }
  return { blob, duration, converted: true };
}

function postChunk(url, form, headers, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    Object.entries(headers).forEach(([key, value]) => xhr.setRequestHeader(key, value));
    xhr.upload.onprogress = (e) => e.lengthComputable && onProgress(e.loaded);
    xhr.onload = () => {
      let body = {};
      try {
        body = JSON.parse(xhr.responseText);
      } catch (err) {
        // resposta vazia em partes intermediárias
      }
      if (xhr.status >= 200 && xhr.status < 300) resolve(body);
      else reject(new Error(body.error?.message || `Falha no envio (HTTP ${xhr.status}).`));
    };
    xhr.onerror = () => reject(new Error("Falha de conexão durante o envio."));
    xhr.send(form);
  });
}

/**
 * Envia o vídeo em partes de 20 MB com assinatura gerada pelo backend.
 * Retorna a resposta final do Cloudinary ({ public_id, version, secure_url, duration }).
 */
export async function uploadToCloudinary(blob, onProgress) {
  const { data: sig } = await api.post("/admin/portfolio/upload-signature");
  const uploadId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  let result = null;

  for (let start = 0; start < blob.size; start += CHUNK_SIZE) {
    const end = Math.min(start + CHUNK_SIZE, blob.size);
    const form = new FormData();
    form.append("file", blob.slice(start, end), "filme.mp4");
    form.append("api_key", sig.api_key);
    form.append("timestamp", sig.timestamp);
    form.append("public_id", sig.public_id);
    form.append("signature", sig.signature);
    result = await postChunk(
      sig.upload_url,
      form,
      {
        "X-Unique-Upload-Id": uploadId,
        "Content-Range": `bytes ${start}-${end - 1}/${blob.size}`,
      },
      (loaded) => onProgress?.((start + loaded) / blob.size),
    );
  }
  onProgress?.(1);
  return result;
}

/** URL de um frame do vídeo (para escolher a miniatura). */
export function frameUrl(videoUrl, offset, width = 480, height = 270) {
  return videoUrl
    .replace(
      /\/video\/upload\/(?:(?!v\d+\/)[^/]+\/)?(v\d+\/)/,
      `/video/upload/so_${offset},w_${width},h_${height},c_fill,q_auto,f_auto/$1`,
    )
    .replace(/\.\w+$/, ".jpg");
}

/** Momentos sugeridos para a miniatura, em segundos. */
export function thumbnailOffsets(duration) {
  if (!duration) return [2, 8, 20, 45];
  return [0.1, 0.3, 0.5, 0.7].map((f) => Math.max(1, Math.round(duration * f)));
}
