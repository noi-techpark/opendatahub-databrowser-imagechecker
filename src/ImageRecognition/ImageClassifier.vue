<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div ref="canvasContainer"
    class =" absolute bottom-0 left-0 flex items-center justify-center"
  >
    <p v-if = "loading" class="text-white text-center text-xl"
      :class = "status == 'Error' ? 'text-red-400' : ''"  
    > {{status}} </p>
  
  </div>
  
</template>


<script setup lang="ts">

/*
TODOO decide if is worth keeping this or expanding on it

Summary of the tools/libraries utilized:
- Teachable Machine: proprietary web tool (free to use, models are exportable).
- Exported Models: open format (TensorFlow.js), no license restrictions.
- ml5.js: open source library (MIT).
- p5.js: open source library (LGPL-2.1).

The app fetches the model from Google’s CDN every time it loads, as its utilizing Google’s hosting of the model files, not the exported model.
*/

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
const loading = ref<boolean>(true)
const status = ref("loading...")
const canvasContainer = ref<HTMLDivElement | null>(null);
onMounted(() => {
    
    let label: string 
    let confidence: string
    let ImageModelURL = "https://teachablemachine.withgoogle.com/models/yAyfNz2Dl/"
    //let localModel = "./WinterSummerModel/"


    const loadAndAnalyze = (p: p5) => {
        let img: p5.Image
        let classifier: Ml5ImageClassifier
        p.preload = () => {
            img = p.loadImage(props.ImageUrl,
                () => console.log("Image loaded!"), (err: Event) => {console.error("Failed to load image:", err), status.value = "Error"}
             );
            classifier = window.ml5.imageClassifier(ImageModelURL + "./model.json")
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
            loading.value = false
        }


    };

    
    const myp5 = new window.p5(loadAndAnalyze);
    onBeforeUnmount(() => {
    myp5.remove(); // cleanup
    });
});
</script>
