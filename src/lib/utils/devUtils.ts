export function formatJSON(input: string): string {
  try {
    const parsed = JSON.parse(input);
    return JSON.stringify(parsed, null, 2);
  } catch {
    throw new Error('Invalid JSON');
  }
}

export function minifyJSON(input: string): string {
  try {
    const parsed = JSON.parse(input);
    return JSON.stringify(parsed);
  } catch {
    throw new Error('Invalid JSON');
  }
}

export function validateJSON(input: string): { valid: boolean; error?: string } {
  try {
    JSON.parse(input);
    return { valid: true };
  } catch (e) {
    return { valid: false, error: (e as Error).message };
  }
}

export function decodeJWT(token: string): { header: Record<string, unknown>; payload: Record<string, unknown>; signature: string } {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Invalid JWT token');

  const header = JSON.parse(atob(parts[0]));
  const payload = JSON.parse(atob(parts[1]));
  const signature = parts[2];

  return { header, payload, signature };
}

export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function generateUUIDs(count: number): string[] {
  return Array.from({ length: count }, () => generateUUID());
}

export function base64Encode(input: string): string {
  try {
    return btoa(input);
  } catch {
    return btoa(encodeURIComponent(input).replace(/%([0-9A-F]{2})/g, (_, p1) => String.fromCharCode(parseInt(p1, 16))));
  }
}

export function base64Decode(input: string): string {
  try {
    return atob(input);
  } catch {
    return decodeURIComponent(
      atob(input)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  }
}

export function timestampToDate(timestamp: number): Date {
  return new Date(timestamp * 1000);
}

export function dateToTimestamp(date: Date): number {
  return Math.floor(date.getTime() / 1000);
}

export function formatTimestamp(timestamp: number, format: 'seconds' | 'milliseconds'): string {
  const date = format === 'seconds' ? new Date(timestamp * 1000) : new Date(timestamp);
  return date.toLocaleString();
}

export function testRegex(pattern: string, flags: string, testString: string): { matches: string[]; count: number; error?: string } {
  try {
    const regex = new RegExp(pattern, flags);
    const matches: string[] = [];
    let match;
    while ((match = regex.exec(testString)) !== null) {
      matches.push(match[0]);
      if (!flags.includes('g')) break;
    }
    return { matches, count: matches.length };
  } catch (e) {
    return { matches: [], count: 0, error: (e as Error).message };
  }
}