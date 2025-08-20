<template>
  <header v-bind="$attrs" class="sticky top-0 w-full bg-white ">
    <AlignX class="flex flex-row gap-x-8 gap-y-2 md:pb-0 w-full ">
      
      <HeaderButton >
        <RouterLink to="/" class ="no-underline" @click = "refreshPage()"> 
          <div class = "border border-black rounded-lg
                        p-3 h-12
                        items-start justify-center flex flex-col"> 
            <b>DATA</b> <b>BROWSER</b>
          </div>  
        </RouterLink>
      </HeaderButton>

      <HeaderButton>     
        <div class=" bg-yellow-400 flex justify-center  items-center h-12 w-24 rounded-lg">
          <p>TESTING</p>  
        </div>
      </HeaderButton>

      <HeaderButton class="">About</HeaderButton>
      <HeaderButton class=" whitespace-nowrap">How To</HeaderButton>
      <HeaderButton class="">Contact</HeaderButton>

      <div class=" w-screen flex justify-end mr-6 items-center">
        <button @click = "handleLogin()" class = "mr-10 bg-black">login</button>
        <button @click = "handleLogout()" class = "bg-green-400">logout</button>
        <HeaderButton class = "hover:bg-green-400/10" @click = "console.log(keycloak.token)">
          <UserCircleIcon class = "size-14 mb-2 text-black"></UserCircleIcon>
        </HeaderButton>
        <img src="/src/assets/logo-open-data-hub-black.svg" alt="Logo Open Data Hub" class="w-12 ml-3 mb-2" />
      </div>

    </AlignX>
  </header>
</template>

<script setup lang="ts">

//ICONS
import { UserCircleIcon } from '@heroicons/vue/24/outline'

import HeaderButton from '../header/headerButton.vue'
import AlignX from '../contentAlignment/AlignX.vue'

import { useRouter } from 'vue-router'
import { useAuth } from '@/auth/authStores/auth'
import { keycloak } from '@/auth/keycloak'


const router = useRouter()
const auth = useAuth()


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

keycloak.onAuthSuccess = () => {
  auth.authenticate(keycloak.token);
};

keycloak.onAuthError = () => {
  auth.unauthenticate();
};

keycloak.onAuthRefreshSuccess = () => {
  auth.authenticate(keycloak.token);
};

keycloak.onAuthRefreshError = () => {
  auth.unauthenticate();
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

const profileUrl = keycloak.createAccountUrl();


</script>
