let vec = [];

{
    vec.dot = function(a, b) {
        let f = 0;
        let n = a.length;
        for (let i = 0; i < n; ++i)
            f += a[i]*b[i];
        return f;
    };

    vec.len = function(v) {
        let f = 0;
        let n = v.length;
        for (let i = 0; i < n; ++i) {
            let x = v[i];
            f += x*x;
        }
        return f**0.5;
    };

    vec.norm = function(v) {
        let l = 0;
        let n = v.length;
        for (let i = 0; i < n; ++i) {
            let x = v[i];
            l += x*x;
        }
        l **= 0.5;
        let f = [];
        for (let i = 0; i < n; ++i) {
            f[i] = v[i]/l;
        }
        return f;
    };
}
