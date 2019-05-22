# eslint-plugin-clean-styled-components

Lint your styled-components code to be clean

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm install eslint --dev
```

Next, install `eslint-plugin-clean-styled-components`:

```
$ npm install eslint-plugin-clean-styled-components --dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-clean-styled-components` globally.

## Usage

Add `clean-styled-components` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "clean-styled-components"
    ]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "plugins": [
        "clean-styled-components"
    ],
    "rules": {
        "clean-styled-components/single-component-per-file": 2
    }
}
```

If you want to enable all recommended rules, extend the `eslint:recommended` config:

```json
{
    "plugins": [
        "clean-styled-components"
    ],
    "extends": ["eslint:recommended"]
}
```

## Supported Rules

* `single-component-per-file`: enforce only having a single styled component per source file
