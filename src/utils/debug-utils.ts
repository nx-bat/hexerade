import { IsProduction } from '.';

export function logDebug(message: string) {
  if (!IsProduction()) console.log(`[DEBUG] ${message}`);
}
