var ItemModel = Backbone.Model.extend({

	
});
var ItemCollection = Backbone.Collection.extend({
	model : ItemModel
});
var ItemView = Backbone.View.extend({

	// el : $('.item-wrap'),
	template : _.template($('#itemViewTemplate').html()),

	initialize : function(model){

		this.model = model;
	},
	render :function(){

		this.$el.append( this.template(this.model) );
		return this;
	}

});
var AppView = Backbone.View.extend({

	el : '.item-wrap',

	initialize : function(){

		this.collection = new ItemCollection();
		this.listenTo(this.collection, "reset", this.render );
		
		this.collection.url = 'data/20130516.js';
		this.collection.fetch({reset:true});
	},
	render : function(){

		console.log(this.collection.models)

		this.collection.each(function(item){
			this.$el.append( new ItemView(item).render().el );
		}.bind(this));

	}

});

new AppView();