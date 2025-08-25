<template>
        <TableHeader class = " sticky top-0 z-20">
        
        <TableHeaderCell v-for="col in headerColumns" :key="col.key" :type="col.type">
            {{ col.label }}
        </TableHeaderCell>

        <!-- Detail Column -->
        <TableHeaderCell class="sticky right-0 bg-gray-50 w-40 z-30 " :show-sort="false"> <!--shadow-[inset_4px_0_4px_-4px_rgba(0,0,0,0.1)]-->
            Detail
        </TableHeaderCell>
      </TableHeader>

</template>

<script setup lang="ts">
    import TableHeaderCell from '@/components/table/TableHeaderCell.vue';
    import TableHeader from '@/components/table/TableHeader.vue';

    import { useLanguageStore } from '@/stores/HeaderTableStore';

    const languageStore = useLanguageStore()
    const headerColumns = [
        { key: "title", label: "Title", type: `AccoDetail.${languageStore.language.toLowerCase()}.Name` },
        { key: "mainImage", label: "Main Image", type: "ImageGallery.0.ImageUrl" },
        { key: "winterImage", label: "Image Winter", type: "ImageGallery.0.ImageUrl" },
        { key: "summerImage", label: "Image Summer", type: "ImageGallery.0.ImageUrl" },
        { key: "yearImage", label: "Image Whole Year", type: "ImageGallery.0.ImageUrl" },
        { key: "accoType", label: "Accommodation Type", type: "AccoType.Id" },
        { key: "category", label: "Category", type: "AccoCategory.Id" },
        { key: "region", label: "Region", type: `LocationInfo.RegionInfo.Name.${languageStore.language.toLowerCase()}` },
        { key: "municipality", label: "Municipality", type: `LocationInfo.MunicipalityInfo.Name.${languageStore.language.toLowerCase()}` },
        { key: "badges", label: "Badges", type: "AccoBadges" },
        { key: "themes", label: "Themes", type: "AccoThemes" },
        { key: "tags", label: "Tags", type: "ODHTags" },
        { key: "languages", label: "Languages", type: "HasLanguage" },
        { key: "edited", label: "Edited", type: "_Meta.LastUpdate" },
        { key: "source", label: "Source", type: "_Meta.Source" },
        { key: "active", label: "Source state", type: "Active" },
        { key: "published", label: "Published on", type: "PublishedOn" },
        { key: "push", label: "Push data", type: "ODHTags" },
    ]


</script>

<style scoped>

  table, th, td, tr {
    @apply border-[1.5px] 
  }

</style>