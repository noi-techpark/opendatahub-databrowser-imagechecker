
# INTRODUCTION

## Intended Use Case

The **Image Checker** is an interface designed to help users navigate the **Accommodations Dataset**.  

The primary use case is to **quickly identify entries that do not have an appropriate image gallery**.  

The Image Checker relies on **image validity dates** to display images correctly.  
Currently, validity dates are only available for entries with the source `lts`.  

For this reason, it is recommended to apply a **"source" filter with the value `lts`** in order to better understand the intended use case of this SPA.  


## Technologies Used
- Vue 3  
- TypeScript  
- TanstackQuery (AKA VueQuery) for query management and caching
- Pinia (for state management)  
- Axios for backend requests  
- Keycloak-js for authentication  
- Tensorflow.js and TeachableMachine for Image Classification


# FOLDER STRUCTURE

## General Structure

The main structure of the **Image Checker** can be divided into four key components:

- **AppHeader** → Handles OnLogin and OnLogout actions.  
- **DatasetHeader** → Provides dataset-related actions such as filtering, searching, and language selection.  
- **TableView** → Displays the dataset entries in a table format (explained in detail in the *TableView* section).  
- **AppFooter** → Contains the logic for page navigation and page selection.  

These components are located in the `pages/` folder.  

Additionally, the `pages/` folder includes:  
- **export/** → Contains the logic for exporting the current page data as a CSV file.  
- **filter/** → Contains the components for the filter sidebar.  

The `layout/` folder defines how these components are arranged within the application view

### TableView

The `TableView` folder contains all the components responsible for the interaction and visualization of the entries in the **Accommodations Dataset**.  

- **TableView.vue**  
  Renders the table headers and rows components. This is also where the initial data fetch is performed when the SPA is first rendered.  
  - **TableHeaders.vue** → Renders the table headers using the parameters defined in `ColumnValues.ts`.  
  - **TableRows.vue** → Renders a row for each item, using the parameters defined in `ColumnValues.ts` to determine what and how to display in each column.
    - for example `ColumnValues.ts` defines that  
      in the columns for Images, the ShowImages component is used to display Images  
      ```ts 
      { key: "mainImage",       component: showImages, props: { period: "mainImage" as const} }
       ```
      in the themes column, the value displayed is determined by a function that parses the AccoThemes Object
      ```ts 
      { key: "themes",          getValue: (item: Accommodation) => formatObject(item.AccoThemes) },
       ```

- **images/**  
  - **showImages.vue** → Accepts an array of images and a label (`winter`, `summer`, `all year`) as props, and returns the image that matches the validity dates for the given period.  
  - **ImagesCarousel.vue** → Displays the full image gallery for an accommodation.  

- **rawView/**  
  - **RawView.vue** → Accepts a raw JSON object as a prop and passes it to `JsonViewer`.  
  - **JsonViewer.vue** → Recursively renders a JSON object in a readable format.  

- **ColumnValues.ts**  
  Defines the **types** and **configuration** for displaying both table headers and column values for each accommodation item.  


## Reusable Components

All reusable components (i.e., components that are not tied to global state and receive all their data via props) are stored in the `components/` folder.  

The `components/` folder is organized into:  
- **General-purpose components** → Utilized across multiple parts of the application (e.g., `buttons/`, `contentAlignment/`, `card/`).  
- **Layout-specific components** → Used only in specific areas of the application, but still reusable (e.g., `datasetHeader/`, `header/`, `footer/`, `table/`).  

In addition, the `utils/` folder contains:  
- **api.ts** → A pre-configured `axios` instance that automatically attaches the authentication token to each request.  

**Example:**  
If you are looking for the `SearchBar` component used inside the dataset header, you can find it in: `components/datasetHeader/SearchBar.vue`

# Global State and API Calls

In the `stores/` folder, you can find the Pinia store **AccommodationStore.ts**.  
This store is particularly important as it contains variables that define the **state shared across multiple components** of the SPA.

### State Variables

The store can be divided in a few categories of state:

- **Search and filter parameters**  
  - `language`: current language (e.g., "DE")  
  - `searchfilter`, `typefilter`, `rawsort`, `rawfilter`: store user search and sort preferences  
  - `filters`: currently applied filters  
  - `filtersRef`: not yet applied filters, needed for communication between components  
  - `showFilterSideBar`: controls visibility of the filter sidebar  
  - `toggleImageClassification`: flag for toggling image classification feature

- **Pagination parameters**  
  - `pagenumber`, `pagesize`: current page and page size  
  - `TotalResults`, `TotalPages`, `CurrentPage`, `PreviousPage`, `NextPage`, `FirstTotalResults`: keep track of pagination state  

- **API and communication**  
  - `APIurl`: stores the current API endpoint, never utilized for now  
  - `loading`: indicates whether an API request is in progress  

---

### Actions

The store defines several **actions** to manage the state and interact with the URL or API:

- `updateAndFetch(router, route)`  
  Updates the URL query parameters based on the current filters, search, language, pagination, and sort options.  
  This ensures that the SPA state is reflected in the URL and allows users to share results.

- `restoreFromUrl(route)`  
  Restores the store state from the URL query parameters when the page is loaded or refreshed.  
  This includes filters, language, pagination, and sorting preferences.

- `removeFilter(index, router, route)`  
  Removes a filter by its index and updates the URL and SPA state accordingly.  

---

### Notes

- This store **acts as a global state container** using Pinia, allowing multiple components to share the same reactive data.  
- While the store itself does not make API calls directly, it **prepares the query parameters**, which are then executed by the composable in  `composable\useAccommodationsQuery.ts`

## API Calls

The SPA performs all backend requests through a centralized **API utility** and a Vue Query composable, ensuring consistent handling of authentication tokens and reactive data fetching.

### `utils/api.ts`

The `api.ts` file exports a pre-configured `axios` instance with the following features:

- **Base URL**: Set from the environment variable `VITE_APP_API_BASE_URL`.
- **Authentication Interceptor**:  
  Automatically attaches the Bearer token from the `auth` store (`auth.ts`) to every request.  
  ```ts
  Authorization: Bearer <accessToken>
  ````
 
 ### `composable/useAccommodationsQuery.ts`
 This composable is responsible for fetching accommodation data using TanStack Query (Vue Query)  

- Reactive Query:
The query key is built from several global state variables in the AccommodationStore and the accesstoken from the authStore.

```ts
queryKey: computed(() => [
  'accommodation',
  accommodationStore.searchfilter,
  accommodationStore.typefilter,
  accommodationStore.rawsort,
  accommodationStore.filters.map(f => `${f.type}|${f.comparison}|${f.value}`).join(','),
  accommodationStore.pagenumber,
  accommodationStore.pagesize,
  accommodationStore.language,
  auth.accessToken
])
```
- Query Function:
the function `fetchAccommodations` constructs a rawfilter string from the applied filters and sends a GET request via the api.ts axios instance, passing all relevant query parameters (searchfilter, typefilter, rawsort, rawfilter, pagination, language).  
The query data is considered fresh for 5 minutes `(staleTime: 5 * 60 * 1000)`.

```ts
  ]),
    queryFn: fetchAccommodations,
    staleTime: 5 * 60 * 1000,
  })
```
- Usage:  
Any component can import this composable to access the current list of accommodations and the loading/error (and many more) state:
```ts
const { data, isLoading, error } = useAccommodationsQuery();
```

The advantage of Tanstack Query is that is allows for automatic caching of api requests

When an API request is executed, TanStack Query computes a hash based on the query key. The fetched data is then cached for the duration of the staleTime (5 minutes in your case).

If another request with the same query key is executed within that time, TanStack Query returns the cached data instead of making a new network request.

This caching mechanism improves performance and reduces unnecessary API calls.

# IMAGE CLASSIFICATION
the component that handles the logic for the classificaton Of images is found in the folder `ImageRecognition/ImageClassifier.vue`.  
this components takes an Image URL and a type as props,  
- type = "icon" it will display the result as a small Icon 
- type = "card" it will display a card showing both the lable and the confidence

The model is trained and exported from https://teachablemachine.withgoogle.com/ it can be found in `public/ModelV3`

The classification process is divided into three main steps:

## 1 Image preprocessing
Here we resize the Image in a canvas to be 224 x 224 (the size required by the model)
The canvas is converted into a tensor with tensorflow.js
```ts
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
```
## 2 Classification
Once preprocessed, the image is passed through the model to obtain predictions.  
The model outputs a probability for each class,   
the output is mappped so each class is labeled  
the result is sorted by highest confidence first 
```ts
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
        
        // assign lables to the predictions
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
```
## 3 Model Initialization & Execution
To perform classification, the component ensures the model is available and then processes the target image.  

The model is loaded via a utility that loads the model only once and reuses it across the application. It prevents redundant downloads by caching the model. 
(located here `composable/useModel`)  

```ts
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
```

# Authentication

This project uses OAuth 2.0 with Keycloak as the Identity Provider (IdP).
Authentication is managed through a Keycloak instance initialized in keycloak.ts and stored in a Pinia store (auth.ts).

## 1 Keycloak setup: keycloak.ts

This file initializes a Keycloak instance with parameters from the environment configuration.
```ts
Initialization  
export const keycloak = new Keycloak({
  url: import.meta.env.VITE_APP_KEYCLOAK_URL,
  realm: import.meta.env.VITE_APP_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_APP_KEYCLOAK_CLIENT_ID,
});
```

The instance is then initialized with:
```ts
keycloak.init({
  onLoad: 'check-sso',
  silentCheckSsoRedirectUri: import.meta.env.VITE_APP_KEYCLOAK_REDIRECT_URI,
  pkceMethod: 'S256',
});
```
- onLoad: 'check-sso', Checks if the user has an active SSO session without forcing login.

- silentCheckSsoRedirectUri, Redirect page for silent SSO login checks.

- pkceMethod: 'S256', Enforces PKCE with SHA-256 (recommended for security).

Every 60 seconds the token is refreshed:  
```ts
setInterval(() => {
  keycloak.updateToken(70).catch(() => {
    if (keycloak.token) keycloak.clearToken();
  });
}, 60000);
```
## Authentication Store: auth.ts
This Pinia store (useAuth) manages authentication state and decodes user information.
The initial state of a user is as follows:
```ts
export const initialState: AuthState = {
  ready: false,
  isAuthenticated: false,
  accessToken: null,
};
```
the getter function `user(state)` from useAuth decodes the access token and returns name, email and role of the user  

the actions `authenticate()` and `unauthenticate()`
save the keycloak access token and authentication state.  
These functions are called in the script of the AppHeader Component:  
`AppHeader.vue` :
```ts
//executes on token refresh
keycloak.onAuthRefreshSuccess = () => {
  console.log("on auth refresh success:")
  auth.authenticate(keycloak.token);
};

keycloak.onAuthRefreshError = () => {
  console.log("on auth refresh error:")
  auth.unauthenticate();
};

//executes on login or logout
keycloak.onAuthError = () => {
  console.log("on auth error:")
  auth.unauthenticate();
};

keycloak.onAuthSuccess = () => {
  console.log("on auth success:")

  auth.authenticate(keycloak.token);
  accommodationStore.FirstTotalResults = 0
  accommodationStore.updateAndFetch()


};
``` 


# UI

the UI of the application is based almost entirely on TalwindCSS

    

