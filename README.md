# Accommodation Filter App

A Dataset Browser that allows users to search and filter accommodations using a dynamic sidebar, URL query parameters, and API integration.

## Features
SEARCH-FILTER-SORT, API AND QUERY HANDLING, CSV EXPORT, AUTHENTICATION
- Search accommodations by text input (`params: searchfilter`)  
- Filter and sort accommodations by multiple criteria (`params: rawfilter, typefilter, rawsort`)  
- Navigation of different pages and page sizes (`params: pagenumber, pagesize`)
- filters and search persist across page refreshes  
- Supports multiple languages
- Constructs API requests dynamically with proper URL query handling
- Caching of api requests through TanstackQuery
- Export csv file containing the accomodations data
- Authentication with KeyCloak

  

## Technologies Used

- Vue 3
- TypeScript  
- Vue Router
- TanstackQuery (AKA VueQuery)
- Pinia (for state management)  
- Axios for backend requests  

## Getting Started

### Prerequisites

- Node.js 18+  
- npm or yarn  

### Installation

```bash
git clone github.com/EmGira/Accomodations
cd Accomodations
npm install
npm run dev

```

Now visit http://localhost:5173 in your browser



This project uses Open Data Hub API, a well documented API that gives developers access to simple and high quality data:
> The Open Data Hub project began in South Tyrol in 2010 with the aim of grouping data collected from a series of European projects in the field of mobility research and
> development. This data comes from different sources, often with complex APIs. The Open Data Hub translates these APIs into well- documented Open Specification APIs, in
> order to simplify and improve the work of developers interested in creating apps, websites and other systems.
> Learn more at: https://opendatahub.com/

Swagger: https://tourism.api.opendatahub.testingmachine.eu/swagger/index.html

