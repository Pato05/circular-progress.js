"use strict";
!(function() {
    for(let el of document.querySelectorAll("div.circularPercent")) {
        if(el.getAttribute("data-percent")) {
            if(!isNaN(el.getAttribute("data-percent"))) {
                if(el.getAttribute("data-percent") <= 100){
                    var text = null;
                    var strokeWidth = el.getAttribute("data-stroke-width") ? el.getAttribute("data-stroke-width") : 10;
                    var stroke = el.getAttribute("data-stroke") ? el.getAttribute("data-stroke") : "#2ecc71";
                    var textColor = el.getAttribute("data-text-color") ? el.getAttribute("data-text-color") : "#2ecc71";
                    if(el.getAttribute("data-text")) {
                        text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                    }
                    var box = document.createElementNS("http://www.w3.org/2000/svg","svg");
                    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    var percent = el.getAttribute("data-percent");
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
                        box.appendChild(text);
                        text.appendChild(document.createTextNode(el.getAttribute("data-text")));
                        var posInfo = text.getBoundingClientRect();
                        text.setAttribute("x", (200 / 2) - (posInfo.width / 2));
                        text.setAttribute("y", (200 / 2));
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
                    el.setLabel = function(text) {
                        if(text) {
                            var elem = this.querySelector("svg > text");
                            if(!elem) {
                                elem = document.createElementNS("http://www.w3.org/2000/svg", "text");
                                this.querySelector("svg").appendChild(elem);
                            }
                            elem.innerHTML = text;
                            var posInfo = elem.getBoundingClientRect();
                            elem.setAttribute("x", (200 / 2) - (posInfo.width / 2));
                            elem.setAttribute("y", (200 / 2));
                            return this;
                        } else {
                            console.error("text not set.");
                            return false;
                        }
                    }
                } else {
                    console.error("data-percent of ", el, "can't be greater than 100");
                }
            } else {
                console.error("data-percent of ", el, "isn't a number");
            }
        } else {
            console.error("data-percent of ", el, "is not set.")
        }
    }
})()