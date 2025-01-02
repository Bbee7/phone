<template>
  <div id="app" class="container mt-5">
    <h1 class="text-center mb-4">手机号码吉凶查询</h1>
    <form @submit.prevent="handleFormSubmit" class="mb-4">
      <div class="form-group">
        <label for="phone">手机号码:</label>
        <input type="text" id="phone" v-model="phone" required class="form-control" placeholder="请输入11位手机号码">
        <small v-if="error" class="text-danger">{{ error }}</small>
      </div>
      <button type="submit" class="btn btn-primary">查询</button>
    </form>
    <div v-if="result" class="card mt-4">
      <div class="card-body">
        <h5 class="card-title">查询结果</h5>
        <p class="card-text"><strong>省份:</strong> {{ result.province }}</p>
        <p class="card-text"><strong>城市:</strong> {{ result.city }}</p>
        <p class="card-text"><strong>运营商:</strong> {{ result.company }}</p>
        <p class="card-text"><strong>区号:</strong> {{ result.areaCode }}</p>
        <p class="card-text"><strong>邮政编码:</strong> {{ result.zipCode }}</p>
        <p class="card-text"><strong>运势:</strong> {{ result.fortune }}</p>
        <p class="card-text"><strong>描述:</strong> {{ result.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      phone: '',
      error: '',
      result: null
    };
  },
  methods: {
    async handleFormSubmit() {
      if (this.phone.length !== 11) {
        this.error = '无效的手机号码';
        this.result = null;
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/phone', {
          params: {
            phone: this.phone
          }
        });

        this.result = response.data;
        this.error = '';
      } catch (error) {
        console.error('请求失败:', error.response ? error.response.data : error.message);
        this.error = '查询失败，请稍后再试';
        this.result = null;
      }
    }
  }
};
</script>

<style>
/* 添加一些基本样式 */
body {
  font-family: Arial, sans-serif;
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 1rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.card-text {
  margin-bottom: 0.5rem;
}
</style>
