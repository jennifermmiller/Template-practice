console.log('Take: 327,820,965,434');

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


$(document).ready(function(){
	//Add btn:
	$('.js-add-btn').click(function(){
		if (($('.js-description-input').val()) !== '') {
			var userInput = {
				description: $('.js-description-input').val()
			};
			todoArray.push(new TodoItem(userInput));

			$('.list-items').html('');
			_.each(todoArray, function(item) {
				$('.list-items').prepend(itemTemplate(item));
			});
			$('.js-description-input').val('');

			itemCount();
		}
	});

	//Complete btn:
	//Broken :( ... only works if it just has one task.
	//Somehow need a seperate tracker for each complete btn ...or, a different way to do this!		 
	var track = true;
	$('.list-items').on('click', '.js-complete-btn', function(event){
		event.preventDefault();
		
		var findParent = $(this).parent();
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
		//$('.list-items').html('');
		_.each(activeArray, function(item) {
			$('.list-items').prepend(itemTemplate(item));
		});
	});

	//Show only completed:
	$('.trackers').on('click', '.js-todo-completed', function(){
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