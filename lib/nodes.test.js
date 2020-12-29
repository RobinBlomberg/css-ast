import Chai from 'chai';
import * as Nodes from './nodes.js';

describe('css-ast', () => {
  describe('createStyleDeclaration', () => {
    it('should add default units to number values', () => {
      Chai.assert.deepStrictEqual(
        Nodes.createStyleDeclaration('columnCount', 3),
        {
          type: 'StyleDeclaration',
          property: 'column-count',
          value: '3'
        }
      );
      Chai.assert.deepStrictEqual(
        Nodes.createStyleDeclaration('margin', 0),
        {
          type: 'StyleDeclaration',
          property: 'margin',
          value: '0px'
        }
      );
      Chai.assert.deepStrictEqual(
        Nodes.createStyleDeclaration('animation-duration', 3000),
        {
          type: 'StyleDeclaration',
          property: 'animation-duration',
          value: '3000ms'
        }
      );
      Chai.assert.deepStrictEqual(
        Nodes.createStyleDeclaration('fontSize', 16),
        {
          type: 'StyleDeclaration',
          property: 'font-size',
          value: '16px'
        }
      );
    });
  });

  describe('createStyleRule', () => {
    it('should handle a declarations array payload', () => {
      Chai.assert.deepStrictEqual(
        Nodes.createStyleRule('.Button', [
          Nodes.createStyleDeclaration('padding', '32px'),
          Nodes.createStyleDeclaration('backgroundColor', 'yellow')
        ]),
        {
          type: 'StyleRule',
          selector: '.Button',
          declarations: [
            {
              type: 'StyleDeclaration',
              property: 'padding',
              value: '32px'
            },
            {
              type: 'StyleDeclaration',
              property: 'background-color',
              value: 'yellow'
            }
          ]
        }
      );
    });

    it('should handle a declarations object payload', () => {
      Chai.assert.deepStrictEqual(
        Nodes.createStyleRule('.Button', {
          padding: '32px',
          backgroundColor: 'yellow'
        }),
        {
          type: 'StyleRule',
          selector: '.Button',
          declarations: [
            {
              type: 'StyleDeclaration',
              property: 'padding',
              value: '32px'
            },
            {
              type: 'StyleDeclaration',
              property: 'background-color',
              value: 'yellow'
            }
          ]
        }
      );
    });

    it('should parse multiple declaration payloads', () => {
      Chai.assert.deepStrictEqual(
        Nodes.createStyleRule('.Button',
          {
            padding: '32px'
          },
          [
            Nodes.createStyleDeclaration('backgroundColor', 'yellow')
          ]
        ),
        {
          type: 'StyleRule',
          selector: '.Button',
          declarations: [
            {
              type: 'StyleDeclaration',
              property: 'padding',
              value: '32px'
            },
            {
              type: 'StyleDeclaration',
              property: 'background-color',
              value: 'yellow'
            }
          ]
        }
      );
    });
  });

  describe('createStyleSheet', () => {
    it('should accept an array payload', () => {
      Chai.assert.deepStrictEqual(
        Nodes.createStyleSheet([
          Nodes.createStyleRule('.Button', {
            backgroundColor: 'yellow'
          })
        ]),
        {
          type: 'StyleSheet',
          rules: [
            {
              type: 'StyleRule',
              selector: '.Button',
              declarations: [
                {
                  type: 'StyleDeclaration',
                  property: 'background-color',
                  value: 'yellow'
                }
              ]
            }
          ]
        }
      );
    });

    it('should accept an object payload', () => {
      Chai.assert.deepStrictEqual(
        Nodes.createStyleSheet({
          '.Button': {
            backgroundColor: 'yellow'
          }
        }),
        {
          type: 'StyleSheet',
          rules: [
            {
              type: 'StyleRule',
              selector: '.Button',
              declarations: [
                {
                  type: 'StyleDeclaration',
                  property: 'background-color',
                  value: 'yellow'
                }
              ]
            }
          ]
        }
      );
    });

    it('should accept multiple payloads', () => {
      Chai.assert.deepStrictEqual(
        Nodes.createStyleSheet(
          [
            Nodes.createStyleRule('.Button',
              {
                padding: '32px'
              },
              [
                Nodes.createStyleDeclaration('backgroundColor', 'yellow')
              ]
            )
          ],
          {
            '.ProfileView': {
              height: '100%'
            }
          }
        ),
        {
          type: 'StyleSheet',
          rules: [
            {
              type: 'StyleRule',
              selector: '.Button',
              declarations: [
                {
                  type: 'StyleDeclaration',
                  property: 'padding',
                  value: '32px'
                },
                {
                  type: 'StyleDeclaration',
                  property: 'background-color',
                  value: 'yellow'
                }
              ]
            },
            {
              type: 'StyleRule',
              selector: '.ProfileView',
              declarations: [
                {
                  type: 'StyleDeclaration',
                  property: 'height',
                  value: '100%'
                }
              ]
            }
          ]
        }
      );
    });
  });

  describe('createClasses', () => {
    it('should return a class name object and a StyleSheet node', () => {
      Chai.assert.deepStrictEqual(
        Nodes.createClasses({
          Button: {
            padding: 16,
            backgroundColor: 'yellow',
            color: 'black'
          },
          Icon: {
            fontSize: 16
          }
        }),
        {
          classes: {
            Button: 'Button',
            Icon: 'Icon'
          },
          styleSheet: {
            type: 'StyleSheet',
            rules: [
              {
                type: 'StyleRule',
                selector: '.Button',
                declarations: [
                  {
                    type: 'StyleDeclaration',
                    property: 'padding',
                    value: '16px'
                  },
                  {
                    type: 'StyleDeclaration',
                    property: 'background-color',
                    value: 'yellow'
                  },
                  {
                    type: 'StyleDeclaration',
                    property: 'color',
                    value: 'black'
                  }
                ]
              },
              {
                type: 'StyleRule',
                selector: '.Icon',
                declarations: [
                  {
                    type: 'StyleDeclaration',
                    property: 'font-size',
                    value: '16px'
                  }
                ]
              }
            ]
          }
        }
      );
    });
  });
});
