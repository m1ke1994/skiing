<script setup>
</script>

<template>
<div class="footer">
    <div class="container_footer">
        <img src="/img/logoFooter.svg" alt="logo">
        <ul class="nav__footer">
            <NuxtLink to="#"><li>Лыжи</li></NuxtLink>
            <NuxtLink to="#"><li>Сноуборд</li></NuxtLink>
            <NuxtLink to="#"><li>Поездки</li></NuxtLink>
            <NuxtLink to="#"><li>Как это было</li></NuxtLink>
            <NuxtLink to="#"><li>Магазин</li></NuxtLink>
        </ul>
        <hr>
        <div class="flexAllrights">
            <ul class="Allrights">
            <li>© 2024. All rights reserved.</li>
            
        </ul>
        <ul class="policy">
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>Cookie Preferences</li>
            
        </ul>
        </div>
        
    </div>
   
</div>

</template>
<style scoped>
.container_footer{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px
}
.nav__footer{
    display: flex;
    gap: 20px;
    justify-content: center;
}
hr{
    margin: 20px auto;
    width: 90%;
    border: 1px solid;
    color: #034184;
}
.flexAllrights{
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin: 0 auto;
}
.Allrights, .policy{
    color: #034184;
    font-weight: bold;
    font-size: clamp(8px, 1vw, 3rem);
    display: flex;
    gap: 20px;
}

.nav__footer{
    color: #034184;
    font-weight: bold;
    font-size: clamp(12px, 1.5vw, 3rem);
}

.footer{
    width: 100%;
    height: auto;
    padding: 40px 0;
    background-color: white;
}
</style>