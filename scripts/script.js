const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
camera.position.z = 10;
renderer.setSize(512, 512);
renderer.setClearColor(0x000000, 1);
document.body.appendChild(renderer.domElement);


function createShapeWithHole() {
    const outerShape = new THREE.Shape().absarc(0, 0, 1.1, 0, Math.PI * 2);
    outerShape.holes.push(new THREE.Shape().absarc(0, 0, 1, 0, Math.PI * 2));

    const geometry = new THREE.ExtrudeGeometry(outerShape, { depth: 0.2, bevelEnabled: false });
    return new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xff }));
}

var frontSideMaterial, backSideMaterial;
function createTexturedCircle() {
    const texture = new THREE.TextureLoader().load("cat.png");//https://cdn-icons-png.flaticon.com/512/14446/14446233.png");
    const texture2 = new THREE.TextureLoader().load("cat.png", (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.rotation = Math.PI
    });

    frontSideMaterial = new THREE.MeshBasicMaterial({ map: texture, depthWrite: true,transparent: true});

    backSideMaterial = new THREE.MeshBasicMaterial({ map: texture2, depthWrite: true, transparent: true});

    const circle = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 0.6, 256), [frontSideMaterial, frontSideMaterial, backSideMaterial]);
    circle.rotation.x = Math.PI / 2;
    circle.rotation.y = Math.PI / 2;
    circle.position.set(0, 0, 0.1);
    return circle;
}

const coin = new THREE.Group();
//coin.add(createShapeWithHole(), createTexturedCircle());
// scene.add(coin)


var isSizeSmall = true;
var button = document.getElementById("btn-size-change");
button.addEventListener('click', () => {
    const newSize = renderer.domElement.width === 100 ? 512 : 100;
    renderer.setSize(newSize, newSize);
    button.innerText = `${newSize}px`;
});




let atmosphere = new THREE.Object3D();
scene.add(atmosphere);

// Создаем форму сердца
let heartShape = new THREE.Shape();
heartShape.moveTo(25, 25);
heartShape.bezierCurveTo(25, 25, 20, 0, 0, 0);
heartShape.bezierCurveTo(-30, 0, -30, 35, -30, 35);
heartShape.bezierCurveTo(-30, 55, -10, 77, 25, 95);
heartShape.bezierCurveTo(60, 77, 80, 55, 80, 35);
heartShape.bezierCurveTo(80, 35, 80, 0, 50, 0);
heartShape.bezierCurveTo(35, 0, 25, 25, 25, 25);
// Настройки экструзии
var extrudeSettings = { depth: 1, bevelEnabled: true, bevelSegments: 20, steps: 2, bevelSize: 20, bevelThickness: 10 }// Создаем геометрию сердца
let geometry2 = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);

// Создаем материал
let material = new THREE.MeshBasicMaterial({
    color: 0xcdcdcd
});

// Создаем сетку сердца


let heart = new THREE.Mesh(geometry2, material);

// Устанавливаем позицию и вращение
heart.position.set(0, 0, 0);
var scale = 2;
heart.scale.x = 0.01 * scale;
heart.scale.y = 0.01 * scale;
heart.scale.z = 0.01 * scale;
heart.rotation.x = Math.PI; // Поворот по оси X
heart.rotation.y = Math.PI;



// Добавляем сердце в атмосферу
var coinmesh = createTexturedCircle();
coinmesh.position.x = -0.5;
coinmesh.position.y = -1;
coinmesh.position.z = 0.1;
coin.add(heart, coinmesh);
scene.add(coin)
// Устанавливаем позицию камеры

function animate() {
    requestAnimationFrame(animate);
  //  heart.rotation.x += 0.01;
    coin.rotation.y += 0.01;
    renderer.render(scene, camera);
}

// Запуск анимации
animate();