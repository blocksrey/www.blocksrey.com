let require = [];

{
    let parse = function () {
        let pos = 0;
        let len = str.length;
        for (let ind = 0; ind < len; ++ind) if (str[ind] == "/") pos = ind;
        return str.substring(pos + 1, len);
    };

    let prepare = function (str) {
        let all = document.getElementsByTagName("script");
        let len = all.length;
        for (let ind = 0; ind < len; ++ind) if (parse(all[ind].src) == str) return;
        let fin = document.createElement("script");
        fin.src = str;
        document.querySelector("body").appendChild(fin);
    };

    let returns = [];

    let register = function (func) {
        returns[parse(document.currentScript.src)] = func();
    };

    //frick you
    let obtain = function () {
        for (;;) {
            let ret = returns[str];
            if (ret) return ret;
        }
    };
}
