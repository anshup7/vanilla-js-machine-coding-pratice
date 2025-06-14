# vanilla-js-machine-coding-pratice
Keeping all Vanilla JS related Machine Coding Questions

## UI Slider

- Learned that If there is a firstChild nested in the parent. And the parent and child are both abosolute, left and right of the knob(child) is by default relative to its parent
- If slider needs to increase the filling bar progress, The progress can calculated by the following formula

```javascript

function calculateProgress(sliderGutterLeft, mouseX, sliderGutterTrackWidth) {
    const relativePosition = ((mouseX - sliderGutterLeft) / (sliderGutterTrackWidth));
    const progress = Math.max(0, Math.min(0.8, relativePosition));
    return progress * 100;
}

// sliderGutterLeft can be found from - sliderGutter.getBoundingRect().left

```

- Its very important to use mouse down and mouse up events on the document and not on Knob. As the moment mouse is moved in down situation from the knob, it the reference will
be lost and better/ memory efficient listener management can't be done.
