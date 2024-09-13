<template>
    <div class="wrapper">
      <div class="container">
        <button @click="prevPokemon" class="button">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <button @click="nextPokemon" class="button">
          <span class="material-symbols-outlined">arrow_forward</span>
        </button>
        <div class="content">
          <h1 v-if="dataStore.data">{{ dataStore.data.name }}</h1>
          <img v-if="dataStore.data && dataStore.data.sprites" :src="dataStore.data.sprites.front_default" class="img-poke" alt="Pokemon Image" />
          <p v-if="dataStore.data && dataStore.data.abilities">
            <strong>Abilities:</strong>
            <br>
            <span v-for="ability in dataStore.data.abilities" :key="ability.ability.name">
              {{ ability.ability.name }}
              <br />
            </span>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { usePokeStore } from '../stores/pokeStore';
  import { onMounted } from 'vue';
  
  const dataStore = usePokeStore();
  
  const nextPokemon = () => {
    dataStore.nextPokemon();
  };
  
  const prevPokemon = () => {
    dataStore.prevPokemon();
  };
  
  onMounted(async () => {
    await dataStore.getAllPokemonIds(); 
  });
  </script>
  
  <style>
  .wrapper {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
  }
  
  .container {
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 450px;
    height: 500px;
    border-radius: 10px;
    background-color: white;
    position: relative;
  }
  
  .button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    padding: 10px;
    font-size: 24px;
    cursor: pointer;
    background: none;
    border: none;
    color: #007bff;
  }
  
  .button .event-button {
    transition: color 0.3s;
  }
  
  .button:hover .material-symbols-outlined {
    color: #0056b3;
  }
  
  .button:first-of-type {
    left: 10px;
  }
  
  .button:last-of-type {
    right: 10px;
  }
  
  .img-poke {
    width: 300px;
    height: auto;
    display: block;
    margin: 0 auto;
  }
  
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  </style>
  