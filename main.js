Messages = new Mongo.Collection("messages");

/*
 * because the current file is not in a folder called 'client'
 * we have to precise that it is client side code only
 */
if (Meteor.isClient){

    // messages helpers
    Template.messages.helpers({
      messages: function(){
         return Messages.find({});
      }
    });

    // input events
    Template.input.events({
      'submit .new-msg': function(event, template) {

        event.preventDefault();

          Messages.insert( {
            text: event.target.msg.value,
            timestamp: new Date(),
            owner: Meteor.user().username,
            avatar: Meteor.user().username + '.png'
          });

          event.target.msg.value = null;
      }
    })

    // to be able to use momentjs add the package:
    //    meteor add momentjs:moment
    // Template.message.helpers( {
    //   // ES6 notation :)
    //   // see how we override the timestamp and access the message.timestamp value within the helper
    //   'timestamp': () => { return moment(this.data).format('Do MMM [at] HH:mm a')}
    // });

    // meteor add accounts-password accounts-ui
    // if USERNAME_ONLY not specified then create account will require an email as login
    Accounts.ui.config({
      passwordSignupFields: "USERNAME_ONLY"
    });

}
