// Copyright (c) 2020, Kryptokrona Developers
//
// Please see the included LICENSE file for more information.

var show_generate = function() {
  document.getElementById("generateDiv").style.display = "block";
  document.getElementById("restoreDiv").style.display = "none";
  document.getElementById("step2").style.display = "none";
  document.getElementById("step3").style.display = "none";
  document.getElementById("step4").style.display = "none";
};

var show_restore = function() {
  document.getElementById("restoreDiv").style.display = "block";
  document.getElementById("generateDiv").style.display = "none";
  document.getElementById("step2").style.display = "none";
  document.getElementById("step3").style.display = "none";
  document.getElementById("step4").style.display = "none";

};

var getStringWords = function(string) {
  return string.replace(/^\s*(.*)\s*$/, '$1').replace(/\s+/, ' ').split(' ');
};

var genkeys = function(additional_entropy, lang) {
  var seed = cnUtil.sc_reduce32(poor_mans_kdf(additional_entropy + cnUtil.rand_32()));
  var keys = cnUtil.create_address(seed);
  var passPhrase = mn_encode(seed, lang);
  return {
    keys: keys,
    mnemonic: passPhrase
  }
};

var restore_keys = function(lang) {
  var seed_phrase = document.getElementById("seed_phrase").value;
  var seed = mn_decode(seed_phrase);
  var keys = cnUtil.create_address(seed);

  address_widget.innerHTML = keys.public_addr;
  mnemonic_widget.innerHTML = seed_phrase;
  spend_key_widget.innerHTML = keys.spend.sec;
  view_key_widget.innerHTML = keys.view.sec;

  document.getElementById("step2").style.display = "block";
  document.getElementById("step3").style.display = "block";
  document.getElementById("step4").style.display = "block";

};

var genwallet = function(lang) {
  document.getElementById("step2").style.display = "block";
  document.getElementById("step3").style.display = "block";
  document.getElementById("step4").style.display = "block";

  var spend_key_widget = document.getElementById("spend_key_widget");
  var view_key_widget = document.getElementById("view_key_widget");
  var address_widget = document.getElementById("address_widget");
  var user_entropy_widget = document.getElementById("user_entropy_widget");



  var res = genkeys(user_entropy_widget.value, lang);
  var keys = res.keys;
  var mnemonic = res.mnemonic;

  address_widget.innerHTML = keys.public_addr;
  mnemonic_widget.innerHTML = mnemonic;
  spend_key_widget.innerHTML = keys.spend.sec;
  view_key_widget.innerHTML = keys.view.sec;

  address_widget_copy.innerHTML = keys.public_addr;
  mnemonic_widget_copy.innerHTML = mnemonic;
  spend_key_widget_copy.innerHTML = keys.spend.sec;
  view_key_widget_copy.innerHTML = keys.view.sec;

  var typeNumber = 0;
  var errorCorrectionLevel = 'L';

};