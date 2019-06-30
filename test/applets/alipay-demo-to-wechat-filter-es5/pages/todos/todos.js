function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
} // 获取全局 app 实例


const app = getApp();
Page({
  // 声明页面数据
  data: {},

  // 监听生命周期回调 onLoad
  onLoad() {
    // 获取用户信息并存储数据
    app.getUserInfo().then(user => {
      this.setData({
        user
      });
    }, () => {// 获取用户信息失败
    });
  },

  // 监听生命周期回调 onShow
  onShow() {
    // 设置全局数据到当前页面数据
    this.setData({
      todos: app.todos
    });
  },

  // 事件处理函数
  onTodoChanged(e) {
    // 修改全局数据
    const checkedTodos = e.detail.value;
    app.todos = app.todos.map(todo => _objectSpread({}, todo, {
      completed: checkedTodos.indexOf(todo.text) > -1
    }));
    this.setData({
      todos: app.todos
    });
  },

  addTodo() {
    // 进行页面跳转
    wx.navigateTo({
      url: '../add-todo/add-todo'
    });
  }

});