import React from 'react'

import { createStore } from 'reflux'

import { browserHistory } from 'react-router'

let ProfileStore = createStore({
  obj: { 
          	user: null

  },
  

  getInitialState: function() {
    return this.obj = { 
                        user: {
                                full_name: localStorage.getItem('full_name'),
                                profile_picture: localStorage.getItem('profile_picture')
                              }
                       }
  },



})

export default ProfileStore