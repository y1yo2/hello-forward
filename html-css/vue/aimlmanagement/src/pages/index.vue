<template>
  <el-container>
    <el-aside width="300px" class="scene-manage clearfix">
      <div class="scene-title title clearfix">
         <div class="scene-title-span"><h5>场景管理</h5></div>
         <i class="scene-title-icon el-icon-plus"></i>
      </div>
      <el-select v-model="repositoryValue" placeholder="请选择知识库">
        <el-option
          v-for="item in repositoryOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          size="mini">
        </el-option>
      </el-select>
      <el-input v-model="filterText" placeholder="输入关键字进行过滤" size="mini"></el-input>
      <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"
               default-expand-all :filter-node-method="filterNode" ref="tree2"
               size="mini"
      ></el-tree>
      <el-tree
      :data="treeData"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      :render-content="renderContent"
      size="mini">
      </el-tree>
      <el-tree
      :props="props1"
      :load="loadNode1"
      lazy
      >
      </el-tree>
    </el-aside>
    <el-aside width="250px">
      <el-row class="tac">
        <el-col :span="24">
        <div class="contract-title title clearfix">
          <div class="contract-title-span"><h5>买卖合同</h5></div>
            <i class="contract-title-icon el-icon-plus"></i>
          </div>
          <el-menu
            default-active="2"
            class="contract"
            @select="changeScene"
            background-color="#fff"
            text-color="#333"
            active-text-color="#333">
            <el-menu-item index="1">房屋买卖合同</el-menu-item>
            <el-menu-item index="2">房屋买卖合同</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-aside>
    <el-main>
      <el-row>
        <el-col :span="6" class="channel" :gutter="20">
          <h5 class="tags-title title">渠道</h5>
          <div class="tag-list">
            <div class="tag-item" v-for="(item,index) in tag_list" @click="changeTags(item.id)">
              <el-tag type="info">{{item.name}}</el-tag>
            </div>
          </div>
        </el-col>
        <el-col :span="9" class="entrance">
          <div class="entrance-inner">
            <div class="entrance-title title clearfix">
              <div class="entrance-title-div"><h5>入口问题（标准问题）</h5></div>
              <el-button class="el-button-plus" type="primary" icon="el-icon-plus">新增</el-button>
            </div>
            <!-- <h5 class="entrance-title title">入口问题（标准问题）</h5>
            <el-button type="primary" icon="el-icon-plus">新增</el-button> -->
            <div class="entrance-list">
              <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"></el-checkbox> -->
              <el-checkbox-group v-model="checkedEntrances" @change="handleCheckedEntranceChange">
                <el-checkbox v-for="item in entrance_list" :label="item" :key="item">
                {{item}}</el-checkbox>
              </el-checkbox-group>
            </div>
            <el-pagination
              small
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage2"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="10"
              layout="sizes, prev, pager, next"
              :total="50"
              class="entrance-page"
            >
            </el-pagination>
          </div>
        </el-col>
        <el-col :span="9" class="out">
          <div class="out-title title clearfix">
              <div class="out-title-div"><h5>出口问题</h5></div>
              <el-button class="el-button-plus" type="primary" icon="el-icon-plus">新增</el-button>
          </div>
          <div class="out-list">
            <div class="out-item" v-for="(item, index) in out_list">{{item.title}}</div>
          </div>
          <el-pagination
            small
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage2"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="sizes, prev, pager, next"
            :total="50"
            class="out-page"
          >
          </el-pagination>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="script">
            <h5 class="title">脚本</h5>
            <div class="script-inner"></div>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <div class="result" v-show="show_result" @click.self="show_result = false">
      <div class="checkedEntrance">
        <div class="checkedEntrance-title">标准问题</div>
        <div class="checkedEntrance-question">{{checkedEntrance}}</div>
      </div>
      <div class="similar">
        <div class="similar-title">相似问题</div>
        <div class="similar-list">
          <div class="similar-item" v-for="(item, index) in similar_list">{{item.title}}</div>
        </div>
      </div>
      <div class="groove">
        <div class="groove-title">槽点</div>
        <el-tag
          size="mini"
          :key="tag"
          v-for="tag in grooveTags"
          closable
          :disable-transitions="false"
          @close="closeGrooveTag(tag)">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      </div>
    </div>
  </el-container>
</template>

<script type="text/ecmascript-6">
  import qs from 'qs'
  export default {
    name: "index",
    data () {
      return {
         repositoryOptions: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        repositoryValue: '',
      filterText: '',
        treeData: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        props1: {
          label: 'name',
          children: 'children',
          isLeaf: 'leaf'
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        tag_list: [ // 渠道
          {id: 1, name:'网页'},
          {id: 2, name:'微信'},
          {id: 3, name:'公众号'}
        ],
        entrance_list: [ // 入口问题
          '我现在婚，我的房子归谁',
          '我在要离，我的房子归谁',
          '我现在要离，我的房子归谁',
          '我现在要离婚，我的子归谁',
        ],
        checkAll: false,
        checkedEntrances: [],
        isIndeterminate: true,
        checkedEntrance: '',
        out_list: [ // 出口问题
          {title: '我现在要离婚，我的'},
          {title: '我现在要婚，我的房子归谁'},
          {title: '我现在要离婚，我的房归谁'},
          {title: '我现在要离婚，我房子归谁'},
          {title: '我现在离婚，我的子归谁'},
          {title: '我现在要离婚，我的子归谁'},
          {title: '现在要离婚，我的房子归谁'}
        ],
        currentPage2: 5,
        similar_list: [ // 相似问题
          {title: '我现在要离婚，我的'},
          {title: '我现在要婚，我的房子归谁'},
          {title: '我现在要离婚，我的房归谁'},
          {title: '我现在要离婚，我房子归谁'},
          {title: '我现在离婚，我的子归谁'},
          {title: '我现在要离婚，我的子归谁'},
          {title: '现在要离婚，我的房子归谁'}
        ],
        grooveTags: ['标签一', '标签二', '标签三', '标签四'], // 槽点列表
        inputVisible: false,
        inputValue: '',
        show_result: false,
        channel_tag: ''
      }
    },
    methods: {
      filterNode(value, data) { // 过滤树节点
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      handleNodeClick (data) { // 切换树节点
        console.log(data.label);
      },
      renderContent(h, { node, data, store }) { //增加树按钮
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
              <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
              <i class="el-icon-plus" size="mini" on-click={ () => this.append(data) }></i>
              <i class="el-icon-edit-outline" size="mini"></i>
              <i class="el-icon-delete" size="mini" on-click={ () => this.remove(data) }></i>
            </span>
          </span>);
      },
      append(data) {  //增加树按钮函数
        const newChild = { id: "123", label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },
      remove(node, data) { //删除树按钮函数
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },
      rename(node, data) { //重命名树按钮函数
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },
      loadNode1(node, resolve) { //懒加载
        console.log(node);
        if (node.level === 0) {
          return resolve([{ name: 'region' }]);
        }
        if (node.level > 1) return resolve([]);

        setTimeout(() => {
          const data = [{
            name: 'leaf',
            leaf: true
          }, {
            name: 'zone'
          }];

          resolve(data);
        }, 500);
      },
      changeScene (key, keyPath) { // 切换场景
        console.log(key, keyPath);
      },
      handleCheckAllChange(val) { // 全选按钮点击
        console.log(val);
        this.checkedEntrances = val ? this.entrance_list : [];
        this.isIndeterminate = false;
        //弹框
        this.show_result = val;
      },
      handleCheckedEntranceChange(value) { //多选按钮点击
        console.log(value);
        // let checkedCount = value.length;
        // this.checkAll = checkedCount === this.entrance_list.length;
        // this.isIndeterminate = checkedCount > 0 && checkedCount < this.entrance_list.length;
        //弹框
        this.show_result = value.length > 0;
        if(this.show_result){
          this.checkedEntrance = value[value.length-1];
        }
      },
      handleSizeChange(val) { // 切换每页条数的回调函数
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) { // // 选择某页的回调函数
        console.log(`当前页: ${val}`);
      },
      closeGrooveTag(tag) { // 关闭槽点tag的回调
        this.grooveTags.splice(this.grooveTags.indexOf(tag), 1);
      },
      showInput() { // 新增槽点tag，显示输入框
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() { // 新增槽点tag回调
        let inputValue = this.inputValue;
        if (inputValue) {
          this.grooveTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      renderData () {
        this.$http({ // ajax方法，用的axios插件，$http一个可以直接用的方法，在main.js中，引入 axios 之后，通过修改原型链，来更方便的使用
          method: 'post',
          url: '/mall/api/cjb_province',
          baseURL: process.env.BASE_URL, //baseURL 在config文件夹下面的prod.env.js中配置
          // data: qs.stringify({ // 如果需要传参数的话
          //   order_no: this.order_no
          // }),
        }).then ((res) => { // ajax的回调函数
          // 在这里进行赋值操作渲染页面

        })
      },
      changeTags (id) { // 切换渠道tag 的回调函数
        this.channel_tag  = id
        console.log(this.channel_tag)
      },
      initData () {
        this.$http({
          method: 'get',
          url: '/aimlManage/showQaTreeByQepoIdAsync?repoId=E27C5220-CA6E-4EB8-8937-4F9CA6C228C3',
          baseURL: process.env.BASE_URL, 
          // data: qs.stringify({ // 如果需要传参数的话
          //   order_no: this.order_no
          // }),
        }).then ((res) => { // ajax的回调函数
          // 在这里进行赋值操作渲染页面
          console.log(res);
          if(res.length > 0){
            treeData[0] = res[0];
          }
        })
      },
      getTreeDataFromRes(res){
        console.log(this.treeData);
        console.log(res);
        this.treeData = new Array();
        this.treeData[0] = {};
        this.treeData[0].children = new Array();
        var resData = res[0];
        this.treeData[0].label = resData.label;
        this.treeData[0].id = resData.catalog_id;
        if(resData.children.length > 0){
          for(var i=0;i<resData.children.length;i++){
            this.treeData[0].children[i] = {} ;
            this.treeForEach(this.treeData[0].children[i], resData.children[i]);
          }
        }
        console.log(this.treeData);
      },
      //循环树
      treeForEach(treeChild, resChild){
        treeChild.label = resChild.label;
        treeChild.id = resChild.catalog_id;
        if(!(resChild.children === undefined) && resChild.children.length > 0){
          for(var i=0;i<resChild.children.length;i++){
            treeChild.children = {};
            this.treeForEach(treeChild.children, resChild.children[0]);
          }
        }
      },
      httpGetRepositoryOptions(){
        this.$http({
          method: 'get',
          url: '/aimlManage/showQaRepositoryListByUser?qaType=5',
          baseURL: process.env.BASE_URL, 
          // data: qs.stringify({ // 如果需要传参数的话
          //   order_no: this.order_no
          // }),
        }).then ((res) => { // ajax的回调函数
          // 在这里进行赋值操作渲染页面
          console.log(res);
        })
      },
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },
    mounted () {
      this.renderData();
      //this.initData();
      var resstr='[{"catalog_id":"00000000-0000-0000-0000-000000000000","children":[{"catalog_id":"992944CC-9C3D-480F-89E5-5307544DE549","children":[],"label":"脚本"}],"label":"全部"}]';
      var res = JSON.parse(resstr);
      this.getTreeDataFromRes(res);
      this.httpGetRepositoryOptions();
    }
  }
</script>

<style>
  .clearfix:after {  
     content: '';
     display: block;
     clear: both;      
  }
  .el-container {
    position: relative;
  }
  .el-icon-plus {
    
  }
  .scene-manage {
    background-color: rgb(21,28,46);
    color: #333;
    text-align: center;
  }
  .title {
    margin-left: 20px;
    margin-right: 20px;
    text-align: left;
    line-height: 45px;
  }
  .scene-title {
    border-bottom: 1px solid #fff;
    color: #fff;
    display: line;
  }
  .scene-title-span, .contract-title-span {
    float: left;
  }
  .scene-title-icon {
    color: #ddd;
    float: right;
    margin-top: 14px;
  }
  .el-select {
    margin-top: 10px;
    margin-left: 15px;
    width: 100%;
  }
  .contract-title, .tags-title, .entrance-title, .out-title {
    border-bottom: 1px solid #b7b7b7;
    color: #666;
  }
  .contract {
    text-align: left;
  }
  .contract-title-icon {
    color: #666;
    float: right;
    margin-top: 14px;
  }
  .contract .el-menu-item.is-active {
    background-color: #f2f2f2 !important;
  }
  .entrance-title-div {
    float: left;
  }
  .out-title-div {
    float: left;
  }
  .el-button-plus {
    float: right;
    margin-top: 10px;
    margin-bottom: 5px;
    margin-right: 0px;
    height: 30px;
    padding-top: 0px;
    padding-bottom: 0px;
  }
  .el-input {
    margin-top: 10px;
    margin-bottom: 10px;
    width: 90%;
    text-align: left;
  }
  .el-tree {
    background-color: rgb(21,28,46);
    color: rgb(115,122,143);
  }
  .el-tree-node:focus>.el-tree-node__content {
    background-color: rgb(21,28,46);
    color: #fff;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
  .channel {
    min-height: 500px;
    background-color: #fff;
    border: 1px solid #f2f2f2;
  }
  .tag-list {
    display: flex;
    justify-content: space-around;
    padding-left: 10px;
    padding-right: 10px;
  }
  .tag-item {
    margin-top: 10px;
    flex: 1;
  }
  .el-tag {
    width: 60px;
  }
  .el-checkbox {
    width: 100%;
    line-height: 45px;
    border-bottom: 1px solid #c1c1c1;
  }
  .el-checkbox+.el-checkbox{
    margin-left: 0;
  }
  .out {
    position: relative;
    padding-bottom: 40px;
    min-height: 500px;
    background-color: #fff;
  }
  .entrance-inner {
    position: relative;
    min-height: 460px;
    margin-left: 20px;
    padding-bottom: 40px;
    background-color: #fff;
    border-right: 1px solid #f2f2f2;
  }
  .entrance-page, .out-page {
    position: absolute;
    bottom: 10px;
  }
  .entrance-list,.out-list, .similar-list {
    text-align: left;
    padding-left: 20px;
    padding-right: 20px;
    line-height: 45px;
  }
  .out-item, .similar-item {
    color: #606266;
    font-size: 14px;
    line-height: 45px;
    border-bottom: 1px solid #c1c1c1;
  }
  .el-pagination--small {
    margin-top: 10px;
  }
  .el-pagination__sizes{
    margin-top: -5px;
  }
  .script {
    height: 240px;
    margin-top: 20px;
    background-color: #fff;
  }
  .script-inner {
    height: 180px;
    background-color: #e9eef3;
    margin: 0 20px 20px 20px;
    border: 1px solid #ced3d8;
  }
  .result {
    position: absolute;
    top: 0;
    right: 0;
    width: 300px;
    height: 100%;
    text-align: left;
    padding-left: 20px;
    padding-top: 20px;
    background-color: #fff;
    color: #606266;
    font-size: 14px;
    box-shadow:0 0 20px 0 rgba(0,0,0,0.70);
  }
  .checkedEntrance-title, .similar-title, .groove-title {
    font-size: 14px;
    line-height: 25px;
    color: #333;
    font-weight: bold;
  }
  .checkedEntrance-question {
    line-height: 45px;
  }
  .similar {
    margin-top: 50px;
    margin-left: -20px;
  }
  .similar-title {
    margin-left: 20px;
  }
  .groove {
    margin-top: 50px;
  }
  .groove-title {
    margin-bottom: 20px;
  }
  .el-tag--mini {
    margin-left: 10px;
    font-size: 12px;
    margin-bottom: 10px;
  }
  .el-tag--mini .el-icon-close {
    margin-left: -10px;
  }
</style>
