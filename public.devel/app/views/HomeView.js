/**
 * View Description
 * 
 * @langversion JavaScript
 * 
 * @author 
 * @since  
 */

var View     = require('core/View');
var template = require('templates/homeViewTemplate');
var Collection = require('core/Collection'); 

var HomeView = View.extend({
         
  	/*
   	 * @private
	 */
	id: 'home-view',
	/*
   	 * @private
   	*/
	template: template,

	currentNode:'c_1521',
	
	//--------------------------------------
  	//+ INHERITED / OVERRIDES
  	//--------------------------------------

	/*
	 * @private
	 */

	initialize: function() {
	    _.bindAll( this );
	    
	    console.log('type test');            
            console.log(typeof application);
            this.collection = new Collection();
            this.onNodeClick();
            this.collection.on('reset', this.onNodeClick, this);
	    // this.router = new Router();
    		
	},

	/*
	 * @private
	 */
	 
	events: {
	
		'click .related-click'	:		'onTriggerNodeClick',
		'click .breadcrumb-click':		'onBreadcrumbClick'
	},
	
	
	render: function() {
	    var self = this;	
            // self.router.navigate("api/getnarrowerconcepts/node", {trigger:true});

		return this;
	},
	
	
	
	onNodeClick: function() {
	    
	    var self = this, related, children, breadcrumb;
	    
	    
	    self.collection.url = '/api/getnarrowerconcepts?node='+ self.currentNode; // 'c_1521';
            self.collection.fetch({
              success: function(response,xhr) {
                 
                 // console.dir(response);
		
		 related = ( typeof response == 'object' ) ? related : [];
		 
		 console.dir(response);
		 
		 self.$el.html(self.template({
		  'relatedList': response.related,
		  'breadcrumb': 
		  [{
		    'name':'node1',
		    'id': 'node13'
		  },
		  {
		    'name':'node2',
		    'id': 'node125'
		  },
		  {
		    'name':'node3',
		    'id': 'node165'
		  }]
		}));

            },
            error: function (errorResponse) {
                console.log('error triggerNodeClick');
                // console.log(errorResponse)

		// console.dir (related);
		$(self.el).html( self.template({
		'relatedList': [{'name':'test', 'id':'test'}],
		'breadcrumb': [ 
		{
		  'name':'node1',
		  'id': 'node13'
		},
		{
		  'name':'node2',
		  'id': 'node125'
		},
		{
		  'name':'node3',
		  'id': 'node165'
		}]
		}));

              }
           });
	},
	
	initSearchBox: function(){
                // sURL = HMP.core.getCallURL('users_json');
                sURL = '/api'
                $("#selector").select2({
                        width: '80%',
                        placeholder: "Search ...",
                        allowClear: true,
                        minimumInputLength: 1,
                        ajax: { // instead of writing the function to execute the request we use Select2's convenient helper
                                url: sURL,
                                cache: true,
                                dataType : 'json',
                                data: function (term, page) {
                                    return {
                                       q: term
                                    };
                                },
                                results: function (data, page) {
                                    return {
                                       results: data
                                    };
                                   }
                                },
                                /*
                                formatResult: function(item) {
                                    return "aaa";
                                },
                                formatSelection: function(item) {
                                    return "bbbb";
                                },
                                id: function (obj) {
                                  return "aaaa";
                                },
                                */
                                dropdownCssClass: "bigdrop"
                                // escapeMarkup: function (m) { return m; } // we do not want to escape markup since we are displaying html in results
                        });
		
	},
	
	    
	//--------------------------------------
	//+ PUBLIC METHODS / GETTERS / SETTERS
	//--------------------------------------

	//--------------------------------------
	//+ EVENT HANDLERS
	//--------------------------------------
	
	onTriggerNodeClick: function () {
	    
	    alert('trigger test');
	},

	onBreadcrumbClick: function (e) {
	
	    e.stopImmediatePropagation();
	    
	    var dataId = $(e.currentTarget).data('id');
	    // var id = clickedEl.attr("id");
	    // $('#'+e.target.id).trigger('click');
	
	    console.log(dataId);
	    $('#'+dataId).trigger('click');
	    
	    //e.preventDefault();
	    //e.stopImmediatePropagation();
	    
	
	}

	
	//--------------------------------------
	//+ PRIVATE AND PROTECTED METHODS
	//--------------------------------------

});

module.exports = HomeView;

