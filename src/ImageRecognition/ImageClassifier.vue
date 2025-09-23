<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div v-if="props.type === 'card' "  class="absolute bottom-0 left-0 flex items-center justify-center bg-black/50 rounded">
    <div v-if="loading" class="text-white text-center text-xl" :class="status === 'Error' ? 'text-red-400' : ''">
      {{ status }}
    </div>
    <div v-if="error" class="text-red-400 text-center">
      <p>Error: {{ error }}</p>
    </div>

    <div v-if = "!loading && !error" class="text-white text-lg flex flex-col m-3  rounded p-3 gap-1"

    >
        <div>IMAGE CLASSIFICATION</div>  
        <ContentDivider></ContentDivider>  
        <p>
          Label: 
          <span
          :class="{
          'text-blue-400': label === 'Winter',
          'text-yellow-400': label === 'Summer',
          'text-gray-500': label !== 'Winter' && label !== 'Summer'
          }"
          >{{ label }}</span>
        </p>

        <p>Confidence: {{ confidence }}</p>
    </div>

  </div>

  <div  v-if = "props.type === 'icon'" class="flex items-center justify-center">
        <XMarkIcon v-if="error" class ="size-5 text-red-600"></XMarkIcon>

        <FireIcon v-else class ="size-5"
        :class="{
          'text-black' : loading,
          'text-blue-400': label === 'Winter',
          'text-yellow-400': label === 'Summer',
          'text-gray-500': label !== 'Winter' && label !== 'Summer'
          }"
        />
  </div>
  
</template>

<script setup lang="ts">
import ContentDivider from '@/components/contentAlignment/ContentDivider.vue';

import { scalar, ready, browser } from "@tensorflow/tfjs";
import type { LayersModel, Tensor } from "@tensorflow/tfjs";
import { getModel } from '@/composable/useModel';

import { ref, onMounted } from "vue";

import { FireIcon, XMarkIcon } from '@heroicons/vue/24/solid';

const props = defineProps<{
  ImageUrl: string;
  type: "icon" | "card";
}>();

const label = ref("")
const confidence = ref("")

const loading = ref(true);
const status = ref("loading...");
const error = ref("");


let model: LayersModel | null = null;



onMounted(async () => {
        initializeClassifier();
});


const preprocessImage = (img: HTMLImageElement): Tensor => {

    const targetSize = 224;
    
    // Create a canvas to resize the image
    const canvas = document.createElement('canvas');
    canvas.width = targetSize;
    canvas.height = targetSize;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error("Could not get canvas context");
    }
    
    // Draw and resize the image, model needs 224 x 224 
    ctx.drawImage(img, 0, 0, targetSize, targetSize);
    
    // Convert to tensor
    const tensor = browser.fromPixels(canvas)
        .toFloat()
        .div(scalar(255.0)) // Normalize to [0, 1]
        .expandDims(0); // Add batch dimension, in this case (colored Images) we add color dimensio RGB
    
    return tensor;
};

const classifyImage = async (img: HTMLImageElement): Promise<{ label: string; confidence: number }[]> => {
    if (!model) {
        throw new Error("Model not loaded");
    }


    const preprocessedImage = preprocessImage(img);

    try {
        const predictions = model.predict(preprocessedImage) as Tensor;
        const probabilities = await predictions.data();
        
        // Clean up tensors
        preprocessedImage.dispose();
        predictions.dispose();
        

        const labels = ['Winter', 'Summer', 'Neutral'];
        const results = Array.from(probabilities).map((confidence, index) => ({
            label: labels[index],
            confidence: confidence
        }));
        
        // Sort by confidence (highest first)
        results.sort((a, b) => b.confidence - a.confidence);
        
        return results;

    } catch (err) {
        preprocessedImage.dispose();
        throw err;
    }
};

const initializeClassifier = async () => {
  try {
    status.value = "Loading...";
    await ready();
    model = await getModel(); //singleton, loads model once

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = props.ImageUrl;

    img.onload = async () => {
      const results = await classifyImage(img);
      
      const best = results[0];
      label.value = best.label;
      confidence.value = (best.confidence * 100).toFixed(2) + "%";
      loading.value = false;
    };

    img.onerror = () => {
      error.value = "We couldn’t load the image. This might be due to permissions (CORS).";
      loading.value = false;
    };
  } catch (err) {
    error.value = String(err);
    loading.value = false;
  
  }
};



</script>