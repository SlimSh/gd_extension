class Jscomp {
    public SYMBOL_PREFIX = "jscomp_symbol_";
    public symbolCounter_ = 0;

    public ASSUME_NO_NATIVE_MAP = false;
    public EXPOSE_ASYNC_EXECUTOR = true;
    public FORCE_POLYFILL_PROMISE = false;
    public scope = {}
    public getGlobal = (a: any) => {
        return typeof window != 'undefined' && window === a ?
            a : "undefined" != typeof global && null != global ? global : a;
    }

    public global = this.getGlobal(this)

    public makeIterator = (a:any) => {
        this.initSymbolIterator();
        var b = a[Symbol.iterator];
        return b ? b.call(a) : this.arrayIterator(a)
    }

    public initSymbolIterator = () => {
        this.initSymbol();
        var a = this.global.Symbol.iterator;
        a || (a = this.global.Symbol.iterator = this.global.Symbol("iterator"));
        "function" != typeof Array.prototype[a] && this.defineProperty(Array.prototype, a, {
            configurable: !0,
            writable: !0,
            value: function() {
                return this.arrayIterator(this)
            }
        });
        this.initSymbolIterator = function() {}
    }
    public initSymbol = () => {
        this.initSymbol = function() {};
        this.global.Symbol || (this.global.Symbol = this.Symbol)
    }
    public arrayIterator = (a: any) => {
        var b = 0;
        return this.iteratorPrototype(function() {
            return b < a.length ? {
                done: !1,
                value: a[b++]
            } : {
                done: !0
            }
        })
    }
    public iteratorPrototype = (a: any) => {
        this.initSymbolIterator();
        a = {
            next: a
        };
        a[this.global.Symbol.iterator] = () => {
            return this;
        }
        return a;
    }
    public defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a: any, b: any, c: any) {
        if (c.get || c.set) throw new TypeError("ES3 does not support getters and setters.");
        a != Array.prototype && a != Object.prototype && (a[b] = c.value)
    }
    public Symbol = (a: any) => {
        return this.SYMBOL_PREFIX + (a || '') + this.symbolCounter_++
    }
    public owns = (obj: any, attr: any) => {
        return Object.prototype.hasOwnProperty.call(obj, attr)
    }
}
const $jscomp = new Jscomp;
export default $jscomp;