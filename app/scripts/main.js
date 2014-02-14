console.log('Take: 327,820,965,434');
//Current problems:  
//todos losing complete class when toggling between lists
//Stupid f-ing complete btn/edit btn...somehow both need to do two things
//maybe make edit submit w/ enter keypress
//background on complete status?


//Template(s):
var itemTemplate = _.template($('.item-template').text());

//Constructor:
function TodoItem (options) {
	options = options || {};
	this.description = options.description;
	this.complete = false;
	this.uniqueID = _.uniqueId('todo-');
}

var todoArray = [];

//Functions:
var itemCount = function(){
	var pendingArray = _.where(todoArray, {complete: false});
	var completedArray = _.where(todoArray, {complete: true});

	var itemsComplete = completedArray.length;
	var itemsPending = pendingArray.length;

	$('.js-todo-left').empty().text('Item Count: ' + itemsPending);
	$('.js-completed-clear').empty().text('Clear Completed: ' + itemsComplete);
};

var addNewTodo = function(){
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
		}
	});

	$('.js-description-input').on('keypress', function(buttonPress){
		if(buttonPress.which === 13 && $(this).val !==('')){
			addNewTodo();
			itemCount();
		} 
	});

	//Complete btn:
	//Broken :( ... only works if it just has one task.
	//Somehow need a seperate tracker for each complete btn ...or, a different way to do this!		 
	var track = true;
	$('.list-items').on('click', '.js-complete-btn', function(event){
		event.preventDefault();
		
		var findParent = $(this).closest('.list-item');
		var completedTodo = _.findWhere(todoArray, {uniqueID: (findParent).attr('id')});

		var completeIsTrue = function() {
			(findParent).addClass('complete');
			_.each(todoArray, function(item){
				if(item.uniqueID === completedTodo.uniqueID) {
					item.complete = true;
				}
			});
		};

		var completeIsFalse = function() {
			(findParent).removeClass('complete');
			_.each(todoArray, function(item){
				if(item.uniqueID === completedTodo.uniqueID) {
					item.complete = false;
				}
			});
		};
		
		if (track) {
			completeIsTrue();
		} else {
			completeIsFalse();
		}

		track = !track;

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

	//Back to same problem as complete...how to do something different on every other click?!?
	$('.list-items').on('blur', '.js-edit-input', function(){
		var target = $(this);

		var parentLocation = (target).parent().parent().attr('id');
		var newDescription = (target).val();

		_.each(todoArray, function(item){
			if(item.uniqueID === parentLocation.uniqueID) {
				item.description === newDescription;
			}
		});

		(target).parent().siblings('.item-description').empty().html(newDescription);
		(target).parent().hide();
	});

	$('.js-edit-input').on('keypress', function(buttonPress){
		if(buttonPress.which === 13) {
			event.preventDefault();
			
			var target = $(this);

			var parentLocation = (target).parent().parent().attr('id');
			var newDescription = (target).val();

			_.each(todoArray, function(item){
				if(item.uniqueID === parentLocation.uniqueID) {
					item.description === newDescription;
				}
			});

			(target).parent().siblings('.item-description').empty().html(newDescription);
			(target).parent().hide();

			return false;
		}
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