/**
 * Created by tylerchapman on 3/12/15.
 */

var $ = function (id) {
    return document.getElementById(id);
}

window.onload = function() {
    $("calculateButton").onclick = calculate;
    $("clearButton").onclick = clear;
    $("ccNumber").focus();
};

function clear() {
    $("ccNumber").value = "";
    $("ccNumber").focus();
    $("validationInfo").innerHTML = "";
}

function getCC() {
    var userCC = $("ccNumber").value;
    return userCC;
}

function validatedCC(userCC) {
    if (!isNaN(userCC) && userCC.length == 16) {
        return true;
    } else {
        return false;
    }
}

function reverse(reversedCC) {
    var x = reversedCC.toString();
    var y = x.split("").reverse().join("");
    return y;
}

function errorEntry() {
    $("validationInfo").style.color = "red";
    $("ccNumber").select();
    $("validationInfo").innerHTML = "ERROR! Number must be 16 digits and a valid credit card number!";
}

function isValid() {
    $("validationInfo").style.color = "green";
    $("validationInfo").innerHTML = "This is a valid Credit Card number!";
}

function isNotValid() {
    $("validationInfo").style.color = "red";
    $("validationInfo").innerHTML = "This is NOT a valid Credit Card Number";
    $("ccNumber").select();
}

function myLuhnAlg(x) {
    var y;
    var t = "";
    for (var i = 0; i <= x.length; i++) {
        y = x.charAt(i);
        if ( i % 2 != 0 ) {
            y *= 2;
            if ( y >= 10) {
                y = 1 + (y % 10);
            }
        }
        t = y + t;
    }

    var nt = 0;
    for (i = 0; i < t.length; i++) {
        y = parseInt(t.charAt(i), 10);
        nt += y;
    }
    if (nt % 10 == 0) {
        isValid();
    } else {
        isNotValid();
    }

}

function calculate() {
    var userCC = getCC();
    if (validatedCC(userCC)) {
        userCC = reverse(userCC);
        myLuhnAlg(userCC);
    } else {
        errorEntry();
    }
}


