<script setup>
</script>

<template>
    <div class="caller">
        <div class="top_caller">
            <img src="/public/img/top_footer.jpg" alt="">
        </div>
        <h1>Свяжись с нами</h1>
        <div class="bottom_caller">
            <div class="bottom_caller__left">
                <p class="bottom_caller__left__telephone">+7 981 823 65 96</p>
                <div class="bottom_caller__left__icon">
                    <img class="bottom_caller__left__icon_image" src="/public/img/whatchap.svg" alt="">
                    <img class="bottom_caller__left__icon_image" src="/public/img/telegram.svg" alt="">
                    <img class="bottom_caller__left__icon_image" src="/public/img/vk.svg" alt="">
                </div>
            </div>
            <div class="bottom_caller__right">
                <input type="tel" placeholder="Телефон">
                <input type="text" placeholder="Ваше имя">
                <button class="button">Записаться</button>
            </div>
        </div>
       
    </div>
 
</template>
<style scoped>
@media (max-width: 768px) {
   .bottom_caller{
    display: flex;
    flex-direction: column;
    gap: 20px;
   }
}
input{
    width: 300px;
    border-bottom: 2px solid white;
    padding: 15px
}
.bottom_caller{
    display: flex;
  justify-content: center;
    align-items: center;
   justify-content: space-around;
}
.bottom_caller__right{
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
   
}
.bottom_caller__left__icon{
    display: flex;
    gap: 20px;
    
}
.bottom_caller__left{
   
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}
.bottom_caller__left__telephone{
    font-size: clamp(20px, 2vw, 3rem);
    font-weight: bold;
}
.bottom_caller__left__icon_image{
    width: 30px;
    cursor: pointer;
}
h1{
    color: white;
    text-align: center;
    padding: 40px 0px
}
img{
    width: 100%;
   
}
.footer,.top_footer,.bottom_footer{
    width: 100%;
    height: auto;
    margin: 0 auto;
    background-color: #034184;
    background-color: white;
}
.caller{
    padding-bottom: 20px ;
}
</style>