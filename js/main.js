const IMAGE_WIDTH = 400;
const HEAD = 'head';
const BODY = 'body';
const TAIL = 'tail';

class Constructor {
    static doStuff() {
        let container = $('div.container-fluid');
        container.appendTo(document.querySelector('body'));
        let row = $('div.row', {}, container);
        new Inventory($('div.col-sm-fluid', {}, row));
        new Combinator($('div.col-sm', {}, row));
        $('a', {innerHTML: 'Sources on GitHub', href: 'https://github.com/Cjkjvfnby/make_me'}, container);
    }
}

class Inventory {
    constructor(parent) {
        $('button.btn.btn-warning.col-sm', {type: 'button', innerText: 'Склад'}, parent);
        new Bag(parent, ['h1', 'h2', 'h3', 'h1'], 'Голова', HEAD);
        new Bag(parent, ['b3', 'b1', 'b2', 'b3'], 'Тело', BODY);
        new Bag(parent, ['t2', 't3', 't1', 't2'], 'Конечность', TAIL);
    }
}

class Bag {
    constructor(parent, imageList, text, type) {
        imageList = Bag.resolvePaths(imageList);
        $('button.btn.btn-info.col-sm', {type: 'button', innerText: text}, parent);
        let pane = $('div.col-sm', {hidden: false}, parent);

        imageList.map(path => $('img.img-thumbnail.rounded.draggable', {
            src: path,
            width: IMAGE_WIDTH / 4,
            draggable: true,
            ondragstart: (e) => {
                console.log('Drag start', e.target);
                e.dataTransfer.setData("path", e.target.src);
                e.dataTransfer.setData("type", e.target.image_type);
            },
            image_type: type,
        }, pane));
    }

    static resolvePaths(imageList) {
        return imageList.map(name => 'img/' + name + '.png');
    }
}

class Combinator {
    constructor(parent) {
        $('button.plot.btn.btn-warning.col-sm',
            {
                type: 'button',
                innerText: 'Собери меня, каким я нравлюсь тебе'
            },
            parent);
        let container = $('div.container.col-smjustify-content-center', {}, parent);
        new Section('Место для голвы', container, HEAD, 142);
        new Section('Место для тела', container, BODY, 224);
        new Section('Место для конечностей', container, TAIL, 485);
    }
}

class Section {
    constructor(name, parent, type, height) {
        let box = $('div.row.d-flex', {}, parent);

        $('img.border.border-wide.border-dark',
            {
                alt: name,
                src: '/img/empty',
                width: IMAGE_WIDTH,
                height: height,
                ondrop: (e) => {
                    e.preventDefault();
                    let src = e.dataTransfer.getData("path");
                    let type = e.dataTransfer.getData("type");
                    if (type === e.target.image_type) {
                        e.target.src = src;
                    }
                    else {
                        alert("Не туда!")
                    }
                },
                ondragover: (e) => e.preventDefault(),
                image_type: type
            }, box);
    }
}







