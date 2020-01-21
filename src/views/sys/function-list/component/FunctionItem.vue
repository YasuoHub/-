<template>
  <div />
</template>

<script>
export default {
  name: 'FunctionItem',
  props: {
    itemData: {
      required: true,
      type: Object,
      default () {
        return {
          id: '',
          parentid: '',
          path: '',
          component: '',
          title: '',
          icon: '',
          hidden: '',
          name: '',
          url:'',
          target: '',
          redirect: '',
          hideChildrenInMenu: '',
          keepAlive: '',
          reloadFlag: '',
          permissionList: [],
          children: []
        }
      }
    }
  }
}
</script>

<style>

</style>