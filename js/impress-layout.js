function layoutSnakeGrid(options) {
    var numberOfColumns = options.numberOfColumns;
    var distanceX = options.distanceX;
    var distanceY = options.distanceY;
    var elements = document.querySelectorAll(".step");
    var positionX = 100;
    var positionY = 100;
    var rowType = "even";
    if (!distanceX || distanceX < 900) {
        distanceX = 1500;
    }
    if (!distanceY || distanceY < 700) {
        distanceY = 1000;
    }
    if (!numberOfColumns || numberOfColumns < 1) {
        numberOfColumns = 5;
    }
    for (var index = 0; index < elements.length; index++) {
        elements[index].dataset.x = positionX;
        elements[index].dataset.y = positionY;
        if ((index + 1) % numberOfColumns === 0) {
            positionY = positionY + distanceY;
            if (rowType === "even") {
                rowType = "odd";
                positionX = (distanceX * (numberOfColumns - 1)) + 100;
            } else {
                rowType = "even";
                positionX = 100;
            }
        } else {
            if (rowType === "even") {
                positionX = positionX + distanceX;
            } else {
                positionX = positionX - distanceX;
            }
        }
    }
}

