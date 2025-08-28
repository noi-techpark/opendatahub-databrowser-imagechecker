<template>
        <TableHeader class = " sticky top-0 z-20 ">
        
        <TableHeaderCell v-for="col in headerColumns" :key="col.key" :parameter="col.parameter">
            {{ col.label }}
        </TableHeaderCell>

        <!-- Detail Column -->
        <TableHeaderCell class="sticky right-0 bg-gray-50 w-52 z-30 shadow-[0px_0px_10px_-5px_gray]  " :show-sort="false"> <!--shadow-[inset_4px_0_4px_-4px_rgba(0,0,0,0.1)]-->
            Detail
        </TableHeaderCell>
      </TableHeader>

</template>

<script setup lang="ts">
    import TableHeaderCell from '@/components/table/TableHeaderCell.vue';
    import TableHeader from '@/components/table/TableHeader.vue';
    import { useAccommodationStore } from '@/stores/AccomodationStore';
    
    const accommodationStore = useAccommodationStore()
    const headerColumns = [
        { key: "title", label: "Title", parameter: `AccoDetail.${accommodationStore.language.toLowerCase()}.Name` },
        { key: "mainImage", label: "Main Image", parameter: "ImageGallery.0.ImageUrl" },
        { key: "winterImage", label: "Image Winter", parameter: "ImageGallery.0.ImageUrl" },
        { key: "summerImage", label: "Image Summer", parameter: "ImageGallery.0.ImageUrl" },
        { key: "yearImage", label: "Image Whole Year", parameter: "ImageGallery.0.ImageUrl" },
        { key: "accoType", label: "Accommodation parameter", parameter: "AccoTypeId" },
        { key: "category", label: "Category", parameter: "AccoCategoryId" },
        { key: "region", label: "Region", parameter: `LocationInfo.RegionInfo.Name.${accommodationStore.language.toLowerCase()}` },
        { key: "municipality", label: "Municipality", parameter: `LocationInfo.MunicipalityInfo.Name.${accommodationStore.language.toLowerCase()}` },
        { key: "badges", label: "Badges", parameter: "AccoBadges" },
        { key: "themes", label: "Themes", parameter: "AccoThemes" },
        { key: "tags", label: "Tags", parameter: "ODHTags" },
        { key: "languages", label: "Languages", parameter: "HasLanguage" },
        { key: "edited", label: "Edited", parameter: "_Meta.LastUpdate" },
        { key: "source", label: "Source", parameter: "_Meta.Source" },
        { key: "active", label: "Source state", parameter: "Active" },
        { key: "published", label: "Published on", parameter: "PublishedOn" },
        { key: "push", label: "Push data", parameter: "ODHTags" },  //TODOO; change parameter and add pushData filter in filterTable
    ]


</script>

<style scoped>

  table, th, td, tr {
    @apply border-[1.5px] 
  }

</style>