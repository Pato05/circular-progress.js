"use strict";
var circularProgressDefaults = (typeof circularProgressDefaults === "object") ? circularProgressDefaults : {};
circularProgressDefaults.stroke = circularProgressDefaults.stroke||"#2ecc71";
circularProgressDefaults.strokeWidth = circularProgressDefaults.strokeWidth||10;
circularProgressDefaults.textColor = circularProgressDefaults.textColor||"#2ecc71";
circularProgressDefaults.dimensions = circularProgressDefaults.dimensions||"200px";
circularProgressDefaults.text = circularProgressDefaults.text||null;
circularProgressDefaults.pathStroke = circularProgressDefaults.pathStroke||"rgba(0,0,0,0.1)";
circularProgressDefaults.showPath = circularProgressDefaults.showPath||true;
circularProgressDefaults.calcDashoffset = circularProgressDefaults.calcDashoffset||function(l) {return l / 4;};
circularProgressDefaults.textFont = circularProgressDefaults.textFont||"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
circularProgressDefaults.textSize = circularProgressDefaults.textSize||"20px";
circularProgressDefaults.strokeLinecap = circularProgressDefaults.strokeLinecap||"round";
circularProgressDefaults.transition = circularProgressDefaults.transition||".7s ease";
var circularProgress = {
    new: function(el, progress, label = false) {
        if(el.getAttribute("data-percent") || progress) {
            if(!isNaN(el.getAttribute("data-percent")) || !isNaN(progress)) {
                if(el.getAttribute("data-percent") <= 100){
                    var strokeWidth = el.getAttribute("data-stroke-width") ? el.getAttribute("data-stroke-width") : circularProgressDefaults.strokeWidth;
                    var stroke = el.getAttribute("data-stroke") ? el.getAttribute("data-stroke") : circularProgressDefaults.stroke;
                    var textColor = el.getAttribute("data-text-color") ? el.getAttribute("data-text-color") : circularProgressDefaults.textColor;
                    if(el.getAttribute("data-text") || label || circularProgressDefaults.text) {
                        text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                    }
                    if(!el.classList.contains("circularProgress")) el.classList.add("circularProgress");
                    if(!el.getAttribute("data-percent")) el.setAttribute("data-percent", progress);
                    var box = document.createElementNS("http://www.w3.org/2000/svg","svg");
                    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    var percent = progress ? progress : el.getAttribute("data-percent");
                    var d = el.getAttribute("data-dimensions") ? el.getAttribute("data-dimensions") : circularProgressDefaults.dimensions;
                    el.style.width = d;
                    el.style.height = d;
                    circle.setAttribute("cx", 100);
                    circle.setAttribute("cy", 100);
                    circle.setAttribute("r", 100 - strokeWidth / 2);
                    circle.style.strokeWidth = strokeWidth;
                    var pathLength = circle.getTotalLength();
                    var head = document.getElementsByTagName("head")[0] || document.head;
                    if(!head.querySelector("style#circularProgress")) {
                        var vendorPrefixes = ['-o-', '-moz-', '-webkit-', ''];
                        var styleElem = document.createElement("style");
                        var styleString = "";
                        for(var prefix of vendorPrefixes) {
                            styleString += "@"+prefix+"keyframes circularPercent-complete { 0% {stroke-dasharray: 0, "+pathLength+"}}";
                        }
                        if (styleElem.styleSheet){
                            styleElem.styleSheet.cssText = styleString;
                          } else {
                            styleElem.appendChild(document.createTextNode(styleString));
                          }
                          styleElem.id = "circularProgress";
                          head.appendChild(styleElem);
                    }
                    var offset = (percent != 0) ? pathLength - (percent * pathLength / 100) : pathLength;
                    circle.style.strokeDasharray = (pathLength - offset) + "," + offset;
                    circle.style.strokeDashoffset = circularProgressDefaults.calcDashoffset(pathLength);
                    circle.style.stroke = stroke;
                    circle.style.strokeLinecap = el.getAttribute("data-stroke-linecap") ? el.getAttribute("data-stroke-linecap") : circularProgressDefaults.strokeLinecap;
                    circle.style.position = "absolute";
                    circle.style.animation = "circularPercent-complete 1s linear";
                    box.style.position = "absolute";
                    circle.style.top = 0;
                    box.style.top = 0;
                    circle.style.left = 0;
                    box.style.left = 0;
                    circle.style.width = "100%";
                    box.style.width = "100%";
                    circle.style.height = "100%";
                    box.style.height = "100%";
                    circle.style.fill = "transparent";
                    box.style.fill = "transparent";
                    el.style.position = "relative";
                    circle.classList.add("progress");
                    if(el.getAttribute("data-transition") || circularProgressDefaults.transition) {
                        circle.style.transition = el.getAttribute("data-transition") || circularProgressDefaults.transition;
                    } else circle.style.transition = ".7s ease";
                    box.setAttribute("viewBox", "0 0 200 200");
                    box.setAttribute("width", d);
                    box.setAttribute("height", d);
                    if((el.getAttribute("data-show-path") && ""+el.getAttribute("data-show-path") == "true") || (!el.getAttribute("data-show-path") && ""+circularProgressDefaults.showPath == "true") ) {
                        var path = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                        path.style.strokeDasharray = pathLength;
                        path.style.strokeWidth = strokeWidth;
                        path.style.stroke = el.getAttribute("data-path-stroke") ? el.getAttribute("data-path-stroke") : circularProgressDefaults.pathStroke;
                        path.classList.add("path");
                        path.setAttribute("cx", 100);
                        path.setAttribute("cy", 100);
                        path.setAttribute("r", 100 - strokeWidth / 2);
                        box.appendChild(path);
                    }
                    box.appendChild(circle);
                    el.appendChild(box);
                    if(el.getAttribute("data-text") || label || circularProgressDefaults.text) {
                        var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                        text.appendChild(document.createTextNode(el.getAttribute("data-text") ? el.getAttribute("data-text") : (label ? label : circularProgressDefaults.text)));
                        text.style.fontSize = el.getAttribute("data-text-size") ? el.getAttribute("data-text-size") : circularProgressDefaults.textSize;
                        text.style.fontFamily = el.getAttribute("data-text-font") ? el.getAttribute("data-text-font") : circularProgressDefaults.textFont;
                        box.appendChild(text);
                        text.setAttribute("x", "50%");
                        text.setAttribute("y", "50%");
                        text.setAttribute("dominant-baseline", "middle");
                        text.setAttribute("text-anchor", "middle");
                        text.style.fill = textColor;
                    }
                    el.setPercent = function(percent) {
                        var circle = this.querySelector("svg > circle.progress");
                        if(!isNaN(percent)) {
                            if(percent > 100) {
                                console.error(percent + " is greater than 100.");
                                return false;
                            } else {
                                this.setAttribute("data-percent", percent);
                                var offset = (percent != 0) ? pathLength - (percent * pathLength / 100) : pathLength;
                                circle.style.strokeDasharray = (pathLength - offset) + "," + offset;
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
