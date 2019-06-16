App({
  todos: [{
    text: 'Learning Javascript',
    completed: true
  }, {
    text: 'Learning ES2016',
    completed: true
  }, {
    text: 'Learning 支付宝小程序',
    completed: false
  }],
  userInfo: null,

  getUserInfo() {
    return new Promise((resolve, reject) => {
      if (this.userInfo) resolve(this.userInfo);
      wx.login({
        scopes: ['auth_user'],
        success: authcode => {
          console.info(authcode);
          wx.getUserInfo({
            success: res => {
              this.userInfo = res;
              resolve(this.userInfo);
            },
            fail: () => {
              reject({});
            }
          });
        },
        fail: () => {
          reject({});
        }
      });
    });
  }

});