(this.webpackJsonpproje=this.webpackJsonpproje||[]).push([[0],{83:function(e,t,a){e.exports=a(96)},96:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(32),c=a.n(l),o=(a(88),a(78)),i=a(38),s=a(11),u=a(12),m=a(13),g=a(14),h=a(44),d=r.a.createContext(),p=function(e){Object(g.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={results:[],currentPage:1,resultPerPage:18,pageNumbers:[],loading:!1,resultStateMessage:"Please search something!",availableCheckboxes:["gittigidiyor","hepsiburada","n11","amazon"]},e}return Object(u.a)(a,[{key:"componentDidMount",value:function(){this.setState({pageNumbers:Object(h.a)(Array(Math.ceil(this.state.results.length/this.state.resultPerPage)+1).keys()).slice(1)})}},{key:"render",value:function(){var e=this;return r.a.createElement(d.Provider,{value:{state:this.state,test:function(){return console.log("test")},onSubmit:function(t){t.preventDefault();var a=t.target,n=a.query,r=a.gittigidiyor,l=a.hepsiburada,c=a.n11,o=a.amazon,i=a.lowerPrice,s=a.higherPrice;e.setState({results:[],pageNumbers:[],loading:!0,resultStateMessage:"Loading..."});var u={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:null==n.value?"":n.value,hepsiburada:null!=l&&l.checked,gittigidiyor:null!=r&&r.checked,n11:null!=c&&c.checked,amazon:null!=o&&o.checked,price_low:null==i?0:parseInt(i.value),price_high:null==s?9999999999:parseInt(s.value)})};fetch("/",u).then((function(e){return e.text()})).then((function(t){console.log(JSON.parse(t)),e.setState({results:JSON.parse(t),loading:!1,pageNumbers:Object(h.a)(Array(Math.ceil(JSON.parse(t).length/e.state.resultPerPage)+1).keys()).slice(1)}),0===JSON.parse(t).length?e.setState({resultStateMessage:"Nothing found with '".concat(n.value,"'")}):e.setState({resultStateMessage:"",currentPage:1})})).catch((function(t){console.log(t),e.setState({results:t.toString(),loading:!1})}))},changePage:function(t){e.setState({currentPage:t})},changeResultPerPage:function(t){e.setState({resultPerPage:t,pageNumbers:Object(h.a)(Array(Math.ceil(e.state.results.length/t)+1).keys()).slice(1)})}}},this.props.children)}}]),a}(n.Component),b=a(101),f=a(108),y=a(102),E=a(69),v=a(71),j=a(103),k=a(70),S=function(e){Object(g.a)(a,e);var t=Object(m.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement(d.Consumer,null,(function(t){return r.a.createElement(b.a,null,r.a.createElement(f.a,{onSubmit:t.onSubmit},r.a.createElement(y.a,{className:"mb-3"},r.a.createElement(E.a,{id:"query",placeholder:"Search",required:!0,autoFocus:!0}),r.a.createElement(y.a.Append,null,r.a.createElement(v.a,{type:"submit",variant:"primary"},"Search"))),r.a.createElement(j.a,null,r.a.createElement(k.a,null,e.context.state.availableCheckboxes.map((function(e){return r.a.createElement(f.a.Check,{className:"text-light",key:e,type:"checkbox",id:e,label:e,inline:!0,defaultChecked:!0})}))),r.a.createElement(k.a,{className:"mb-1",md:"4"},r.a.createElement(B,null)),r.a.createElement(k.a,{md:"auto"}))))}))}}]),a}(n.Component);S.contextType=d;var O=a(110),w=a(109),x=function(e){Object(g.a)(a,e);var t=Object(m.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){return r.a.createElement(O.a,{sticky:"top",bg:"dark",expand:"lg",variant:"dark"},r.a.createElement(O.a.Brand,{href:"/"},"Web Crawl"),r.a.createElement(O.a.Toggle,{"aria-controls":"basic-navbar-nav"}),r.a.createElement(O.a.Collapse,{id:"basic-navbar-nav"},r.a.createElement(w.a,null,r.a.createElement(w.a.Link,{href:"/suggestion"},"Suggestion"),r.a.createElement(w.a.Link,{href:"/about"},"About"))))}}]),a}(n.Component),C=a(107),N=function(e){Object(g.a)(a,e);var t=Object(m.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){var e=this.props,t=e.setShow,a=e.handleClose,n=e.title,l=e.description;return r.a.createElement(C.a,{show:t,onHide:a},r.a.createElement(C.a.Header,{closeButton:!0},r.a.createElement(C.a.Title,null,n)),r.a.createElement(C.a.Body,null,l),r.a.createElement(C.a.Footer,null,r.a.createElement(v.a,{variant:"secondary",onClick:a},"Close")))}}]),a}(n.Component),P=a(104),T=a(105),L=a(61),I=function(e){Object(g.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={sortMethods:["Low to High","High to Low"],sortTitle:"Low to High"},e}return Object(u.a)(a,[{key:"render",value:function(){var e=this,t=this.context.state,a=t.currentPage,n=t.resultPerPage,l=t.results,c=t.loading,o=t.resultStateMessage,i=[15,25,50,100,500],s=this.state,u=s.sortTitle,m=s.sortMethods;if(typeof l!=typeof[])return r.a.createElement("center",{className:"justify-content-center text-light"},r.a.createElement("div",{className:"text-light"},r.a.createElement("h1",null,"Backend didn't respond"),r.a.createElement("h1",null,l)));var g=Object(h.a)(l);g.sort((function(e,t){return e.price-t.price})),u===m[1]&&g.reverse();var d=a*n,p=d-n,b=g.slice(p,d);return 0===l.length?r.a.createElement("center",{className:"justify-content-center text-light"},!0===c?r.a.createElement(P.a,{animation:"border",role:"status"}):"",r.a.createElement("div",{className:"text-light"},o)):r.a.createElement(r.a.Fragment,null,r.a.createElement(j.a,{className:"row d-flex",style:{margin:"0.7rem"}},r.a.createElement(k.a,{className:"text-center w-10"},r.a.createElement(T.a,{title:"Result Per Page"},i.map((function(t,a){return r.a.createElement(L.a.Item,{eventKey:a,key:a,active:18===t,onClick:function(){return e.context.changeResultPerPage(t)}},t)})))),r.a.createElement(k.a,{className:"text-center"},r.a.createElement(T.a,{title:u},m.map((function(t,a){return r.a.createElement(L.a.Item,{eventKey:a,key:a,active:t===u,onClick:function(){return e.setState({sortTitle:t})}},t)}))))),r.a.createElement(j.a,{className:"row d-flex justify-content-center",style:{margin:"0rem"}},b.map((function(e,t){return r.a.createElement(H,{key:t,title:e.title,price:e.price,link:e.link,img:e.img,website:e.website})}))))}}]),a}(n.Component);I.contextType=d;var M=a(111),H=function(e){Object(g.a)(a,e);var t=Object(m.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){var e;return r.a.createElement(M.a,{className:"text-center",style:{width:"13.4rem",margin:"0.1rem",padding:"0.1rem",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}},r.a.createElement(M.a.Body,{style:{display:"flex",padding:"0.3rem",alignItems:"center",alignContent:"center"}},r.a.createElement(M.a.Img,{className:"zoom border border-primary rounded",style:{width:"5rem",marginRight:"0.2rem"},src:this.props.img||"img.jpg"}),r.a.createElement(M.a.Title,{style:{fontSize:(e=this.props.title,e.length>20?15:25)}},this.props.title||"title")),r.a.createElement(M.a.Text,null,this.props.price||"???"," TL"),r.a.createElement(M.a.Link,{className:"btn btn-primary btn-block align-self-end",target:"_blank",rel:"noopener noreferrer",href:this.props.link},"Go to ",this.props.website||"website"))}}]),a}(n.Component),A=a(112),_=function(){return r.a.createElement(d.Consumer,null,(function(e){return r.a.createElement(A.a,{hidden:1===e.state.pageNumbers.length},e.state.pageNumbers.map((function(t){return r.a.createElement(A.a.Item,{active:t===e.state.currentPage,key:t,onClick:function(){return e.changePage(t)}},t)})))}))},B=function(e){Object(g.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={dropdownText:"Between",dropdownItems:["Between","Lower Than","Higher Than"]},e}return Object(u.a)(a,[{key:"render",value:function(){var e=this,t=this.state,a=t.dropdownText,n=t.dropdownItems;return r.a.createElement(y.a.Text,{style:{padding:"0"}},r.a.createElement(y.a.Prepend,null,r.a.createElement(T.a,{title:a},n.map((function(t,n){return r.a.createElement(L.a.Item,{key:n,eventKey:n,active:a===t,onClick:function(){return e.setState({dropdownText:t})}},t)})))),a===n[0]?r.a.createElement(r.a.Fragment,null,r.a.createElement(E.a,{type:"number",id:"lowerPrice",placeholder:"0",required:!0,defaultValue:"0"}),r.a.createElement(E.a,{type:"number",id:"higherPrice",placeholder:"9999",required:!0,defaultValue:"99999"})):a===n[1]?r.a.createElement(r.a.Fragment,null,r.a.createElement(E.a,{type:"number",id:"lowerPrice",placeholder:"99999",required:!0,defaultValue:"99999"})):a===n[2]?r.a.createElement(r.a.Fragment,null,r.a.createElement(E.a,{type:"number",id:"higherPrice",placeholder:"0",required:!0,defaultValue:"0"})):void 0)}}]),a}(n.Component),q=function(e){Object(g.a)(a,e);var t=Object(m.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){return r.a.createElement(p,null,r.a.createElement(b.a,{fluid:!0},r.a.createElement(S,null),r.a.createElement("br",null),r.a.createElement(I,null),r.a.createElement("br",null),r.a.createElement("div",{className:"row d-flex justify-content-center"},r.a.createElement(_,null))))}}]),a}(n.Component),z=function(e){Object(g.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={setShow:!1,suggestionControl:{display:"none"},suggestionLength:0,placeHolder:"Min 10 characters"},e.suggestionHandle=function(t){t.preventDefault();var a=t.target,n=a.email,r=a.suggestion;if(null!=r)if(r.value>300)e.setState({suggestionControl:{display:"block"},placeHolder:"Suggestion can't be more than 300 characters"});else if(r.value.length<10)e.setState({suggestionControl:{display:"block",placeHolder:"Min 10 characters"}});else{console.log(n.value,r.value);var l={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:null==n.value?"":n.value,suggestion:null!=r.value&&r.value})};fetch("/suggestion",l),e.handleShow()}else e.setState({suggestionControl:{display:"block"},placeHolder:"Suggestion can't be empty"})},e.handleClose=function(){window.location="/"},e.handleShow=function(){e.setState({setShow:!0})},e.suggestionLength=function(){e.setState({suggestionLength:document.getElementById("suggestion").value.length})},e}return Object(u.a)(a,[{key:"componentDidMount",value:function(){document.title+=" Suggestion",document.getElementById("suggestion").value=""}},{key:"render",value:function(){var e=this,t=this.state,a=t.setShow,n=t.suggestionLength,l=t.suggestionControl,c=t.placeHolder;return r.a.createElement("div",{className:"container align-middle"},r.a.createElement(N,{setShow:a,handleClose:this.handleClose,title:"Thank you!",description:"Your suggestion has been received."}),r.a.createElement(f.a,{className:"align-middle",onSubmit:this.suggestionHandle},r.a.createElement(f.a.Group,{controlId:"email"},r.a.createElement(f.a.Label,null,"Email address"),r.a.createElement(f.a.Control,{type:"email",placeholder:"Enter email (optional)"})),r.a.createElement(f.a.Group,{controlId:"suggestion"},r.a.createElement(f.a.Label,null,"Your Suggestion:"),r.a.createElement(f.a.Control,{as:"textarea",rows:"3",placeholder:c,required:!0,maxLength:"300",onChange:this.suggestionLength}),r.a.createElement("p",{className:"d-flex justify-content-end",role:"alert"},n,"/300"),r.a.createElement("div",{className:"alert alert-danger",style:l},c,r.a.createElement(v.a,{className:"close",onClick:function(){return e.setState({suggestionControl:{display:"none"}})},"aria-label":"Close"},r.a.createElement("span",{"aria-hidden":"true"},"\xd7")))),r.a.createElement(v.a,{variant:"primary",type:"submit",block:!0},"Submit")))}}]),a}(n.Component),J=function(e){Object(g.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={name:"Emre \xd6zincegedik",school_number:"185050801",email:"ug.emre.ozincegedik@toros.edu.tr",project_teacher:"Furkan G\xf6z\xfckara",project_teacher_email:"furkan.gozukara@toros.edu.tr"},e}return Object(u.a)(a,[{key:"componentDidMount",value:function(){document.title+=" About"}},{key:"render",value:function(){var e=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"text-light";return r.a.createElement("p",{className:t,style:F.textAlignment},e)};return r.a.createElement("div",{style:F.center},r.a.createElement("div",null,r.a.createElement("h2",null,e(this.state.name)),e("School no: "+this.state.school_number),e(this.state.email),r.a.createElement("hr",{className:"style2"}),r.a.createElement("h5",null,e("This project is done for mvc class using Node.js, React, Express, MySQL")),e("Project teacher: ".concat(this.state.project_teacher)),e("Project teacher email: ".concat(this.state.project_teacher_email))))}}]),a}(n.Component),F={textAlignment:{display:"flex",justifyContent:"center",alignItems:"center"},center:{minHeight:"80vh",display:"flex",alignItems:"center",justifyContent:"center"}};var D=function(){return r.a.createElement(o.a,null,r.a.createElement(x,null),r.a.createElement("br",null),r.a.createElement(i.a,{path:"/",exact:!0,component:q}),r.a.createElement(i.a,{path:"/suggestion",exact:!0,component:z}),r.a.createElement(i.a,{path:"/about",exact:!0,component:J}))};c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(D,null)),document.getElementById("root"))}},[[83,1,2]]]);
//# sourceMappingURL=main.a1334555.chunk.js.map