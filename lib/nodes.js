/* eslint-disable sort-keys */
import * as AST from './ast.js'; // eslint-disable-line no-unused-vars
import { DefaultUnits } from './defaultUnits.js';

/**
 * @type {import('./nodes').declaration}
 */
export const declaration = (property, value) => {
  return {
    type: 'StyleDeclaration',
    property: property.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`),
    value: typeof value === 'number'
      ? `${value}${DefaultUnits[property] ?? ''}`
      : value
  };
};

/**
 * @type {import('./nodes').styleRule}
 */
export const styleRule = (selector, ...payloads) => {
  /** @type {AST.StyleDeclaration[]} */
  const declarations = [];

  for (const payload of payloads) {
    if (Array.isArray(payload)) {
      declarations.push(...payload);
    } else {
      for (const property in payload) {
        if (Object.prototype.hasOwnProperty.call(payload, property)) {
          declarations.push(declaration(property, payload[property]));
        }
      }
    }
  }

  return {
    type: 'StyleRule',
    selector,
    declarations
  };
};

/**
 * @type {import('./nodes').styleSheet}
 */
export const styleSheet = (...payloads) => {
  /** @type {AST.Rule[]} */
  const rules = [];

  for (const payload of payloads) {
    if (Array.isArray(payload)) {
      rules.push(...payload);
    } else {
      for (let selector in payload) {
        if (Object.prototype.hasOwnProperty.call(payload, selector)) {
          const styleDeclarationsPayload = payload[selector];

          if (!selector.startsWith('.')) {
            selector = `.${selector}`;
          }

          rules.push(styleRule(selector, styleDeclarationsPayload));
        }
      }
    }
  }

  return {
    type: 'StyleSheet',
    rules
  };
};
