export default `
.__floccUI-slider__container {
    display: flex;
    align-items: center;
    font-size: 12px;
    margin-bottom: 10px;
    padding: 5px;
    user-select: none;
}

.__floccUI-slider__container:last-child {
    margin-bottom: 0;
}

.__floccUI-slider__inner {
    flex-grow: 2;
    margin-left: 5px;
    margin-right: 5px;
}

.__floccUI-slider {
    appearance: none;
    -webkit-appearance: none;
    flex-grow: 2;
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
    text-align: right;
}
`;
