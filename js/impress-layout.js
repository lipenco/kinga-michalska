
function layoutCircleV2(options) {
    var radius = options.radius;
    var elements = document.querySelectorAll(".step");
    if (!radius || radius < 900) {
        radius = 1024 / (2 * Math.tan(Math.PI / elements.length));
    }
    var r = radius;
    for (var i = 0; i < elements.length; i++) {
        var phi = -i / (elements.length - 1) * 2 * Math.PI;
        var x = r * Math.cos(phi);
        var y = r * Math.sin(phi);
        var rotation = phi / (2 * Math.PI) * 360 - 90;
        elements[i].dataset.x = Math.round(x);
        elements[i].dataset.y = Math.round(y);
        elements[i].dataset.rotateY = Math.round(rotation) - 180;
        elements[i].dataset.rotateX = 90;
    }
}



