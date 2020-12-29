/* eslint-disable sort-keys */
import * as AST from './ast.js'; // eslint-disable-line no-unused-vars
import { DefaultUnits } from './defaultUnits.js';

/**
 * @type {import('./nodes').createClasses}
 */
export const createClasses = (...payloads) => {
  /** @type {Object.<string, string>} */
  const classes = {};
  const styleSheet = createStyleSheet(...payloads);

  for (const rule of styleSheet.rules) {
    classes[rule.selector] = rule.selector;
    rule.selector = `.${rule.selector}`;
  }

  return {
    classes,
    styleSheet
  };
};

/**
 * @type {import('./nodes').createStyleDeclaration}
 */
export const createStyleDeclaration = (property, value) => {
  property = property.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
  value = typeof value === 'number'
    ? `${value}${DefaultUnits[property] ?? ''}`
    : value;

  return {
    type: 'StyleDeclaration',
    property,
    value
  };
};

/**
 * @type {import('./nodes').createStyleRule}
 */
export const createStyleRule = (selector, ...payloads) => {
  /** @type {AST.StyleDeclaration[]} */
  const declarations = [];

  for (const payload of payloads) {
    if (Array.isArray(payload)) {
      declarations.push(...payload);
    } else {
      for (const property in payload) {
        if (Object.prototype.hasOwnProperty.call(payload, property)) {
          declarations.push(createStyleDeclaration(property, payload[property]));
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
 * @type {import('./nodes').createStyleSheet}
 */
export const createStyleSheet = (...payloads) => {
  /** @type {AST.Rule[]} */
  const rules = [];

  for (const payload of payloads) {
    if (Array.isArray(payload)) {
      rules.push(...payload);
    } else {
      for (const selector in payload) {
        if (Object.prototype.hasOwnProperty.call(payload, selector)) {
          rules.push(createStyleRule(selector, payload[selector]));
        }
      }
    }
  }

  return {
    type: 'StyleSheet',
    rules
  };
};
