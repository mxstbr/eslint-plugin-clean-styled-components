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
        let components = [];
        let reportedComponents = [];
        let reactComponents = 0;

        return {
            TaggedTemplateExpression: node => {
                const tag = node.tag.object ? node.tag.object.name : node.tag.callee ? node.tag.callee.name : undefined;
                if (tag === importName) {
                    components.push(node);
                    reportedComponents.push(false);
                    if (components.length > 1) context.report({
                        message: 'More than one styled component defined',
                        node: node,
                    });
                    if (reactComponents > 0) {
                        reportedComponents[reportedComponents.length - 1] = true;
                        context.report({
                            message: "styled component defined in the same file as a React component",
                            node: node,
                        })
                    }
                }
            },
            JSXElement: node => {
                reactComponents++;
                if (components.length > 0) {
                    for (var i = 0; i < components.length; i++ ) {
                        if (reportedComponents[i] !== true) {
                            reportedComponents[i] = true;
                            context.report({
                                message: "styled component defined in the same file as a React component",
                                node: components[i],
                            })
                        }
                    }
                }
            },
            ImportDefaultSpecifier: (node) => {
                if (node.parent.source.value === 'styled-components') {
                    const variables = context.getDeclaredVariables(node);
                    if (variables.length === 0) return;
                    importName = variables[0].name;
                    return;
                }
            }
        };
    }
};
