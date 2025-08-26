<template>
    <tr v-for=" item in data.Items" :key="item.Id" @click="selectedRow = item.Id"
        :class="[
            'hover:bg-green-400/10 hover:border-gray-400 border-2 border-gray-200 group',
            selectedRow === item.Id ? 'bg-green-400/10' : ''
        ]"
    >

        <TableCell v-for="col in columns" :key="col.key" :class="selectedRow === item.Id ? 'border-gray-400' : ''">

            <!-- if the column has a component (ex: showImages) -->
            <component v-if="col.component" :is="col.component" :imageGallery="item.ImageGallery" v-bind="col.props"/>

            <!-- else show the value directly-->
            <div v-else>
                {{ col.getValue ? col.getValue(item, accommodationStore.language.toLowerCase()) : ""}}
            </div>

        </TableCell>


        <!--Detail Column-->
        <TableCell class = "sticky right-0 z-10 bg-white border w-52 whitespace-nowrap "> <!--shadow-[inset_4px_0_4px_-4px_rgba(0,0,0,0.1)]-->

            <div class="flex flex-row space-x-2 justify-center ">

                <DetailButton class = "w-12" @click ="console.log(item.Id, accommodationStore.results)" > 
                    <PencilSquareIcon class = "size-5 text-green-400"></PencilSquareIcon>
                    <p class = "text-3xs font-semibold text-green-400">EDIT</p>
                </DetailButton>

                <DetailButton class = " w-12" > 
                    <CursorArrowRaysIcon class = "size-5 text-green-400"></CursorArrowRaysIcon>
                    <p class = "text-3xs font-semibold   text-green-400">ACTIONS</p>
                </DetailButton>

            </div>
            
        </TableCell>

    </tr>
</template>

<script setup lang="ts">
//ICONS
 const props = defineProps<{
        data: any
   
    }>()

  import { CursorArrowRaysIcon, PencilSquareIcon } from '@heroicons/vue/24/outline'

  import TableCell from '@/components/table/TableCell.vue'
  import showImages from './showImages.vue'
  import DetailButton from '@/components/buttons/DetailButton.vue'

  import { ref } from 'vue'
  import { useAccommodationStore } from '@/stores/AccomodationStore'
  
  const selectedRow = ref<number | null>(null)
 


  const accommodationStore: any = useAccommodationStore()
 
  const columns = [
  { key: "title", getValue: (item: any, lang: string) => item.AccoDetail?.[lang]?.Name || "nessun titolo" },
  { key: "mainImage", component: showImages, props: { period: "mainImage" as const} },
  { key: "winterImage", component: showImages, props: { period: "winter" as const } },
  { key: "summerImage", component: showImages, props: { period: "summer" as const } },
  { key: "yearImage", component: showImages, props: { period: "year" as const } },
  { key: "accoType", getValue: (item: any) => item.AccoType?.Id || "not found" },
  { key: "accoCategory", getValue: (item: any) => item.AccoCategory?.Id || "not found" },
  { key: "region", getValue: (item: any, lang: string) => item.LocationInfo?.RegionInfo?.Name?.[lang] || "not found" },
  { key: "municipality", getValue: (item: any, lang: string) => item.LocationInfo?.MunicipalityInfo?.Name?.[lang] || "not found" },
  { key: "badges", getValue: (item: any) => formatObject(item.AccoBadges) },
  { key: "themes", getValue: (item: any) => formatObject(item.AccoThemes) },
  { key: "tags", getValue: (item: any) => formatObject(item.ODHTags) },
  { key: "languages", getValue: (item: any) => item.HasLanguage?.toString() },
  { key: "edited", getValue: (item: any) => formatEditDate(item._Meta?.LastUpdate || "not found") },
  { key: "source", getValue: (item: any) => item._Meta?.Source || "not found" },
  { key: "active", getValue: (item: any) => item.Active ? "active" : "Not active" },
  { key: "published", getValue: (item: any) => formatArray(item.PublishedOn) },
  { key: "push", getValue: () => "push data" }
]



  function formatEditDate(EditDate: string): string {
    const result = EditDate.replace("T", " ").split('.')[0]
    return result
  }

  //formats object Id: x, Self: y,  in string x1, x2, x3 ...
  function formatObject(object: { Id: string }[] | null | undefined): string {
    if (!object || object.length === 0) 
      return "-"; //fallaback if null or undefined

    return object.map(obj => obj.Id).join(",\n");
  }

  function formatArray(Array: string[] | null | undefined): string {
    if(!Array || Array.length === 0)
      return "-"

    return Array.map(obj => obj).join(",\n");
  }


</script>

<style scoped>

  table, th, td, tr {
    @apply border-[1.5px] group-hover:border-gray-400
  }

</style>