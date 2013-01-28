function TodoCtrl ($scope, $location, filterFilter ) {
    var todos = $scope.todos = [];

    $scope.newTodo = "";
    $scope.editedTodo = null;

    $scope.addTodo = function () {
        var newTodo = $scope.newTodo.trim();
        if (newTodo) {
            todos.unshift({
                title: newTodo,
                completed: false
            });
            $scope.newTodo = '';
        }
    };

    $scope.removeTodo = function (todo) {
        todos.splice(todos.indexOf(todo), 1);
    };

    $scope.editTodo = function (todo) {
        $scope.editedTodo = todo;
    };

    $scope.doneEditing = function (todo) {
        $scope.editedTodo = null;
        if (!todo.title ) {
            $scope.removeTodo(todo);
        }
    };

    $scope.$watch('todos', function () {
        $scope.remainingCount = filterFilter(todos, {completed: false}).length;
        $scope.doneCount = todos.length - $scope.remainingCount;
        $scope.allChecked = !$scope.remainingCount;
    }, true);

    if ($location.path() === '') {
        $location.path('/');
    }

    $scope.location = $location;

    $scope.$watch('location.path()', function (path) {
        console.log(path);
        $scope.statusFilter = (path == '/active') ? { completed: false } : (path == '/completed') ? { completed: true } : null;
    });

    $scope.markAll = function (done) {
        todos.forEach(function (todo) {
            todo.completed = done;
        });
    };

    $scope.clearDone = function () {
        $scope.todos = todos = todos.filter(function (val) {
            return !val.completed;
        })
    };
}