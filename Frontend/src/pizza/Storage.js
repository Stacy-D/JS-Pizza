/**
 * Created by Stacy on 10/10/16.
 */
var basil = require('basil.js'); basil = new basil();
exports.get = function(key) {
    return basil.get(key); };
exports.set = function(key, value) {
    return basil.set(key, value); };