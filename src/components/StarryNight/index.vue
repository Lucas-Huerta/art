<script setup>
import {noise} from './shaders/noise'
import {fragment} from './shaders/fragment'
import {vertex} from './shaders/vertex'
import * as THREE from 'three';
import { ref, onMounted } from 'vue';

let canvas = ref(null);
// let RefCanvas = $refs.canvas;
let t = 5;
let backtrack = false;

const assignRef = (el) => canvas.value = el;

const rgb = function(r, g, b) {
    return new THREE.Vector3(r, g, b);
}

const randomInteger = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const config = {
    colors: [
        { low: rgb(127,68,255), high: rgb(225,68,90) },
        { low: rgb(225, 109, 68), high: rgb(77, 115, 241) },
        { low: rgb(77, 115, 241), high: rgb(225, 109, 68) }
    ]
}
onMounted(() => {
  assignRef($refs.canvas);
  console.log(canvas);
})
    let renderer = new THREE.WebGLRenderer({
        powerPreference: "high-performance",
        antialias: true, 
        alpha: true,
        // canvas: canvas // canvas is the Id for our HTML5 canvas. Remove this line and Three will auto create a canvas.
    });
    
    // Get el width and height
    let elWidth = window.innerWidth;
    let elHeight = window.innerHeight
    
    // Set sizes and set scene/camera
    renderer.setSize( elWidth, elHeight );
    document.body.appendChild( renderer.domElement )
    renderer.setPixelRatio( elWidth/elHeight );
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera( 75, elWidth / elHeight, 0.1, 1000 );
    
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
            u_manipulate: {type: 'f', value: 1 },
            u_veinDefinition: {type: 'f', value: 20 },
            u_goCrazy: { type: 't', value: 1 },
            u_inputTexture: {type: 't', value: 1},
            u_scale: {type: 'f', value: 0.85 },
            u_clickLength: { type: 'f', value: 1},
            u_rand: { type: 'f', value: randomInteger(0, 10) },
            u_rand: {type: 'f', value: new THREE.Vector2(randomInteger(6, 10), randomInteger(8, 10)) }
        },
        fragmentShader: noise + fragment,
        vertexShader: noise + vertex,
    });
    // Create the mesh and position appropriately
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, -300);
    scene.add(mesh);

    // This function when run will animate the renderer
    // Meaning for every animation frame the 3d model
    // will be rerendered onto the canvas.
    const animate = function () {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
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
    };
    animate();

</script>

<template>
    <!-- <canvas id="canvas" ref="canvas"></canvas> -->
</template>