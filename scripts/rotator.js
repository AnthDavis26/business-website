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
        const minFlex = 1;
        const flexMultiplier = 3;
        const minOpacity = 50;
        const maxOpacity = 100;
    
        let flex = minFlex;
        
        for (let i = 0; i < n; i++) {
            const distanceToMiddle = Math.abs(midIndex - i);
            const opacity = minOpacity + (maxOpacity - minOpacity) * (1 - distanceToMiddle / midIndex);
    
            this.items[i].style.setProperty('flex-grow', flex);
            this.items[i].style.setProperty('opacity', opacity + '%');
    
            flex *= i < midIndex ? flexMultiplier : 1 / flexMultiplier;
        }
    }
}
