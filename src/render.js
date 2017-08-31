const { isType } = require('./util')

/**
 * Creates and returns a virtual dom node (an object)
 * @public
 * @example createElement('h1', { class: 'title' }, 'hello world')
 * @example createElement('div', {}, createElement('p', {}, 'paragraph'))
 * @type {(String, Object, Any) -> VNode}
 */
const createElement = (nodeName, attributes={}, ...children) => ({ nodeName, attributes, children })

/**
 * Render a virtual node into a parent dom node, returning the rendered dom node.
 * @public
 * @see "jasonformat.com/wtf-is-jsx"
 * @example render(createElement('div', {}), document.body)
 * @type {(VNode|[VNode], Node?) -> Node?}
 */
const render = (vNode, parent) => {
    // If vNode is array, put all vals in a parent div
    if (isType('Array', vNode)) {
        vNode.forEach(v => { render(v, parent) })
        return
    }

    // Strings just convert to #text Nodes
    if (isType('String', vNode)) {
        return document.createTextNode(vNode)
    }

    // Create element
    let node = document.createElement(vNode.nodeName)

    // Copy attributes onto the node
    Object.keys(vNode.attributes).forEach(key => {
        node.setAttribute(key, vNode.attributes[key])
    })

    // Recursively build and append all children
    vNode.children.forEach(child => {
        node.appendChild(render(child))
    })

    // Render node to parent if applicable
    if (parent) {
        parent.appendChild(node)
        return
    }
    return node
}

module.exports = {
    render
}
