const { enqueueRender } = require('./render-queue')

/**
 * Base class which all custom components will extend.
 * @public
 */
class Component {
    constructor(props) {
        this.props = props
        this.state = this.state || {}

        /** @private */
        this._dirty = true // needs to be (re)rendered?
    }

    /**
     * Update the state of the component, given some properties to update.
     * @type {Object -> ()}
     */
    setState(newState) {
        this.state = Object.assign({}, this.state, newState)

        // (re)render asynchronously, as soon as possible
        enqueueRender(this)
    }

    render() {}
}

module.exports = Component
