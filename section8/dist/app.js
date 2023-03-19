"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function First() {
    console.log('First(): 팩토리');
    return function (target, prop, desc) {
        console.log(target);
        console.log(prop);
        console.log(desc);
        console.log('First(): 데코레이터');
    };
}
function Second() {
    console.log('Second(): 팩토리');
    return function (target, prop, desc) {
        console.log(target);
        console.log(prop);
        console.log(desc);
        console.log('Second(): 데코레이터');
    };
}
class Button {
    isPressed() { }
}
__decorate([
    First(),
    Second()
], Button.prototype, "isPressed", null);
//# sourceMappingURL=app.js.map