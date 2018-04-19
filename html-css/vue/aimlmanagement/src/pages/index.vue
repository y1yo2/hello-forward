<template>
  <el-container>
  <el-dialog
    title="删除确认"
    :visible.sync="deleteVisible"
    width="30%"
    >
    <span class="dialog-footer">是否删除该节点</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="deleteVisible = false">取 消</el-button>
      <el-button type="primary" @click="removeForButton">确 定</el-button>
    </span>
  </el-dialog>
  <el-dialog
    title="新增确认"
    :visible.sync="createVisible"
    width="30%"
    >
    <span class="dialog-footer">是否新增一个节点</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="createVisible = false">取 消</el-button>
      <el-button type="primary" @click="appendForButton">确 定</el-button>
    </span>
  </el-dialog>
  <el-dialog
    title="是否重命名该节点？"
    :visible.sync="renameVisible"
    width="30%"
    >
    <!-- <span class="dialog-footer">是否重命名该节点</span> -->
    <el-form :model="renameForm">
    <el-form-item label="活动名称" :label-width="formLabelWidth">
      <el-input v-model="renameForm.name" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="renameVisible = false">取 消</el-button>
      <el-button type="primary" @click="renameForButton">确 定</el-button>
    </span>
  </el-dialog>
  <el-dialog
    title="是否在当前目录下创建一个主题？"
    :visible.sync="createSceneVisible"
    width="30%">
    <el-form :model="renameForm">
    <el-form-item label="主题名称" :label-width="formLabelWidth">
      <el-input v-model="renameForm.name" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="createSceneVisible = false">取 消</el-button>
      <el-button type="primary" @click="httpCreateScene">确 定</el-button>
    </span>
  </el-dialog>
    <el-aside width="300px" class="scene-manage clearfix">
      <div class="scene-title title clearfix">
         <div class="scene-title-span"><h5>场景管理</h5></div>
         <i class="scene-title-icon el-icon-plus"></i>
      </div>
      <el-select v-model="repositoryValue" placeholder="请选择知识库" @change="handleRepositoryChange">
        <el-option
          v-for="item in repositoryOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          size="mini">
        </el-option>
      </el-select>
      <el-input v-model="filterText" placeholder="输入关键字进行过滤" size="mini"></el-input>
      <el-tree
      :props="props1"
      :load="loadNode1"
      :filter-node-method="filterNode" ref="tree2"
      node-key="id"
      :render-content="renderContent"
      lazy
      @node-click="handleNodeClick"
      size="mini">
      </el-tree>
    </el-aside>
    <el-aside width="250px">
      <el-row class="tac">
        <el-col :span="24">
        <div class="scene-theme-title title clearfix">
          <div class="scene-theme-title-span"><h5>场景主题列表</h5></div>
            <i class="scene-theme-title-icon el-icon-plus" @click="createSceneVisible = true"></i>
          </div>
          <div class="scene-theme-list">
            <div class="scene-theme-item" v-for="(item, idx) in scene_list" :class="{'active': scene_id == item.id}" @click="changeScene(item.id)">
              {{item.title}}
              <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
              <el-button type="text" size="small">删除</el-button>
            </div>
          </div>
          <el-pagination
            class="scene-theme-page"
            small
            layout="prev, pager, next"
            :current-page.sync="sceneCurrentPage"
            :total="sceneTotal">
          </el-pagination>
        </el-col>
      </el-row>
    </el-aside>
    <el-main>
      <el-row>
        <el-col :span="12" class="entrance">
          <div class="entrance-inner">
            <div class="entrance-title title clearfix">
              <div class="entrance-title-div"><h5>入口问题（标准问题）</h5></div>
              <el-button class="el-button-plus" type="primary" icon="el-icon-plus">新增</el-button>
            </div>
            <!-- <h5 class="entrance-title title">入口问题（标准问题）</h5>
            <el-button type="primary" icon="el-icon-plus">新增</el-button> -->
            <div class="entrance-list">
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
              layout="prev, pager, next"
              :total="50"
              class="entrance-page">
            </el-pagination>
          </div>
        </el-col>
        <el-col :span="12" class="out">
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
            layout="prev, pager, next"
            :total="50"
            class="out-page">
          </el-pagination>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div class="groove">
            <h5 class="title">槽点</h5>
            <div class="in-groove">
              <div class="in-groove-title">入口问题</div>
              <div class="in-groove-list">
                <el-tag
                  size="mini"
                  :key="tag"
                  v-for="tag in grooveTags"
                  :disable-transitions="false"
                  @close="closeGrooveTag(tag)">
                  {{tag}}
                </el-tag>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="channel">
            <h5 class="title">渠道</h5>
            <div class="channel-list">
              <div class="channel-item">
                <i class="el-icon-delete"></i>
                网络
              </div>
              <div class="channel-item">
                <i class="el-icon-delete"></i>
                网络
              </div>
              <div class="channel-item">
                <i class="el-icon-delete"></i>
                网络
              </div>
              <div class="channel-item">
                <i class="el-icon-delete"></i>
                网络
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
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
        deleteVisible: false,
        createVisible: false,
        renameVisible: false,
        createSceneVisible: false,
        renameForm: {
          name: '',
          id: '',
        },
        formLabelWidth: '120px',
        sceneTotal: 50,  //默认总条目数
        sceneCurrentPage: 1, //默认当前页面
        repositoryOptions: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        scene_id: 1,
        repositoryValue: '',
        filterText: '',
        treeDataAdd: [], //懒加载增加的部分
        treeData: {}, //当前的树data
        treeNode: {}, //当前的树node
        treeThis: {}, 
        props1: {
          label: 'label',
          children: 'children',
          isLeaf: 'isLeaf'
        },
        tableData4: [{
          date: '2016-05-03111111111111111111111111111111111111111111111111111111111111111111111111',
        }, {
          date: '2016-05-02',
        }, ],
        scene_list: [{
          id: 1,
          title: '房屋买卖合同'
        },
        {
          id: 2,
          title: '房屋买卖合同'
        },
        {
          id: 3,
          title: '房屋买卖合同'
        }],
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
      handleRepositoryChange () {
        this.$refs.tree2.root.childNodes[0].childNodes = new Array();
        this.$refs.tree2.root.childNodes[0].loaded = false;
        this.$refs.tree2.root.childNodes[0].expanded = false;
        this.$refs.tree2.root.childNodes[0].isLeafByUser = false;
      },
      filterNode(value, data) { // 过滤树节点
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      handleNodeClick (data, node) { // 切换树节点(共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。)
        console.log(data.label);
        this.treeData = data;
        this.treeNode = node;
        this.httpChangeSceneList(1);
        // this.scene_list = [{
        //   id: 4,
        //   title: '切换后的场景1'
        // },
        // {
        //   id: 5,
        //   title: '切换后的场景2'
        // },
        // {
        //   id: 6,
        //   title: '切换后的场景3'
        // }]
      },
      renderContent(h, { node, data, store }) { //增加树按钮
        return (
          <div class="custom-tree-node">
            <div class="custom-tree-node-label">{node.label}</div>
            <div class="custom-tree-node-button">
              <i class="el-icon-plus" size="mini" on-click={ () => this.append(node, data) }></i>
              <i class="el-icon-edit-outline" size="mini" on-click={ () => this.rename(node, data) }></i>
              <i class="el-icon-delete" size="mini" on-click={ () => this.remove(node, data) }></i>
            </div>
          </div>);
      },
      showEditButton(node) {
        alert("???");
        return (node.level !== 1);
      },
      append(node, data) {  //增加树按钮函数
        console.log("node");
        console.log(node);
        console.log("data");
        console.log(data);
        this.treeData = data;
        this.treeNode = node;
        this.treeThis = this;
        this.createVisible = true;
      },
      appendForButton() {
        this.createVisible = false;
        this.httpAppendTree();
      },
      // remove(node, data) { //删除树按钮函数
      //   const parent = node.parent;
      //   const children = parent.data.children || parent.data;
      //   const index = children.findIndex(d => d.id === data.id);
      //   children.splice(index, 1);
      // },
      remove(node, data) { //删除树按钮函数
        console.log("node");
        console.log(node);
        console.log("data");
        console.log(data);
        this.deleteVisible=true;
        this.treeNode = node;
        this.treeData = data;
      },
      removeForButton() { //删除树按钮函数
        this.httpDeleteTree();
        this.deleteVisible=false;
      },
      rename(node, data) { //重命名树按钮函数
        console.log("node");
        console.log(node);
        console.log("data");
        console.log(data);
        this.renameVisible=true;
        this.treeNode = node;
        this.treeData = data;
        this.renameForm.name = data.label;
        this.renameForm.id = data.id;
      },
      renameForButton() { //重命名树确认按钮函数
        this.renameVisible=false;
        this.treeData.label = this.renameForm.name;
        this.httpRenameTree();
      },
      loadNode1(node, resolve) { //懒加载
        console.log(node);
        if (node.level === 0) {
          return resolve([{label: '全部',
            isLeaf: false,
            id: '00000000-0000-0000-0000-000000000000',
            children: [],
        }]);
        }
        if (node.level === 1) {
          this.httpGetChildTreeDataAdd(node, resolve);
        }
        if (node.level > 1) {
          this.httpGetChildTreeDataAdd(node, resolve);
        }
        node.loading=false;
      },
      changeScene (id) { // 切换场景
        this.scene_id = id
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      handleCheckedEntranceChange(value) { //多选按钮点击
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
      // getTreeDataFromRes(res){
      //   this.treeData = new Array();
      //   this.treeData[0] = {};
      //   this.treeData[0].children = new Array();
      //   var resData = res[0];
      //   this.treeData[0].label = resData.label;
      //   this.treeData[0].id = resData.catalog_id;
      //   if(resData.children.length > 0){
      //     for(var i=0;i<resData.children.length;i++){
      //       this.treeData[0].children[i] = {} ;
      //       this.treeForEach(this.treeData[0].children[i], resData.children[i]);
      //     }
      //   }
      // },
      getTreeDataAddFromRes(treeDataAdd, res){
        treeDataAdd = new Array();
        if (res.length > 0) {
          for (var i=0;i<res.length;i++) {
            treeDataAdd[i] = {};
            treeDataAdd[i].children = new Array();
            var resData = res[i];
            treeDataAdd[i].label = resData.label;
            treeDataAdd[i].id = resData.catalog_id;
            // treeDataAdd[i].isLeaf = true;
            if(resData.children.length > 0){
              treeDataAdd[i].isLeaf = false;
              for(var j=0;j<resData.children.length;j++){
                treeDataAdd[i].children[j] = {} ;
                this.treeForEach(treeDataAdd[i].children[j], resData.children[j]);
              }
            }
          }
        }
        return treeDataAdd;
      },
      //循环树
      treeForEach(treeChild, resChild){
        treeChild.label = resChild.label;
        treeChild.id = resChild.catalog_id;
        // treeChild.isLeaf=true;
        if(!(resChild.children === undefined) && resChild.children.length > 0){
          treeChild.isLeaf=false;
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
          baseURL: '/',
          dataType: 'jsonp',
        }).then ((res) => {
          console.log(res.data);
          var data = res.data;
          this.repositoryOptions = new Array();
          if(data.length > 0){
            for(var i=0;i<data.length;i++){
              this.repositoryOptions[i] = {};
              this.repositoryOptions[i].label = data[i].REPOSITORY_NAME;
              this.repositoryOptions[i].value = data[i].REPOSITORY_ID;
            }
            this.repositoryValue = data[0].REPOSITORY_ID;
          }
        })
      },
      httpGetFatherTreeDataAdd(resolve){
        // console.log("this.repositoryValue");
        // console.log(this.repositoryValue);
        this.$http({
          method: 'get',
          url: '/aimlManage/showQaTreeByQepoIdAsync',
          params: {repoId: this.repositoryValue},
          baseURL: '/',
          dataType: 'jsonp',
        }).then ((res) => {
          // console.log("res.data" + res.data);
          // console.log(res.data);
          var data = res.data;
          if(data.length > 0){
            this.treeDataAdd = this.getTreeDataAddFromRes(this.treeDataAdd, data);
            resolve(this.treeDataAdd);
          }
        })
      },
      httpGetChildTreeDataAdd(parentNode, resolve){
        this.$http({
          method: 'get',
          url: '/aimlManage/showQaTreeByQepoIdAsync',
          params: {
            repoId: this.repositoryValue,
            parentId: parentNode.data.id,
          },
          baseURL: '/',
          dataType: 'jsonp',
        }).then ((res) => {
          var data = res.data;
          if(data.length > 0){
            this.treeDataAdd = this.getTreeDataAddFromRes(this.treeDataAdd, data);
            resolve(this.treeDataAdd);
          }else{
            parentNode.isLeaf = true;
            parentNode.isLeafByUser = true;
          }
        })
      },
      httpRenameTree(){
        this.$http({
          method: 'post',
          url: '/aimlManage/renameQaCatalog',
          params: {
            repoId: this.repositoryValue,
            id: this.renameForm.id,
            name: this.renameForm.name,
          },
          baseURL: '/',
          dataType: 'jsonp',
        }).then ((res) => {
          var data = res.data;
          console.log("renameResult");
          console.log(data);
        })
      },
      httpAppendTree(){
        this.$http({
          method: 'post',
          url: '/aimlManage/createQaCatalog',
          params: {
            repoId: this.repositoryValue,
            pid: this.treeData.id,
            name: "新增的目录",
          },
          baseURL: '/',
          dataType: 'jsonp',
        }).then ((res) => {
          var data = res.data;
          console.log("appendResult");
          console.log(data);
          this.treeData.isLeaf = false;
          this.treeNode.isLeafByUser = false;
          this.treeNode.isLeaf = false;
          this.treeNode.loading = false;
          this.treeNode.loaded = false;
          this.treeNode.expanded = false;
          // this.treeData.children.push(newChild);
          console.log("this.treeData:" + this.treeData);
          console.log(this.treeData);
        })
      },
      httpDeleteTree(){
        this.$http({
          method: 'post',
          url: '/aimlManage/deleteAImlTopicByCatalogId',
          params: {
            repositoryId: this.repositoryValue,
            catalogId: this.treeData.id,
          },
          baseURL: '/',
          dataType: 'jsonp',
        }).then ((res) => {
          var data = res.data;
          console.log("deleteResult");
          console.log(data);
          const parent = this.treeNode.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex(d => d.id === this.treeData.id);
          children.splice(index, 1);
        })
      },
      httpChangeSceneList(rows){
        this.$http({
          method: 'get',
          url: '/aimlManage/showAimlList',
          params: {
            repositoryId: this.repositoryValue,
            catalogId: this.treeData.id,
            rows: rows,
            pageSize: 10, //默认10行一页
          },
          baseURL: '/',
          dataType: 'jsonp',
        }).then ((res) => {
          var data = res.data;
          console.log("changeSceneList");
          console.log(data);
          //data.total为总数
          var list = data.list;
          this.scene_list = new Array();
          var total = data.total;
          if (!(data.total > 0)) total=50;
          this.sceneTotal = total;
          this.sceneCurrentPage = 1;
          if (list.length > 0) {
            for(var i=0;i<list.length;i++){
              this.scene_list[i] = {
                id: list[i].THEME_ID,
                title: list[i].THEME_NAME,
              }
            }
          }
        })
      },
      httpCreateScene(){
        this.$http({
          method: 'post',
          url: '/aimlManage/addAimlTopic',
          params: {
            themeName: this.renameForm.name,
            repositoryId: this.repositoryValue,
            catalogId: this.treeData.id,
            // aimlContent: ,
            // source: ,
          },
          baseURL: '/',
          dataType: 'jsonp',
        }).then ((res) => {
          var data = res.data;
          console.log("createScene");
          console.log(data);
          this.httpChangeSceneList(1);
        })
      },
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },
    mounted () {
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
  .el-tree-node {
     content: '';
     display: block;
     clear: both;
  }
  .custom-tree-node-label {
    float: left;
  }
  .custom-tree-node {
    flex: 1;
    position: relative;
  }
  .custom-tree-node-button {
    position: absolute;
    right: 20px;
  }
  .el-container {
    position: relative;
  }
  .el-dialog__header, .el-dialog__body {
    text-align: left
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
  }
  .scene-title-span, .scene-theme-title-span {
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
    width: calc(100% - 5px);
  }
  .scene-theme-title, .tags-title, .entrance-title, .out-title {
    border-bottom: 1px solid #b7b7b7;
    color: #666;
  }
  .tac {
    height: 100%;
  }
  .scene-theme {
    height: 100%;
  }
  .scene-theme {
    text-align: left;
    position: relative;
  }
  .scene-theme-page {
    position: absolute;
    bottom: 20px;
  }
  .scene-theme-title-icon {
    color: #666;
    float: right;
    margin-top: 14px;
  }
  .scene-theme .el-menu-item.is-active {
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
  .scene-theme-item {
    padding-left: 20px;
    line-height: 45px;
    text-align: left;
    border-bottom: 1px solid #c1c1c1;
  }
  .scene-theme-list .active {
    background: #E9EEF3;
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
    padding-bottom: 40px;
    background-color: #fff;
    border-right: 1px solid #f2f2f2;
  }
  .entrance-page, .out-page {
    position: absolute;
    bottom: 20px;
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
    margin-top: -13px;
  }
  .script, .groove, .channel {
    height: 240px;
    margin-top: 20px;
    background-color: #fff;
    border: 1px solid #ced3d8;
  }
  .script-inner, .groove-inner {
    height: 180px;
    /*background-color: #e9eef3;*/
    margin: 0 20px 20px 20px;
    border: 1px solid #ced3d8;
  }
  .groove, .channel {
    margin-right: 20px;
  }
  .in-groove, .out-groove {
    height: 160px;
    margin: 0 10px 0;
    border: 1px solid #ced3d8;
  }
  .out-groove {
    margin-left: 0;
  }
  .in-groove-title, .out-groove-title {
    height: 30px;
    border-bottom: 1px solid #ced3d8;
    line-height: 30px;
    background: #f2f2f2
  }
  .in-groove-list, .out-groove-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
  }
  .groove .el-tag--mini {
    margin-left: 10px;
    font-size: 12px;
    margin-bottom: 10px;
  }
  .channel-list {
    display: flex;
    flex-wrap: wrap;
  }
  .channel-item {
    flex:  0 0 50%;
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
  .hide {
    display: none;
  }
/*  .groove {
    margin-top: 50px;
  }
  .groove-title {
    margin-bottom: 20px;
  }*/
</style>
