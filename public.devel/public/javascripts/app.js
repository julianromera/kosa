(function(){"use strict";var e=typeof window!="undefined"?window:global;if(typeof e.require=="function")return;var t={},n={},r=function(e,t){return{}.hasOwnProperty.call(e,t)},i=function(e,t){var n=[],r,i;/^\.\.?(\/|$)/.test(t)?r=[e,t].join("/").split("/"):r=t.split("/");for(var s=0,o=r.length;s<o;s++)i=r[s],i===".."?n.pop():i!=="."&&i!==""&&n.push(i);return n.join("/")},s=function(e){return e.split("/").slice(0,-1).join("/")},o=function(t){return function(n){var r=s(t),o=i(r,n);return e.require(o,t)}},u=function(e,t){var r={id:e,exports:{}};return n[e]=r,t(r.exports,o(e),r),r.exports},a=function(e,s){var o=i(e,".");s==null&&(s="/");if(r(n,o))return n[o].exports;if(r(t,o))return u(o,t[o]);var a=i(o,"./index");if(r(n,a))return n[a].exports;if(r(t,a))return u(a,t[a]);throw new Error('Cannot find module "'+e+'" from '+'"'+s+'"')},f=function(e,n){if(typeof e=="object")for(var i in e)r(e,i)&&(t[i]=e[i]);else t[e]=n},l=function(){var e=[];for(var n in t)r(t,n)&&e.push(n);return e};e.require=a,e.require.define=f,e.require.register=f,e.require.list=l,e.require.brunch=!0})(),require.register("Application",function(e,t,n){var r={initialize:function(){var e=t("views/HomeView"),n=t("routers/ApplicationRouter");this.homeView=new e,this.applicationRouter=new n,typeof Object.freeze=="function"&&Object.freeze(this)}};n.exports=r}),require.register("config/ApplicationConfig",function(e,t,n){var r=function(){var e="/";return{BASE_URL:e}}.call();n.exports=r}),require.register("core/Collection",function(e,t,n){var r=Backbone.Collection.extend({});n.exports=r}),require.register("core/Model",function(e,t,n){var r=Backbone.Model.extend({});n.exports=r}),require.register("core/Router",function(e,t,n){var r=Backbone.Router.extend({routes:{},initialize:function(e){}});n.exports=r}),require.register("core/View",function(e,t,n){var r=Backbone.View.extend({template:function(){},initialize:function(){_.bindAll(this)},render:function(){return this.$el.html(this.template()),this}});n.exports=r}),require.register("events/Event",function(e,t,n){var r={APPLICATION_INITIALIZED:"onApplicationInitialized"};n.exports=r}),require.register("helpers/ViewHelper",function(e,t,n){Handlebars.registerHelper("link",function(e,t){e=Handlebars.Utils.escapeExpression(e),t=Handlebars.Utils.escapeExpression(t);var n='<a href="'+t+'">'+e+"</a>";return new Handlebars.SafeString(n)})}),require.register("initialize",function(e,t,n){var r=t("Application");$(function(){r.initialize(),Backbone.history.start(),init(),r.homeView.initSelect2()})}),require.register("routers/ApplicationRouter",function(e,t,n){var r=t("core/Router"),i=t("Application"),s=r.extend({routes:{"":"home"},home:function(){$("body").html(i.homeView.render().el)}});n.exports=s}),require.register("utils/BackboneView",function(e,t,n){var r=t("core/View"),i=t("templates/HomeViewTemplate"),s=r.extend({id:"view",template:i,initialize:function(){this.render=_.bind(this.render,this)},render:function(){return this.$el.html(this.template({content:"View Content"})),this}});n.exports=s}),require.register("views/HomeView",function(e,t,n){var r=t("core/View"),i=t("templates/homeViewTemplate"),s=r.extend({id:"home-view",template:i,initialize:function(){_.bindAll(this)},events:{"click .navbar-brand":"drawCanvas"},render:function(){return this.$el.html(this.template({})),this},initSelect2:function(){$("#selector").select2({placeholder:"Search for a movie",minimumInputLength:1,ajax:{url:"http://api.rottentomatoes.com/api/public/v1.0/movies.json",dataType:"jsonp",data:function(e,t){return{q:e,page_limit:10,apikey:"ju6z9mjyajq2djue3gbvv26t"}},results:function(e,t){return{results:e.movies}}},initSelection:function(e,t){var n=$(e).val();n!==""&&$.ajax("http://api.rottentomatoes.com/api/public/v1.0/movies/"+n+".json",{data:{apikey:"ju6z9mjyajq2djue3gbvv26t"},dataType:"jsonp"}).done(function(e){t(e)})},formatResult:movieFormatResult,formatSelection:movieFormatSelection,dropdownCssClass:"bigdrop",escapeMarkup:function(e){return e}})}});n.exports=s})