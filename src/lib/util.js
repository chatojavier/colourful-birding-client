/**
 * decodeHtmlEntities
 */

export function decodeHtmlEntities(text) {
  if (typeof text !== 'string') {
    throw new Error(`Failed to decode HTML entity: invalid type ${typeof text}`);
  }

  let decoded = text;

  const entities = {
    '&amp;': '\u0026',
    '&quot;': '\u0022',
    '&#039;': '\u0027',
  };

  return decoded.replace(/&amp;|&quot;|&#039;/g, (char) => entities[char]);
}

/**
 * removeLastTrailingSlash
 */

export function removeLastTrailingSlash(url) {
  if (typeof url !== 'string') return url;
  return url.replace(/\/$/, '');
}

export function removeExtraSpaces(text) {
  if (typeof text !== 'string') return;
  return text.replace(/\s+/g, ' ').trim();
}

/**
 * sortObjectsRamdomly
 */

export function sortObjectsRamdomly(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * getFirstPathname
 */

export function getFirstPathname(url) {
  if (typeof url !== 'string') return;
  return url.split('/')[1];
}

/**
 * getTextColorByName
 */
export const getTextColorByName = (color) => {
  switch (color) {
    case 'green':
      return 'text-green';
    case 'purple':
      return 'text-purple';
    case 'blue':
      return 'text-blue';
    case 'lightblue':
      return 'text-lightblue';
    case 'white':
      return 'text-white';
    default:
      return '#000000';
  }
};

/**
 * getBorderColorByName
 */
export const getBorderColorByName = (color) => {
  switch (color) {
    case 'green':
      return 'border-green';
    case 'purple':
      return 'border-purple';
    case 'blue':
      return 'border-blue';
    case 'lightblue':
      return 'border-lightblue';
    case 'white':
      return 'border-white';
    default:
      return 'border-darkgrey';
  }
};

/**
 * getInputColorByName
 */
export const getInputColorByName = (color) => {
  const constantClasses = 'focus:outline-none focus:ring-1 focus:ring-offset-2';
  switch (color) {
    case 'green':
      return `${constantClasses} focus:ring-green focus:ring-offset-green-100`;
    case 'purple':
      return `${constantClasses} focus:ring-purple focus:ring-offset-purple-100`;
    case 'blue':
      return `${constantClasses} focus:ring-blue focus:ring-offset-blue-100`;
    case 'lightblue':
      return `${constantClasses} focus:ring-lightblue focus:ring-offset-lightblue-100`;
    default:
      return `${constantClasses} focus:ring-blue focus:ring-offset-blue-100`;
  }
};

/**
 * sortObjectsRandomly
 */
export function sortObjectsRandomly(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// Currency format
export function formatCurrency(value) {
  return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
