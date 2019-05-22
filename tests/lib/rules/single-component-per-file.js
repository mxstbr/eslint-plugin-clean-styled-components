/**
 * @fileoverview There should only be a single styled component per file
 * @author Max Stoiber
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/single-component-per-file"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester({
    parserOptions: { ecmaVersion: 2015, sourceType: 'module', ecmaFeatures: { jsx: true } },
});

ruleTester.run("single-component-per-file", rule, {
    valid: [
        'import styled from "styled-components"; const Button = styled.button``; export default Button;',
        'import styled from "styled-components"; const Button = styled("button")``; export default Button;',
        'import styled from "styled-components"; const Button = styled(Button2)``; export default Button;',
        'import styled from "styled-components"; export default styled.button``;',
        'import styled from "styled-components"; export default styled.button({ });',
        'import styled, { css } from "styled-components"; const Button = styled.button``; export default Button;',
        'import styled from "somewhere-else"; const Button = styled.button``; const Button2 = styled.button``',
    ],
    invalid: [
        {
            code: 'import styled from "styled-components"; const Button = styled.button``; const Button2 = styled.button``',
            errors: [{
                message: "More than one styled component defined",
            }]
        },
        {
            code: 'import styled from "styled-components"; const Button = styled("button")``; const Button2 = styled("button")``',
            errors: [{
                message: "More than one styled component defined",
            }]
        },
        {
            code: 'import styled from "styled-components"; const Button = styled("button")``; const Button2 = styled.button``',
            errors: [{
                message: "More than one styled component defined",
            }]
        },
        {
            code: 'import styled from "styled-components"; const Button = styled.button({}); const Button2 = styled.button({})',
            errors: [{
                message: "More than one styled component defined",
            }]
        },
        {
            code: 'import styled from "styled-components"; const Button = styled.button({}); const Button2 = styled.button``',
            errors: [{
                message: "More than one styled component defined",
            }]
        },
        {
            code: 'import bugger from "styled-components"; const Button = bugger.button``; const Button2 = bugger.button``',
            errors: [{
                message: "More than one styled component defined",
            }]
        },
        {
            code: 'import styled from "styled-components"; const Button = styled.button``; const Button2 = styled.button``; const Button3 = styled.button``',
            errors: [{
                message: "More than one styled component defined",
            }, {
                message: "More than one styled component defined",
            }]
        },
        {
            code: 'import styled from "styled-components"; const Button = styled.button``; const Button2 = styled(Button)``',
            errors: [{
                message: "More than one styled component defined",
            }]
        },
        {
            code: 'import styled from "styled-components"; const Button = styled.button``; export default styled.button``',
            errors: [{
                message: "More than one styled component defined",
            }]
        },
        {
            code: 'import React from "react"; import styled from "styled-components"; const Button = styled.button``; class Bla extends React.Component { render() { return <div /> } }',
            errors: [{
                message: "styled component defined in the same file as a React component",
                type: "TaggedTemplateExpression"
            }]
        },
        {
            code: 'import React from "react"; import styled from "styled-components"; const Bla = () => <div />; const Button = styled.button``;',
            errors: [{
                message: "styled component defined in the same file as a React component",
                type: "TaggedTemplateExpression"
            }]
        },
        {
            code: 'import React from "react"; import styled from "styled-components"; const Button = styled.button``; const Bla = () => <div />',
            errors: [{
                message: "styled component defined in the same file as a React component",
                type: "TaggedTemplateExpression"
            }]
        },
        {
            code: 'import React from "react"; import styled from "styled-components"; const Button = styled.button({ }); const Bla = () => <div />',
            errors: [{
                message: "styled component defined in the same file as a React component",
                type: "CallExpression"
            }]
        },
        {
            code: 'import React from "react"; import styled from "styled-components"; const Button = styled.button``; const Button2 = styled.button``; const Bla = () => <div />',
            errors: [{
                message: "styled component defined in the same file as a React component",
                type: "TaggedTemplateExpression"
            }, {
                message: "More than one styled component defined",
                type: "TaggedTemplateExpression"
            }, {
                message: "styled component defined in the same file as a React component",
                type: "TaggedTemplateExpression"
            }]
        },        
    ]
});
