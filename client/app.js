var app = angular.module('app', ['ngMaterial']);

app.factory('Socket', function(){
  return io();
});

app.factory('Hue', function(Socket){
  var events = (function(){
    var topics = {};
    var hOP = topics.hasOwnProperty;

    return {
      subscribe: function(topic, listener) {
        if(!hOP.call(topics, topic)) topics[topic] = [];
        var index = topics[topic].push(listener) -1;
        return {
          remove: function() {
            delete topics[topic][index];
          }
        };
      },
      publish: function(topic, info) {
        if(!hOP.call(topics, topic)) return;
        topics[topic].forEach(function(item) {
            item(info != undefined ? info : {});
        });
      }
    };
  })();

  Socket.on('lights', function(lights){
    _.forOwn(lights, function(light, key){
      light.index = key;
    });
    events.publish('/lights', lights);
  });

  var dummyBulbs = [{
    name: 'Bulb 1',
    state: {
      reachable: true,
      on: true,
      control: true
    }
  }];

  return {
    onLights: function(cb){
      events.subscribe('/lights', cb);
    },
    onVerify: function(cb){
      events.subscribe('/verify', cb);
    },
    dummyBulbs: dummyBulbs
  };
});
