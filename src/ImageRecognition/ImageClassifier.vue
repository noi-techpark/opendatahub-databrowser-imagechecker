<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div ref="canvasContainer"
    class =" absolute bottom-0 left-0"
  ></div>
  
</template>


<script setup lang="ts">

//this component utilizes TeachableMachine WEB GUI wich is not open source
import { ref, onMounted, onBeforeUnmount } from "vue";

import p5 from "p5";


declare global {
  interface Window {
    p5: typeof p5;
    ml5: {
      imageClassifier(modelURL: string, callback?: () => void): Ml5ImageClassifier;
    };
  }
}


interface Ml5ClassificationResult {
  label: string;
  confidence: number;
}

interface Ml5ImageClassifier {
  classify(
    input: p5.Image | HTMLImageElement,
    callback: (results: Ml5ClassificationResult[]) => void
  ): void;
}

const props = defineProps<{
  ImageUrl: string
}>()

//const model = "./mymodel/"
const canvasContainer = ref<HTMLDivElement | null>(null);
onMounted(() => {
    
    let label: string
    let confidence: string
    let ImageModelURL = "https://teachablemachine.withgoogle.com/models/puw1I64mz/"

    const loadAndAnalyze = (p: p5) => {
        let img: p5.Image
        let classifier: Ml5ImageClassifier
        p.preload = () => {
            img = p.loadImage(props.ImageUrl,
                () => console.log("Image loaded!"), (err: Event) => console.error("Failed to load image:", err)
             );
            classifier = window.ml5.imageClassifier(ImageModelURL)
        }

        p.setup = () => {
            p.createCanvas(300, 100).parent(canvasContainer.value!);
            classifier.classify(img, gotResult)
        }
        

        function gotResult(results: Ml5ClassificationResult[]){
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

    
    const myp5 = new window.p5(loadAndAnalyze);
    onBeforeUnmount(() => {
    myp5.remove(); // cleanup
    });
});
</script>
