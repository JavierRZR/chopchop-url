import { InputComplexLinkData } from "./types/types";

const URL_REGEX: RegExp =
/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(\.[a-zA-Z]{2,})(\/[a-zA-Z0-9-._~:?#@!$&'()*+,;=]*)*\/?$/;

const FROM_URL_REGEX: RegExp = /^\W*(?:[a-zA-Z0-9-]{6,}\W*)$/;
export function validateEasyLink(link: { toUrl: string; userId?: string }) {
  if (!link.toUrl || !URL_REGEX.test(link.toUrl)) return { result: false, code: "VL-0001" };

  return { result: true };
}


export function validateComplexLink(link: InputComplexLinkData) {
  if (!link.toUrl || !URL_REGEX.test(link.toUrl)) return { result: false, code: "VL-0001" };
  if (!link.fromUrl || !FROM_URL_REGEX.test(link.fromUrl)) return { result: false, code: "VL-0002" };
  if (link.description && link.description.length > 300) return { result: false, code: "VL-0003" };
  if (link.password && link.password.length < 4) return { result: false, code: "VL-0004" };
  if (link.numMaxClicks && link.numMaxClicks <= 0) return { result: false, code: "VL-0005" };

  return { result: true };
}