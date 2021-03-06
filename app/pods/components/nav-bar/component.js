import Ember from 'ember';
import config from '../../../config/environment';

const { inject: { service } } = Ember;
export default Ember.Component.extend({
    session: Ember.inject.service('session'),
    store: service('store'),
    notiCount:0,
    notifications: Ember.A(),
    navBarInitDone: false,
    init () {
      this._super(...arguments);
      this.get('store').query('notification', {}).then(result=>{
          this.set('notifications', result)
          let readNoti = parseInt(window.localStorage.getItem("readNoti"));
          if (readNoti===null || readNoti === undefined) {
              readNoti = 0;
          }
          let notiCount = result.get('meta').notiCount - readNoti;
          if (!notiCount)
          {
            notiCount = 0;
          } else { 
            this.set('notiCount',result.get('meta').notiCount - readNoti) // - loc storage
          }
      })
      
      this.set("logoutURL", config.oneauthURL + 'logout?redirect=' + config.publicUrl + '/logout')
   },
   actions: {
      storeNotiCount() {
          let notiCount = this.get('notiCount');
          window.localStorage.setItem("readNoti",notiCount);
          this.set('notiCount',0);
      }
   }
});
