<template>
  <header v-bind="$attrs" class="sticky top-0  w-full bg-white ">
    <AlignX class="flex flex-row gap-x-5 w-full items-start mt-2 ">

      <HeaderButton @click = "refreshPage()">


          <div class = "border border-black rounded-lg  p-3 h-10  items-start justify-center flex flex-col text-sm">
            <b>DATA</b>
            <b>BROWSER</b>
          </div>


      </HeaderButton>

      <HeaderButton>
        <div class=" bg-yellow-400 flex justify-center  items-center h-10 w-24 rounded-lg">
          <p>TESTING</p>
        </div>
      </HeaderButton>

      <div class = "min-h-12 flex flex-row  space-x-10 items-center justify-center">
        <HeaderButton class="text-sm " @click="console.log(keycloak.token)">About</HeaderButton>
        <HeaderButton class="text-sm whitespace-nowrap">How To</HeaderButton>
        <HeaderButton class="text-sm">Contact</HeaderButton>
      </div>


      <div class=" w-screen flex justify-end  items-start space-x-2 relative" ref = "target">

        <div v-if = "openProfile" class = "absolute top-[47px] right-14 flex flex-col w-52  border bg-white border-gray-300 rounded shadow-lg ">
          <button v-if = "!auth.isAuthenticated" @click = "handleLogin()" class = "hover:bg-yellow-300/90 h-10 flex items-center pl-3 transition-colors duration-300">login</button>
          <ContentDivider ></ContentDivider>
          <button  v-if = "auth.isAuthenticated" @click = "handleLogout()" class = "hover:bg-yellow-300/90 h-10 flex items-center pl-3 transition-colors duration-300 ">logout</button>
        </div>

        <HeaderButton @click = "() => {openProfile = !openProfile, console.log('is authenticated:', auth.isAuthenticated)}" >
          <UserCircleIcon class = "size-10  text-yellow-400"></UserCircleIcon>
        </HeaderButton>
        <img src="/src/assets/logo-open-data-hub-black.svg" alt="Logo Open Data Hub" class="w-9 ml-3 mb-2" />

      </div>

    </AlignX>
  </header>
</template>

<script setup lang="ts">

//ICONS
import { UserCircleIcon } from '@heroicons/vue/24/outline'


import HeaderButton from '@/components/header/headerButton.vue'
import AlignX from '@/components/contentAlignment/AlignX.vue'
import ContentDivider from '@/components/contentAlignment/ContentDivider.vue'


import { useRouter } from 'vue-router'
import { useAuth } from '@/auth/authStores/auth'
import { keycloak } from '@/auth/keycloak'
import { useAccommodationStore } from '@/stores/AccomodationStore'
import { useAccommodationsQuery } from '@/composable/useAccomodationsQuery'
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const target = ref(null)
const openProfile = ref(false)
const router = useRouter()
const auth = useAuth()
const accommodationStore = useAccommodationStore()
const {refetch} = useAccommodationsQuery()

defineOptions({ inheritAttrs: false })

//remove query url and force reload
function refreshPage() {
  router
  .push({ path: '/' })
  .then(
    () => {
    window.location.reload()
    }
  )
}


//KEYCLOACK AUTHENTICATION





//executes on token refresh
keycloak.onAuthRefreshSuccess = () => {
  console.log("on auth refresh success:")
  auth.authenticate(keycloak.token);
};

keycloak.onAuthRefreshError = () => {
  console.log("on auth refresherror:")
  auth.unauthenticate();
};

//executes on login or logout
keycloak.onAuthError = () => {
  console.log("on auth error:")
  auth.unauthenticate();
};

keycloak.onAuthSuccess = () => {
  console.log("on auth success:")

  //INFO, TODOO, by saving the token in localstorage you can stay logged in after refreshes, this is only for dev purposes
  //might be bad practice
  //if(keycloak.token) localStorage.setItem('kc_token', keycloak.token)

  auth.authenticate(keycloak.token);
  accommodationStore.FirstTotalResults = 0
  accommodationStore.updateAndFetch()
  refetch()

};


keycloak.onReady = () => {
  auth.ready = true;
};

function handleLogin(){

  keycloak.login()
}

function handleLogout(){

  keycloak.logout()
}



onClickOutside(target, () => {
  openProfile.value = false
})
</script>
