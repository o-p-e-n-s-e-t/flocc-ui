export default `
.__floccUI-panel {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
    position: fixed;
    top: 0;
    right: 0;
    background: #fff;
    border: 1px solid #aaa;
    width: 300px;
}

.__floccUI-panel__toggle-container {
    background: #eee;
    cursor: move;
    display: flex;
    padding: 5px;
}

.__floccUI-panel__toggle {
    color: #666;
    cursor: pointer;
    height: 20px;
    padding: 0;
    font-weight: bold;
    text-align: center;
    width: 20px;
    user-select: none;
}

.__floccUI-panel--collapsed {
    height: 32px;
    overflow: hidden;
}

.__floccUI-panel__components {
    padding: 5px;
}
`;
