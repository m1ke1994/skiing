<script setup>
import { ref, onMounted } from 'vue';
import AdminPage from './AdminPage.vue';

/* ------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------ */
const email = ref("");
const access = ref(false);
const password = ref("");
const arraylogin = ref([]);

// Загрузка данных с сервера
const loginFetch = async () => {
  try {
    const response = await fetch('http://localhost:3005/api/superuser');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    arraylogin.value = data;
    console.log("Данные пришли:", arraylogin.value);
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
  }
};

// Проверка введенных данных
const checkLogin = () => {
  const user = arraylogin.value.find(
    (user) => user.email === email.value && user.password === password.value
  );

  if (user) {
    access.value = true; // Доступ разрешен
    console.log("Доступ разрешен для пользователя:", user);
  } else {
    access.value = false; // Доступ запрещен
    console.log("Неверный email или пароль");
    alert("Неверный email или пароль"); // Можно показать сообщение об ошибке
  }
};

// Обработчик отправки формы
const handleSubmit = (event) => {
  event.preventDefault(); // Предотвращаем перезагрузку страницы
  checkLogin(); // Проверяем введенные данные
};

onMounted(() => {
  loginFetch(); // Загружаем данные при монтировании компонента
});
</script>

<template>
<div  v-if="!access" class="login">
  <div class="login-triangle"></div>
  
  <h2 class="login-header">Войти</h2>

  <form class="login-container" @submit="handleSubmit">
    <p><input type="email" placeholder="Email" v-model="email"></p>
    <p><input type="password" placeholder="Password" v-model="password"></p>
    <p><input type="submit" value="Войти"></p>
  </form>
</div>
<div v-if="access">
  <AdminPage></AdminPage>
</div>
</template>
<style scoped>

body {
  background: #456;
  font-family: 'Open Sans', sans-serif;
}

.login {
  width: 400px;
  margin: 16px auto;
  font-size: 16px;
}

/* Reset top and bottom margins from certain elements */
.login-header,
.login p {
  margin-top: 0;
  margin-bottom: 0;
}

/* The triangle form is achieved by a CSS hack */
.login-triangle {
  width: 0;
  margin-right: auto;
  margin-left: auto;
  border: 12px solid transparent;
  border-bottom-color: #28d;
}

.login-header {
  background: #28d;
  padding: 20px;
  font-size: 1.4em;
  font-weight: normal;
  text-align: center;
  text-transform: uppercase;
  color: #fff;
}

.login-container {
  background: #ebebeb;
  padding: 12px;
}

/* Every row inside .login-container is defined with p tags */
.login p {
  padding: 12px;
}

.login input {
  box-sizing: border-box;
  display: block;
  width: 100%;
  border-width: 1px;
  border-style: solid;
  padding: 16px;
  outline: 0;
  font-family: inherit;
  font-size: 0.95em;
}

.login input[type="email"],
.login input[type="password"] {
  background: #fff;
  border-color: #bbb;
  color: #555;
}

/* Text fields' focus effect */
.login input[type="email"]:focus,
.login input[type="password"]:focus {
  border-color: #888;
}

.login input[type="submit"] {
  background: #28d;
  border-color: transparent;
  color: #fff;
  cursor: pointer;
}

.login input[type="submit"]:hover {
  background: #17c;
}

/* Buttons' focus effect */
.login input[type="submit"]:focus {
  border-color: #05a;
}
</style>