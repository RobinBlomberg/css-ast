import Chai from 'chai';
import * as Nodes from './nodes.js';

describe('css-ast', () => {
  describe('declaration', () => {
    it('should add default units to number values', () => {
      Chai.assert.deepStrictEqual(
        Nodes.declaration('columnCount', 3),
        {
          type: 'StyleDeclaration',
          property: 'column-count',
          value: '3'
        }
      );
      Chai.assert.deepStrictEqual(
        Nodes.declaration('margin', 0),
        {
          type: 'StyleDeclaration',
          property: 'margin',
          value: '0px'
        }
      );
      Chai.assert.deepStrictEqual(
        Nodes.declaration('animation-duration', 3000),
        {
          type: 'StyleDeclaration',
          property: 'animation-duration',
          value: '3000ms'
        }
      );
    });
  });

  describe('styleRule', () => {
    it('should handle a declarations array payload', () => {
      Chai.assert.deepStrictEqual(
        Nodes.styleRule('.Button', [
          Nodes.declaration('padding', '32px'),
          Nodes.declaration('backgroundColor', 'yellow')
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
        Nodes.styleRule('.Button', {
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
        Nodes.styleRule('.Button',
          {
            padding: '32px'
          },
          [
            Nodes.declaration('backgroundColor', 'yellow')
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

  describe('styleSheet', () => {
    it('should accept an array payload', () => {
      Chai.assert.deepStrictEqual(
        Nodes.styleSheet([
          Nodes.styleRule('.Button', {
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
        Nodes.styleSheet({
          Button: {
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
        Nodes.styleSheet(
          [
            Nodes.styleRule('.Button',
              {
                padding: '32px'
              },
              [
                Nodes.declaration('backgroundColor', 'yellow')
              ]
            )
          ],
          {
            ProfileView: {
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
});
