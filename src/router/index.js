import Vue from 'vue'
import Router from 'vue-router'


import start from '@/components/app/start/start'
//Start Appliaction with login State 
import login from '@/components/app/start/login'
// Reg Comonents 
import reg from '@/components/app/start/reg'
//active Code 
import active from '@/components/app/start/active'

// step is for first login and complate details 
import stepOne from '@/components/app/firstLogin/stepOne'
import stepTow from '@/components/app/firstLogin/stepTow'
import stepthree from '@/components/app/firstLogin/stepthree'


// MAIN SECTION 
// main 
import main from '@/components/app/section/main'

//Expolor World 
import explor from '@/components/app/section/explor'

//Post Component 
import post from '@/components/app/section/post'

//notifaction 
import noti from '@/components/app/section/noti'

// profile 
import profile from '@/components/app/profile/profile'
import notfy from '@/components/Global/toolsNav/notfy'

import frinds from '@/components/app/section/friends'

import logout from '@/components/app/start/logout'

import comment from '@/components/app/section/comment'




//// LIST 
import myPost from '@/components/app/list/myPost'
import myLike from '@/components/app/list/myLike'
import myComment from '@/components/app/list/myComment'
import myShares from '@/components/app/list/myShares'
import myFriends from '@/components/app/list/myFriends';

import search from '@/components/app/section/search'

import Hello from '@/components/Hello'


import addFriend from '@/components/app/section/addFriend';

import message from '@/components/app/section/message';

Vue.use(Router)

export default new Router({
  routes: [
  {
    path:'/',
    name:'start',
    component:start
  },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path:'/reg',
      name:'reg',
      component:reg
    },
    {
      path:'/active',
      name:'active',
      component:active
    },
    {
      path:'/stepOne',
      name:'stepOne',
      component:stepOne
    },
    {
      path:'/stepTow',
      name:'stepTow',
      component:stepTow
    },
    {
      path:'/stepthree',
      name:'stepthree',
      component:stepthree
    },
    {
      path:'/main',
      name:'main',
      component:main
    },
    {
      path:'/frinds',
      name:'frinds',
      component:frinds
    },
    {
      path:'/explor',
      name:'explor',
      component:explor
    },
    {
      path:'/post/:id',
      name:'post',
      component:post
    },
    {
      path:'/noti',
      name:'noti',
      component:noti
    },
    {
      path:'/profile/:id',
      name:'profile',
      component:profile
    },
    {
      path:'/logout',
      name:'logout',
      component:logout
    },
    {
      path:'/notfy',
      name:'notfy',
      component:notfy
    },
    {
      path:'/comment/:id',
      name:'comment',
      component:comment
    },
    {
    path:'/list/myPost',
    name:'myPost',
    component:myPost
    },
    {
    path:'/list/myLike',
    name:'myLike',
    component:myLike
    },
    {
    path:'/list/myComment',
    name:'myComment',
    component:myComment
    },
    {
    path:'/list/myFriends',
    name:'myFriends',
    component:myFriends
    },
    {
    path:'/search',
    name:'search',
    component:search
    },
    {
      path:'/x',
      name:'test',
      component:Hello
    },
    {
      path:'/myShares',
      name:'myShares',
      component:myShares
    },
    {
      path:'/addFriend',
      name:'addFriend',
      component:addFriend
    },
    {
      path:'/message',
      name:'message',
      component:message
    }

   
  ]
})
