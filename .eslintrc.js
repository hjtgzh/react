module.exports = {
    "extends": "airbnb",
    "installedESLint": true,
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true,
            "arrowFunctions": true,
            "classes": true,
            "modules": true,
            "defaultParams": true
        },
        "sourceType": "module"
    },
    "parser": "babel-eslint",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
        "arrow-body-style": 0,
        "linebreak-style": 0,
        "indent": [2, 4, { "SwitchCase": 1 }],
        "eol-last": 0,
        "no-trailing-spaces": 0,
        "comma-dangle": 0,
        "object-shorthand": 0,
        "no-undef": 0,
        "max-len": [1, 150],
        "no-plusplus": 0,
        "operator-assignment": 0,
        "import/newline-after-import": 0,
        "import/first": 0,
        "consistent-return": 0,
        "no-else-return": 0,
        "no-case-declarations": 0,
        "no-unused-expressions": 0,
        "array-callback-return": 0,
        "no-underscore-dangle": 0,
        "no-unneeded-ternary": 0,
        "no-mixed-operators": 0,
        "no-new": 0,
        "no-shadow": 0,
        "no-continue": 0,
        "no-param-reassign": 0,
        "func-names": 0,
        "no-return-assign": 0,
        "no-lonely-if": 0,
        "no-multi-assign": 0,
        "global-require": 0,
        "no-bitwise": 0,

        "import/no-unresolved": 0,
        "import/extensions": 0,

        "jsx-a11y/img-has-alt": 0,
        "jsx-a11y/no-static-element-interactions": 0,
        "react/jsx-indent": [2, 4],
        "react/prop-types": 0,
        "react/jsx-indent-props": [2, 4],
        "react/no-array-index-key": 0,
        "react/sort-comp": 0,
        "react/no-string-refs": 0,
        "react/jsx-boolean-value": 0,
        "react/jsx-tag-spacing": 0,
        "react/jsx-space-before-closing": 0
    }
};