console.log('Take: 327,820,965,434');

//Declare variables:
var itemTemplate,
	todoList,
	userInput,
	completedTodo,
	completedArray,
	itemCount,
	removeComplete;

//Templates:
itemTemplate = _.template($('.item-template').text());

//Flesh out constructor:
function TodoItem (options) {
	options = options || {};
	this.description = options.description;
	this.complete = false;
	this.uniqueID = _.uniqueId('todo-');
};

todoArray = [];
completedArray = [];

//Functions:
itemCount = function(){
	var itemsTotal = todoArray.length;
	var itemsComplete = completedArray.length;
	var itemsPending = itemsTotal - itemsComplete;

	$('.js-todo-left').text('Item Count: ' + itemsTotal);
	$('.js-completed-clear').text('Clear Completed: ' + itemsComplete);

};

//add! click:
$(document).ready(function(){
	//What happens when the add btn is clicked:
	$('.js-add-btn').click(function(){
		
		//Save user data
		userInput = {
			description: $('.js-description-input').val()
		};
				
		todoArray.push(new TodoItem(userInput));

		//Clear list-item div
		$('.list-items').html('');

		//Iterate through todoArray to create list
		_.each(todoArray, function(item, index) {
			$('.list-items').prepend(itemTemplate(item));
		});

		//Clear input field
		$('.js-description-input').val('');

		//Update item count:
		itemCount();
	});

	//Complete btn:
	$('.list-items').on('click', '.js-complete-btn', function(){
		//Show physical traits of complete:
		$(this).parent().toggleClass('complete');

		//Find corresponding parent:
		completedTodo = _.findWhere(todoArray, {uniqueID: $(this).parent().attr('id')});

		//Remove completed item from todoArray and add it to completed array
		//Need to somehow be able to toggle this as well...separate click events perphaps?
		_.each(todoArray, function(item, index){
			if(item.uniqueID == completedTodo.uniqueID) {
				if( $(completedTodo).prop('complete') == false) {
					$(completedTodo).prop('complete', true);
				} 

				todoArray = _.reject(todoArray, function(item){
					return item.uniqueID == completedTodo.uniqueID;
				});

				completedArray.push(completedTodo);
			}
		});

		//Update item count:
		itemCount();
	});

	//Remove btn:
	$('.list-items').on('click', '.js-remove-btn', function(){
		//Visibly remove from page:
		$(this).parent().remove();

		//Find corresponding parent:
		removeTodo = _.findWhere(todoArray, {uniqueID: $(this).parent().attr('id')})
		
		//Remove item from todoArray:
		todoArray = _.reject(todoArray, function(item){
			return item.uniqueID == removeTodo.uniqueID;
		});

		//Update item count:
		itemCount();
	});


	//Ignoring edit, for now....

	//To clear completed tasks:
	$('.trackers').on('click', '.js-completed-clear', function(){
		
		removeComplete = _.findWhere(todoArray, {complete: $(this.parent().prop('complete') == true)});

		// _.each(todoArray, function(item, index) {
			
		// 	}
		// });
	})






});