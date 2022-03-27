<template>
  <div class="basic-layout">
    <div class="nav-top">
      <div class="bread">基于图神经网络的盲道无障碍断点识别Api</div>
    </div>
    <div class="layout-bottom">
      <div class="nav-side">
        <el-menu
            :default-active="defaultActive"
            background-color="#5E6E87"
            text-color="#fff"
            @select="handlerMenuSelect"
            active-text-color="#fff">
          <el-menu-item
              v-for="item in routerList"
              :index="item.path"
              :key="item.name">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </el-menu>
        <div class="logo">
          <div class="logo-text">
            <b>使用说明 : </b>
            <span>
              本识别系统使用卷积神经网络
            进行图像检测，运用GNN对图像
            中元素之间的关系进行建模及
            预测，实现盲道断点识别。
            </span>
            <em>了解更多 》</em>
          </div>
          <div class="logo-img">
            <img src="../assets/logo.png" alt="">
          </div>
        </div>
      </div>
      <div class="content-right">
        <div class="wrapper">
          <div class="main-page">
            <router-view/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      defaultActive: '/upload-image',
      routerList: [
        {
          path: '/upload-image',
          name: '图片上传',
          icon: ''
        },
        {
          path: '/breakpoint-analysis',
          name: '断点分析',
          icon: ''
        },
        {
          path: '/history',
          name: '历史记录',
          icon: ''
        },
      ]
    }
  },
  created() {
    try {
      this.defaultActive = window.localStorage.getItem('menuActive')
    }catch {
      window.localStorage.setItem('menuActive', '/upload-image')
    }
  },
  methods: {
    handlerMenuSelect(index, path) {
      // 1. 存储下标
      window.localStorage.setItem('menuActive', path)
      this.$router.push({
        path: path.toString()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.basic-layout {
  position: relative;

  .nav-top {
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    box-sizing: border-box;
    font-size: 30px;
    background: #122648;
    color: #fff;
  }

  .layout-bottom {
    .nav-side {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-top: 20px;
      position: fixed;
      width: 200px;
      height: 100vh;
      background: #5F6D87;
      overflow-y: auto;
      transition: width 0.3s;
      color: #fff;

      ::v-deep .el-menu {
        text-align: center;
        border-right: none !important;

        .el-menu-item.is-active {
          background: #172646 !important;
          color: #fff;
        }
      }

      .logo {
        position: relative;

        ::after {
          content: '';
          position: absolute;
          display: inline-block;
          width: 150px;
          height: 5px;
          background: #172646;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
        }

        .logo-img {
          width: 100px;
          margin: 30px auto 150px auto;

          img {
            width: 100%;
          }
        }

        .logo-text {
          width: 180px;
          font-size: 14px;
          line-height: 1.4;
          margin: 0 auto;

          b {
            display: block;
          }

          span {
            display: inline-block;
            margin: 5px 0;
          }

          em {
            display: block;
            width: 100%;
            text-align: right;
          }
        }

      }

    }

    .content-right {
      margin-left: 200px;

      .wrapper {
        height: calc(100vh - 70px);
        background: #ECEEF1;
        padding: 20px;
        box-sizing: border-box;

        .main-page {
          width: 100%;
          height: 100%;
          background: #fff;
          border-radius: 4px;
          padding: 10px;
          box-sizing: border-box;
        }
      }
    }
  }
}

</style>
