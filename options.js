$(document).ready(function() {
  populateCurrencyOptions();
  saveSettings();
});

var optionsBody = document.getElementById('optionsBody');
var saveButton = document.getElementById('saveButton');

/*
  Load and initialize dropdowns with Select2.
*/
function populateCurrencyOptions() {
  // TODO: load options from separate file
  // $('.singleCurrencySelector').load("currencies.html");
  // $('.multiCurrencySelector').load("currencies.html");
  // console.log($('.multiCurrencySelector').prop('outerHTML'));
  $('.singleCurrencySelector').select2();
  $('.singleCurrencySelector').val('USD').trigger('change');
  $('.multiCurrencySelector').select2({
    maximumSelectionLength: '3'
  });
  $('.multiCurrencySelector').val(['CAD', 'VND']).trigger('change');
}

function saveSettings() {
  /*
    Listen and save enabled setting.
  */
  $('.switch-input').change(function() {
    var checked = $(this).is(':checked');
    chrome.storage.sync.get('xchangeXtensionSettings', function(value) {
      value.xchangeXtensionSettings.enabled = checked;
      chrome.storage.sync.set({'xchangeXtensionSettings': value.xchangeXtensionSettings}, function() {
        console.log('Saving new xchangeXtensionSettings.enabled: ' + JSON.stringify(value.xchangeXtensionSettings.enabled));
      })
    });
  });

  /*
    Listen and save update frequency setting.
  */
  $('input[name="radioGetRates"]').change(function() {
    var updateFrequency = $(this).val();
    chrome.storage.sync.get('xchangeXtensionSettings', function(value) {
      value.xchangeXtensionSettings.updateFrequency = updateFrequency;
      chrome.storage.sync.set({'xchangeXtensionSettings': value.xchangeXtensionSettings}, function() {
        console.log('Saving new xchangeXtensionSettings.updateFrequency: ' + JSON.stringify(value.xchangeXtensionSettings.updateFrequency));
      })
    });
  });

  /*
    Listen and save base currency setting.
  */
  $('input[name="radioBaseCurrency"]').change(function() {
    var setBaseCurrency = $(this).val();
    chrome.storage.sync.get('xchangeXtensionSettings', function(value) {
      value.xchangeXtensionSettings.setBaseCurrency = setBaseCurrency;
      chrome.storage.sync.set({'xchangeXtensionSettings': value.xchangeXtensionSettings}, function() {
        console.log('Saving new xchangeXtensionSettings.setBaseCurrency: ' + JSON.stringify(value.xchangeXtensionSettings.setBaseCurrency));
      })
    });
  });

  /*
    Listen and save filtered list setting.
  */
  $('input[name="radioFilteredList"]').change(function() {
    var setFilteredList = $(this).val();
    chrome.storage.sync.get('xchangeXtensionSettings', function(value) {
      value.xchangeXtensionSettings.setFilteredList = setFilteredList;
      chrome.storage.sync.set({'xchangeXtensionSettings': value.xchangeXtensionSettings}, function() {
        console.log('Saving new xchangeXtensionSettings.setFilteredList: ' + JSON.stringify(value.xchangeXtensionSettings.setFilteredList));
      })
    });
  });
}
