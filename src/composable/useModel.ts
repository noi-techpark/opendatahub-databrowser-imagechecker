/*

SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { loadLayersModel, type LayersModel } from '@tensorflow/tfjs';

let cachedModel: LayersModel | null = null;

let modelLoadingPromise: Promise<LayersModel> | null = null;

export async function getModel(): Promise<LayersModel> {
  if (cachedModel) return cachedModel;
  
  if (modelLoadingPromise) return modelLoadingPromise;

  modelLoadingPromise = loadLayersModel('/ModelV3/model.json').then(model => {
    cachedModel = model;
    console.log("Model loaded successfully");
    modelLoadingPromise = null; 
    return model;
  });

  return modelLoadingPromise;
}