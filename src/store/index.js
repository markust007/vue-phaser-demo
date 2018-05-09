import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import { scormLMS } from './modules/scormLMS.js';
import { menu } from './modules/menu.js';

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
  	scormLMS,
    menu
  },
  state: {
    items: null
  },
  actions: {

  },
  mutations: {
    setItems (state, value) {
      state.items = value;
    }
  }
})
export default store


var QueryString = function() {
    // This function is anonymous, is executed immediately and
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }
    return query_string;
}();

if (QueryString.debug === "true") {
  document.addEventListener("keydown", (e) => {
    const actions = {
      ArrowRight: () => { store.commit('scormLMS/incrementProgress'), store.commit('scormLMS/locationPlus') },
      ArrowLeft: () => store.commit('scormLMS/locationMinus'),
    };
    maybe(actions[e.key]);
  })

  function maybe(fn) {
    fn ? fn() : null;
  }
}
