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
        
        const middleIndex = Math.floor(this.items.length / 2) - 1;
        this.items.forEach((item, index) => {
            if (index === middleIndex) {
                item.classList.add('large');
            } else {
                item.classList.remove('large');
            }
        });
    }

    rotateLeft() {
        this.rotatorContents.appendChild(this.items[0]);
        this.items = Array.from(this.rotatorContents.children);
        this.updateItemClasses();
    }
    
    rotateRight() {
        const lastItem = this.items[this.items.length - 1];
        this.rotatorContents.insertBefore(lastItem, this.items[0]);
        this.items = Array.from(this.rotatorContents.children);
        this.updateItemClasses();
    }
    
    updateItemClasses() {
        const middleIndex = Math.floor(this.items.length / 2) - 1;
        this.items.forEach((item, index) => {
            if (index === middleIndex) {
                item.classList.add('large');
            } else {
                item.classList.remove('large');
            }
        });
    }     
}

document.querySelectorAll('.rotator').forEach((rotatorElement) => {
    new Rotator(rotatorElement);
});
