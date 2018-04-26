<template>
  <el-container>
  <el-dialog
    title="测试脚本"
    :visible.sync="testScriptVisible"
    width="80%"
    height="80%">
    <textarea readonly class="test-script-show-div">{{testScriptText}}</textarea>
    <el-form :model="testScriptForm">
    <el-form-item label="请输入：" :label-width="formLabelWidth">
      <el-input v-model="testScriptForm.title" auto-complete="off" @keyup.enter.native="testScriptSendClick"></el-input>
      <el-input v-model="testScriptForm.id" auto-complete="off" disabled></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="testScriptVisible = false">取 消</el-button>
      <el-button type="primary" @click="testScriptSendClick" >发送</el-button>
    </span>
  </el-dialog>
  <el-dialog
    :title="progressTitle"
    :visible.sync="progressPublishVisible"
    width="30%">
    <!-- <span class="dialog-footer">是否删除该节点</span> -->
    <el-progress class="dialog-footer" type="circle"
    :percentage="percentage" :status="progressStatus">
    </el-progress>
    <div class="progressContent"><span class="dialog-footer">{{progressContent}}</span></div>
    <span slot="footer" class="dialog-footer">
      <!-- <el-button @click="progressPublishVisible = false">取 消</el-button> -->
      <el-button type="primary" @click="progressPublishVisible = false" :loading="progressButtonLoading">{{progressButtonText}}</el-button>
    </span>
  </el-dialog>
  <el-dialog
    title="删除确认"
    :visible.sync="deleteVisible"
    width="30%">
    <span class="dialog-footer">是否删除该目录</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="deleteVisible = false">取 消</el-button>
      <el-button type="primary" @click="removeForButton">确 定</el-button>
    </span>
  </el-dialog>
  <el-dialog
    title="新增确认"
    :visible.sync="createVisible"
    width="30%">
    <span class="dialog-footer">是否新增一个目录</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="createVisible = false">取 消</el-button>
      <el-button type="primary" @click="appendForButton">确 定</el-button>
    </span>
  </el-dialog>
  <el-dialog
    title="是否重命名该目录？"
    :visible.sync="renameVisible"
    width="30%">
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
      <el-button type="primary" @click="httpPublishScene">确 定</el-button>
    </span>
  </el-dialog>
  <el-dialog
    title="下架确认"
    :visible.sync="underSceneVisible"
    width="30%">
    <span class="dialog-footer">是否下架选中的主题？</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="underSceneVisible=false">取 消</el-button>
      <el-button type="primary" @click="httpUnderScene">确 定</el-button>
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
      <el-input v-model="renameQuestionForm.question" auto-complete="off"
      placeholder="请输入入口问题"></el-input>
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
      <el-input v-model="renameQuestionForm.question" auto-complete="off"
      placeholder="请输入入口问题"></el-input>
    </el-form-item>
  </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="createOutVisible = false">取 消</el-button>
      <el-button type="primary" @click="createQuestion">确 定</el-button>
    </span>
  </el-dialog>
  <el-dialog
    title="是否删除该问题？"
    :visible.sync="deleteEntranceVisible"
    width="30%">
    <el-form :model="renameQuestionForm">
      <el-form-item label="问题内容" :label-width="formLabelWidth">
        <el-input v-model="renameQuestionForm.question" auto-complete="off" :disabled="true"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="deleteEntranceVisible = false">取 消</el-button>
      <el-button type="primary" @click="deleteQuestion">确 定</el-button>
    </span>
  </el-dialog>
  <el-dialog
    title="是否修改该槽点？"
    :visible.sync="updateGrooveVisible"
    width="30%">
    <el-form :model="renameGrooveForm">
    <el-form-item label="槽点内容" :label-width="formLabelWidth">
      <el-input v-model="renameGrooveForm.title" auto-complete="off"
      placeholder="请输入入口问题"></el-input>
    </el-form-item>
  </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="updateGrooveVisible = false">取 消</el-button>
      <el-button type="primary" @click="updateGroove">确 定</el-button>
    </span>
  </el-dialog>
  <el-dialog
    title="是否删除该槽点？"
    :visible.sync="deleteGrooveVisible"
    width="30%">
    <el-form :model="renameGrooveForm">
      <el-form-item label="槽点内容" :label-width="formLabelWidth">
        <el-input v-model="renameGrooveForm.title" auto-complete="off" :disabled="true"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="deleteGrooveVisible = false">取 消</el-button>
      <el-button type="primary" @click="deleteGroove">确 定</el-button>
    </span>
  </el-dialog>
  <el-dialog
    title="是否创建一个槽点？"
    :visible.sync="createGrooveVisible"
    width="30%">
    <el-form :model="renameQuestionForm">
    <el-form-item label="槽点内容" :label-width="formLabelWidth">
      <el-input v-model="renameQuestionForm.question" auto-complete="off"
      placeholder="请输入槽点内容"></el-input>
    </el-form-item>
  </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="createGrooveVisible = false">取 消</el-button>
      <el-button type="primary" @click="createGrovve">确 定</el-button>
    </span>
  </el-dialog>
    <el-aside width="240px" class="scene-manage clearfix">
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
                <el-checkbox :indeterminate="isIndeterminate" v-model="sceneCheckAll" @change="checkAllSceneChange"></el-checkbox>
                <i class="el-icon-upload2" @click="publishSceneVisible = true"></i>
                <i class="el-icon-download" @click="underSceneVisible = true"></i>
                <i class="el-icon-plus" @click="createSceneVisible = true"></i>
                <i class="el-icon-delete" @click="deleteSceneVisible = true"></i>
              </div>
            </div>
            <div class="scene-theme-list">
              <el-checkbox-group v-model="checkedScenes" @change="CheckedSceneChange">
                <el-checkbox class="scene-theme-item" v-for="item in scene_list" :label="item.id" :key="item.id">
                  <el-tag size="mini" :class="{'el-tag': item.status == 1, 'el-tag--success':item.status == 2, 'el-tag--info': item.status == 3, 'el-tag--warning': item.status == 4}">{{item.status|sceneStatusFilter}}</el-tag>
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
                      {{item.title}}
                      <i class="el-icon-edit-outline" size="mini" @click.prevent="renameQuestionClick(item)"></i>
                      <i class="el-icon-delete" size="mini" @click.prevent="deleteQuestionClick(item)"></i>
                    </el-checkbox>
                  </el-checkbox-group>
                  <el-pagination
                    small
                    @size-change="handleSizeChange"
                    @current-change="handleEntranceCurrentChange"
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
                      {{item.title}}
                      <i class="el-icon-edit-outline" size="mini" @click.prevent="renameQuestionClick(item)"></i>
                      <i class="el-icon-delete" size="mini" @click.prevent="deleteQuestionClick(item)"></i>
                    </el-checkbox>
                  </el-checkbox-group>
                  <el-pagination
                    small
                    @size-change="handleSizeChange"
                    @current-change="handleOutCurrentChange"
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
            <div class="edit">
            <!-- <div class="edit" @click="updateGrooveClick"> -->
                <i class="el-icon-edit-outline" @click="updateGrooveClick"></i>
                <i class="el-icon-plus" @click="createGrooveClick"></i>
                <i class="el-icon-delete" @click="deleteGrooveClick"></i>
              </div>
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
          <div class="script clearfix">
            <h5 class="title floatLeft">脚本</h5>
            <el-button class="el-button-plus" type="primary" icon="el-icon-plus"
            @click.native="handleTestScriptClick">
            测试</el-button>
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
            <div class="edit" @click="updateChannel">{{channelUpdateText}}</div>
            <h5 class="channel-title">渠道</h5>
            <div class="channel-list">
              <el-checkbox-group v-model="checkedChannel">
                <el-checkbox v-for="channel in channels" :label="channel.name" :key="channel.name"
                :disabled="channelUpdateDisabledFlag">
                {{channel.name}}</el-checkbox>
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
        updateGrooveVisible: false,
        deleteGrooveVisible: false,
        createGrooveVisible: false,
        progressPublishVisible: false,
        deleteEntranceVisible: false,
        sceneCheckAll: false,
        isIndeterminate: true,
        percentage: 0,
        progressTitle: '正在发布主题',
        progressContent: '正在发布，请稍后',
        progressButtonText: '发布中',
        progressButtonLoading: true,
        progressStatus: '',
        testScriptVisible: false,
        testScriptText: '显示内容 \n 123123',
        testScriptForm: {
          title: '',
          id: '',
        },
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
        renameGrooveForm: {
          title: '',
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
          status: 1, //1,编辑中；2，正式；3，下架；4，正式编辑中
        },
        {
          id: 2,
          title: '默认场景2',
          theme_content: '脚本内容',
          status: 2,
        },
        {
          id: 3,
          title: '默认场景3',
          theme_content: '脚本内容',
          status: 3,
        },
        {
          id: 4,
          title: '默认场景4',
          theme_content: '脚本内容',
          status: 4,
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
        isIndeterminate: false,
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
        groovesUpdateText: '编辑',
        groovesUpdateFlag: true,
        //脚本
        script_text: '',
        //渠道
        channels: [
          {
            id: 1,
            code: "网络",
            name: "网络",
          },
        ],
        checkedChannel: [],
        channelUpdateText: '编辑',
        channelUpdateDisabledFlag:true,
      }
    },
    methods: {
      handleRepositoryChange () {
        this.$refs.tree2.root.childNodes[0].childNodes = new Array();
        this.$refs.tree2.root.childNodes[0].loaded = false;
        this.$refs.tree2.root.childNodes[0].expanded = false;
        this.$refs.tree2.root.childNodes[0].isLeafByUser = false;
        this.httpGetChannels();
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
      updateSceneDetail (id) { // 切换场景
        this.entrance_list = new Array();
        this.out_list = new Array();
        this.entrance_grooves = new Array();
        this.out_grooves = new Array();
        this.script_text = '';
        this.checkedChannel = new Array();
        if (id !== null) {
          this.httpGetSceneDetails(id);
        }
      },
      checkAllSceneChange (val) {
        // console.log(val)
        if (val && this.isIndeterminate == false) {
          this.scene_list.forEach((arr) => {
            this.checkedScenes.push(arr.id)
          })
        } else {
          this.checkedScenes = []
          this.sceneCheckAll = false;
        }
        this.isIndeterminate = false;
      },
      CheckedSceneChange (value) {
        // console.log(this.checkedScenes)
        let checkedCount = value.length;
        this.sceneCheckAll = checkedCount === this.scene_list.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.scene_list.length;
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
        this.renameQuestionForm.id = '';
        if(this.activeQuestions === 'first'){
          this.renameQuestionForm.question = '';
          this.createEntranceVisible = true;
        }else{
          this.renameQuestionForm.question = '';
          this.createOutVisible = true;
        }
      },
      createQuestion(){
        var type = '';
        if(this.activeQuestions === 'first'){
          type = 'entry';
          this.createEntranceVisible = false;
        }else{
          type = 'end';
          this.createOutVisible = false;
        }
        this.httpAddStandardQuestion(this.checkedScene.id, type, this.renameQuestionForm.question);
      },
      deleteQuestionClick(item){
        this.renameQuestionForm.id = item.id;
        this.renameQuestionForm.question = item.title;
        this.deleteEntranceVisible = true;
      },
      deleteQuestion(){
        this.deleteEntranceVisible = false;
        this.httpDeleteQuestion(this.renameQuestionForm.id);
      },
      entranceChange () {
        console.log(this.checkedEntrances)
      },
      outChange () {
        console.log(this.checkedOut)
      },
      handleSizeChange(val) { // 切换每页条数的回调函数
        console.log(`每页 ${val} 条`);
      },
      handleEntranceCurrentChange(val){
        this.httpGetQuestions(this.checkedScene.id, 'entry', val);
      },
      handleOutCurrentChange(val){
        this.httpGetQuestions(this.checkedScene.id, 'end', val);
      },
      updateGrooveClick(){
        if (this.activeGroove === 'checkedEntrenace') {
          let groove = this.entrance_grooves[this.entranceGroovesIndex];
          this.renameGrooveForm.id = groove.id;
          this.renameGrooveForm.title = groove.title;
        }else{
          let groove = this.out_grooves[this.outGroovesIndex];
          this.renameGrooveForm.id = groove.id;
          this.renameGrooveForm.title = groove.title;
        }
        this.updateGrooveVisible = true;
      },
      updateGroove(){
        this.updateGrooveVisible = false;
        this.httpUpdateKeyWord(this.checkedScene.id, this.renameGrooveForm.id, this.renameGrooveForm.title);
      },
      createGrooveClick(){
        this.createGrooveVisible = true;
      },
      createGrovve(){
        this.createGrooveVisible = false;
        var type='';
        if (this.activeGroove === 'checkedEntrenace') {
          type='entry';
        }else{
          type='end';
        }
        this.httpAddKeyWord(this.checkedScene.id, this.renameGrooveForm.title, type)
      },
      deleteGrooveClick(){
        if (this.activeGroove === 'checkedEntrenace') {
          let groove = this.entrance_grooves[this.entranceGroovesIndex];
          this.renameGrooveForm.id = groove.id;
          this.renameGrooveForm.title = groove.title;
        }else{
          let groove = this.out_grooves[this.outGroovesIndex];
          this.renameGrooveForm.id = groove.id;
          this.renameGrooveForm.title = groove.title;
        }
        this.deleteGrooveVisible = true;
      },
      deleteGroove(){
        this.deleteGrooveVisible = false;
        this.httpDeleteKeyWord(this.renameGrooveForm.id);
      },
      //脚本测试
      handleTestScriptClick(){
        this.testScriptVisible=true;
        this.testScriptForm.title='';
        this.testScriptText='';
        var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        var maxPos = chars.length;
        var pwd = '';
        for (var i = 0; i < 32; i++) {
          pwd = pwd + chars.charAt(Math.floor(Math.random() * maxPos));
        }
        this.testScriptForm.id=pwd;
      },
      testScriptSendClick(){
        this.httpTestScript(this.testScriptForm.title, this.testScriptForm.id);
        this.testScriptText = this.testScriptText + "我：" + this.testScriptForm.title + "\n";
        this.testScriptForm.title='';
      },
      //渠道
      updateChannel(){
        if (this.channelUpdateDisabledFlag) {
          this.channelUpdateText = "点击确认修改";
          this.channelUpdateDisabledFlag = false;
        }else{
          this.channelUpdateText = "编辑";
          this.channelUpdateDisabledFlag = true;
          console.log(this.checkedChannel);
          this.httpUpdateApplyChannel(this.checkedScene.id, JSON.stringify(this.checkedChannel));
        }
        return this.channelUpdateDisabledFlag;
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
        this.channel_tag  = id;
        console.log(this.channel_tag)
      },
      questionTag(tab, event) {
        console.log(tab, event);
      },
      grooveTag (tab, event) {
        console.log(tab, event);
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
            this.httpGetChannels();
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
          var themeId = null;
          if (list.length > 0) {
            for(var i=0;i<list.length;i++){
              this.scene_list[i] = {
                id: list[i].THEME_ID,
                title: list[i].THEME_NAME,
                theme_content: list[i].THEME_CONTENT,
              }
            }
            themeId = list[0].THEME_ID;
          }
          this.updateSceneDetail(themeId);
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
        this.progressTitle='正在删除主题';
        this.progressContent='正在删除，请稍后';
        this.progressStatus='';
        this.percentage=0;
        this.progressButtonText='删除中';
        this.progressButtonLoading=true;
        this.$http({
          method: 'post',
          url: '/aimlManage/deleteAimlTopic',
          params: {
            themeIds: JSON.stringify(this.checkedScenes),
          },
          baseURL: '/',
          dataType: 'jsonp',
        }).then ((res) => {
          // var data = res.data;
          this.progressPublishVisible=true;
          this.httpCheckDeleteScene();
          this.checkedScenes=[];
        })
      },
      httpCheckDeleteScene(){
        this.$http({
          method: 'post',
          url: '/aimlManage/checkDeleteAimlTopic',
          baseURL: '/',
          dataType: 'jsonp',
        }).then ((res) => {
          var data = res.data;
          var code = res.status;
          var value = data.value;
          if (code === 200) {
            if (value === 100 || value === '100') {
              //成功
              this.percentage = parseInt(value);
              this.progressContent='删除主题成功';
              this.progressTitle='删除成功'
              this.progressStatus='success';
              this.progressButtonText='完成';
              this.progressButtonLoading=false;
              this.httpChangeSceneList(1);
              if (data.status === '3') {
                 this.progressContent='删除主题成功：成功 ' + data.successNum + ' 条，' + '失败 ' + data.failureNum + ' 条。';
                 this.progressStatus='success';
              }
            }else{
              this.percentage = parseInt(value);
              setTimeout(this.httpCheckDeleteScene, 500);
            }
          }else{
            this.progressContent='删除失败';
            this.progressStatus='exception';
            this.progressButtonText='完成';
            this.progressButtonLoading=false;
            this.httpChangeSceneList(1);
          }
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
        this.progressTitle='正在发布主题';
        this.progressContent='正在发布，请稍后';
        this.progressStatus='';
        this.percentage=0;
        this.progressButtonText='发布中';
        this.progressButtonLoading=true;
        this.$http({
          method: 'post',
          url: '/aimlManage/publishAimlTopic',
          params: {
            themeIds: JSON.stringify(this.checkedScenes),
          },
          baseURL: '/',
          dataType: 'jsonp',
        }).then ((res) => {
          this.progressPublishVisible = true;
          this.httpCheckPublishScene();
          this.checkedScenes=[];
        })
      },
      httpCheckPublishScene(){
        this.$http({
          method: 'post',
          url: '/aimlManage/checkPublishAimlTopic',
          baseURL: '/',
          dataType: 'jsonp',
        }).then ((res) => {
          var data = res.data;
          var code = res.status;
          var value = data.value;
          if (code === 200) {
            if (value === 100 || value === '100') {
              //成功
              this.percentage = parseInt(value);
              this.progressContent='发布主题成功';
              this.progressTitle='发布成功'
              this.progressStatus='success';
              this.progressButtonText='完成';
              this.progressButtonLoading=false;
              if (data.status === '3') {
                 this.progressContent='发布主题成功：成功 ' + data.successNum + ' 条，' + '失败 ' + data.failureNum + ' 条。';
                 this.progressStatus='success';
              }
            }
            // else if (value >= 100 && (data.status!="3" ||data.status!="5" ||data.status!="6" )) {
            //   value=99;
            //   this.percentage = parseInt(value);
            //   setTimeout(this.httpCheckPublishScene, 500);
            // }
            else{
              this.percentage = parseInt(value);
              setTimeout(this.httpCheckPublishScene, 500);
            }
          }else{
            this.progressContent='发布失败';
            this.progressStatus='exception';
            this.progressButtonText='完成';
            this.progressButtonLoading=false;
          }
        })
      },
      httpUnderScene(){
        this.underSceneVisible=false;
        this.progressTitle='正在下架主题';
        this.progressContent='正在下架，请稍后';
        this.progressStatus='';
        this.percentage=0;
        this.progressButtonText='下架中';
        this.progressButtonLoading=true;
        this.$http({
          method: 'post',
          url: '/aimlManage/underCarriageAimlTopic',
          params: {
            themeIds: JSON.stringify(this.checkedScenes),
          },
          baseURL: '/',
          dataType: 'jsonp',
        }).then ((res) => {
          this.progressPublishVisible = true;
          this.httpCheckUnderScene();
          this.checkedScenes=[];
        })
      },
      httpCheckUnderScene(){
        this.$http({
          method: 'post',
          url: '/aimlManage/checkUnderCarriageAimlTopic',
          baseURL: '/',
          dataType: 'jsonp',
        }).then ((res) => {
          var data = res.data;
          var code = res.status;
          var value = data.value;
          if (code === 200) {
            if (value === 100 || value === '100') {
              //成功
              this.percentage = parseInt(value);
              this.progressContent='下架主题成功';
              this.progressTitle='下架成功'
              this.progressStatus='success';
              this.progressButtonText='完成';
              this.progressButtonLoading=false;
              if (data.status === '3') {
                 this.progressContent='下架主题成功：成功 ' + data.successNum + ' 条，' + '失败 ' + data.failureNum + ' 条。';
                 this.progressStatus='success';
              }
            }else{
              this.percentage = parseInt(value);
              setTimeout(this.httpCheckUnderScene, 500);
            }
          }else{
            this.progressContent='下架失败';
            this.progressStatus='exception';
            this.progressButtonText='完成';
            this.progressButtonLoading=false;
          }
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

          let allChannel = data.channel_list;
          this.checkedChannel = new Array();
          if (allChannel.length > 0) {
            for (var i = 0; i < allChannel.length; i++) {
              if (allChannel[i].SHOW) {
                this.checkedChannel.push(allChannel[i].CHANNEL_NAME);
              }
            }
          }
          // data.channel_list.CHANNEL_ID
          //                  .CHANNEL_CODE
          //                  .SHOW
          //                  .CHANNEL_NAME
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
          console.log(res);
          var data = res.data;
          var total = data.total;
          var list = data.list;
          if (type === 'entry') {
            this.entrance_list = new Array();
            this.entranceTotal = total;
            this.entranceCurrentPage = rows;
            if (list.length > 0) {
              for(var i=0;i<list.length;i++){
                this.entrance_list[i] = {};
                this.entrance_list[i].id = list[i].QUESTION_ID;
                this.entrance_list[i].title = list[i].QUESTION;
              }
            }
          }else{
            this.out_list = new Array();
            this.outTotal = total;
            this.outCurrentPage = rows;
            if (list.length > 0) {
              for(var i=0;i<list.length;i++){
                this.out_list[i] = {};
                this.out_list[i].id = list[i].QUESTION_ID;
                this.out_list[i].title = list[i].QUESTION;
              }
            }
          }
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
          //修改槽点
          if (type === 'entry') {
            this.entrance_grooves = new Array();
            let eg_list = data;
            if (eg_list.length > 0) {
            for(var i=0;i<eg_list.length;i++){
              this.entrance_grooves[i] = {};
              this.entrance_grooves[i].id = eg_list[i].KEYWORD_ID;
              this.entrance_grooves[i].title = eg_list[i].KEYWORD;
            }
          }
          }else{
            this.out_grooves = new Array();
            let og_list = data;
            if (og_list.length > 0) {
              for(var i=0;i<og_list.length;i++){
                this.out_grooves[i] = {};
                this.out_grooves[i].id = og_list[i].KEYWORD_ID;
                this.out_grooves[i].title = og_list[i].KEYWORD;
              }
            }
          }
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
          if (this.activeQuestions === 'first') {
            this.httpGetQuestions(themeId, 'entry', this.entranceCurrentPage);
          }else{
            this.httpGetQuestions(themeId, 'end', this.outCurrentPage);
          }
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
          if (this.activeQuestions === 'first') {
            this.httpGetQuestions(this.checkedScene.id, 'entry', 1);
          }else{
            this.httpGetQuestions(this.checkedScene.id, 'end', 1);
          }
        })
      },
      httpAddKeyWord(themeId, keyword, type){
        this.$http({
          method: 'post',
          url: '/aimlManage/addKeyWord',
          params: {
            themeId: themeId,
            keyword: keyword,
            type: type,
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
          if (this.activeGroove === 'checkedEntrenace') {
            this.httpGetKeyWordList(themeId, 'entry');
          }else{
            this.httpGetKeyWordList(themeId, 'end');
          }
        })
      },
      httpGetChannels(){
        this.$http({
          method: 'get',
          url: '/aimlManage/getChannelByRepositoryId',
          params: {
            repositoryId: this.repositoryValue,
          },
          baseURL: '/',
          dataType: 'jsonp',
        }).then ((res) => {
          var data = res.data;
          this.channels = new Array();
          if (data.length > 0) {
            for(var i=0;i<data.length;i++){
              this.channels[i] = {
                id: data[i].CHANNEL_ID,
                code: data[i].CHANNEL_CODE,
                name: data[i].CHANNEL_NAME,
              }
            }
          }
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
      httpTestScript(question, sessionId){
        this.$http({
          method: 'get',
          url: '/aimlManage/aimlReply',
          params: {
            themeId: this.checkedScene.id,
            question: question,
            sessionId: sessionId,
          },
          baseURL: '/',
          dataType: 'jsonp',
        }).then ((res) => {
          var data = res.data;
          console.log(data);
          this.testScriptText = this.testScriptText + "小明：" + data.msg + "\n";
        })
      },
    },
    filters: {
      sceneStatusFilter: function (status){
        var result = '状态不明'
        if (status === 1) {result = '编辑中';}
        else if (status === 2) {result = '正式';}
        else if (status === 3) {result = '下架';}
        else if (status === 4) {result = '正式编辑中';}
        return result;
      }
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
  .test-script-show-div {
    margin-left: 120px;
    background-color: #f5f7fa;
    height: 300px;
    width: 500px;
  }
  .progressContent {
    float: right;
    height: 126px;
    width: 250px;
    border: 0px;
    .dialog-footer{
      display: inline-block;
      margin-top: 50px;
    }
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
    content: '';
    display: block;
    clear: both;
    position: relative;
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
      display: flex;
      justify-content: flex-end;
      height: 64px;
      margin-bottom: 16px;
      padding-top: 15px;
      padding-right: 24px;
      background-color: #fff;
      .el-input {
        width: 364px;
        margin-right: 16px;
      }
      .el-dropdown {
        padding-top: 8px;
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
            padding-left: 12px;
            padding-right: 12px;
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
              padding-left: 12px;
              line-height: 45px;
              text-align: left;
              border-bottom: 1px solid #cdd0d4;
              .el-checkbox__input {
                display: none;
              }
              .el-checkbox__label {
                display: inline-block;
                width: 70%;
                height: 20px;
                padding-left: 0;
                line-height: 16px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                vertical-align: middle;
              }
              .el-icon-edit-outline {
                position: absolute;
                top: 16px;
                right: 12px;
              }
              &.is-checked {
                background-color: #b1d7ff;
              }
              .el-tag {
                width: 50px;
                margin-right: 5px;
                text-align: center;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                vertical-align: middle;
                background-color: #FFFFFF;
              }
              .el-tag--success {
                color: #46C819;
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
            height: 457px;
            text-align: left;
            margin-top: 5px;
            padding-left: 16px;
            padding-right: 16px;
            .el-checkbox {
              width: 100%;
              line-height: 40px;
              border-bottom: 1px solid #E4E7EB;
              .el-checkbox__label {
                display: inline-block;
                width: 85%;
                height: 18px;
                line-height: 16px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                vertical-align: middle;

              }
            }
            .entrance-page {
              position: absolute;
              bottom: 15px;
              left: 5px;
            }
            .el-icon-edit-outline {
                position: absolute;
                top: 14px;
                right: 32px;
              }
            .el-icon-delete {
                position: absolute;
                top: 14px;
                right: 10px;
              }
          }
          .out-list {
            position: relative;
            height: 457px;
            margin-top: 5px;
            text-align: left;
            padding-left: 16px;
            padding-right: 16px;
            .el-checkbox {
              width: 100%;
              line-height: 40px;
              border-bottom: 1px solid #E4E7EB;
              .el-checkbox__label {
                display: inline-block;
                width: 85%;
                height: 18px;
                line-height: 16px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                vertical-align: middle;

              }
            }
            .out-page {
              position: absolute;
              bottom: 15px;
              left: 5px;
            }
            .el-icon-edit-outline {
                position: absolute;
                top: 14px;
                right: 32px;
              }
            .el-icon-delete {
                position: absolute;
                top: 14px;
                right: 10px;
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
            line-height: 55px;
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
        position: relative;
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
  .floatLeft {
    float: left;
  }
  .scene-title {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
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
    width: 90%;
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
