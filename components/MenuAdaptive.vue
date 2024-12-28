<script setup>
</script>

<template>
    <div class="menu_adaptive">
        <ul class="nav_list">
           <NuxtLink to="/" class="nav_text">Главная</NuxtLink>
           <NuxtLink to="/SportsPage" class="nav_text">Лыжи</NuxtLink>
           <NuxtLink to="/SportsPage" class="nav_text">Сноуборд</NuxtLink>
           <NuxtLink to="#trip" class="nav_text">Поездки</NuxtLink>
           <NuxtLink to="#now" class="nav_text">Как это было</NuxtLink>
           <NuxtLink to="/MagazinePage" class="nav_text">Магазин</NuxtLink>
        </ul>
        

    </div>

</template>
<style scoped>
.nav_text{
    cursor: pointer;
}

.nav_list{
    display: flex ;
    flex-direction: column;
    text-align: center;
    gap: 20px;
   position: absolute;
   top: 120px;
   left: 50%;
   transform: translateX(-50%);
   z-index: 1000;
}
.nav_text{
    color:white;
    font-size: clamp(20px, 1.5vw, 2rem);
    font-weight: bold;
    
}
.menu_adaptive {
    background-color: #034184;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    height: 380px;
    z-index: 1;
    opacity: 90%;
    border-radius: 20px;
    position: relative;
}

</style>