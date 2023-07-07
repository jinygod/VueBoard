import { createRouter, createWebHistory } from 'vue-router'
import BoardList from '@/components/BoardList.vue'
import PostDetail from '@/components/PostDetail.vue'
import WritePost from '@/components/WritePost.vue'

const routes = [
  {
    path: '/',
    name: 'BoardList',
    component: BoardList,
  },
  {
    path: '/post/:id',
    name: 'PostDetail',
    component: PostDetail,
  },
  {
    path: '/write',
    name: 'WritePost',
    component: WritePost,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
