<script setup>
import { ref } from 'vue'
const rewiews = [
    {
        name: 'Анатолий Вторушин',
        date: '02.04.2024',
        text: `Первый раз прошёл курс по горным лыжам, до этого в основном учился 
            самостоятельно и с помощью друзей. Друг-сноубордист уже два раза проходил обучение в этой
             школе, каждый раз оставался максимально довольным и позвал меня, как раз в это же время 
             был курс по лыжам. Обучение было в Кировске с 28 апреля по 4 мая. Сначала немного переживал,
              что в это время уже тепло, но в Кировске ещё настоящая зима в начале мая, снега много, все 
              склоны открыты - с погодой нам очень повезло. Приятные впечатления от школы были с самого
               начала общения и организации поездки, отдельное спасибо Маше! `,
        img: '/img/rewiew1.jpg'
    },
    {
        name: 'Вита Блохина',
        date: '02.03.2024',
        text: `Второй год с Ex3mePro на выезде)) Организация и обучение на высоте)) Спасибо инструктору Александру Пыжову за терпение и поддержку, желание расти в горных лыжах только усиливается) Маша Вершинина и Дима Слобожанинов – вы замечательные, спасибо за школу!) 🙏🏻 Отлично провели майские праздники в горах, с погодой повезло) Катались много, на всех основных склонах побывали) Группа pro 🔥,
         фотографий и впечатлений до следующего заезда хватит)) С нетерпением жду новых поездок!💙`,
        img: '/img/rewiew2.jpg'
    },
    {
        name: 'Александр Поветкин',
        date: '02.02.2024',
        text: `Удалось позаниматься всего 2 дня в группе лыжников pro1, но очень много почерпнул 
        для себя. С 29-30.04.24, занимаясь с нашим инструктором Александром Пыжовым, изучили базовые 
        упражнения на правильную стойку, распределение веса, углы закантовки, изучили теорию, провели 
        разбор полетов. В итоге, я смог проехать по всем трассам, включая чёрные. Благодаря изучению 
        коротких поворотов, смог более уверенно чувствовать себя на узких и крутых участках трассы.
         Хоть моя техника еще далека до идеала, но уже прогресс на лицо. Кировск, с его широкими ровными 
         трассами, отлично подходит для продвинутых тренировок. Уклон трасс довольно крутой, но позволяет
          ехать уверенно и оттачивать мастерство, не боясь упасть и еще долгое время останавливаться лёжа 
          на спине 😅. Обобщая могу однозначно рекомендовать саму школу, а главное нашего инструктора Александра,
           его терпению можно позавидовать)). 
        Если совпадут даты, хотел бы еще съездить куда-то позаниматься с Вами. И в этот раз уже ра полный курс.`,
        img: 'img/rewiew3.jpg'
    }
]
</script>


<template>
 <div class="rewiew">
    <h1>Отзывы учеников</h1>
    <div class="rewiew__container">
        <div class="rewiew__items">
        <div v v-for="rewiew in rewiews" :key="rewiew.name" class="rewiew__item">
         <div class="rewiew_img_block">
            <img class="rewiew_img" :src="rewiew.img" alt="">
          
          <div class="rewiew_description">
           <p class="rewiew_name">{{ rewiew.name }}</p>
           <p class="rewiew_date">{{ rewiew.date }}</p>
          </div>
         </div>
            <p class="rewiew_text">{{ rewiew.text }}</p>
        </div>
    </div>
    <NuxtLink to="https://vk.com/app6326142_-55564243" class="rewiew_button">Читать другие отзывы</NuxtLink>
    </div>
   
 </div>
</template>
<style scoped>
.rewiew_button:hover{
    background:linear-gradient(180deg, #034184, #0675ec);
    color: white;
    transition: all ease 0.5s;
}
.rewiew__container{
    display: flex;
    flex-direction: column;
    align-items: center;}
.rewiew_button{
    color:#034184 ;
    background: white;
    border: none;
    text-align: center;
    padding: 10px 30px;
    font-size: 1.1rem;
    
    cursor: pointer;
    margin: 20px 0;
}
.rewiew__items{
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    
}
.rewiew_text{
    font-size: clamp(16px, 1.3vw, 1.1rem);
    color: white;
}


.rewiew_name,.rewiew_date{
    font-size: clamp(20px, 1.3vw, 1.1rem);
    color: white;
}
.rewiew_description{
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
}
.rewiew_img_block{
    text-align: left;
    display: flex;
   
    align-items: center;
    gap: 20px;
    
}
.rewiew_img{
    width:80px;
    border-radius: 100%;
}
.rewiew__item{
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
   
    gap: 20px;
    padding: 20px 0;
    justify-content: space-between;
    padding: 20px;
    border: 5px solid; 
    border-image: linear-gradient(360deg, #eceeef, #0675ec) 1;
    
}


h1{
    text-align: center;
    padding: 20px 0;
}
.rewiew{
    margin: 20px 0;
    padding: 40px 0;
    width: 100%;
    height: auto;
    
}

</style>