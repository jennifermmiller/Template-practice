/* global describe, it */

(function () {
    'use strict';

    describe('In this todo app', function () {
        describe('when the add button is clicked', function () {
            it('should add a new div when the input is populated', function () {
            	$('.js-description-input').val('Drink beer');
		        $('.add-todo').click();
				var firstTodoText = $('.todo-item').first().children('.description').text();
		   
				expect(firstTodoText).to.equal('Drink beer');
		   });
           
            it('should not add a new div when the input is empty', function(){
            	$('.js-description-input').val('');

		        expect(function(){$('.add-todo').click()}).to.throw(Error);
            });
        });

        describe('when the remove button is clicked', function(){
        	it('should remove the todo div', function(){
        	    $('.js-description-input').val('Drink beer');
		        $('.add-todo').click();
		        var divID = _.findWhere(todoArray, {uniqueID: $(this).parent().attr('id')});
		        $('.js-remove-btn').click();

		        //Not sure if this really checks for the removal of div
		        expect(function(){_.each(todoArray,function(item){return item.uniqueID == divID})}).to.equal(false);
		    });

        	it('should remove the object associated with that div from the todo array', function(){
        		//same as above???
        	});

        	it('should decrease the item count by one', function(){
        		$('.js-description-input').val('Drink beer');
		        $('.add-todo').click();
		        $('.js-remove-btn').click();

		        expect(todoArray.length).to.equal(0);
        	});
        });

        describe('complete button is clicked', function(){
        	it('should add a complete class to the todo div',);
        		$('.js-description-input').val('Drink beer');
		        $('.add-todo').click();
		        $('.js-complete-btn').click();

		        expect($('list-item').hasClass('completed')).to.equal(true);
        	it('should change the object\'s property of complete to true',);
        	it('should decrease the item count by one',);
        });

        describe('when the edit button is clicked,' function(){
	      	it('should turn the div space into an input field');
	      	it('should keep the previous data and focus it');
	      	it('should not change the object\'s place within the toDoList array');
	      	it('should save the corrected data when clicked again');
	      	it('should not affect the item count');
    });
    });
})();
