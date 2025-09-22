[![REUSE Compliance](https://github.com/noi-techpark/opendatahub-databrowser-imagechecker/actions/workflows/reuse.yml/badge.svg)](https://github.com/noi-techpark/opendatahub-docs/wiki/REUSE#badges)

# Accommodation Filter App

A Dataset Browser that enables users to search and filter accommodations through a dynamic sidebar, URL query parameters, and API integration, with a focus on helping users determine whether an accommodation has a complete Image Gallery.

## Features
SEARCH-FILTER-SORT, API AND QUERY HANDLING, CSV EXPORT, AUTHENTICATION, IMAGE CLASSIFICATION
- Search accommodations by text input (`params: searchfilter`)  
- Filter and sort accommodations by multiple criteria (`params: rawfilter, typefilter, rawsort`)  
- Navigation of different pages and page sizes (`params: pagenumber, pagesize`)
- filters and search persist across page refreshes  
- Supports multiple languages
- Constructs API requests dynamically with proper URL query handling
- Caching of api requests through TanstackQuery
- Export csv file containing the current page data
- Authentication with KeyCloak
- Image Classification with tensorflow.js
  

## Technologies Used

- Vue 3
- TypeScript  
- TanstackQuery (AKA VueQuery)
- Pinia (for state management)  
- Axios for backend requests  
- Keycloak-js for authentication
- Tensorflow.js and TeachableMachine

## Getting Started

- Node.js 19+  
- npm or yarn  

### Installation

```bash
git clone github.com/EmGira/Accomodations
cd Accomodations
npm install
npm run dev

```



This project uses Open Data Hub Tourism API
> The Open Data Hub project began in South Tyrol in 2010 with the aim of grouping data collected from a series of European projects in the field of mobility research and
> development. This data comes from different sources, often with complex APIs. The Open Data Hub translates these APIs into well-documented Open Specification APIs, in
> order to simplify and improve the work of developers interested in creating apps, websites and other systems.
> Learn more at: https://opendatahub.com/

Swagger: https://tourism.api.opendatahub.testingmachine.eu/swagger/index.html

