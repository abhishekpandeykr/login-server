const request = require('request');
const endPoint = "https://pokeapi.co/api/v2/ability"

exports.servingData =(req, res, next) => {
    request.get(`${endPoint}/?limit=20&offset=20`, (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    res.send(JSON.parse(body))
});
}

exports.getOneAbility=(req, res,next) => {
    const id = req.params.id;
    request.get(`${endPoint}/${id}`, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        res.send(JSON.parse(body))
    })
}