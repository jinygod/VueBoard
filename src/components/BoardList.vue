<template>
  <div class="table-container">
    <h1>Vue Board</h1>
    <!-- 글 목록 표시 -->
    <table class="table table-hover custom-table">
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>날짜</th>
        </tr>
      </thead>
      <tbody>
        <!-- 글 목록 아이템 반복 표시 -->
        <tr
          v-for="post in paginatedPosts"
          :key="post.id"
          @click="handlePostClick(post)"
        >
          <td>{{ post.id }}</td>
          <td>{{ post.title }}</td>
          <td>{{ post.author }}</td>
          <td>{{ formatDate(post.date) }}</td>
        </tr>
      </tbody>
    </table>
    <!-- Post Detail Modal -->
    <post-detail
      :post="selectedPost"
      :showModal="showPostDetail"
      v-if="showPostDetail"
      @close="showPostDetail = false"
      @postDeleted="fetchPosts"
      @postUpdated="fetchPosts"
    />
    <nav>
      <ul class="pagination">
        <!-- 이전 버튼 -->
        <li class="page-item" :class="{ disabled: currentPage <= 10 }">
          <button
            class="page-link"
            @click="prevPage"
            :disabled="currentPage <= 10"
          >
            이전
          </button>
        </li>
        <!-- 페이지 버튼 -->
        <li
          class="page-item"
          v-for="pageNumber in visiblePageNumbers"
          :key="pageNumber"
          :class="{ active: currentPage === pageNumber }"
        >
          <button class="page-link" @click="goToPage(pageNumber)">
            {{ pageNumber }}
          </button>
        </li>
        <!-- 다음 버튼 -->
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="nextPage">다음</button>
        </li>
      </ul>
    </nav>
    <div class="row">
      <div class="col text-end">
        <router-link to="/write" v-slot="{ navigate }">
          <button class="btn btn-primary" @click="navigate">글 쓰기</button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<style>
.table-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.custom-table {
  max-width: 50%;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.table-header {
  background-color: #f0f0f0;
}

.highlight-cell {
  color: blue;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.write-button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.pagination button {
  margin: 0 5px;
}
</style>
<script>
import PostDetail from './PostDetail.vue'

export default {
  data() {
    return {
      posts: [],
      currentPage: 1,
      pageSize: 10,
      showPostDetail: false,
      selectedPost: null,
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.posts.length / this.pageSize)
    },
    visiblePageNumbers() {
      const currentPageGroup = Math.ceil(this.currentPage / 10)
      const startPage = (currentPageGroup - 1) * 10 + 1
      const endPage = Math.min(this.totalPages, currentPageGroup * 10)
      return Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => i + startPage
      )
    },
    paginatedPosts() {
      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize
      return this.posts.slice(startIndex, endIndex)
    },
    isFirstPage() {
      return this.currentPage <= 10
    },
    isLastPage() {
      return this.currentPage === this.totalPages
    },
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      const date = new Date(dateString)
      return date.toLocaleDateString(undefined, options)
    },
    handlePostClick(post) {
      this.selectedPost = post
      this.showPostDetail = true
    },
    async fetchPosts() {
      try {
        const response = await fetch('http://localhost:3001/posts')
        const data = await response.json()

        // 번호순으로 정렬
        this.posts = data.sort((a,b) => a.id - b.id); 
      } catch (error) {
        console.log('Error fetching posts:', error)
      }
    },
    prevPage() {
      if (!this.isFirstPage) {
        this.currentPage -= 10
      }
    },
    nextPage() {
      if (!this.isLastPage) {
        this.currentPage += 10
      }
    },
    goToPage(pageNumber) {
      this.currentPage = pageNumber
    },
  },
  created() {
    this.fetchPosts()
  },
  components: {
    PostDetail,
  },
}
</script>
