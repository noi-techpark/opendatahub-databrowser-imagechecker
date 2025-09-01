   import { useAccommodationStore } from "@/stores/AccomodationStore"
   const accommodationStore = useAccommodationStore()
   import showImages from "./showImages.vue"


export const headerColumns = [
    { key: "title",         label: "Title",             parameter: `AccoDetail.${accommodationStore.language.toLowerCase()}.Name` },
    { key: "mainImage",     label: "Main Image",        parameter: "ImageGallery.0.ImageUrl" },
    { key: "winterImage",   label: "Image Winter",      parameter: "" },
    { key: "summerImage",   label: "Image Summer",      parameter: "" },
    { key: "yearImage",     label: "Image Whole Year",  parameter: "" },
    { key: "accoType",      label: "Accommodation type",parameter: "AccoTypeId" },
    { key: "accocategory",  label: "Category",          parameter: "AccoCategoryId" },
    { key: "region",        label: "Region",            parameter: `LocationInfo.RegionInfo.Name.${accommodationStore.language.toLowerCase()}` },
    { key: "municipality",  label: "Municipality",      parameter: `LocationInfo.MunicipalityInfo.Name.${accommodationStore.language.toLowerCase()}` },
    { key: "badges",        label: "Badges",            parameter: "AccoBadges" },
    { key: "themes",        label: "Themes",            parameter: "AccoThemes" },
    { key: "tags",          label: "Tags",              parameter: "ODHTags" },
    { key: "languages",     label: "Languages",         parameter: "HasLanguage" },
    { key: "edited",        label: "Edited",            parameter: "_Meta.LastUpdate" },
    { key: "source",        label: "Source",            parameter: "_Meta.Source" },
    { key: "active",        label: "Source state",      parameter: "Active" },
    { key: "published",     label: "Published on",      parameter: "PublishedOn" },
    { key: "push",          label: "Push data",         parameter: "ODHTags" },  //TODOO; change parameter and add pushData filter in filterTable
]

export const columnData = [
  { key: "title",           getValue: (item: any, lang: string) => item.AccoDetail?.[lang]?.Name || "nessun titolo" },
  { key: "mainImage",       component: showImages, props: { period: "mainImage" as const} },
  { key: "winterImage",     component: showImages, props: { period: "winter" as const } },
  { key: "summerImage",     component: showImages, props: { period: "summer" as const } },
  { key: "yearImage",       component: showImages, props: { period: "year" as const } },
  { key: "accoType",        getValue: (item: any) => item.AccoType?.Id || "not found" },
  { key: "accoCategory",    getValue: (item: any) => item.AccoCategory?.Id || "not found" },
  { key: "region",          getValue: (item: any, lang: string) => item.LocationInfo?.RegionInfo?.Name?.[lang] || "not found" },
  { key: "municipality",    getValue: (item: any, lang: string) => item.LocationInfo?.MunicipalityInfo?.Name?.[lang] || "not found" },
  { key: "badges",          getValue: (item: any) => formatObject(item.AccoBadges) },
  { key: "themes",          getValue: (item: any) => formatObject(item.AccoThemes) },
  { key: "tags",            getValue: (item: any) => formatObject(item.ODHTags) },
  { key: "languages",       getValue: (item: any) => item.HasLanguage?.toString() },
  { key: "edited",          getValue: (item: any) => formatEditDate(item._Meta?.LastUpdate || "not found") },
  { key: "source",          getValue: (item: any) => item._Meta?.Source || "not found" },
  { key: "active",          getValue: (item: any) => item.Active ? "active" : "Not active" },
  { key: "published",       getValue: (item: any) => formatArray(item.PublishedOn) },
  { key: "push",            getValue: () => "push data" }
]

function formatEditDate(EditDate: string): string {
    const result = EditDate.replace("T", " ").split('.')[0]

    return result
}

//formats object {Id:x, Self: y}[],  in string => Id1, Id2, Id3 ...
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
