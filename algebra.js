var floor = Math.floor;

function indpos(i, n) {
    return [i%n, floor(i/n)];
}

function posind(x, y, n) {
    return x%n + y%n*n;
}

function ident(n) {
    var f = [];
    for (var i = 0; i < n*n; ++i) {
        var p = indpos(i, n);
        f[i] = p[0] == p[1] ? 1 : 0;
    }
    return f;
}

function matmatmul(a, b) {
    var f = [];
    var n = a.length;
    for (var i = 0; i < n*n; ++i) {

    }
    return f;
}
