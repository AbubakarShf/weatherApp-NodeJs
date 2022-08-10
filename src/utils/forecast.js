const request = require('request')

const forecast=(lat,long,callBack)=>{
    const url="https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+long+"&appid=278534866c23821e57e77806a8eb221d";

    request({url,json:true},(error,{body})=>{
        if (error) {
            callBack("unable to connect weather service",undefined);
        }
        else if(body.code == 400){
            callBack(body.code.message,undefined);
        }
        else{
            callBack(undefined,{
                location:body.timezone,
                lat: body.lat,
                lon: body.lon,
                weather:body.current.weather[0].main
            });
        }
    })
}

module.exports={
    forecast,
}