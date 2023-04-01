import { defineStore } from 'pinia'
import axios from 'axios';

export const useArtistStore = defineStore('OneArtist', {
  state: () => ({
    artist: {} as Object,
  }),
  
  actions: {
    async getOneArtist(id: Number){
        let oneArtist: any;
        const response = await axios.get('/data.json');
        let tabArtist = await response.data; 
        for (let i = 0; i < tabArtist.artists.length; i++) {
            if (id == i) {
                oneArtist = await tabArtist.artists[i];
            }
        }

        localStorage.setItem("OneArtist", JSON.stringify(oneArtist));
        // on modifie le store
        this.$patch((state) => {
            //@ts-ignore
            state.artist = oneArtist;
        });
    },
  },
})
