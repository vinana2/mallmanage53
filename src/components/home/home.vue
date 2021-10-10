<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img
              style="height: 60px"
              src="@/assets/img/2.png"
              alt="无法显示图片"
            /></div
        ></el-col>
        <el-col :span="18" class="middle">
          <div class="grid-content bg-purple-light">
            <h3>电商平台管理系统</h3>
          </div>
        </el-col>
        <el-col :span="2"
          ><div class="grid-content bg-purple">
            <a @click='logout' class="loginout" href="#">退出</a>
          </div></el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" :width="isCollapse ? '64px' : '200px' ">
          <div class='toggle-button' @click="toggleCollapse">|||</div>
        <el-row class="tac">
          <el-col>
            <el-menu
            background-color="#d3dce6"
            :unique-opened='true'
            active-text-color="#409EFF"
            :collapse="isCollapse"
            :collapse-transition="false"
            router
            :default-active="activePath"
            >
                <!-- 1 -->
              <el-submenu :index="item.id + '' " v-for="item in menulist" :key="item.id">
                <template slot="title">
                  <i :class="iconsObj[item.id]"></i>
                  <span>{{item.authName}}</span>
                </template>

                <el-menu-item :index=" '/' + subItem.path" 
                              v-for="subItem in item.children"
                              :key="subItem.id"
                              @click="saveNavState('/' + subItem.path)">
                  <i class="el-icon-menu"></i>
                  <span>{{subItem.authName}}</span>
                </el-menu-item>
              </el-submenu>


            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main class="main">
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "home",
  data(){
      return{
           menulist:[],
           iconsObj:{
               '125':'iconfont icon-user-fill',
               '103':'iconfont icon-tijikongjian',
               '101':'iconfont icon-shangpin',
               '102':'iconfont icon-danju',
               '145':'iconfont icon-zhexiantu',
           },
        // 是否折叠 
        isCollapse:false,
        // 被激活的链接地址
        activePath:''
      }
  },

  created(){
     this.getMenuList()
     this.activePath = window.sessionStorage.getItem('activePath')
  },

  methods:{
      logout(){
          window.sessionStorage.clear();
          this.$router.push('/login')
      },
    //   获取所有的菜单
   async getMenuList(){
       const {data:res} = await this.$http.get('menus')
       if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
       this.menulist = res.data
    //    console.log(res)
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse(){
    this.isCollapse = !this.isCollapse
    },

    // 保存链接的激活状态
    saveNavState(activePath){
        window.sessionStorage.setItem('activePath',activePath)
        this.activePath = activePath
    }
  }
};
</script>

<style>
.container {
  height: 100%;
}
.header {
  background-color: #b3c0d1;
}
.aside {
  background-color: #d3dce6;
}
.main {
  background-color: #e9eef3;
  height: 100%;
}
/* 头部样式 */
.middle {
  text-align: center;
}
.loginout {
  line-height: 60px;
  text-decoration: none;
}

.iconfont{
    margin-right:10px;
}
.toggle-button{
    background-color: #b3c0d1;
    font-size: 10px;
    line-height: 24px;
    color:#fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>
