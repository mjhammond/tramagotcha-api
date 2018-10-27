const database = require('../database')
const geoLib = require('geolib')

module.exports = async (lat, long) =>{
    const sqlMetros = await database('select * from metroStops');
    const metros = sqlMetros.recordset;

    for(var i = 0; i < metros.length;i++){
        var distance = geoLib.getDistanceSimple(
            {
                latitude: lat,
                longitude: long
            },
            {
                latitude: metros[i].lat,
                longitude: metros[i].long
        });
        if(distance < 500) {
            return metros[i]
        }
        return {}
    }
}