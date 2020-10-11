Array.prototype.clear = function() {
    this.splice(0, this.length);
}

Array.prototype.replace = function(newArray) {
    this.clear();
    for (var i = 0, l = newArray.length; i < l; i++) {
        var item = newArray[i];
        this.push(item);
    }
}

Array.prototype.pushAll = function(arr) {
    for (var i = 0, l = arr.length; i < l; i++) {
        var item = arr[i];
        this.push(item);
    }
}
