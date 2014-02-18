//temp todo model - until we learn more
var tempModel = {
	description:'Take a nap. I\'m sleepy!',
	complete: false,
	uniqueID: _.uniqueId('todo-')
}
var tempModel2 = {
	description:'Take a nap. I\'m sleepy!',
	complete: false,
	uniqueID: _.uniqueId('todo-')
}

//Backbone model that let's us do cool stuff:
var Todo = Backbone.Model.extend();

//Backbone view setup:
var TodoView = Backbone.View.extend({
	className: 'list-item',

	renderTemplate: _.template($('.item-template').text()),


	events: {
		"click .js-complete-btn" : "toggleComplete",
		"click .js-remove-btn" : "removeTodo",
		"click .js-edit-btn" : "edit"
	},

	initialize: function(){
		$('.list-items').prepend(this.el);
		this.render();

		this.listenTo(this.model, 'change', this.render);
	},

	render: function(){
		this.$el.html(this.renderTemplate(this.model.attributes));
	},

	toggleComplete: function(event){
		this.model.set('complete', !this.model.get('complete'));
		this.$el.toggleClass('completeClass');
	},

	removeTodo: function(){
		view.remove()
	},

	// edit: function(){
	// 	this.$el.addClass('edit-description');
	// }
})

var modelInstance = new Todo(tempModel);
var view = new TodoView({model: modelInstance});

var instTwo = new Todo(tempModel2);
var view = new TodoView({model: instTwo});