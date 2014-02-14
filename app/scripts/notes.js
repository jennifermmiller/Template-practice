
//Original complete idea:
//Show physical traits of complete:
		// $(this).parent().toggleClass('complete');

		// //Find corresponding parent:
		// completedTodo = _.findWhere(todoArray, {uniqueID: $(this).parent().attr('id')});

		// //Remove completed item from todoArray and add it to completed array
		// //Need to somehow be able to toggle this as well...separate click events perphaps?
		// _.each(todoArray, function(item, index){
		// 	if(item.uniqueID == completedTodo.uniqueID) {
		// 		if( $(completedTodo).prop('complete') == false) {
		// 			$(completedTodo).prop('complete', true);
		// 		}

		// 		todoArray = _.reject(todoArray, function(item){
		// 			return item.uniqueID == completedTodo.uniqueID;
		// 		});

		// 		completedArray.push(completedTodo);
		// 	}
		// });

		// //Update item count: