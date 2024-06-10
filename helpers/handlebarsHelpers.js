const Handlebars = require('handlebars');

Handlebars.registerHelper('extend', function(name, context) {
    if (!this._blocks) {
        this._blocks = {};
    }
    if (!this._blocks[name]) {
        this._blocks[name] = [];
    }
    this._blocks[name].push(context.fn(this));
});

Handlebars.registerHelper('block', function(name) {
    const val = (this._blocks && this._blocks[name]) ? this._blocks[name].join('\n') : null;
    // clear the block
    this._blocks[name] = [];
    return val;
});

module.exports = Handlebars;