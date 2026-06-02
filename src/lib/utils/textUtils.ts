export interface WordCountResult {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTime: number;
}

export function analyzeText(text: string): WordCountResult {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const sentences = text.split(/[.!?]+/).filter(Boolean).length;
  const paragraphs = text.split(/\n\s*\n/).filter(Boolean).length;
  const readingTime = Math.ceil(words / 200);

  return { words, characters, charactersNoSpaces, sentences, paragraphs, readingTime };
}

export function convertCase(text: string, targetCase: 'upper' | 'lower' | 'title' | 'sentence' | 'camel' | 'pascal' | 'snake' | 'kebab'): string {
  switch (targetCase) {
    case 'upper':
      return text.toUpperCase();
    case 'lower':
      return text.toLowerCase();
    case 'title':
      return text.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
    case 'sentence':
      return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
    case 'camel':
      return text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase());
    case 'pascal':
      const camel = text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase());
      return camel.charAt(0).toUpperCase() + camel.slice(1);
    case 'snake':
      return text.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '_');
    case 'kebab':
      return text.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-');
    default:
      return text;
  }
}

export function removeExtraSpaces(text: string): string {
  return text
    .replace(/\n\s*\n/g, '\n\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/[^\S\n]+/g, ' ')
    .replace(/^\s+|\s+$/g, '');
}
