# eslint-plugin-clean-styled-components

Lint your styled-components code to be clean

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-clean-styled-components`:

```
$ npm install eslint-plugin-clean-styled-components --save-dev
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
    "rules": {
        "clean-styled-components/rule-name": 2
    }
}
```

## Supported Rules

* `single-component-per-file`: enforce only having a single styled component per source file





