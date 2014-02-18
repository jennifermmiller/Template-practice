//temp todo model - until we learn more
var tempModel = {
	description:'Take a nap. I\'m sleepy!',
	complete: false,
	uniqueID: _.uniqueId('todo-')
};

//Backbone model that let's us do cool stuff:
var Todo = Backbone.Model.extend();

//Backbone view setup for each todo item:
var TodoView = Backbone.View.extend({
	className: 'list-item',

	renderTemplate: _.template($('.item-template').text()),


	events: {
		'click .js-complete-btn' : 'toggleComplete',
		'click .js-remove-btn' : 'clear',
		// 'click .js-edit-btn' : 'edit',
		'dblclick .js-item-description' : 'edit',

		//May need to alter these two:
		'keypress .js-edit-description ' : 'updateOnEnter',
		'blur .js-edit-description' : 'close'
	},

	initialize: function(){
		$('.list-items').prepend(this.el);
		this.render();

		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
	},

	render: function(){
		this.$el.html(this.renderTemplate(this.model.attributes));
	},

	toggleComplete: function(event){
		this.model.set('complete', !this.model.get('complete'));
		this.$el.toggleClass('completeClass');
	},

	clear: function(){
		this.model.destroy();
	},

	// edit: function(){
	// 	this.$el.addClass('edit-description');
	// }
});

var modelInstance = new Todo(tempModel);
var view = new TodoView({model: modelInstance});


//In order to setup add btn...I think we might need a collection?
// var AppView = Backbone.View.extend({
// 	el: $('.app-space'),

// 	events: {
// 		'click .js-add-btn' : 'createNewItem',
// 	},

// 	initialize: function(){
// 		this.input = this.$('.js-description-input');

// 		this.listenTo(Todos)
// 	}
// })














