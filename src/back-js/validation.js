
const URL_REGEX =
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

const FROM_URL_REGEX = /^\W*(?:[a-zA-Z0-9-]{6,}\W*)$/;
export function validateEasyLink(link) {
  if (!link.toUrl || !URL_REGEX.test(link.toUrl)) return { result: false, code: "VL-0001" };

  return { result: true };
}


export function validateComplexLink(link) {
  if (!link.toUrl || !URL_REGEX.test(link.toUrl)) return { result: false, code: "VL-0001" };
  if (!link.fromUrl || !FROM_URL_REGEX.test(link.fromUrl)) return { result: false, code: "VL-0002" };
  if (link.description && link.description.length > 300) return { result: false, code: "VL-0003" };
  if (link.password && link.password.length < 4) return { result: false, code: "VL-0004" };
  if (link.numMaxClicks && link.numMaxClicks <= 0) return { result: false, code: "VL-0005" };

  return { result: true };
}