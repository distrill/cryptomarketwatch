module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['react'],
  rules: {
    // allow the use of console
    'no-console': 'off',

    // suggest template literals instead of string concatenation
    'prefer-template': 'warn',

    // maximum line length
    'max-len': [
      'warn',
      100,
      {
        ignoreTrailingComments: true, // don't count trailing comments towards max-len.
        ignoreUrls: true, // don't count lines that contain a URL towards this
      },
    ],

    // disallow multiple empty lines and only one newlinen at the end
    'no-multiple-empty-lines': [
      'error',
      {
        max: 3,
        maxEOF: 1,
      },
    ],

    // disallow reassignment of function parameters (including props of parameters)
    'no-param-reassign': [
      'error',
      {
        props: true,
      },
    ],

    // no checking for braces in arrow function body
    'arrow-body-style': 'off',

    // disallow padding within blocks
    'padded-blocks': ['error', 'never'],

    // disallow dangling underscores in identifiers
    'no-underscore-dangle': [
      'error',
      {
        allowAfterThis: true,
      },
    ],

    // require object literal shorthand
    'object-shorthand': [
      'error',
      'properties',
      {
        avoidQuotes: true,
      },
    ],

    'no-plusplus': [
      'error',
      {
        // e.g., allow for (let i = 0; i < 10; i++) but no other use of ++
        allowForLoopAfterthoughts: true,
      },
    ],

    // prevent React from being incorrectly marked as unused
    'react/jsx-uses-react': 'error',

    // rule to mark unused variables in JSX
    'react/jsx-uses-vars': 'error',

    // require trailing commas in multiline
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],

    // allow either .js or .jsx for files containing JSX
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.jsx'],
      },
    ],

    // require properties to be on their own line iff there are multiple lines
    // allowMultiplePropertiesPerLine allows there to be EITHER all properties on one line, or all on their own line, but not both.
    'object-property-newline': [
      'error',
      { allowMultiplePropertiesPerLine: true },
    ],

    // override of airbnb indent rule to enable MemberExpressions option
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        // enforce indent for chained calls
        MemberExpression: 1,
        FunctionDeclaration: {
          parameters: 1,
          body: 1,
        },
        FunctionExpression: {
          parameters: 1,
          body: 1,
        },
      },
    ],

    // Allows omiting parens for arrow functions when there is only one argument.
    'arrow-parens': ['error', 'as-needed'],
  },
  env: {
    node: true,
  },
};
