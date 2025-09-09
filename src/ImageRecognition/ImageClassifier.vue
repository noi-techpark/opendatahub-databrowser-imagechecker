<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div ref="canvasContainer"
    class =" absolute bottom-0 left-0"
  ></div>
  
</template>


<script setup lang="js">

//this component utilizes TeachableMachine WEB GUI and it is not open source
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  ImageUrl: {
    type: String,
    required: true
  }
})

const model = "./mymodel/"
const canvasContainer = ref(null);
onMounted(() => {
    let myp5
    let label
    let confidence
    let ImageModelURL = "https://teachablemachine.withgoogle.com/models/puw1I64mz/"

    const sketch = (p) => {
        let img
        let classifier
        p.preload = () => {
            img = p.loadImage(props.ImageUrl,
                () => console.log("Image loaded!"), (err) => console.error("Failed to load image:", err)   
             );
            classifier = window.ml5.imageClassifier(ImageModelURL)
        }

        p.setup = () => {
            p.createCanvas(300, 100).parent(canvasContainer.value);
            classifier.classify(img, gotResult)
        }
        

        function gotResult(results){
            console.log(results)
            const best = results[0]
            label = "Label: " + best.label
            confidence = "Confidence: " + (best.confidence * 100).toFixed(2)+ "%"
            p.fill(255);
            p.stroke(0);
            p.textSize(18);
            p.text(label, 10, 50);
            p.text(confidence, 10, 80)
        }


    };

    myp5 = new window.p5(sketch);

    onBeforeUnmount(() => {
    myp5.remove(); // cleanup
    });
});
</script>
