App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Load pets.
    $.getJSON('../pets.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function() {
    // Is there an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fall back to Ganache
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Adoption.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var AdoptionArtifact = data;
      App.contracts.Adoption = TruffleContract(AdoptionArtifact);

      // Set the provider for our contract
      App.contracts.Adoption.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the adopted pets
      return App.markAdopted();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function(adopters, account) {
    var adoptionInstance;
    var adopters;
    App.contracts.Adoption.deployed().then(function(instance) {
      adoptionInstance = instance;
      return adoptionInstance.getAdopters.call();
    }).then(function(result) {
      adopters = result;
      console.log(adopters);
      return adoptionInstance.getPetPrices.call();
    })
    .then(function(petPrices){
      console.log(petPrices);
      for (i = 0; i < adopters.length; i++) {
        if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
          //console.log(adopters[i].slice(0,2) === "0x");
          console.log(adopters[i]);
          $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
          $('.panel-pet').eq(i).find('.pet-price').html(web3.fromWei(new web3.BigNumber(petPrices[i])).toString());
        }
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },
  updateContractBalance(){
    App.contracts.Adoption.deployed().then(function(instance) {
      return instance.getBalance().then(function(balance){
        console.log(balance);
        var bigNumberbalance = web3.fromWei(new web3.BigNumber(balance));
        $('#balance').html(bigNumberbalance.toString());
      })
      .catch(function(err) {
        console.log(err.message);
      });
    });
  },
  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));
    var petBid = $(event.target).parent().find('input')[0].value;
    console.log(petBid);

    var adoptionInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Adoption.deployed().then(function(instance) {
        adoptionInstance = instance;

        // Execute adopt as a transaction by sending account
        return adoptionInstance.adopt(petId, {from: account,  value: web3.toWei(petBid)});
        //return adoptionInstance.sendTransaction(petId, {from: account, value: web3.toWei(petBid)});

      }).then(function(result) {
        return App.markAdopted();
      }).then(function(){
        return App.updateContractBalance();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
