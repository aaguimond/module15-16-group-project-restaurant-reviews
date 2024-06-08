// Displaying errors
module.exports = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`Something's not right.`);
};