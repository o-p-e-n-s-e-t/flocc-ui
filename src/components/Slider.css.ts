export default `
.__floccUI-slider__container {
    user-select: none;
}
.__floccUI-slider__inner {
    padding: 30px 0 24px;
}
.__floccUI-slider {
    appearance: none;
    -webkit-appearance: none;
    display: block;
    width: 100%;
}
.__floccUI-slider:focus {
    outline: 0;
}
.__floccUI-slider::-webkit-slider-thumb {
    appearance: none;
    -webkit-appearance: none;
    border: 1px solid #000000;
    border-radius: 50%;
    height: 12px;
    width: 12px;
    background: #ffffff;
    cursor: pointer;
    margin-top: -6px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
}
.__floccUI-slider::-webkit-slider-runnable-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.15);
    border-radius: 2px;
}
.__floccUI-slider::-ms-track {
    width: 100%;
    cursor: pointer;
    background: transparent; 
    border-color: transparent;
    color: transparent;
}
.__floccUI-slider__marker {
    background: #fff;
    border: 1px solid #aaa;
    padding: 3px;
    position: absolute;
    top: 0;
    transform: translateX(-50%);
    font-size: 11px;
}
.__floccUI-slider__marker:before {
    content: "";
    display: block;
    position: absolute;
    bottom: -4px;
    left: calc(50% - 4px);
    height: 7px;
    width: 7px;
    transform: rotate(45deg);
    background: #fff;
    border-bottom: 1px solid #aaa;
    border-right: 1px solid #aaa;
}
.__floccUI-slider__min {
    bottom: 0;
    top: unset;
    left: 8px;
}
.__floccUI-slider__max {
    float: right;
    top: unset;
    bottom: 0;
    right: -16px;
}
.__floccUI-slider__min:before,
.__floccUI-slider__max:before {
    content: "";
    display: block;
    position: absolute;
    top: -4px;
    left: calc(50% - 4px);
    height: 7px;
    width: 7px;
    transform: rotate(225deg);
    background: #fff;
    border-bottom: 1px solid #aaa;
    border-right: 1px solid #aaa;
}
`;
