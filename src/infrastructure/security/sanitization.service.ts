import DOMPurify from "dompurify";

export function sanitize<T>(data: T): T {
  if (typeof data === "string") {
    return DOMPurify.sanitize(data) as T;
  }

  if (Array.isArray(data)) {
    return data.map(sanitize) as T;
  }

  if (typeof data === "object" && data !== null) {
    const sanitized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      sanitized[key] = sanitize(value);
    }
    return sanitized as T;
  }

  return data;
}

export const SanitizationService = Object.freeze({
  sanitize,
});
