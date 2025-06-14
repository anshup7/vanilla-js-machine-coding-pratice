/**
 * Description - Add the Slider Component, that is filled based on the dragging pointer through mouse
 * Slider Idea - 
 * 1. If mouse left key is down on the knob
 * 2. Mouse over even on the gutter will be honoured
 * 
 */

let knob;
let sliderGutter;

function init() {
    knob = document.getElementById("sliderKnob");
    sliderGutter = document.getElementById("sliderGutter");
    knob.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
}

window.onload = () => init();

function debounceWrapper(func, wait) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        setTimeout(() => func.call(this, ...args), wait * 1000);
    }
}

function calculateProgress(sliderGutterLeft, mouseX, sliderGutterTrackWidth) {
    const relativePosition = ((mouseX - sliderGutterLeft) / (sliderGutterTrackWidth));
    const progress = Math.max(0, Math.min(0.8, relativePosition));
    return progress * 100;
}


function trackMouseMovement(e) {
    const sliderGutterSeekCollection = document.getElementsByClassName("slider-gutter__seek");
    const sliderGutterSeek = sliderGutterSeekCollection[0];
    const sliderGutterBoundingRect = sliderGutter.getBoundingClientRect();
    const progress = calculateProgress(sliderGutterBoundingRect.left, e.x, sliderGutterBoundingRect.width);
    sliderGutterSeek.style.width = `${progress}%`;
}

const debouncedTrackMouseMovement = debounceWrapper(trackMouseMovement, 5); // not much effective


function handleMouseDown(e) {
    console.log("Mouse is down", e);
    sliderGutter.addEventListener("mousemove", trackMouseMovement);
}

function handleMouseUp(e) {
    console.log("Mouse Released", document);
    sliderGutter.removeEventListener("mousemove", trackMouseMovement);
}

window.onbeforeunload = () => {
    knob.removeEventListener("mousedown", handleMouseDown);
    document.removeEventListener("mouseup", handleMouseUp);
    sliderGutter.removeEventListener("mousemove", trackMouseMovement);
}