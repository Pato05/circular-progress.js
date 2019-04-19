"use strict";
var circularProgress = {
    new: function(el, progress, label = false) {
        if(el.getAttribute("data-percent") || progress) {
            if(!isNaN(el.getAttribute("data-percent")) || !isNaN(progress)) {
                if(el.getAttribute("data-percent") <= 100){
                    var text = null;
                    var strokeWidth = el.getAttribute("data-stroke-width") ? el.getAttribute("data-stroke-width") : 10;
                    var stroke = el.getAttribute("data-stroke") ? el.getAttribute("data-stroke") : "#2ecc71";
                    var textColor = el.getAttribute("data-text-color") ? el.getAttribute("data-text-color") : "#2ecc71";
                    if(el.getAttribute("data-text") || label) {
                        text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                    }
                    if(!el.classList.contains("circularProgress")) el.classList.add("circularProgress");
                    if(!el.getAttribute("data-percent")) el.setAttribute("data-percent", progress);
                    var box = document.createElementNS("http://www.w3.org/2000/svg","svg");
                    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    var percent = progress ? progress : el.getAttribute("data-percent");
                    var offset = (percent != 0) ? 603.2699584960938 - (percent * 603.2699584960938 / 100) : 603.2699584960938;
                    var width = el.getAttribute("data-width") ? el.getAttribute("data-width") : 200;
                    var height = el.getAttribute("data-height") ? el.getAttribute("data-height") : 200;
                    el.style.width = width+"px";
                    el.style.height = height+"px";
                    circle.style.strokeDasharray = (603.2699584960938 - offset) + "," + offset;
                    circle.style.strokeWidth = strokeWidth;
                    circle.style.stroke = stroke;
                    circle.setAttribute("cx", 100);
                    circle.setAttribute("cy", 100);
                    circle.setAttribute("r", 100 - strokeWidth / 2);
                    box.setAttribute("viewBox", "0 0 200 200");
                    box.setAttribute("width", width);
                    box.setAttribute("height", height);
                    box.appendChild(circle);
                    el.appendChild(box);
                    if(text) {
                        text.appendChild(document.createTextNode(el.getAttribute("data-text") ? el.getAttribute("data-text") : label));
                        box.appendChild(text);
                        text.setAttribute("x", "50%");
                        text.setAttribute("y", "50%");
                        text.setAttribute("dominant-baseline", "middle");
                        text.setAttribute("text-anchor", "middle");
                        text.style.fill = textColor;
                    }
                    el.setPercent = function(percent) {
                        var circle = this.querySelector("svg > circle");
                        if(!isNaN(percent)) {
                            if(percent > 100) {
                                console.error(percent + " is greater than 100.");
                                return false;
                            } else {
                                this.setAttribute("data-percent", percent);
                                var offset = (percent != 0) ? 603.2699584960938 - (percent * 603.2699584960938 / 100) : 603.2699584960938;
                                circle.style.strokeDasharray = (603.2699584960938 - offset) + "," + offset;
                                return this;
                            }
                        } else {
                            console.error(percent + " isn't a number.");
                            return false;
                        }
                    }
                    el.setLabel = function(text, color = "#2ecc71") {
                        if(text) {
                            var elem = this.querySelector("svg > text");
                            if(!elem) {
                                elem = document.createElementNS("http://www.w3.org/2000/svg", "text");
                                this.querySelector("svg").appendChild(elem);
                            }
                            elem.style.fill = color;
                            elem.innerHTML = text;
                            elem.setAttribute("x", "50%");
                            elem.setAttribute("y", "50%");
                            elem.setAttribute("dominant-baseline", "middle");
                            elem.setAttribute("text-anchor", "middle");
                            return this;
                        } else {
                            console.error("text not set.");
                            return false;
                        }
                    }
                    return el;
                } else {
                    console.error("data-percent of ", el, "can't be greater than 100");
                    return false;
                }
            } else {
                console.error("data-percent of ", el, "isn't a number");
                return false;
            }
        } else {
            console.error("data-percent of ", el, "is not set.");
            return false;
        }
    }
}
!(function() {
    for(let el of document.querySelectorAll("div.circularProgress")) {
        circularProgress.new(el);
    }
})()
