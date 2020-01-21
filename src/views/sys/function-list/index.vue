<template>
  <div>
    <el-button @click="handleAddFunctionBtn">
      增加菜单
    </el-button>
    <el-table
      ref="refTable"
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="functionid"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      @row-click="expandChange"
    >
      <el-table-column
        prop="title"
        label="菜单名称"
      />
      <el-table-column
        prop="path"
        label="路径"
      />
      <el-table-column
        prop="component"
        label="组件位置"
      />
      <el-table-column
        prop="name"
        label="路由命名"
      />
      <el-table-column
        prop="sortno"
        label="排序码"
      />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click.native="handleEdit(scope.$index, scope.row)"
          >
            编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click.native="handleDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="nowModifyType==='add'?'增加菜单':'编辑菜单'"
      :visible.sync="mainDialogFormVisible"
    >
      <el-form :model="nowConfigSingleMenu">
        <el-form-item
          label="父级菜单"
          :label-width="formLabelWidth"
        > 
          <el-cascader
            v-model="nowConfigSingleMenu.parentid"
            :options="parentMenuArr"
            :props="{ 
              checkStrictly: true,
              value: 'functionid',
              label: 'title',
              children: 'children',
              emitPath: false,
              expandTrigger:'hover'
            }"
            clearable
            filterable
          />
          <!-- <el-select
            v-model="nowConfigSingleMenu.parentid"
            placeholder="请选择父级菜单"
          >
            <el-option
              label="无"
              value="0"
            />
            <el-option
              v-for="key in nowMenuParseArr"
              :label="key.title"
              :value="key.functionid"
            />
          </el-select> -->
        </el-form-item>
        <el-form-item
          label="菜单名称"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="nowConfigSingleMenu.title"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="组件位置"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="nowConfigSingleMenu.component"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="组件路由"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="nowConfigSingleMenu.path"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="菜单图标"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="nowConfigSingleMenu.icon"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="排序码"
          :label-width="formLabelWidth"
        >
          <!-- <el-input
            v-model="nowConfigSingleMenu.sortno"
            autocomplete="off"
          /> -->
          <el-input-number
            v-model="nowConfigSingleMenu.sortno"
            :min="0"
            label="排序码"
          />
        </el-form-item>
        <el-form-item
          label="是否启用"
          :label-width="formLabelWidth"
        >
          <el-switch
            :value="!nowConfigSingleMenu.hidden"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="nowConfigSingleMenu.hidden=!nowConfigSingleMenu.hidden"
          />
        </el-form-item>
        <el-form-item
          label="高级设置"
          :label-width="formLabelWidth"
        >
          <el-button
            size="mini"
            @click="handleOpenDetailDialog"
          >
            设置
          </el-button>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="mainDialogFormVisible = false">
          取 消
        </el-button>
        <el-button
          type="primary"
          @click="handleMainModalSubmit"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="高级配置"
      :visible.sync="detailDialogFormVisible"
    >
      <el-form :model="nowFunctionMeta">
        <el-form-item
          label="重定向"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="nowFunctionMeta.redirect"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="隐藏菜单"
          :label-width="formLabelWidth"
        >
          <el-switch
            v-model="nowFunctionMeta.hideChildrenInMenu"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
        <el-form-item
          label="网址"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="nowFunctionMeta.url"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="打开方式"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="nowFunctionMeta.target"
            placeholder="请选择打开方式"
          >
            <el-option
              label="本页面"
              value="_self"
            />
            <el-option
              label="新页面"
              value="_blank"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="是否缓存"
          :label-width="formLabelWidth"
        >
          <el-switch
            v-model="nowFunctionMeta.keepAlive"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
        <el-form-item
          label="强制重载"
          :label-width="formLabelWidth"
        >
          <el-switch
            v-model="nowFunctionMeta.reloadFlag"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="detailDialogFormVisible = false">
          取 消
        </el-button>
        <el-button
          type="primary"
          @click="handleDetailDialogSubmit"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getFunctions} from '../../../api/functionmenu'
import {getRand32} from '../../../utils/randid'
export default {
  name: 'FunctionList',
  data() {
      return {
        mainDialogFormVisible: false,
        detailDialogFormVisible: false,
        nowModifyType: 'add',
        formLabelWidth: '120px',
        nowMenuParseArr: [],
        nowConfigSingleMenu: {},
        initConfigSingleMenu: {
          "functionid": "CreateArticlecreate0",
          "parentid": "Example/example0",
          "sortno": 0,
          "name": "CreateArticle",
          "path": "create",
          "component": "",
          "title": "createArticle11",
          "icon": "edit",
          "hidden": false,
          "url": "",
          "target": "_blank",
          "redirect": "",
          "hideChildrenInMenu": false,
          "keepAlive": false,
          "reloadFlag": true,
          "permissionList": []
        },
        nowFunctionMeta: {
          "url": "",
          "target": "_blank",
          "redirect": "",
          "hideChildrenInMenu": false,
          "keepAlive": false,
          "reloadFlag": true,
          "permissionList": []
        },
      options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }]
      }
    },
  computed: {
    parentMenuArr: {
      get () {
        let _this = this;
        return [{title: '根菜单', functionid: '0'}].concat(_this.tableData);
      }
    },
    tableData: {
      get () {
        let _this = this;
        return _this.treeData(_this.nowMenuParseArr);
      }
    }
  },
  created () {
    let _this = this;
    getFunctions().then(function(e) {
      let pathArr = [];
      let nowMenuParseArr = []
      let nowFunctionsArr = e.data;
      console.log(e);
      nowFunctionsArr.forEach(function(ele) {
        if (!pathArr.includes(ele.path)) {
          pathArr.push(ele.path)
          nowMenuParseArr.push(ele);
        }
      })
      _this.nowMenuParseArr = nowMenuParseArr;
      // _this.tableData = _this.treeData(nowMenuParseArr);
      // console.log(_this.treeData(nowFunctionsArr))
      // let nowMenuObj = {};
      // let nowMenuLib = {};
      // nowFunctionsArr.forEach(function(ele){
      //   if (ele.parentid === 0) {
      //     nowMenuObj[ele.functionid] = {
      //       path: ele.path,
      //       name: ele.name,
      //       redirect: ele.redirect,
      //       component: ele.component,
      //       hidden: ele.hidden,
      //       hideChildrenInMenu: ele.hideChildrenInMenu,
      //       meta: {
      //         title: ele.title,
      //         icon: ele.icon,
      //         hidden: ele.hidden,
      //         hiddenHeaderContent: ele.hiddenHeaderContent,
      //         url: ele.url,
      //         target: ele.target,
      //         keepAlive: ele.keepAlive,
      //         reloadFlag: ele.reloadFlag,
      //         permissionList: ele.permissionList
      //       }
      //     }
      //   } else {
      //     let nowTempObj = {
      //       path: ele.path,
      //       name: ele.name,
      //       redirect: ele.redirect,
      //       component: ele.component,
      //       hidden: ele.hidden,
      //       hideChildrenInMenu: ele.hideChildrenInMenu,
      //       meta: {
      //         title: ele.title,
      //         icon: ele.icon,
      //         hidden: ele.hidden,
      //         hiddenHeaderContent: ele.hiddenHeaderContent,
      //         url: ele.url,
      //         target: ele.target,
      //         keepAlive: ele.keepAlive,
      //         reloadFlag: ele.reloadFlag,
      //         permissionList: ele.permissionList
      //       }
      //     }
      //     if (!nowMenuLib.hasOwnProperty(ele.parentid)) {
      //       nowMenuLib[ele.parentid] = [
      //         nowTempObj
      //       ]
      //     } else {
      //       nowMenuLib[ele.parentid].push(nowTempObj);
      //     }
          
      //   }
      // })
      // for (let i in nowMenuObj) {
      //   if (nowMenuLib.hasOwnProperty(i)) {
      //     nowMenuObj[i].children = nowMenuLib[i];
      //     delete nowMenuLib[i];
      //   }
      // }
    });
    _this.nowConfigSingleMenu = JSON.parse(JSON.stringify(_this.initConfigSingleMenu));
  },
  methods: {
    treeData(initData){
      let cloneData = JSON.parse(JSON.stringify(initData))    // 对源数据深度克隆
      let sortCloneData = []
      sortCloneData = cloneData.filter(father=>{               
        let branchArr = cloneData.filter(child=>father.functionid == child.parentid)    //返回每一项的子级数组
        branchArr.sort(function(a,b){
          return a.sortno - b.sortno;
        })
        branchArr.length>0 ? father.children = branchArr : ''   //如果存在子级，则给父级添加一个children属性，并赋值
        return father.parentid==0;      //返回第一层
      });
      return sortCloneData.sort(function(a,b){
        return a.sortno - b.sortno;
      })
    },
    // 编辑菜单
    handleEdit (index, row) {
      console.log(1111);
      console.log(index, row);
      this.nowModifyType = 'config';
      this.mainDialogFormVisible = true;
      this.nowConfigSingleMenu = JSON.parse(JSON.stringify(row));
    },
    // 删除菜单
    handleDelete () {},
    // 增加菜单
    handleAddFunctionBtn () {
      let _this = this;
      _this.nowModifyType = 'add';
      _this.mainDialogFormVisible = true;
      _this.nowConfigSingleMenu = JSON.parse(JSON.stringify(_this.initConfigSingleMenu));
      _this.nowConfigSingleMenu.functionid = getRand32();
    },
    // eslint-disable-next-line no-unused-vars
    expandChange(row, index, e){
      // this.$refs.refTable.toggleRowExpansion(row)
    },
    // 打开详细配置
    handleOpenDetailDialog () {
      let _this = this;
      let nowConfigSingleMenu = _this.nowConfigSingleMenu;
      this.nowFunctionMeta = {
        "url": nowConfigSingleMenu.url || '',
        "target": nowConfigSingleMenu.target || '_blank',
        "redirect": nowConfigSingleMenu.redirect || '',
        "hideChildrenInMenu": nowConfigSingleMenu.hideChildrenInMenu?nowConfigSingleMenu.hideChildrenInMenu: false,
        "keepAlive": nowConfigSingleMenu.keepAlive?nowConfigSingleMenu.keepAlive: false,
        "reloadFlag": nowConfigSingleMenu.reloadFlag?nowConfigSingleMenu.reloadFlag: true,
        "permissionList": nowConfigSingleMenu.permissionList?nowConfigSingleMenu.permissionList: [],
      }
      this.detailDialogFormVisible = true;
    },
    // 详细配置确认
    handleDetailDialogSubmit () {
      let _this = this;
      this.nowConfigSingleMenu = Object.assign({}, _this.nowConfigSingleMenu, _this.nowFunctionMeta);
      this.detailDialogFormVisible = false;
    },
    // 修改父级菜单
    handleChangeParentid (e) {
      // console.log(e);
      // if (e.length > 0) {
      //   this.nowConfigSingleMenu.parentid = e;
      // } else{
      //   this.nowConfigSingleMenu.parentid = 0;
      // }
    },
    // 主模态框确认按钮
    handleMainModalSubmit () {
      let _this = this;
      if (_this.nowModifyType === 'add') {
        _this.handleAddFunction();
      }
      if (_this.nowModifyType === 'config') {
        _this.handleConfigFunction();
      }
      this.mainDialogFormVisible = false;
    },
    // 增加新功能菜单
    handleAddFunction () {
      let _this = this;
      let nowConfigSingleMenu = _this.nowConfigSingleMenu;
      _this.nowMenuParseArr.push(nowConfigSingleMenu);
    },
    // 编辑功能菜单
    handleConfigFunction () {
      let _this = this;
      let nowConfigSingleMenu = _this.nowConfigSingleMenu;
      let nowIndex = null;
      _this.nowMenuParseArr.forEach(function(ele, index) {
        if (nowConfigSingleMenu.functionid === ele.functionid) {
          // ele = nowConfigSingleMenu;
          nowIndex = index;
        }
      })
      _this.$set(_this.nowMenuParseArr, nowIndex, nowConfigSingleMenu);
    }
  }
}
</script>

<style>

</style>