class Rotator {
    constructor(rotatorElement, options = {}) {
        this.rotatorElement = rotatorElement;
        this.items = this.rotatorElement.querySelectorAll('.rotator-item');
        this.rotatorContents = this.rotatorElement.querySelector('.rotator-contents');
        this.options = {
            leftArrowSelector: '.rotator-arrow-left',
            rightArrowSelector: '.rotator-arrow-right',
            ...options,
        };

        this.init();
    }

    init() {
        const leftArrow = this.rotatorElement.querySelector(this.options.leftArrowSelector);
        const rightArrow = this.rotatorElement.querySelector(this.options.rightArrowSelector);

        leftArrow.addEventListener('click', () => this.rotateLeft());
        rightArrow.addEventListener('click', () => this.rotateRight());
        this.updateItemClasses();
    }

    rotateRight() {
        this.rotatorContents.appendChild(this.items[0]);
        this.items = Array.from(this.rotatorContents.children);
        this.updateItemClasses();
    }

    rotateLeft() {
        const lastItem = this.items[this.items.length - 1];
        this.rotatorContents.insertBefore(lastItem, this.items[0]);
        this.items = Array.from(this.rotatorContents.children);
        this.updateItemClasses();
    }

    updateItemClasses() {
        const n = this.items.length;
        const midIndex = Math.floor(this.items.length / 2);
        const minWidth = 25;
        const maxWidth = 100;
        const widthMultiplier = 2;
        const minOpacity = 20;
        const maxOpacity = 100;
        const opacityMultiplier = 3;

        let opacity = minOpacity;
        let height = minWidth;

        for (let i = 0; i < midIndex; i++) {
            this.items[i].style.setProperty('width', height + '%');
            height *= widthMultiplier;
            this.items[i].style.setProperty('opacity', opacity + '%');
            opacity *= opacityMultiplier;
        }

        for (let i = midIndex; i < n; i++) {
            this.items[i].style.setProperty('width', height + '%');
            height /= widthMultiplier;
            this.items[i].style.setProperty('opacity', opacity + '%');
            opacity /= opacityMultiplier;
        }

        this.items[midIndex].style.setProperty('opacity', maxOpacity + '%');
    }
}
