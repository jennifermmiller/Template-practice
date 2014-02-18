console.log('Take: 327,820,965,434');
//Current problems:  
//todos losing complete class when toggling between lists
//Better way to do the lists?
//Stupid complete btn/edit btn...somehow both need to do two things
//maybe make edit submit w/ enter keypress

//Template(s):
var itemTemplate = _.template($('.item-template').text());

//Constructor:
function TodoItem (options) {
	options = options || {};
	this.description = options.description || 'No task? That\'s not helpful!';
	this.complete = false;
	this.uniqueID = _.uniqueId('todo-');
}

var todoArray = [];

//Functions:
function itemCount(){
	var pendingArray = _.where(todoArray, {complete: false});
	var completedArray = _.where(todoArray, {complete: true});

	var itemsComplete = completedArray.length;
	var itemsPending = pendingArray.length;

	$('.js-todo-left').empty().text('Item Count: ' + itemsPending);
	$('.js-completed-clear').empty().text('Clear Completed: ' + itemsComplete);
};

function addNewTodo(){
	var userInput = {
		description: $('.js-description-input').val()
	};

	todoArray.push(new TodoItem(userInput));

	$('.list-items').html('');
	_.each(todoArray, function(item) {
		$('.list-items').prepend(itemTemplate(item));
	});
	$('.js-description-input').val('');
};


$(document).ready(function(){
	$('.js-description-input').bind({
		mouseenter: function(){
			$(this).focus();
		},
		mouseleave: function(){
			$(this).blur();
		}
	});

	$('.js-add-btn').click(function(){
		if (($('.js-description-input').val()) !== '') {
			addNewTodo();
			itemCount();
		} else {
			throw new Error('You must enter a todo item.');
		}
	});

	$('.js-description-input').on('keypress', function(buttonPress){
		if(buttonPress.which === 13 && $(this).val !==('')){
			addNewTodo();
			itemCount();
		} else {
			throw new Error('You must enter a todo item.');
		}
	});

	//Complete btn:
	//Broken :( 
	//Somehow need a seperate tracker for each complete btn ...or, a different way to do this!		 
	//A solution...but not exactly what I wanted to do
	$('.list-items').on('click', '.js-complete-btn', function(){
		$(this).siblings('.complete-description').show();
		$(this).parent().addClass('complete');

		var completedTodo = _.findWhere(todoArray, {uniqueID: $(this).parent().attr('id')});
		completedTodo.complete = true;

		itemCount();
	});
			
	$('.list-items').on('click', '.complete-description', function(){
		$(this).hide();
		$(this).parent().removeClass('complete');

		var incompleteTodo = _.findWhere(todoArray, {uniqueID: $(this).parent().attr('id')});
		incompleteTodo.complete = false;

		itemCount();
	});

	//Edit btn:
	$('.list-items').on('click', '.js-edit-btn', function(){
		$(this).siblings('.js-edit-description').show();
		$(this).siblings().children('.js-edit-input').focus();
	});

	$('.list-items').on('dblclick', '.item-description', function(){
		$(this).siblings('.js-edit-description').show();
		$(this).siblings().children('.js-edit-input').focus();
	});

	//Using blur for now...Back to same problem as complete...how to do something different on every other click?!?
	$('.list-items').on('blur', '.js-edit-input', function(){
		var target = $(this);

		var newDescription = (target).val();

		var completedTodo = _.findWhere(todoArray, {uniqueID: (target).closest('.list-item').attr('id')});
		completedTodo.description = newDescription;
		
		(target).parent().siblings('.item-description').empty().html(newDescription);
		(target).parent().hide();
	});
		
	//Remove btn:
	$('.list-items').on('click', '.js-remove-btn', function(){
		var removeTodo = _.findWhere(todoArray, {uniqueID: $(this).parent().attr('id')});
		$(this).parent().remove();
		todoArray = _.reject(todoArray, function(item){
			return item.uniqueID === removeTodo.uniqueID;
		});
		itemCount();
	});

	//Show all:
	$('.trackers').on('click', '.js-todo-all', function(){
		$('.list-items').html('');
		_.each(todoArray, function(item) {
			$('.list-items').prepend(itemTemplate(item));
		});
	});

	//Show only active:
	$('.trackers').on('click', '.js-todo-active', function(){
		var activeArray = _.where(todoArray, {complete: false});
		$('.list-items').html('');
		_.each(activeArray, function(item) {
			$('.list-items').prepend(itemTemplate(item));
		});
	});

	//Show only completed:
	$('.trackers').on('click', '.js-todo-complete', function(){
		var completeArray = _.where(todoArray, {complete: true});
		$('.list-items').html('');
		_.each(completeArray, function(item) {
			$('.list-items').prepend(itemTemplate(item));
		});
	});

	//Clear completed tasks:
	$('.trackers').on('click', '.js-completed-clear', function(){
		todoArray = _.reject(todoArray, function(item){
			return item.complete === true;
		});
		$('.list-items').html('');
		_.each(todoArray, function(item) {
			$('.list-items').prepend(itemTemplate(item));
		});
		itemCount();
	});
});