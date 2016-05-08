app.factory('BulbStates', function(){
  var States = BulbStateSchema;

  function getValueOf(instance, state, entity){
    var entityOptions = States[state][entity];
    var value = entityOptions.off;
    if(instance[state]){
      value = entityOptions.on;
    }
    return value;
  };

  return {
    states: States,
    valueOf: getValueOf
  };
});

app.directive('bulbInsight', function(){
  return {
    restrict: 'E',
    templateUrl: 'client/products/bulb/insight.tpl.html',
    scope: {},
    controller: function($scope){
      $scope.bulbs = [{
        name: 'Bulb 1',
        reach: true,
        power: true,
        control: true
      }/*, {
        name: 'Bulb 2',
        reach: false,
        power: true,
        control: true
      }*/];
    }
  };
});

app.directive('bulb', function(BulbStates){
  return {
    restrict: 'E',
    templateUrl: 'client/products/bulb/instance.tpl.html',
    scope: { item: '=' },
    controller: function($scope){
      $scope.states = BulbStates.states;

      $scope.getStateValue = function(state, entity){
        return BulbStates.valueOf($scope.item, state, entity);
      };

    }
  };
});
