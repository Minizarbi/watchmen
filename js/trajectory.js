function TRAJECTORY(scene, gravity, timeStep, pointNumber) {
    var module = {};

    var trajectory;
    var origPoint = new THREE.Vector3();
    var origSpeed = new THREE.Vector3();

    module.setOrigPoint = function (point) {
        origPoint.copy(point);
    }

    module.setOrigPoint = function (x, y, z) {
        origPoint.set(x, y, z);
    }

    module.setOrigSpeed = function (speed) {
        origSpeed.copy(speed);
    }

    module.setOrigSpeed = function (x, y, z) {
        origSpeed.set(x, y, z);
    }

    module.changeTrajectory = function () {
        if (trajectory) {
            scene.remove(trajectory);
        }

        var curve = new THREE.SplineCurve3(createPointArray(gravity, timeStep, pointNumber));

        var geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(60);
        geometry.computeLineDistances();
        var material = new THREE.LineDashedMaterial({
            color: 0xffffff,
            linewidth: 2,
            scale: 5,
            dashSize: 1,
            gapSize: 0.5
        });
        trajectory = new THREE.Line(geometry, material);

        scene.add(trajectory);
    }

    module.hide = function () {
        scene.remove(trajectory);
    }

    function createPointArray(gravity, timeStep, pointNumber) {
        var pointArray = [];
        var point = origPoint.clone();
        var speed = origSpeed.clone();
        for (var i = 0; i < pointNumber; i++) {
            pointArray.push(point.clone());
            point.x += speed.x * timeStep;
            point.y += speed.y * timeStep;
            /* point.z doesn't change */
            speed.y += gravity * timeStep;
        }

        return pointArray;
    }

    return module;
}