(function(){"use strict";var e=typeof window!="undefined"?window:global;if(typeof e.require=="function")return;var t={},n={},r=function(e,t){return{}.hasOwnProperty.call(e,t)},i=function(e,t){var n=[],r,i;/^\.\.?(\/|$)/.test(t)?r=[e,t].join("/").split("/"):r=t.split("/");for(var s=0,o=r.length;s<o;s++)i=r[s],i===".."?n.pop():i!=="."&&i!==""&&n.push(i);return n.join("/")},s=function(e){return e.split("/").slice(0,-1).join("/")},o=function(t){return function(n){var r=s(t),o=i(r,n);return e.require(o,t)}},u=function(e,t){var r={id:e,exports:{}};return n[e]=r,t(r.exports,o(e),r),r.exports},a=function(e,s){var o=i(e,".");s==null&&(s="/");if(r(n,o))return n[o].exports;if(r(t,o))return u(o,t[o]);var a=i(o,"./index");if(r(n,a))return n[a].exports;if(r(t,a))return u(a,t[a]);throw new Error('Cannot find module "'+e+'" from '+'"'+s+'"')},f=function(e,n){if(typeof e=="object")for(var i in e)r(e,i)&&(t[i]=e[i]);else t[e]=n},l=function(){var e=[];for(var n in t)r(t,n)&&e.push(n);return e};e.require=a,e.require.define=f,e.require.register=f,e.require.list=l,e.require.brunch=!0})(),require.register("templates/homeViewTemplate",function(e,t,n){n.exports=Handlebars.template(function(e,t,n,r,i){return n=n||e.helpers,'    <!-- Fixed navbar -->\n    <div class="navbar navbar-default navbar-fixed-top">\n      <div class="container">\n        <div class="navbar-header">\n          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">\n            <span class="icon-bar"></span>\n            <span class="icon-bar"></span>\n            <span class="icon-bar"></span>\n          </button>\n          <a class="navbar-brand" href="#">Navigational Browser</a>\n        </div>\n        <div class="navbar-collapse collapse">\n          <ul class="nav navbar-nav">\n            <li class="active"><a href="#">Home</a></li>\n            <!--\n            <li><a href="#about">About</a></li>\n            <li><a href="#contact">Contact</a></li>\n            <li class="dropdown">\n              <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>\n              <ul class="dropdown-menu">\n                <li><a href="#">Action</a></li>\n                <li><a href="#">Another action</a></li>\n                <li><a href="#">Something else here</a></li>\n                <li class="divider"></li>\n                <li class="dropdown-header">Nav header</li>\n                <li><a href="#">Separated link</a></li>\n                <li><a href="#">One more separated link</a></li>\n              </ul>\n            </li>\n          -->\n        </ul>\n\n\n        <ul class="nav navbar-nav navbar-right">\n          <!--<li><a href="/tools">RDF Tools</a></li>-->\n          <!--<li><a href="/sparql">SPARQL Query Form</a></li>-->\n          <li><a href="#">SPARQL Query Form</a></li>          \n          <!--<li><a href="/signin">Sign in</a></li>-->\n            <!--\n            <li><a href="navbar-static-top/">Static top</a></li>\n            <li class="active"><a href="./">Fixed top</a></li>\n          -->\n        </ul>\n\n      </div><!--/.nav-collapse -->\n    </div>\n  </div>\n\n  <div class="container">\n\n    <!-- Main component for a primary marketing message or call to action -->\n    <div class="row">\n      <div id="breadcrumb" class="col-md-12">breadcrumb1 &raquo;  breadcrumb2 &raquo; breadcrumb3</div>\n    </div>\n    <div class="jumbotron">\n      <h2 class="h2 col-md-4">Navigational</h2>\n      <div class="col-md-4 log-area"><span class="label label-primary fade out" id="log"></span></div>\n      <p></p>\n      <!-- Navigational is loaded here -->       \n      <div id="infovis" class="draggable-parent">\n      <div id="spinner" class="text-center"> \n        <img src="/images/spinner.gif" height="66" width="66" style="width:66px;height:66px;" title="loading"/>\n      </div>\n      </div>    \n      <p></p>\n\n\n    <p id="form">\n      <a class="btn btn-primary" id="button">Reset View</a>\n      <a class="btn btn-default" target="_blank" href="https://github.com/ieru/kosa">Go to Documentation &raquo;</a>\n    </p>\n  </div>\n\n\n</div>\n</div> <!-- /container -->\n'})})