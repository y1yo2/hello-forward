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
    title="是否重命名该目录？"
    :visible.sync="renameVisible"
    width="30%"
    >
    <!-- <span class="dialog-footer">是否重命名该节点</span> -->
    <el-form :model="renameForm">
    <el-form-item label="目录名称" :label-width="formLabelWidth">
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
  <el-dialog
    title="删除确认"
    :visible.sync="deleteSceneVisible"
    width="30%"
    >
    <span class="dialog-footer">是否删除选中的主题</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="deleteSceneVisible = false">取 消</el-button>
      <el-button type="primary" @click="deleteSceneClick">确 定</el-button>
    </span>
  </el-dialog>
  <el-dialog
    title="是否重命名该主题？"
    :visible.sync="renameSceneVisible"
    width="30%">
    <el-form :model="renameSceneForm">
      <el-form-item label="主题名称" :label-width="formLabelWidth">
        <el-input v-model="renameSceneForm.name" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="renameSceneVisible = false">取 消</el-button>
      <el-button type="primary" @click="httpRenameScene">确 定</el-button>
    </span>
  </el-dialog>
  <el-dialog
    title="发布确认"
    :visible.sync="publishSceneVisible"
    width="30%">
    <span class="dialog-footer">是否发布选中的主题？</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="publishSceneVisible=false">取 消</el-button>
      <el-button type="primary" @click="publishSceneVisible=false">确 定</el-button>
    </span>
  </el-dialog>
  <el-dialog
    title="下架确认"
    :visible.sync="underSceneVisible"
    width="30%">
    <span class="dialog-footer">是否下架选中的主题？</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="underSceneVisible=false">取 消</el-button>
      <el-button type="primary" @click="underSceneVisible=false">确 定</el-button>
    </span>
  </el-dialog>
  <el-dialog
    title="是否修改该入口问题？"
    :visible.sync="renameEntranceVisible"
    width="30%">
    <el-form :model="renameQuestionForm">
      <el-form-item label="入口问题" :label-width="formLabelWidth">
        <el-input v-model="renameQuestionForm.question" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="renameEntranceVisible = false">取 消</el-button>
      <el-button type="primary" @click="renameQuestion">确 定</el-button>
    </span>
  </el-dialog>
  <el-dialog
    title="是否修改该出口问题？"
    :visible.sync="renameOutVisible"
    width="30%">
    <el-form :model="renameQuestionForm">
      <el-form-item label="出口问题" :label-width="formLabelWidth">
        <el-input v-model="renameQuestionForm.question" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="renameOutVisible = false">取 消</el-button>
      <el-button type="primary" @click="renameQuestion">确 定</el-button>
    </span>
  </el-dialog>
  <el-dialog
    title="是否在当前主题下创建一个入口问题？"
    :visible.sync="createEntranceVisible"
    width="30%">
    <el-form :model="renameQuestionForm">
    <el-form-item label="主题名称" :label-width="formLabelWidth">
      <el-input v-model="renameQuestionForm.name" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="createEntranceVisible = false">取 消</el-button>
      <el-button type="primary" @click="createQuestion">确 定</el-button>
    </span>
  </el-dialog>
    <el-dialog
    title="是否在当前主题下创建一个出口问题？"
    :visible.sync="createOutVisible"
    width="30%">
    <el-form :model="renameQuestionForm">
    <el-form-item label="主题名称" :label-width="formLabelWidth">
      <el-input v-model="renameQuestionForm.name" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="createOutVisible = false">取 消</el-button>
      <el-button type="primary" @click="createQuestion">确 定</el-button>
    </span>
  </el-dialog>
    <el-aside width="300px" class="scene-manage clearfix">
      <div class="scene-title title clearfix">
         <div class="scene-title-span"><h5>场景管理</h5></div>
         <i class="scene-title-icon el-icon-plus"></i>
      </div>
      <el-select v-model="repositoryValue" placeholder="请选择知识库" @change="handleRepositoryChange" class="select-base">
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
    <el-main class="main">
      <el-row>
        <el-col :span="24" class="global-search">
          <el-input
            size="medium"
            placeholder="请输入内容"
            suffix-icon="el-icon-search"
            v-model="global_search">
          </el-input>
          <el-dropdown>
          <span class="el-dropdown-link">
            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
      <el-row class="main-inner">
        <el-col :span="5" class="scene-theme-wrapper">
          <div class="scene-theme">
            <div class="scene-theme-title title clearfix">
              <div class="scene-theme-title-span"><h5>场景主题列表</h5></div>
              <div class="scene-theme-title-icon">
                <i class="el-icon-upload2" @click="publishSceneVisible = true"></i>
                <i class="el-icon-download" @click="underSceneVisible = true"></i>
                <i class="el-icon-plus" @click="createSceneVisible = true"></i>
                <i class="el-icon-delete" @click="deleteSceneVisible = true"></i>
              </div>
            </div>
            <div class="scene-theme-list">
              <el-checkbox-group v-model="checkedScenes" @change="">
                <el-checkbox class="scene-theme-item" v-for="item in scene_list" :label="item.id" :key="item.id">
                  <span @click.prevent="sceneClick(item)">{{item.title}}</span>
                  <i class="el-icon-edit-outline" size="mini" @click.prevent="renameSceneClick(item)"></i>
                </el-checkbox>
              </el-checkbox-group>
            </div>
            <el-pagination
              class="scene-theme-page"
              small
              layout="prev, pager, next"
              @current-change="handleSceneCurrentChange"
              :current-page.sync="sceneCurrentPage"
              :total="sceneTotal">
            </el-pagination>
          </div>
        </el-col>
        <el-col :span="10" class="questions">
          <div class="questions-inner">
            <el-button class="el-button-plus" type="primary" icon="el-icon-plus"
            @click.native="createQuestionClick">
            新增</el-button>
            <el-tabs v-model="activeQuestions" @tab-click="questionTag">
              <el-tab-pane label="入口问题" name="first">
                <div class="entrance-list">
                  <el-checkbox-group v-model="checkedEntrances" @change="entranceChange">
                    <el-checkbox v-for="item in entrance_list" :label="item.id" :key="item.id">
                      {{item.title}}<i class="el-icon-edit-outline" size="mini" @click.prevent="renameQuestionClick(item)"></i>
                    </el-checkbox>
                  </el-checkbox-group>
                  <el-pagination
                    small
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="10"
                    layout="prev, pager, next"
                    :total="entranceTotal"
                    :current-page.sync="entranceCurrentPage"
                    class="entrance-page">
                  </el-pagination>
                </div>
              </el-tab-pane>
              <el-tab-pane label="出口问题" name="second">
                <div class="out-list">
                  <el-checkbox-group v-model="checkedOut" @change="outChange">
                    <el-checkbox v-for="item in out_list" :label="item.id" :key="item.id">
                      {{item.title}}<i class="el-icon-edit-outline" size="mini" @click.prevent="renameQuestionClick(item)"></i>
                    </el-checkbox>
                  </el-checkbox-group>
                  <el-pagination
                    small
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="10"
                    layout="prev, pager, next"
                    :total="outTotal"
                    :current-page.sync="outCurrentPage"
                    class="out-page">
                  </el-pagination>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="groove">
            <div class="edit">编辑</div>
            <h5 class="groove-title">槽点</h5>
            <div class="groove-inner">
              <el-tabs v-model="activeGroove" @tab-click="grooveTag">
                <el-tab-pane label="入口问题" name="checkedEntrenace">
                  <div class="list">
                    <div class="item" v-for="(item, index) in entrance_grooves"
                    :class="{'active':entranceGroovesIndex==index}" @click="entranceGroovesIndex=index">
                    {{item.title}}</div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="出口问题" name="checkedOut">
                  <div class="list">
                    <div class="item" v-for="(item, index) in out_grooves"
                    :class="{'active':outGroovesIndex==index}" @click="outGroovesIndex=index">
                    {{item.title}}</div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="script">
            <h5 class="title">脚本</h5>
            <!-- <div class="script-inner"></div> -->
            <el-input
              class="script-inner"
              type="textarea"
              placeholder="脚本内容显示区域"
              disabled
              v-model="script_text">
            </el-input>
          </div>
          <div class="channel">
            <div class="edit">编辑</div>
            <h5 class="channel-title">渠道</h5>
            <div class="channel-list">
              <el-checkbox-group v-model="checkedChannel">
                <el-checkbox v-for="channel in channels" :label="channel" :key="channel">{{channel}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script type="text/ecmascript-6">
  import qs from 'qs'
  export default {
    name: "index",
    data () {
      return {
        script_text: '',
        global_search: '',
        activeQuestions: 'first',
        activeGroove: 'checkedEntrenace',
        deleteVisible: false,
        createVisible: false,
        renameVisible: false,
        createSceneVisible: false,
        deleteSceneVisible: false,
        renameSceneVisible: false,
        publishSceneVisible: false,
        underSceneVisible: false,
        renameEntranceVisible: false,
        renameOutVisible: false,
        createEntranceVisible: false,
        createOutVisible: false,
        renameForm: {
          name: '',
          id: '',
        },
        renameSceneForm: {
          name: '',
          id: '',
        },
        renameQuestionForm: {
          question: '',
          id: '',
        },
        formLabelWidth: '120px',
        sceneTotal: 50,  //默认总条目数
        sceneCurrentPage: 1, //默认当前页面
        entranceTotal: 50,
        entranceCurrentPage: 1,
        outTotal: 50,
        outCurrentPage: 1,
        repositoryOptions: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        scene_id: 1,
        repositoryValue: '',//当前知识库
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
        scene_list: [{
          id: 1,
          title: '默认场景1',
          theme_content: '脚本内容',
        },
        {
          id: 2,
          title: '默认场景2',
          theme_content: '脚本内容',
        },
        {
          id: 3,
          title: '默认场景3',
          theme_content: '脚本内容',
        }],
        checkedScene: {id: '', title: '',},//当前主题
        checkedScenes: [],
        entrance_list: [ // 入口问题
          {
          id: 1,
          title: '默认入口问题1'
        },
        {
          id: 2,
          title: '默认入口问题2'
        },
        {
          id: 3,
          title: '默认入口问题3'
        }],
        checkAll: false,
        checkedEntrances: [],
        isIndeterminate: true,
        checkedOut: [],
        out_list: [ // 出口问题
          {
          id: 1,
          title: '默认出口问题1'
        },
        {
          id: 2,
          title: '默认出口问题2'
        },
        {
          id: 3,
          title: '默认出口问题3'
        }],
        //出入口槽点
        entrance_grooves: [
         {
          id: 1,
          title: '默认入口槽点1'
        },
        {
          id: 2,
          title: '默认入口槽点2'
        },
        {
          id: 3,
          title: '默认入口槽点3'
        }],
        out_grooves: [{
          id: 1,
          title: '默认出口槽点1'
        },
        {
          id: 2,
          title: '默认出口槽点2'
        },
        {
          id: 3,
          title: '默认出口槽点3'
        }],
        entranceGroovesIndex: 0,
        outGroovesIndex: 0,
        //脚本
        script_text: '',
        //渠道
        channels: [
          '网站', 'APP', '短信', '微信', '微博', 'QQ'
        ],
        checkedChannel: []
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
      //场景列涉及的函数
      deleteSceneClick(){
        this.httpDeleteScene();
      },
      renameSceneClick(item){
        this.renameSceneForm.id = item.id;
        this.renameSceneForm.name = item.title;
        this.renameSceneVisible = true;
      },
      sceneClick(item){
        this.checkedScene.id = item.id;
        this.checkedScene.title = item.title;
        this.script_text = item.theme_content;
        this.httpGetSceneDetails(item.id);
      },
      handleSceneCurrentChange(val){
        this.httpChangeSceneList(val);
      },
      changeScene (id) { // 切换场景
        this.scene_id = id
      },
      //出入口问题列表涉及的函数
      renameQuestionClick(item){
        this.renameQuestionForm.id = item.id;
        this.renameQuestionForm.question = item.title;
        if(this.activeQuestions === 'first'){
          this.renameEntranceVisible = true;
        }else{
          this.renameOutVisible = true;
        }
      },
      renameQuestion(){
        this.renameEntranceVisible = false;
        this.renameOutVisible = false;
        this.httpUpdateStandardQuestion(this.checkedScene.id, this.renameQuestionForm.id, this.renameQuestionForm.question);
      },
      createQuestionClick(){
        console.log("????????");
        alert('?????');
        this.renameQuestionForm.id = '';
        if(this.activeQuestions === 'first'){
          this.renameQuestionForm.question = '请输入入口问题';
          this.createEntranceVisible = true;
        }else{
          this.renameQuestionForm.question = '请输入出口问题';
          this.createOutVisible = true;
        }
      },
      createQuestion(){
        var type = '';
        if(this.activeQuestions === 'first'){
          type = 'entry';
        }else{
          type = 'end';
        }
        this.httpAddStandardQuestion(this.checkedScene.id, type, this.renameQuestionForm.question);
      },
      entranceChange () {
        console.log(this.checkedEntrances)
      },
      outChange () {
        console.log(this.checkedOut)
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      handleSizeChange(val) { // 切换每页条数的回调函数
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) { // // 选择某页的回调函数
        console.log(`当前页: ${val}`);
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
      questionTag(tab, event) {
        console.log(tab, event);
      },
      grooveTag (tab, event) {
        console.log(tab, event);
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
        this.$http({
          method: 'get',
          url: '/aimlManage/showQaTreeByQepoIdAsync',
          params: {repoId: this.repositoryValue},
          baseURL: '/',
          dataType: 'jsonp',
        }).then ((res) => {
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
          this.sceneCurrentPage = rows;
          if (list.length > 0) {
            for(var i=0;i<list.length;i++){
              this.scene_list[i] = {
                id: list[i].THEME_ID,
                title: list[i].THEME_NAME,
                theme_content: list[i].THEME_CONTENT,
              }
            }
          }
        })
      },
      httpCreateScene(){
        this.createSceneVisible=false;
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
          this.httpChangeSceneList(this.sceneCurrentPage);
        })
      },
      httpDeleteScene(){
        this.deleteSceneVisible=false;
        this.$http({
          method: 'post',
          url: '/aimlManage/deleteAimlTopic',
          params: {
            themeIds: JSON.stringify(this.checkedScenes),
          },
          baseURL: '/',
          dataType: 'jsonp',
        }).then ((res) => {
          var data = res.data;
          console.log("deleteScene");
          console.log(data);
          this.httpChangeSceneList(1);
        })
      },
      httpRenameScene(){
        this.renameSceneVisible=false;
        this.$http({
          method: 'post',
          url: '/aimlManage/updateAimlThemeName',
          params: {
            themeId: this.renameSceneForm.id,
            themeName: this.renameSceneForm.name,
          },
          baseURL: '/',
          dataType: 'jsonp',
        }).then ((res) => {
          var data = res.data;
          console.log("renameScene");
          console.log(data);
          this.httpChangeSceneList(this.sceneCurrentPage);
        })
      },
      httpPublishScene(){
        this.publishSceneVisible=false;
        this.$http({
          method: 'post',
          url: '/aimlManage/publishAimlTopic',
          params: {
            themeIds: JSON.stringify(this.checkedScenes),
          },
          baseURL: '/',
          dataType: 'jsonp',
        }).then ((res) => {
          var data = res.data;
          console.log("publishScene");
          console.log(data);
          // this.httpChangeSceneList(1);
        })
      },
      httpUnderScene(){
        this.underSceneVisible=false;
        this.$http({
          method: 'post',
          url: '/aimlManage/underCarriageAimlTopic',
          params: {
            themeIds: JSON.stringify(this.checkedScenes),
          },
          baseURL: '/',
          dataType: 'jsonp',
        }).then ((res) => {
          var data = res.data;
          console.log("underScene");
          console.log(data);
          // this.httpChangeSceneList(1);
        })
      },
      httpGetSceneDetails(themeId){
        this.$http({
          method: 'get',
          url: '/aimlManage/getQuestionAndKeyWordAndChannel',
          params: {
            themeId: themeId,
          },
          baseURL: '/',
          dataType: 'jsonp',
        }).then ((res) => {
          var data = res.data;
          console.log("sceneDetail");
          console.log(data);
          //修改出入口问题列表
          this.outTotal = data.end_question_list_total;
          this.entranceTotal = data.entry_question_list_total;
          this.outCurrentPage = 1;
          this.entranceCurrentPage = 1;

          this.entrance_list = new Array();
          this.out_list = new Array();
          let eq_list = data.entry_question_list;
          let oq_list = data.end_question_list;
          if (eq_list.length > 0) {
            for(var i=0;i<eq_list.length;i++){
              this.entrance_list[i] = {};
              this.entrance_list[i].id = eq_list[i].QUESTION_ID;
              this.entrance_list[i].title = eq_list[i].QUESTION;
            }
          }

          if (oq_list.length > 0) {
            for(var i=0;i<oq_list.length;i++){
              this.out_list[i] = {};
              this.out_list[i].id = oq_list[i].QUESTION_ID;
              this.out_list[i].title = oq_list[i].QUESTION;
            }
          }

          //修改槽点
          this.entrance_grooves = new Array();
          this.out_grooves = new Array();
          let eg_list = data.key_word_list_entry;
          let og_list = data.key_word_list_end;
          if (eg_list.length > 0) {
            for(var i=0;i<eg_list.length;i++){
              this.entrance_grooves[i] = {};
              this.entrance_grooves[i].id = eg_list[i].KEYWORD_ID;
              this.entrance_grooves[i].title = eg_list[i].KEYWORD;
            }
          }

          if (og_list.length > 0) {
            for(var i=0;i<og_list.length;i++){
              this.out_grooves[i] = {};
              this.out_grooves[i].id = og_list[i].KEYWORD_ID;
              this.out_grooves[i].title = og_list[i].KEYWORD;
            }
          }

          // data.key_word_list_entry.KEYWORD_ID
          // data.key_word_list_end.KEYWORD

          // data.channel_list.CHANNEL_ID
          //                  .CHANNEL_CODE
          //                  .SHOW
          //                  .CHANNEL_NAME

          // this.httpChangeSceneList(1);
        })
      },
      httpGetQuestions(themeId, type, rows){
        this.$http({
          method: 'get',
          url: '/aimlManage/getStandardQuestion',
          params: {
            themeId: themeId,
            type: type, // end为出口问题  entry为入口问题
            rows: rows,
            pageSize: 10,
          },
          baseURL: '/',
          dataType: 'jsonp',
        }).then ((res) => {
          var data = res.data;
          console.log("questions");
          console.log(data);

        })
      },
      httpGetKeyWordList(themeId, type){
        this.$http({
          method: 'get',
          url: '/aimlManage/getKeyWordList',
          params: {
            themeId: themeId,
            type: type,
            // rows: rows,
            // pageSize: 10,
          },
          baseURL: '/',
          dataType: 'jsonp',
        }).then ((res) => {
          var data = res.data;
          console.log("keyWordList");
          console.log(data);

        })
      },
      httpAddStandardQuestion(themeId, type, question){
        this.$http({
          method: 'post',
          url: '/aimlManage/addStandardQuestion',
          params: {
            themeId: themeId,
            type: type, // end为出口问题  entry为入口问题
            question: question,
          },
          baseURL: '/',
          dataType: 'jsonp',
        }).then ((res) => {
          var data = res.data;
          console.log("addStandardQuestion");
          console.log(data);
          if (type === 'entry') {
            this.httpGetQuestions(themeId, type, this.entranceCurrentPage);
          }else{
            this.httpGetQuestions(themeId, type, this.outCurrentPage);
          }
        })
      },
      httpUpdateStandardQuestion(themeId, questionId, question){
        this.$http({
          method: 'post',
          url: '/aimlManage/updateStandardQuestion',
          params: {
            themeId: themeId,
            questionId: questionId,
            question: question,
          },
          baseURL: '/',
          dataType: 'jsonp',
        }).then ((res) => {
          var data = res.data;
          console.log("updateStandardQuestion");
          console.log(data);
          this.httpGetQuestions(themeId, 'entry', this.entranceCurrentPage);
          this.httpGetQuestions(themeId, 'end', this.outCurrentPage);
        })
      },
      httpDeleteQuestion(questionId){
        this.$http({
          method: 'post',
          url: '/aimlManage/deleteQuestion',
          params: {
            questionId: questionId,
          },
          baseURL: '/',
          dataType: 'jsonp',
        }).then ((res) => {
          var data = res.data;
          console.log("deleteQuestion");
          console.log(data);
          this.httpGetQuestions(themeId, 'entry', 1);
          this.httpGetQuestions(themeId, 'end', 1);
        })
      },
      httpAddKeyWord(themeId, keyword){
        this.$http({
          method: 'post',
          url: '/aimlManage/addKeyWord',
          params: {
            themeId: themeId,
            keyword: keyword,
          },
          baseURL: '/',
          dataType: 'jsonp',
        }).then ((res) => {
          var data = res.data;
          console.log("addKeyWord");
          console.log(data);

        })
      },
      httpDeleteKeyWord(keywordId){
        this.$http({
          method: 'post',
          url: '/aimlManage/deleteKeyWord',
          params: {
            keywordId: keywordId,
          },
          baseURL: '/',
          dataType: 'jsonp',
        }).then ((res) => {
          var data = res.data;
          console.log("deleteKeyWord");
          console.log(data);

        })
      },
      httpUpdateKeyWord(themeId, keywordId, keyword){
        this.$http({
          method: 'post',
          url: '/aimlManage/updateKeyWord',
          params: {
            themeId: themeId,
            keywordId: keywordId,
            keyword: keyword,
          },
          baseURL: '/',
          dataType: 'jsonp',
        }).then ((res) => {
          var data = res.data;
          console.log("updateKeyWord");
          console.log(data);

        })
      },
      httpUpdateApplyChannel(themeId, applyChannel){
        this.$http({
          method: 'post',
          url: '/aimlManage/updateApplyChannel',
          params: {
            themeId: themeId,
            applyChannel: applyChannel,
          },
          baseURL: '/',
          dataType: 'jsonp',
        }).then ((res) => {
          var data = res.data;
          console.log("updateApplyChannel");
          console.log(data);

        })
      },
      httpUpdateAimlContent(themeId, aimlContent){
        this.$http({
          method: 'post',
          url: '/aimlManage/updateAimlContent',
          params: {
            themeId: themeId,
            aimlContent: aimlContent,
          },
          baseURL: '/',
          dataType: 'jsonp',
        }).then ((res) => {
          var data = res.data;
          console.log("updateAimlContent");
          console.log(data);

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

<style lang="less">
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
  .custom-tree-node-button .el-icon-edit-outline, .custom-tree-node-button .el-icon-delete {
    margin-left: 5px;
  }
  .el-container {
    position: relative;
  }
  .el-dialog__header, .el-dialog__body {
    text-align: left;
  }
  .el-icon-plus:hover, .el-icon-upload2:hover, .el-icon-delete:hover, .el-icon-download:hover,
  .el-icon-edit-outline:hover
  {
    color: #409EFF;
    cursor: pointer;
  }
  .main {
    height: 100%;
    padding: 0;
    background-color: #E4E7EB;
    color: #333;
    text-align: center;
    .el-checkbox+.el-checkbox{
      margin-left: 0;
    }
    .global-search {
      height: 64px;
      margin-bottom: 16px;
      padding-top: 15px;
      background-color: #fff;
      .el-input {
        width: 364px;
        margin-right: 16px;
      }
    }
    .main-inner {
      padding-left: 16px;
      padding-right: 16px;
      .scene-theme-wrapper {
        padding-right: 16px;
        .scene-theme {
          height: 983px;
          background-color: #fff;
          text-align: left;
          position: relative;
          border: 1px solid #cdd0d4;
          .scene-theme-title {
            margin-left: 0;
            margin-right: 0;
            padding-left: 16px;
            padding-right: 16px;
            height: 64px;
            border-bottom: 1px solid #cdd0d4;
            color: #666;
          }
          .scene-theme-title-span {
            float: left;
          }
          .scene-theme-title-icon {
            text-align: center;
            border-bottom: 21px;
            color: #666;
            float: right;
          }
          .scene-theme-list {
            .scene-theme-item {
              position: relative;
              width: calc(~"100% - 16px");
              padding-left: 16px;
              line-height: 45px;
              text-align: left;
              border-bottom: 1px solid #cdd0d4;
              .el-icon-edit-outline {
                position: absolute;
                top: 16px;
                right: 16px;
              }
              &.is-checked {
                background-color: #e4e7eb;
              }
            }
          }
          .scene-theme-page {
            position: absolute;
            bottom: 16px;
          }
        }
      }
      .questions {
        padding-right: 16px;
        .el-tabs__header {
          height: 527px;
          height: 64px;
          margin: 0;
          padding-left: 16px;
          .el-tabs__nav-wrap {
            height: 66px;
          }
        }
        .el-tabs__item {
          height: 64px;
          line-height: 64px;
        }
        .questions-inner {
          position: relative;
          border: 1px solid #cdd0d4;
          background-color: #fff;
          .el-button-plus {
            position: absolute;
            right: 16px;
            width: 80px;
            height: 35px;
            line-height: 35px;
            padding: 0;
            margin-top: 14px;
            text-align: center;
            background-color: #4E86EC;
            border-color: #4E86EC;
            z-index: 999;
          }
          .entrance-list {
            position: relative;
            height: 463px;
            text-align: left;
            padding-left: 16px;
            padding-right: 16px;
            line-height: 43px;
            .el-checkbox {
              width: 100%;
              line-height: 45px;
              border-bottom: 1px solid #E4E7EB;
            }
            .entrance-page {
              position: absolute;
              bottom: 0;
            }
            .el-icon-edit-outline {
                position: absolute;
                top: 16px;
                right: 16px;
              }
          }
          .out-list {
            position: relative;
            height: 463px;
            text-align: left;
            padding-left: 16px;
            padding-right: 16px;
            line-height: 43px;
            .el-checkbox {
              width: 100%;
              line-height: 45px;
              border-bottom: 1px solid #E4E7EB;
            }
            .out-page {
              position: absolute;
              bottom: 0;
            }
            .el-icon-edit-outline {
                position: absolute;
                top: 16px;
                right: 16px;
              }
          }
        }
        .groove {
          position: relative;
          margin-top: 16px;
          padding: 0 16px 16px;
          text-align: left;
          background-color: #fff;
          border: 1px solid #cdd0d4;
          .edit {
            position: absolute;
            right: 18px;
            font-size: 14px;
            line-height: 55px;
            color: #6294EF;
          }
          .groove-title {
            line-height: 55px;
          }
          .groove-inner {
            height: 366px;
            border: 1px solid #cdd0d4;
            .el-tab-pane {
              padding: 0 16px;
              font-size: 14px;
              .list {
                .item {
                  line-height: 45px;
                  border-bottom: 1px solid #E4E7EB;
                  &.active {
                    color: #409EFF
                  }
                }
                .item:hover {
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
      .script {
        margin-top: 0;
        background-color: #fff;
        border: 1px solid #cdd0d4;
        .script-inner {
          height: 446px;
          margin: 0 16px 16px;
          border: 1px solid #cdd0d4;
          &.el-textarea {
            width: calc(~"100% - 32px");
            .el-textarea__inner {
              border: none;
              height: 446px;
              resize:none;
            }
          }
        }
      }
      .channel {
        position: relative;
        height: 440px;
        margin-top: 16px;
        padding-left: 16px;
        padding-right: 16px;
        background-color: #fff;
        border: 1px solid #cdd0d4;
        text-align: left;
        .edit {
          position: absolute;
          right: 18px;
          font-size: 14px;
          line-height: 55px;
          color: #6294EF;
        }
        .channel-title  {
          line-height: 55px;
          border-bottom: 1px solid #cdd0d4;
        }
        .channel-list {
          margin-top: 16px;
          .el-checkbox{
            margin-right: 30px;
            line-height: 30px;
          }
        }
      }
    }
  }
  .scene-manage {
    background-color: #1A273C;
    color: #333;
    text-align: center;
  }
  .title {
    margin-left: 16px;
    margin-right: 16px;
    text-align: left;
    line-height: 62px;
  }
  .scene-title {
    border-bottom: 1px solid #fff;
    color: #fff;
  }
  .scene-title-span {
    float: left;
  }
  .scene-title-icon {
    color: #ddd;
    float: right;
    margin-top: 24px;
  }
  .el-input {
    /*margin-top: 10px;*/
    margin-bottom: 10px;
    width: 90%;
    text-align: left;
  }
  .el-tree {
    background-color: rgb(21,28,46);
    color: rgb(115,122,143);
  }
  .el-tree-node:focus>.el-tree-node__content {
    padding-left: 15px;
    background-color: rgb(21,28,46);
    color: #fff;
  }
  .select-base {
    width: 253px;
    height: 41px;
    margin-top: 17px;
    margin-bottom: 17px;
    background-color: #1A273C;
  }
  .select-base .el-input {
    width: 100%;
    margin: 0;
  }
  .el-select .el-input.is-focus .el-input__inner:focus, .el-select .el-input.is-focus .el-input__inner {
    border-color: #1a273c;
  }
  .select-base .el-input--suffix .el-input__inner {
    color: #fff;
    background-color: #374254;
    border: none;
  }
  .el-pagination--small {
    margin-top: 10px;
  }
  .el-pagination__sizes{
    margin-top: -13px;
  }
</style>
