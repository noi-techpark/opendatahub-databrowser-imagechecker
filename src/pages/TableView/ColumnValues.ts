   import { useAccommodationStore } from "@/stores/AccomodationStore"
   const accommodationStore = useAccommodationStore()
   import showImages from "./showImages.vue"


export const headerColumns = [
    {  label: "Title", parameter: `AccoDetail.${accommodationStore.language.toLowerCase()}.Name` },
    {  label: "Main Image", parameter: "ImageGallery.0.ImageUrl" },
    {  label: "Image Winter", parameter: "ImageGallery.0.ImageUrl" },
    {  label: "Image Summer", parameter: "ImageGallery.0.ImageUrl" },
    {  label: "Image Whole Year", parameter: "ImageGallery.0.ImageUrl" },
    {  label: "Accommodation type", parameter: "AccoTypeId" },
    {  label: "Category", parameter: "AccoCategoryId" },
    {  label: "Region", parameter: `LocationInfo.RegionInfo.Name.${accommodationStore.language.toLowerCase()}` },
    {  label: "Municipality", parameter: `LocationInfo.MunicipalityInfo.Name.${accommodationStore.language.toLowerCase()}` },
    {  label: "Badges", parameter: "AccoBadges" },
    {  label: "Themes", parameter: "AccoThemes" },
    {  label: "Tags", parameter: "ODHTags" },
    {  label: "Languages", parameter: "HasLanguage" },
    {  label: "Edited", parameter: "_Meta.LastUpdate" },
    {  label: "Source", parameter: "_Meta.Source" },
    {  label: "Source state", parameter: "Active" },
    {  label: "Published on", parameter: "PublishedOn" },
    {  label: "Push data", parameter: "ODHTags" },  //TODOO; change parameter and add pushData filter in filterTable
]

export const columnData = [
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
        return "-";

    return object.map(obj => obj.Id).join(",\n");
}

function formatArray(Array: string[] | null | undefined): string {
    if(!Array || Array.length === 0)
        return "-"

    return Array.map(obj => obj).join(",\n");
}
