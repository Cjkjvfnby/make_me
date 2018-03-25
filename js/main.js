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

        function drag(ev) {
            console.log('Drag start', ev.target);
            ev.dataTransfer.setData("path", ev.target.src);
            ev.dataTransfer.setData("type", ev.target.image_type);
        }

        imageList.map(path => $('img.img-thumbnail.rounded', {
            src: path,
            width: IMAGE_WIDTH / 4,
            draggable: true,
            ondragstart: drag,
            image_type: type
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

        function drop(ev) {
            ev.preventDefault();
            let src = ev.dataTransfer.getData("path");
            let type = ev.dataTransfer.getData("type");
            if (type === ev.target.image_type) {
                ev.target.src = src;
            }
            else {
                alert("Не туда!")
            }
        }


        $('img.border.border-wide.border-dark',
            {
                alt: name,
                src: '/img/empty',
                width: IMAGE_WIDTH,
                height: height,
                ondrop: drop,
                ondragover: (ev) => ev.preventDefault(),
                image_type: type
            }, box);
    }
}







