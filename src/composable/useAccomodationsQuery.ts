/*

SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

// composables/useAccommodationsQuery.ts
import { useQuery } from '@tanstack/vue-query'
import { useAccommodationStore } from '@/stores/AccomodationStore'
import { computed } from 'vue'
import api from '@/components/utils/api'
import { useAuth } from '@/auth/authStores/auth'
import { keycloak } from '@/auth/keycloak'

export function useAccommodationsQuery() {
  const accommodationStore = useAccommodationStore()
  const auth = useAuth()

  const fetchAccommodations = async () => {
    // costruisci params come prima
    
    const conditions = accommodationStore.filters
                .filter(f => {
                    if (f.comparison.toLowerCase() === "isnull" || f.comparison.toLowerCase() === "isnotnull") {
                    return true
                    }
                    return f.value.trim() !== ""
                })
                .map(f => {
                    if (f.comparison.toLowerCase() === "isnull" || f.comparison.toLowerCase() === "isnotnull") {
                    return `${f.comparison}(${f.type})`
                    }
                    return `${f.comparison}(${f.type},'${f.value}')`
                });

    const rawfilter = conditions.length > 0
                    ? `and(${conditions.join(",")})`
                    : undefined;
    

 

    return api.get('Accommodation', {
      params: {
        roominfo: "1-18,18",
        bokfilter: "hgv",
        msssource: "sinfo",
        availabilitychecklanguage: "en",
        detail: 0,
        removenullvalues: false,
        getasidarray: false,
        searchfilter: accommodationStore.searchfilter || undefined,
        typefilter: accommodationStore.typefilter || null,
        rawsort: accommodationStore.rawsort || null,
        rawfilter: rawfilter || undefined,
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
    accommodationStore.language,
    auth.accessToken
  ]),
    queryFn: fetchAccommodations,
    staleTime: 5 * 60 * 1000,
  })
  

  return query
}
