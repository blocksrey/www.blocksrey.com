let mat = [];

{
    let floor = Math.floor;
    let tan   = Math.tan;

    let indpos = function() {
        return [i%n, floor(i/n)];
    };

    let posind = function(p, n) {
        return p[0]%n + p[1]%n*n;
    };

    mat.ident = function(n) {
        let f = [];
        for (let r = 0; r < n; ++r) {
            f[r] = [];
            for (let c = 0; c < n; ++c) {
                f[r][c] = r == c ? 1 : 0;
            }
        }
        return f;
    };

    mat.trans = function(m) {
        let f = [];
        let n = m.length;
        for (let r = 0; r < n; ++r) {
            f[r] = [];
            for (let c = 0; c < n; ++c) {
                f[r][c] = m[c][r];
            }
        }
        return f;
    };

    let expand = function(m) {
        let f = [];
        let n = m.length;
        for (let r = 0; r < n; ++r) {
            for (let c = 0; c < n; ++c) {
                f[posind([c, r], n)] = m[r][c];
            }
        }
        return f;
    };

    mat.transexpand = function(m) {
        let f = [];
        let n = m.length;
        for (let r = 0; r < n; ++r) {
            for (let c = 0; c < n; ++c) {
                f[posind([c, r], n)] = m[c][r];
            }
        }
        return f;
    };

    let matmul = function(a, b) {

    };

    let inverse = function(m) {

    };

    let det = function(m) {

    };

    let rowred = function(a, b) {

    };

    mat.calcproj = function(angle, aspect) {
        let view = 1/tan(angle/2);
        return [
            [aspect*view,    0,  0, 0],
            [          0, view,  0, 0],
            [          0,    0,  0, 0],
            [          0,    0,  1, 0]
        ];
    };
}
