function beats() {
    var today  = new Date();
    var time   = today.getTime();
    var offset = today.getTimezoneOffset() * 60000;
    var utc    = time + offset;
    var bmt    = new Date(utc + 3600000);

    var h = bmt.getHours();
    var m = bmt.getMinutes();
    var s = bmt.getSeconds();
    var b = ((h * 3600 + m * 60 + s) * (1000 / 86400)).toFixed(2);

    document.getElementById('beats').innerHTML = '@' + b;

    window.setTimeout(function() {
        beats()
    }, 500);
}
