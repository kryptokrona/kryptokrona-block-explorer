// Copyright (c) 2018, The TurtleCoin Developers
//
// Please see the included LICENSE file for more information.

var notification = document.getElementById("notification_container");
var identicon_widget = document.getElementById("address_identicon_widget");
var qr_widget = document.getElementById("address_qr_widget");
var details_container = document.getElementById("address_details");

function checkAddress() {

  notification.innerHTML = '';
  identicon_widget.innerHTML = '';
  qr_widget.innerHTML = '';
  details_container.innerHTML = '';

  var address = document.getElementById("address").value;
  var address_info = cnUtil.validate_address(address);
  
  if(!address_info.valid) {
    notification.innerHTML = '<div class="column is-12 notification has-text-centered">Invalid XKR address!</div>';
    return;
  }

  var icon = document.createElement("canvas");
  icon.width = 128;
  icon.height = 128;
  icon.setAttribute("data-jdenticon-value", address);
  jdenticon.update(icon);

  identicon_widget.appendChild(icon);

  var typeNumber = 0;
  var errorCorrectionLevel = 'L';

  // fix scaling for integrated qr codes
  

  // remove some unimportant info
  delete address_info.noprefix;
  details_container.innerHTML = JSON.stringify(address_info,null,2);
}
