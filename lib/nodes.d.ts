import * as AST from './ast';

export function declaration(
  property: string,
  value: AST.StyleDeclarationValue
): AST.StyleDeclaration;

export function styleRule(
  selector: string,
  ...payload: AST.StyleDeclarationsPayload[]
): AST.StyleRule;

export function styleSheet(
  ...payload: (AST.Rule[] | AST.StyleRulesObject)[]
): AST.StyleSheet;
