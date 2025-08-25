import { computed } from "vue"
import { useQuery } from "@tanstack/vue-query"
import { useAccommodationStore } from "@/stores/AccomodationStore"
import { useFooterStore } from "@/stores/FooterStore"
import { useLanguageStore } from "@/stores/HeaderTableStore"
import api from "@/components/utils/api"

export function useAccommodationsQuery() {
  const accommodationStore = useAccommodationStore()
  const footerStore = useFooterStore()
  const languageStore = useLanguageStore()

  const queryKey = computed(() => [
    "accommodations",
    accommodationStore.searchValue,
    accommodationStore.typefilter,
    accommodationStore.rawsort,
    JSON.stringify(accommodationStore.filters),
    footerStore.pagenumber,
    footerStore.pagesize,
    languageStore.language,
  ])

  return useQuery({
    queryKey,
    queryFn: async () => {
      const conditions = accommodationStore.filters
        .filter(f => {
          if (["isnull", "isnotnull"].includes(f.comparison.toLowerCase())) return true
          return f.value.trim() !== ""
        })
        .map(f => {
          if (["isnull", "isnotnull"].includes(f.comparison.toLowerCase())) {
            return `${f.comparison}(${f.type})`
          }
          return `${f.comparison}(${f.type},'${f.value}')`
        })

      const rawfilter = conditions.length > 0 ? `and(${conditions.join(",")})` : undefined

      const response = await api.get("Accommodation", {
        params: {
          pagenumber: footerStore.pagenumber,
          pagesize: footerStore.pagesize,
          language: languageStore.language.toLowerCase(),
          searchfilter: accommodationStore.searchValue || undefined,
          typefilter: accommodationStore.typefilter || null,
          rawsort: accommodationStore.rawsort || null,
          rawfilter,
          roominfo: "1-18,18",
          bokfilter: "hgv",
          msssource: "sinfo",
          availabilitychecklanguage: "en",
          detail: 0,
          removenullvalues: false,
          getasidarray: false,
        },
      })

      return response.data
    },
    staleTime: 1000 * 60 * 5,
  })
}
