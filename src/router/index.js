import { createRouter, createWebHistory } from 'vue-router';
import { useAuthAdminStore } from '@/store/admin/AuthAdminStore';


import HomeView from '../views/HomeView.vue';
import Login from '../views/Login.vue';
import Welcome from '@/views/Welcome.vue';
import AdminList from '@/views/manage/AdminList.vue';
import AdminAdd from '@/views/manage/AdminAdd.vue';
import TeacherList from '@/views/teacher/TeacherList.vue';
import ChangePwd from '@/views/teacher/ChangePwd.vue';
import ChangePwdStu from '@/views/student/ChangePwdStu.vue';
import DepartList from '@/views/manage/DepartList.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: '石家庄科技信息职业学院考试系统' },
    children: [
      {
        path: '/',
        name: 'welcome',
        component: Welcome,
      }, {
        path: 'adminlist',
        name: 'adminlist',
        component: AdminList,
      }, {
        path: 'adminadd',
        name: 'adminadd',
        component: AdminAdd,
      }, {
        path: 'departlist',
        name: 'departlist',
        component: DepartList,
      }, {
        path: 'teacherlist',
        name: 'teacherlist',
        component: TeacherList,
      }, {
        path: 'changepwd',
        name: 'changepwd',
        component: ChangePwd,
      }, {
        path: 'stupwdchange',
        name: 'stupwdchange',
        component: ChangePwdStu,
      }, {
        path: 'stulist',
        name: 'stulist',
        component: import('@/views/student/StuList.vue'),
      }, {
        path: 'classlist',
        name: 'classlist',
        component: import('@/views/student/ClassList.vue'),
      }, {
        path: 'senserlist',
        name: 'senserlist',
        component: import('@/views/semester/SemesterList.vue'),
      }, {
        path: 'subjectlist',
        name: 'subjectlist',
        component: import('@/views/semester/SubjectList.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
// 路由守卫
router.beforeEach((to, from, next) => {
  // const isLoggedIn = localStorage.getItem('islogin') == 1; // 编写一个函数来检查用户是否已登录

  const isLoggedIn = useAuthAdminStore().isAuthenticated(); // 编写一个函数来检查用户是否已登录
  if (to.path !== '/login' && !isLoggedIn) {
    next('/login'); // 如果用户未登录且访问的不是登录页，则重定向到登录页
  } else {
    next(); // 如果用户已登录或访问的是登录页，则继续路由跳转
  }
});
export default router;