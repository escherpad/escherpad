webpackJsonp([0],{463:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function a(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function i(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}Object.defineProperty(t,"__esModule",{value:!0});var l=n(0),c=n.n(l),m=n(9),s=(n.n(m),n(8)),f=n(33),d=(n.n(f),function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}()),u=i(["\n    font-family: 'Lato', sans-serif;\n    font-size: 1em;\n    background-color: #efefef\n"],["\n    font-family: 'Lato', sans-serif;\n    font-size: 1em;\n    background-color: #efefef\n"]),p=i(["\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    text-decoration: none;\n    cursor: pointer;\n    &:not(:first-child) {\n      margin-left: 1em;\n      padding-left: 0.2em;\n    }\n    &:not(:last-child) {\n      margin-right: 1em;\n      padding-right: 0.2em;\n    }\n    > span {\n        height: 2em;\n        line-height: 2em;\n        color: white;\n        flex: 0 0 auto;\n        border-top: solid 0.3em transparent;\n        border-bottom: solid 0.3em transparent;\n    }\n    :hover > span {\n        border-bottom: solid 0.3em white;\n    }\n"],["\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    text-decoration: none;\n    cursor: pointer;\n    &:not(:first-child) {\n      margin-left: 1em;\n      padding-left: 0.2em;\n    }\n    &:not(:last-child) {\n      margin-right: 1em;\n      padding-right: 0.2em;\n    }\n    > span {\n        height: 2em;\n        line-height: 2em;\n        color: white;\n        flex: 0 0 auto;\n        border-top: solid 0.3em transparent;\n        border-bottom: solid 0.3em transparent;\n    }\n    :hover > span {\n        border-bottom: solid 0.3em white;\n    }\n"]),g=Object(s.a)(m.Flex)(u),h=Object(s.a)(m.FlexItem)(p),b=function(e){function t(){r(this,t);var e=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.onSearch=e._onSearch.bind(e),e}return a(t,e),d(t,[{key:"_onSearch",value:function(e){console.log(e,this.state)}},{key:"render",value:function(){var e=[{source:"google-scholar",title:"SGAN: An Alternative Training of Generative Adversarial Networks",authors:["Tatjana Chavdarova","Fran\xe7ois Fleuret"],date:"2017-12-06",arxiv_category:["stat.ML","cs.LG"]}];return console.log(e),c.a.createElement(g,{fill:!0,column:!0,style:{backgroundImage:"linear-gradient(140deg, #006EFF, #00FFD5)"},align:"stretch"},c.a.createElement(f.Helmet,null,c.a.createElement("title",null,"Findr | Search For All Your Knowledge")),c.a.createElement(m.FlexItem,{fixed:!0},c.a.createElement(m.Flex,{row:!0,style:{height:"4em",padding:"0 1.3em",maxWidth:"1000px",left:0,right:0,margin:"0 auto"}},c.a.createElement(h,{component:"a"},c.a.createElement("span",{style:{fontSize:"19px"}},"Findr")),c.a.createElement(m.FlexSpacer,null),c.a.createElement(h,{component:"a",href:"settings"},c.a.createElement("span",null,"settings")))),c.a.createElement(m.FlexItem,{fixed:!0},c.a.createElement(m.Flex,{column:!0,align:"center",style:{fontFamily:"Lato",color:"white",padding:"0 1.3em",maxWidth:"1000px",left:0,right:0,margin:"0 auto"}},c.a.createElement("h1",{style:{fontWeight:"200",fontSize:"6em",marginBottom:"0.1em"}},"Findr"),c.a.createElement("h3",{style:{fontWeight:"200",fontSize:"1.5em",marginTop:"0.1em",marginBottom:"1.3em"}},"Search your knowledge"))),c.a.createElement(m.FlexItem,{fixed:!0},c.a.createElement(m.Flex,{row:!0,align:"stretch",style:{height:"2.2em",padding:"0 1.3em",maxWidth:"700px",left:0,right:0,margin:"0 auto"}},c.a.createElement(m.FlexItem,{component:"input",fluid:!0,type:"Text",style:{borderRadius:"1em",border:"solid 1px transparent",marginRight:"0.5em",padding:"0 0.7em",color:"#4198ED",fontSize:"1em"}}),c.a.createElement(m.FlexItem,{component:"button",href:"settings",onClick:this.onSearch,style:{cursor:"pointer",backgroundColor:"rgba(0, 0, 0, 0.2)",fontSize:"1em",textDecoration:"none",color:"white",padding:"0 0.7em",lineHeight:"100%",border:"solid 1px transparent",borderRadius:"1em",marginLeft:"10px"}},"find"))),c.a.createElement(m.FlexSpacer,null))}}]),t}(l.Component);t.default=b}});
//# sourceMappingURL=0.ed078414.chunk.js.map