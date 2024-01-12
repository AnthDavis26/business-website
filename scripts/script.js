document.addEventListener("DOMContentLoaded", function() {
    const MIN_HEADER_CAPACITY = .6;
    const primaryColor = hslStringToHsl(getComputedStyle(document.documentElement).getPropertyValue('--primary-color'));
    const secondaryColor = hslStringToHsl(getComputedStyle(document.documentElement).getPropertyValue('--secondary-color'));
    const accentColor = hslStringToHsl(getComputedStyle(document.documentElement).getPropertyValue('--accent-color'));
    const menuToggle = document.getElementById("menu-toggle");

    updateColors();

    window.addEventListener('scroll', function() {
        var scrollPosition = 4 * window.scrollY / window.innerHeight;
        var opacity = 1 - scrollPosition;

        if (opacity < MIN_HEADER_CAPACITY) {
            opacity = MIN_HEADER_CAPACITY;
        }

        // Set the background opacity based on the scroll position
        this.document.documentElement.style.setProperty('--header-background-opacity', opacity);
    });

    function updateColors() {
        document.documentElement.style.setProperty('--primary-color-h', primaryColor[0]);
        document.documentElement.style.setProperty('--primary-color-s', primaryColor[1] + '%');
        document.documentElement.style.setProperty('--primary-color-l', primaryColor[2] + '%');

        document.documentElement.style.setProperty('--secondary-color-h', secondaryColor[0]);
        document.documentElement.style.setProperty('--secondary-color-s', secondaryColor[1] + '%');
        document.documentElement.style.setProperty('--secondary-color-l', secondaryColor[2] + '%');

        document.documentElement.style.setProperty('--accent-color-h', accentColor[0]);
        document.documentElement.style.setProperty('--accent-color-s', accentColor[1] + '%');
        document.documentElement.style.setProperty('--accent-color-l', accentColor[2] + '%');
    }
    
    function hslStringToHsl(hslString) {
        const match = hslString.match(/[.?\d]+/g);
        return match.map(value => parseFloat(value));
    }

    // Allows the user to click anywhere to close the menu
    document.addEventListener("click", function(event) {
        if (event.target.id !== "menu-button" && event.target !== menuToggle) {
            menuToggle.checked = false;
        }
    })

    // Implement rotator functionality in separate instances
    document.querySelectorAll('.rotator').forEach((rotatorElement) => {
        new Rotator(rotatorElement);
    });
});
