class SA {
    constructor(element_type, attrs, parent) {
        let items = element_type.split('.');
        this.element = document.createElement(items[0]);

        attrs = attrs || {};
        Object.keys(attrs).forEach(key => this.element[key] = attrs[key]);
        items.slice(1).forEach(cls => this.element.classList.add(cls));
        if (parent) {
            this.appendTo(parent.element);
        }
    }

    /**
     * @param {Node} parent
     */
    appendTo(parent) {
        parent.appendChild(this.element);
    }
}

$ = function (element_type, attrs, parent) {
    return new SA(element_type, attrs, parent);
};
