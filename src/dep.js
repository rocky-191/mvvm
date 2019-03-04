var uid = 0;
class Dep{
    constructor(){
        this.id = uid++;
        this.subs = [];
    }
    addSub(sub){
        this.subs.push(sub);
    }

    depend(){
        Dep.target.addDep(this);
    }

    removeSub(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    }
    //后续用来通知订阅者进行更新
    notify(){
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
}

export default Dep;