export type Node =
  | StyleDeclaration
  | StyleRule
  | StyleSheet;

export type Rule = StyleRule;

export type StyleDeclaration = {
  type: 'StyleDeclaration';
  property: string;
  value: StyleDeclarationValue;
};

export type StyleDeclarationValue = number | string;

export type StyleDeclarationsObject = {
  [Property: string]: StyleDeclarationValue;
};

export type StyleDeclarationsPayload = StyleDeclaration[] | StyleDeclarationsObject;

export type StyleRule = {
  type: 'StyleRule';
  selector: string;
  declarations: StyleDeclaration[];
};

export type StyleRulesObject = {
  [ClassName: string]: StyleDeclarationsPayload;
};

export type StyleSheet = {
  type: 'StyleSheet';
  rules: Rule[];
};
