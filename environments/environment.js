
function getEnvironment() {

    if (process.env.NODE_ENV === 'production') {
        return require("./environment.prod")
    } else {
        return require("./environment.dev")
    }
}
module.exports = getEnvironment();