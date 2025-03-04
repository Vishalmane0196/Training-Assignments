import arcadeIcon from '../assets/images/icon-arcade.svg';
import advanceIcon from '../assets/images/icon-advanced.svg';
import proIcon from '../assets/images/icon-pro.svg';

const sidebarinfo =[
    {
       step:1,
       name:'YOUR INFO'
    },
    {
        step:2,
        name:'SELECT PLAN'
    },
    {
        step:3,
        name:'ADD-ONS'
    },
    {
        step:4,
        name:'SUMMARY'
    }
]

const plans =[
    {
        name:"Arcade",
        monthly : 9,
        yearly : 90,
        icon:arcadeIcon
    },
    {
        name:"Adcance",
        monthly : 12,
        yearly : 120,
        icon:advanceIcon
    },
    {
        name:"Pro",
        monthly : 15,
        yearly : 150,
        icon:proIcon
    }
];

const addOn = [
    {
        name:"Online service",
        detail : "Access to multiple gamers",
        monthly : 1,
        yearly : 7
    },
    {
        name:"Larger Storage",
        detail : "Extra 1TB of cloud save",
        monthly : 2,
        yearly : 4
    },
    {
        name:"Customizable Profile",
        detail : "Custom theme on your profile",
        monthly : 3,
        yearly : 6
    }
]
 export {addOn,plans,sidebarinfo}