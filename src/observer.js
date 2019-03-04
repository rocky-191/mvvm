import Dep from './dep.js';

class Observer{
    constructor(data){
        this.data=data;
        this.traverse(data);
    }
    traverse(data) {
        var self = this;
        Object.keys(data).forEach(function(key) {
            self.convert(key, data[key]);
        });
    }
    convert(key,val){
        this.defineReactive(this.data, key, val);
    }

    defineReactive(data, key, val) {
        var dep = new Dep();
        var childObj = observe(val);

        Object.defineProperty(data, key, {
            enuselfrable: true, // 可枚举
            configurable: false, // 不能再define
            get(){
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            set(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                // 新的值是object的话，进行监听
                childObj = observe(newVal);
                // 通知订阅者
                dep.notify();
            }
        });
    }
}

function observe(value, vm) {
    if (!value || typeof value !== 'object') {
        return;
    }
    return new Observer(value);
}

export default Observer;