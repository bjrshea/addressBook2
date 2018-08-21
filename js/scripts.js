// BACKEND LOGIC
function Contact(first, last, email, phone, address) {
  this.firstName = (first);
  this.lastName = (last);
  this.email = (email);
  this.phone = (phone);
  this.addresses = [];
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

function NewAddress(street, city, state) {
  this.inputStreet = (street);
  this.inputCity = (city);
  this.inputState = (state);
}

NewAddress.prototype.fullAddress = function() {
  return this.inputStreet + ", " + this.inputCity + ", " + this.inputState;
}
// FRONT END LOGIC

function resetFields() {
  $("input#first-name").val("");
  $("input#last-name").val("");
  $("input#email").val("");
  $("input#phone").val("");
  $("input.street").val("");
  $("input.city").val("");
  $("input.state").val("")
  $(".addable").remove();
}

$(document).ready(function(){
  $("form#new-contact").submit(function(event){
    event.preventDefault();

    var inputtedFirstName = $("input#first-name").val();
    var inputtedLastName = $("input#last-name").val();
    var inputtedEmail = $("input#email").val();
    var inputtedPhone = $("input#phone").val();
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedEmail, inputtedPhone);

    $(".new-address").each(function() {
      var inputtedStreet = $(this).find("input.street").val();
      var inputtedCity = $(this).find("input.city").val();
      var inputtedState = $(this).find("input.state").val();
      var currentAddress = new NewAddress(inputtedStreet, inputtedCity, inputtedState);
      newContact.addresses.push(currentAddress);
    });

    $("ul#contacts").append("<li><span class='contacts'>" + newContact.fullName() + "</span></li>");

    $(".contacts").last().click(function(){
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.firstName);
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $(".email").text(newContact.email);
      $(".phone").text(newContact.phone);
      newContact.addresses.forEach(function(variable) {
        $(".full-address").append("<li>" + variable.fullAddress() + "</li>");
      });
    });
    resetFields();
  });
  $("#add").click(function() {
    $(".addable").append(
      '<div class="new-address">' +
        '<div class="form-group">' +
          '<label for="street">Street Address</label>' +
          '<input type="text" class="form-control street">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="city">City</label>' +
          '<input type="text" class="form-control city">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="state">State</label>' +
          '<input type="text" class="form-control state">' +
        '</div>' +
      '</div>');
  });
});
