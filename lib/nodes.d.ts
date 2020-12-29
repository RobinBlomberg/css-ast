import * as AST from './ast';

export function createClasses(
  ...payload: (AST.Rule[] | AST.StyleRulesObject)[]
): {
  classes: Record<string, string>;
  styleSheet: AST.StyleSheet;
};

export function createStyleDeclaration(
  property: string,
  value: AST.StyleDeclarationValue
): AST.StyleDeclaration;

export function createStyleRule(
  selector: string,
  ...payload: AST.StyleDeclarationsPayload[]
): AST.StyleRule;

export function createStyleSheet(
  ...payload: (AST.Rule[] | AST.StyleRulesObject)[]
): AST.StyleSheet;
