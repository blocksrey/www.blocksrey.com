var floor = Math.floor;
var tan   = Math.tan;

function indpos(i, n) {
    return [i%n, floor(i/n)];
}

function posind(p, n) {
    return p[0]%n + p[1]%n*n;
}

function ident(n) {
    var f = [];
    for (var r = 0; r < n; ++r) {
        f[r] = [];
        for (var c = 0; c < n; ++c) {
            f[r][c] = r == c ? 1 : 0;
        }
    }
    return f;
}

function trans(m) {
    var f = [];
    var n = m.length;
    for (var r = 0; r < n; ++r) {
        f[r] = [];
        for (var c = 0; c < n; ++c) {
            f[r][c] = m[c][r];
        }
    }
    return f;
}

function expand(m) {
    var f = [];
    var n = m.length;
    for (var r = 0; r < n; ++r) {
        for (var c = 0; c < n; ++c) {
            f[posind([c, r], n)] = m[r][c];
        }
    }
    return f;
}

function transexpand(m) {
    var f = [];
    var n = m.length;
    for (var r = 0; r < n; ++r) {
        for (var c = 0; c < n; ++c) {
            f[posind([c, r], n)] = m[c][r];
        }
    }
    return f;
}

function calcproj(angle, aspect) {
    var view = 1/tan(angle/2);
    return [
        [aspect*view,    0, 0, 0],
        [          0, view, 0, 0],
        [          0,    0, 0, 0],
        [          0,    0, 1, 0]
    ];
}
