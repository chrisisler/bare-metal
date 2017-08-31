/** @type {(Function, Any) -> Boolean} */
const isType = (type, val) => Object.prototype.toString.call(val) === `[object ${type}]`

/** @type {(String, Object) -> Boolean} */
const hasProp = (key, obj) => Object.prototype.hasOwnProperty.call(obj, key)

/**
 * Call a function asynchronously, ASAP.
 * @type {Function}
 */
const defer = isType('Function', Promise)
    ? Promise.resolve().bind(Promise.resolve())
    : setTimeout

module.exports = {
    isType
    , defer
    , hasProp
}
