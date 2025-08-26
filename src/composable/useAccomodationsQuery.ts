// composables/useAccommodationsQuery.ts
import { useQuery } from '@tanstack/vue-query'
import { useAccommodationStore } from '@/stores/AccomodationStore'
import { computed } from 'vue'
import api from '@/components/utils/api'

export function useAccommodationsQuery() {
  const accommodationStore = useAccommodationStore()


  const fetchAccommodations = async () => {
    // costruisci params come prima
    return api.get('Accommodation', {
      params: {
        searchfilter: accommodationStore.searchfilter || undefined,
        typefilter: accommodationStore.typefilter || null,
        rawsort: accommodationStore.rawsort || null,
        rawfilter: accommodationStore.filters.map(f => `${f.type}|${f.comparison}|${f.value}`).join(',') || undefined,
        pagenumber: accommodationStore.pagenumber,
        pagesize: accommodationStore.pagesize,
        language: accommodationStore.language.toLowerCase(),
      }
    }).then(res => res.data)
  }

  const query = useQuery({
    queryKey:  computed(() => [
    'accommodation',
    accommodationStore.searchfilter,
    accommodationStore.typefilter,
    accommodationStore.rawsort,
    accommodationStore.filters.map(f => `${f.type}|${f.comparison}|${f.value}`).join(','),
    accommodationStore.pagenumber,
    accommodationStore.pagesize,
    accommodationStore.language
  ]),
    queryFn: fetchAccommodations,
    staleTime: 5 * 60 * 1000,
  })

  
  return query
}
