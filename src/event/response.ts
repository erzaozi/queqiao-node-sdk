import { Response } from '../types/event/response';

interface ResponseHandler {
  resolve: (value: Response) => void;
  reject: (reason?: Error) => void;
  timeoutId: NodeJS.Timeout;
}

const responseMap = new Map<string, ResponseHandler>();

export function addResponse(
  echo: string,
  timeoutMs?: number,
): Promise<Response> {
  timeoutMs = timeoutMs ?? 5000;

  return new Promise((resolve, reject) => {
    if (!echo) {
      reject('echo is required');
      return;
    }

    if (responseMap.has(echo)) {
      const existing = responseMap.get(echo)!;
      clearTimeout(existing.timeoutId);
      existing.reject(new Error('Request replaced'));
      responseMap.delete(echo);
    }

    const timeoutId = setTimeout(() => {
      if (responseMap.has(echo)) {
        reject('API response timeout');
        responseMap.delete(echo);
      }
    }, timeoutMs);

    responseMap.set(echo, { resolve, reject, timeoutId });
  });
}

export function handleResponse(echo: string, response: Response): boolean {
  const handler = responseMap.get(echo);
  if (!handler) {
    return false;
  }

  clearTimeout(handler.timeoutId);
  handler.resolve(response);
  responseMap.delete(echo);
  return true;
}

export function cancelResponse(echo: string, reason?: string): boolean {
  const handler = responseMap.get(echo);
  if (!handler) {
    return false;
  }

  clearTimeout(handler.timeoutId);
  handler.reject(new Error(reason || 'Request cancelled'));
  responseMap.delete(echo);
  return true;
}

export function hasPendingResponse(echo: string): boolean {
  return responseMap.has(echo);
}

export function clearAllResponses(): void {
  for (const handler of responseMap.values()) {
    clearTimeout(handler.timeoutId);
    handler.reject(new Error('All requests cleared'));
  }
  responseMap.clear();
}
