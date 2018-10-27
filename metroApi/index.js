var request = require('sync-request');

module.exports = async (currentLine) =>{
var res = request('GET', 'https://api.tfgm.com/odata/Metrolinks?$top=1000', {
    headers: {
      'Ocp-Apim-Subscription-Key': '05d712d9e5254644bdc6e27f05abe818',
    },
  });
  if (res.statusCode == 200) {
    const info = JSON.parse(res.getBody().toString('utf-8'));
    var line = []
    for(i=0; i < info.value.length; i++) {
        if(info.value[i].Line.toLowerCase() === currentLine.toLowerCase()) {
            line.push(info.value[i])
        }
    }
    for(i=0;i<line.length;i++){
        var lower = line[i].MessageBoard;
        if(lower.indexOf('delay') !== -1) {
            return {
                line: currentLine,
                delay: true
            }
        }
    }
    return {
        line: currentLine,
        delay: false
    };
  }
}