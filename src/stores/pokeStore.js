import { defineStore } from 'pinia';
import axios from 'axios';

export const usePokeStore = defineStore('pokeStore', {
  state: () => ({
    data: null,
    currentIndex: 0,
    pokemonIds: [] // IDs ของ Pokémon หลายตัว
  }),
  actions: {
    async getAllPokemonIds() {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000'); // เปลี่ยน limit ตามต้องการ
        this.pokemonIds = response.data.results.map(pokemon => {
          const url = new URL(pokemon.url);
          return url.pathname.split('/').filter(Boolean).pop(); // ดึง ID ออกจาก URL
        });
        await this.getPoke(); // โหลด Pokémon แรก
      } catch (error) {
        console.error('Error fetching Pokémon IDs:', error);
      }
    },
    async getPoke() {
      try {
        const id = this.pokemonIds[this.currentIndex];
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        this.data = response.data;
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    },
    nextPokemon() {
      if (this.currentIndex < this.pokemonIds.length - 1) {
        this.currentIndex += 1;
      } else {
        this.currentIndex = 0; // ถ้าถึงจุดสุดท้ายให้เริ่มใหม่
      }
      this.getPoke();
    },
    prevPokemon() {
      if (this.currentIndex > 0) {
        this.currentIndex -= 1;
      } else {
        this.currentIndex = this.pokemonIds.length - 1; // ถ้าถึงจุดเริ่มต้นให้ไปที่สุดท้าย
      }
      this.getPoke();
    }
  },
});
