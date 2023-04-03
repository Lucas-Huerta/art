<script setup>
import {noise} from './shaders/noise'
import {fragment} from './shaders/fragment'
import {vertex} from './shaders/vertex'
import * as THREE from 'three';
import { ref, onMounted ,onUnmounted } from 'vue';

let canvas = ref(null);
let t = 5;
let backtrack = false;
let renderer, camera, scene, mesh;
let unMount = ref(false)

const rgb = function(r, g, b) {
    return new THREE.Vector3(r, g, b);
}

const randomInteger = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const config = {
    colors: [
        { low: rgb(127,68,255), high: rgb(225,68,90) },
        { low: rgb(80, 111, 206), high: rgb(176, 154, 32) },
        { low: rgb(77, 115, 241), high: rgb(221, 221, 209) }, 
    ]
}
onMounted(async() => {
    canvas.value = document.getElementById("canvas");
    unMount.value == false;
    renderer = new THREE.WebGLRenderer({
        powerPreference: "high-performance",
        antialias: true, 
        alpha: true,
        canvas: canvas.value // canvas is the Id for our HTML5 canvas. Remove this line and Three will auto create a canvas.
    });
    // Get el width and height
    let elWidth = window.innerWidth;
    let elHeight = window.innerHeight
    camera = new THREE.PerspectiveCamera( 20, elWidth / elHeight, 0.1, 1000 );
    scene = new THREE.Scene();
    scene.add(camera)
    
    // Set sizes and set scene/camera
    let i = 2;
    // Check on colors to use
    let high = config.colors[i].high; 
    let low = config.colors[i].low;

    // Create a plane, and pass that through to our shaders
    let geometry = new THREE.PlaneGeometry(600, 600, 100, 100);
    let material = new THREE.ShaderMaterial({
        uniforms: {
            // All of these variables are passed to our shaders
            // which are then passed to the GPU
            u_lowColor: {type: 'v3', value: low },
            u_highColor: {type: 'v3', value: high },
            u_time: {type: 'f', value: 0},
            u_resolution: {type: 'v2', value: new THREE.Vector2(elWidth, elHeight) },
            u_mouse: {type: 'v2', value: new THREE.Vector2(0, 0) },
            u_height: {type: 'f', value: 1},
            u_manipulate: {type: 'f', value: 0.6 },
            u_veinDefinition: {type: 'f', value: 20 },
            u_goCrazy: { type: 't', value: 20 }, //1 / 100
            u_inputTexture: {type: 't', value: 1},
            u_scale: {type: 'f', value: 1.4 }, //0.9
            u_clickLength: { type: 'f', value: 0.00002}, // 0.2
            u_rand: { type: 'f', value: randomInteger(0, 10) },
            u_rand: {type: 'f', value: new THREE.Vector2(randomInteger(6, 10), randomInteger(8, 10)) }
        },
        fragmentShader: noise + fragment,
        vertexShader: noise + vertex,
    });
    // Create the mesh and position appropriately
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, -300);
    scene.add(mesh);
    renderer.setSize(elWidth, elHeight);
    document.body.appendChild(renderer.domElement)
    renderer.setPixelRatio( elWidth/elHeight );
    await animate();
});

const animate = async() =>{
    if (!unMount.value) {
        requestAnimationFrame( animate );
        await renderer.render( scene, camera );
        document.body.appendChild(renderer.domElement);
        mesh.material.uniforms.u_time.value = t;
        if(t < 10 && backtrack == false) {
            t = t + 0.005;
        } else {
            backtrack = true;
            t = t - 0.005;
            if(t < 0) {
                backtrack = false;
            }
        }
    }
};

onUnmounted(async() => {
    // Nettoyage des éléments ThreeJS lorsque le composant est détruit
    unMount.value = true
    renderer.dispose();
    scene = null;
    camera = null

    await canvas.value.parentNode.removeChild(canvas);
});

</script>

<template>
    <canvas id="canvas" ref="canvas"></canvas>
</template>

<style scoped>

#canvas{
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
  z-index: -2;
  transition: all 0.01s ease-out;
}
</style>