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
        const startHeight = 25;
        const heightMultiplier = 2;
        const startOpacity = 20;
        const opacityMultiplier = 3;
        var opacity = startOpacity;
        var height = startHeight;
        const midIndex = Math.floor(this.items.length / 2);
        for (let i = 0; i < midIndex; i++) {
            this.items[i].style.setProperty('width', height + '%');
            height *= heightMultiplier;
            this.items[i].style.setProperty('opacity', opacity + '%');
            opacity *= opacityMultiplier;
        }
        for (let i = midIndex; i < n; i++) {
            this.items[i].style.setProperty('width', height + '%');
            height /= heightMultiplier;
            this.items[i].style.setProperty('opacity', opacity + '%');
            opacity /= opacityMultiplier;
        }
        this.items[midIndex].style.setProperty('opacity', '100%');
    }
}

document.querySelectorAll('.rotator').forEach((rotatorElement) => {
    new Rotator(rotatorElement);
});
