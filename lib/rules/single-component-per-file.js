/**
 * @fileoverview There should only be a single styled component per file
 * @author Max Stoiber
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "problem",
        docs: {
            description: "There should only be a single styled component per file",
            category: "Best Practices",
            recommended: true
        },
        fixable: null,
        schema: []
    },

    create: function(context) {
        let importName = '';
        let components = 0;

        return {
            TaggedTemplateExpression: node => {
                const tag = node.tag.object ? node.tag.object.name : node.tag.callee ? node.tag.callee.name : undefined;
                if (tag !== importName) return;
                components++;
                if (components > 1) context.report({
                    message: 'More than one styled component defined',
                    node: node,
                })
            },
            ImportDefaultSpecifier: (node) => {
                if (node.parent.source.value !== 'styled-components') return;
                const variables = context.getDeclaredVariables(node);
                if (variables.length === 0) return;
                importName = variables[0].name;
            }
        };
    }
};
