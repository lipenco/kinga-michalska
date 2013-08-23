function layoutSnakeGrid() {
    var numberOfColumns = 4;
    var distanceX = 1600;
    var distanceY = 1000;
    var elements = document.querySelectorAll(".step");
    var positionX = 0;
    var positionY = 0;
    var rowType = "even";
    for (var index = 0; index < elements.length; index++) {
        elements[index].dataset.x = positionX;
        elements[index].dataset.y = positionY;
        if ((index + 1) % numberOfColumns === 0) {
            positionY = positionY + distanceY;
            if (rowType === "even") {
                rowType = "odd";
                positionX = (distanceX * (numberOfColumns - 1));
            } else {
                rowType = "even";
                positionX = 0;
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



