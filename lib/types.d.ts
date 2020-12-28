export type Rule = StyleRule;

export type StyleDeclaration = {
  type: 'StyleDeclaration';
  property: string;
  value: string;
};

export type StyleRule = {
  type: 'StyleRule';
  selector: string;
  declarations: StyleDeclaration[];
};

export type StyleSheet = {
  type: 'StyleSheet';
  rules: Rule[];
};
