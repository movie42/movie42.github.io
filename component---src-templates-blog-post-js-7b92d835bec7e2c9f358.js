(self.webpackChunkhyunsublog=self.webpackChunkhyunsublog||[]).push([[989],{1254:function(e,t,n){"use strict";var o=n(4836);t.__esModule=!0,t.default=void 0;var r=o(n(434)),i=o(n(7071)),a=o(n(7867)),l=o(n(7294)),s=o(n(5697)),c=n(989),u=(0,c.debounce)((function(){window.DISQUSWIDGETS&&window.DISQUSWIDGETS.getCount({reset:!0})}),300,!1),d=function(e){function t(t){var n;return(n=e.call(this,t)||this).shortname="movie42",n}(0,a.default)(t,e);var n=t.prototype;return n.componentDidMount=function(){this.loadInstance()},n.shouldComponentUpdate=function(e){return this.props!==e&&(0,c.shallowComparison)(this.props,e)},n.componentDidUpdate=function(){this.loadInstance()},n.componentWillUnmount=function(){this.cleanInstance()},n.loadInstance=function(){window.document.getElementById("dsq-count-scr")?u():(0,c.insertScript)("https://"+this.shortname+".disqus.com/count.js","dsq-count-scr",window.document.body)},n.cleanInstance=function(){(0,c.removeScript)("dsq-count-scr",window.document.body),window.DISQUSWIDGETS=void 0},n.render=function(){var e=this.props,t=e.config,n=e.className,o=e.placeholder,a=(0,i.default)(e,["config","className","placeholder"]),s="disqus-comment-count"+(n?" "+n:"");return l.default.createElement("span",(0,r.default)({className:s,"data-disqus-identifier":t.identifier,"data-disqus-url":t.url},a),o)},t}(l.default.Component);t.default=d,d.defaultProps={placeholder:"..."},d.propTypes={config:s.default.shape({identifier:s.default.string,title:s.default.string,url:s.default.string}),placeholder:s.default.string,className:s.default.string}},4294:function(e,t,n){"use strict";var o=n(4836);t.__esModule=!0,t.default=void 0;var r=o(n(434)),i=o(n(7071)),a=o(n(7867)),l=o(n(7294)),s=o(n(5697)),c=function(e){function t(){return e.apply(this,arguments)||this}(0,a.default)(t,e);var n=t.prototype;return n.getSrc=function(){return"https://embed.disqus.com/p/"+Number(this.props.commentId).toString(36)+"?p="+(this.props.showParentComment?"1":"0")+"&m="+(this.props.showMedia?"1":"0")},n.render=function(){var e=this.props,t=(e.commentId,e.showMedia,e.showParentComment,(0,i.default)(e,["commentId","showMedia","showParentComment"]));return l.default.createElement("iframe",(0,r.default)({src:this.getSrc(),width:this.props.width,height:this.props.height,seamless:"seamless",scrolling:"no",frameBorder:"0",title:"embedded-comment"},t))},t}(l.default.Component);t.default=c,c.defaultProps={width:420,height:320,showMedia:!0,showParentComment:!0},c.propTypes={commentId:s.default.oneOfType([s.default.number,s.default.string]).isRequired,width:s.default.number,height:s.default.number,showMedia:s.default.bool,showParentComment:s.default.bool}},2605:function(e,t,n){"use strict";var o=n(4836);t.__esModule=!0,t.default=void 0;var r=o(n(434)),i=o(n(7071)),a=o(n(7867)),l=o(n(7294)),s=o(n(5697)),c=n(989),u=function(e){function t(t){var n;return(n=e.call(this,t)||this).shortname="movie42",n.embedUrl="https://"+n.shortname+".disqus.com/embed.js",n}(0,a.default)(t,e);var n=t.prototype;return n.componentDidMount=function(){this.loadInstance()},n.shouldComponentUpdate=function(e){return this.props!==e&&(0,c.shallowComparison)(this.props,e)},n.componentDidUpdate=function(){this.loadInstance()},n.componentWillUnmount=function(){this.cleanInstance()},n.getDisqusConfig=function(e){return function(){this.page.identifier=e.identifier,this.page.url=e.url,this.page.title=e.title,this.page.remote_auth_s3=e.remoteAuthS3,this.page.api_key=e.apiKey,this.language=e.language}},n.loadInstance=function(){"undefined"!=typeof window&&window.document&&(window.disqus_config=this.getDisqusConfig(this.props.config),window.document.getElementById("dsq-embed-scr")?this.reloadInstance():(0,c.insertScript)(this.embedUrl,"dsq-embed-scr",window.document.body))},n.reloadInstance=function(){window&&window.DISQUS&&window.DISQUS.reset({reload:!0})},n.cleanInstance=function(){(0,c.removeScript)("dsq-embed-scr",window.document.body);try{delete window.DISQUS}catch(o){window.DISQUS=void 0}var e=window.document.getElementById("disqus_thread");if(e)for(;e.hasChildNodes();)e.removeChild(e.firstChild);var t=window.document.querySelector('[id^="dsq-app"]');if(t){var n=window.document.getElementById(t.id);n.parentNode.removeChild(n)}},n.render=function(){var e=this.props,t=(e.config,(0,i.default)(e,["config"]));return l.default.createElement("div",(0,r.default)({id:"disqus_thread"},t))},t}(l.default.Component);t.default=u,u.propTypes={config:s.default.shape({identifier:s.default.string,title:s.default.string,url:s.default.string,language:s.default.string,remoteAuthS3:s.default.string,apiKey:s.default.string})}},8200:function(e,t,n){"use strict";var o=n(4836);var r=o(n(2605));t.h$=r.default,o(n(1254)).default,o(n(4294)).default,r.default},989:function(e,t,n){"use strict";var o=n(4836);t.__esModule=!0,t.insertScript=function(e,t,n){var o=window.document.createElement("script");return o.async=!0,o.src=e,o.id=t,n.appendChild(o),o},t.removeScript=function(e,t){var n=window.document.getElementById(e);n&&t.removeChild(n)},t.debounce=function(e,t,n){var o;return function(){for(var r=arguments.length,i=new Array(r),a=0;a<r;a++)i[a]=arguments[a];var l=this,s=function(){o=null,n||e.apply(l,i)},c=n&&!o;window.clearTimeout(o),o=setTimeout(s,t),c&&e.apply(l,i)}},t.isReactElement=a,t.shallowComparison=function e(t,n){var o,i=new Set(Object.keys(t).concat(Object.keys(n))),l=(o=[]).concat.apply(o,(0,r.default)(i)).filter((function(o){if("object"==typeof t[o]){if(e(t[o],n[o]))return!0}else if(t[o]!==n[o]&&!a(t[o]))return!0;return!1}));return 0!==l.length};var r=o(n(861)),i=o(n(7294));function a(e){return!!i.default.isValidElement(e)||!!Array.isArray(e)&&e.some((function(e){return i.default.isValidElement(e)}))}},6261:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return p}});var o=n(7294),r=n(1597),i=n(535),a=n(8200),l=function(e){var t={identifier:e.path,title:e.title};return o.createElement(o.Fragment,null,o.createElement(a.h$,{config:t}))},s=n(262),c=n(4317),u=n(4135),d=function(e){var t=e.children;return o.createElement(c.Z,null,o.createElement(u.o,null,t))},f=i.default.div.withConfig({displayName:"blog-post__Wrapper",componentId:"sc-i0xqqq-0"})(["padding:0 2rem;max-width:120rem;margin:0 auto;@media (max-width:450px){max-width:unset;margin:6rem auto 0;}"]),m=i.default.div.withConfig({displayName:"blog-post__PostBody",componentId:"sc-i0xqqq-1"})(["padding:2rem 0;.inform-container{font-size:1.9rem;min-height:20rem;margin-bottom:5rem;overflow:hidden;h1{font-size:13rem;letter-spacing:-0.3rem;line-height:1.2;word-break:keep-all;font-weight:900;color:",";}div{span:not(:first-child){font-weight:500;margin-left:1rem;a{color:",";&:hover{color:",";}}}}@media (max-width:450px){min-height:10rem;margin-bottom:1rem;h1{font-size:7rem;}}}.blog-post-content{max-width:102rem;margin:0 auto;line-height:1.8;font-size:1.9rem;letter-spacing:-0.1rem;h1,h2,h3,h4,h5{margin:2rem 0;}h1{color:#0070ff;font-size:4.5rem;}h2{font-size:3.8rem;}h3{font-size:3.2rem;}h4{font-size:2.4rem;}h5{font-size:1.8rem;}a{color:",";}p{margin:3rem 0;}ul{li{list-style:disc;ul{li{list-style:circle;}}}}ol{list-style:disc;counter-reset:li;li{position:relative;counter-increment:li;&:before{content:counter(li);color:",';display:inline-block;width:1em;margin-left:-1em;}&:after{position:absolute;bottom:0.6rem;left:0;content:".";color:black;display:inline-block;width:1em;margin:-0.7rem;}p{display:inline-block;}ul{counter-reset:unset;li{counter-increment:unset;}}}}blockquote{position:relative;word-break:keep-all;margin:1.2rem;padding:1rem 4rem;border-radius:0.2rem;background-color:',";&::after{position:absolute;top:0;left:0;width:0.8rem;height:100%;background-color:",';content:"";}}pre{margin:4rem 0;padding:1rem 2rem;background-color:#1b1e2b;border-radius:0.8rem;code{font-family:"JetBrains Mono",monospace;font-size:1.6rem;letter-spacing:-0.01rem;background-color:#1b1e2b;color:',";text-shadow:none;color:#75beff;.token{background-color:#1b1e2b;color:#cccccc;&.function{color:#75beff;}&.function-variable{color:#f07178;}&.keyword{color:#c792ea;}&.constant{color:#8002e6;}&.operator{color:#c792ea;}&.punctuation{color:#cccccc;}&.template-string{color:#80cbc4;}&.string{color:#c3e88d;}&.number{color:#f07178;}&.boolean{color:#ffad33;}&.comment{font-style:italic;color:#cccccc80;}.attr-name{color:#c792ea;}.tag{color:#f14c4c;}.class-name{color:#ffad33;}&.literal-property{color:#ffad33;&.property{color:#ffad33;}}}}}@media (max-width:450px){h1,h2,h3,h4,h5{line-height:1.2;}h1{font-size:3.8rem;}h2{font-size:3.4rem;}h3{font-size:3rem;}h4{font-size:2.4rem;}h5{font-size:1.8rem;}}}"],(function(e){return e.theme.hlColor_light}),(function(e){return e.theme.hlColor}),(function(e){return e.theme.compColor}),(function(e){return e.theme.hlColor}),(function(e){return e.theme.hlColor_dark}),(function(e){return e.theme.grayColor_light}),(function(e){return e.theme.hlColor_light}),(function(e){return e.theme.basicColor}));var p=function(e){var t=e.data.markdownRemark,n=t.frontmatter,i=t.html;return o.createElement(d,null,o.createElement(s.Z,{title:n.title}),o.createElement(f,null,o.createElement(m,{className:"blog-post"},o.createElement("div",{className:"inform-container"},o.createElement("h1",null,n.title),o.createElement("div",null,o.createElement("span",null,n.date),o.createElement("span",null,o.createElement(r.rU,{to:"/"},"목록")))),o.createElement("div",{className:"blog-post-content",dangerouslySetInnerHTML:{__html:i}})),o.createElement(l,{title:n.title,path:n.slug})))}},3897:function(e){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o},e.exports.__esModule=!0,e.exports.default=e.exports},3405:function(e,t,n){var o=n(3897);e.exports=function(e){if(Array.isArray(e))return o(e)},e.exports.__esModule=!0,e.exports.default=e.exports},434:function(e){function t(){return e.exports=t=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},e.exports.__esModule=!0,e.exports.default=e.exports,t.apply(this,arguments)}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports},9498:function(e){e.exports=function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)},e.exports.__esModule=!0,e.exports.default=e.exports},2281:function(e){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.__esModule=!0,e.exports.default=e.exports},7071:function(e){e.exports=function(e,t){if(null==e)return{};var n,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(r[n]=e[n]);return r},e.exports.__esModule=!0,e.exports.default=e.exports},861:function(e,t,n){var o=n(3405),r=n(9498),i=n(6116),a=n(2281);e.exports=function(e){return o(e)||r(e)||i(e)||a()},e.exports.__esModule=!0,e.exports.default=e.exports},6116:function(e,t,n){var o=n(3897);e.exports=function(e,t){if(e){if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(e,t):void 0}},e.exports.__esModule=!0,e.exports.default=e.exports}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-7b92d835bec7e2c9f358.js.map