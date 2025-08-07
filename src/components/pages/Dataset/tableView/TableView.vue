<template>
  <div>
    <table border="1" cellspacing="0" cellpadding="5">
      <thead>
        <tr>
    
          <th>Title</th>
          <th>Image Winter</th>
          <th>Image Summer</th>
          <th>Image Whole Year</th>
          <th>Accomodation Type</th>
          <th>Category</th>
          <th>Region</th>
          <th>Municipality</th>
          <th>Badges</th>
          <th>Themes</th>
          <th>Tags</th>
          <th>Languages</th>
          <th>Edited</th>
          <th>Source</th>
          <th>Source state</th>
          <th>Published on</th>
          <th>Push data</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for=" item in quote.Items" :key="item.Id">


          <TableCell> 
             {{ item.ImageGallery?.[0]?.ImageDesc?.it || 'Nessun Titolo' }}
          </TableCell>
          <TableCell> 
          
            <img
              :src = "item.ImageGallery?.[0]?.ImageUrl || 'https://doc.lts.it/DocSite/ImageRender.aspx?ID=f476f4b4d6c72f9ff3f55f2968d75627'"
               alt="Accommodation Image"
               style="width: 100px; height: auto; object-fit: cover;"
            />
          </TableCell>
          <TableCell> 
            <img 
              :src = "item.ImageGallery?.[0]?.ImageUrl || 'https://doc.lts.it/DocSite/ImageRender.aspx?ID=f476f4b4d6c72f9ff3f55f2968d75627'"
               alt="Accommodation Image"
               style="width: 100px; height: auto; object-fit: cover;"
            />
          </TableCell>
          <TableCell> 
            <img 
              :src = "item.ImageGallery?.[0]?.ImageUrl || 'https://doc.lts.it/DocSite/ImageRender.aspx?ID=f476f4b4d6c72f9ff3f55f2968d75627'"
               alt="Accommodation Image"
               style="width: 100px; height: auto; object-fit: cover;"
            />
          </TableCell>

          <TableCell >{{ item.AccoType.Id }}</TableCell>
          <TableCell>{{ item.AccoType.Id }}</TableCell>
          <TableCell>{{ item.AccoCategory.Id }}</TableCell>
          <TableCell>{{ item.LocationInfo.RegionInfo.Name.it }}</TableCell>
          <TableCell>{{ item.LocationInfo.MunicipalityInfo.Name.it }}</TableCell>
          <TableCell>{{ item.AccoBadges }}</TableCell>
          <TableCell>{{ item.AccoThemes }}</TableCell>
          <TableCell>{{ item.ODHTags }}</TableCell>
          <TableCell>{{ item.HasLanguage.toString() }}</TableCell>
          <TableCell>{{ item._Meta.LastUpdate }}</TableCell>
          <TableCell>{{ item._Meta.Source }}</TableCell>
          <TableCell>{{ item.Active ? "active" : "Not active" }}</TableCell>
          <TableCell>{{ item.PublishedOn }}</TableCell>
          <TableCell>{{ item.ODHTags }}</TableCell>
        </tr>
      </tbody>
    </table>
  </div>
</template>



<script lang="ts">
import TableCell from '@/components/table/TableCell.vue';


import axios from 'axios';
  import { ref, onMounted } from 'vue';
  

  export default{
      components: {
    TableCell,
  },
    setup () {
      
      const quote = ref([])
      axios
        .get('https://tourism.api.opendatahub.testingmachine.eu/v1/Accommodation')
        .then(response => {

          quote.value = response.data

        })


        function isMonthDayInRange(target: string, from: string, to: string): boolean {
         
          const toMonthDay = (dateStr: string): string => {
            const date = new Date(dateStr);
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const dd = String(date.getDate()).padStart(2, '0');
            return `${mm}-${dd}`;
          };

          const targetMD = toMonthDay(target);
          const fromMD = toMonthDay(from);
          const toMD = toMonthDay(to);

         
          if (fromMD <= toMD) {
            return targetMD >= fromMD && targetMD <= toMD;
          }

     
          return targetMD >= fromMD || targetMD <= toMD;
        }

        //winter:
        //summer:
        function findImageByTargetDate(target: string, images: any[]) {
          
          for (const image of images) {
            if (image.ValidFrom && image.ValidTo && isMonthDayInRange(target, image.ValidFrom, image.ValidTo)) {
              return image.ImageUrl;
            }
          }

          return null; // Nessuna immagine trovata
        }


        //findImageByTargetDate()

       
      return { quote, isMonthDayInRange, findImageByTargetDate}


    },

  }
</script>
