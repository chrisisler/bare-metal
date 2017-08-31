const { defer, hasProp } = require('./util')

// Locally managed queue of components which need to be (re)rendered
let dirtyComponentsQueue = []

/**
 * Rerender all components in `dirtyComponentsQueue` if they are `_dirty`.
 * Empties `dirtyComponentsQueue`.
 * @type {() -> ()}
 */
const rerender = () => {
    let _dirtyQueue = dirtyComponentsQueue
    dirtyComponentsQueue = []

    // must use double parens for assignment and condition
    let _dirtyComponent
    while ((_dirtyComponent = _dirtyQueue.pop())) {
        if (_dirtyComponent._dirty === true) {
            renderComponent(_dirtyComponent)
        }
    }
}

/**
 *
 * @type {Component -> ()}
 */
const enqueueRender = component => {
    dirtyComponentsQueue.push(component) // enqueue item

    const numberOfDirtyComponents = dirtyComponentsQueue.length

    if (hasProp('_dirty', component)) {
        component._dirty = true

        if (numberOfDirtyComponents === 1) {
            defer(rerender)
        }
    }
}

module.exports = {
    rerender
    , enqueueRender
}
