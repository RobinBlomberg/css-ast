/* eslint-disable sort-keys */
import * as AST from './ast.js';
import { DefaultUnits } from './defaultUnits.js';

/**
 * @param {string} property
 * @param {AST.StyleDeclarationValue} value
 * @return {AST.StyleDeclaration}
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
 * @param {string} selector
 * @param {...AST.StyleDeclarationsPayload} payloads
 * @return {AST.StyleRule}
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
 * @param {...(AST.Rule[] | AST.StyleRulesObject)} payloads
 * @return {AST.StyleSheet}
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
