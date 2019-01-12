if (typeof web3 !== 'undefined')
{
    web3 = new Web3(web3.currentProvider);
}
else
{
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

// clear all inputs
function clearall()
{
	$("input").val("");
}
clearall();

// select an default account
//web3.eth.defaultAccount = web3.eth.accounts[0];

// show log function
function logthis(log)
{
	$("#log").fadeOut(250, function(){
		$("#log").html(log);
		$("#log").fadeIn(250);
	});
}

/* MATH */
function ether(ether_)
{
	return ether_ * (10**18);
}

function wei(wei_)
{
	return wei_ / (10**18);
}

// Add all available accounts to selector
web3.eth.accounts.forEach(account => {
	$("#account-selector").append(
		"<option>"+account+"</option>"
	);
});

function updateBalance()
{
	// show available balance
	$("#balance").html(
		web3.eth.getBalance($("#account-selector").val()).toNumber() * (10**-18)
	);
}

// Add event for selection
$("#account-selector").change(function(event){

	// change default account 
	web3.eth.defaultAccount = $("#account-selector").val();

	updateBalance();

	// show log
	logthis("Account changed!");
})

var taxiContract = web3.eth.contract([{"constant":false,"inputs":[],"name":"setAsDealer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"price","type":"uint256"},{"name":"validTime","type":"uint256"}],"name":"PurchasePropose","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"GetSalary","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"salary","type":"uint256"}],"name":"PaySalary","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getInfo","outputs":[{"name":"td","type":"address"},{"name":"cd","type":"address"},{"name":"cid","type":"uint32"},{"name":"cb","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getParticipants","outputs":[{"name":"","type":"address[100]"},{"name":"","type":"uint256[100]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"GetDivident","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"dividendNoTimeLimits","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"carDealer_address","type":"address"}],"name":"setCarDealer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"ApproveSellProposal","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"sellCar","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"PayDividend","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getCharge","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"join","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"expensePayment","outputs":[{"name":"result","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"PurchaseCar","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getManager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"setAsDriver","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"joinNoFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"carID","type":"uint32"},{"name":"price","type":"uint256"},{"name":"validTime","type":"uint256"}],"name":"CarPropose","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"customerSimulation","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"CarExpenses","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newDriver","type":"address"}],"name":"setDriver","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}]);
var bytecode = "0x60806040526717979cfe362a0000606b55678ac7230489e80000606c556802b5e3af16b1880000606d5534801561003557600080fd5b5033606660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506119e4806100866000396000f3fe60806040526004361061015d576000357c010000000000000000000000000000000000000000000000000000000090048063af5e401b116100d3578063d648344a1161008c578063d648344a1461049b578063d9872407146104b2578063e8a1cb35146104c9578063f6212dc11461051e578063fb14e3ee14610528578063fc1df4421461053f5761015d565b8063af5e401b146103d3578063b58beec4146103ea578063b688a363146103f4578063c005f47e146103fe578063c78bf4101461042d578063d5009584146104445761015d565b80635aa68ac0116101255780635aa68ac0146102b157806362675114146103335780636d7164f01461034a57806377cb00251461036157806397592c64146103b257806397691f14146103c95761015d565b80630149dc721461015f57806313fa65011461017657806320e1172f146101bb5780634abfa5cc146101d25780635a9b0b891461020d575b005b34801561016b57600080fd5b50610174610590565b005b34801561018257600080fd5b506101b96004803603604081101561019957600080fd5b8101908080359060200190929190803590602001909291905050506105d3565b005b3480156101c757600080fd5b506101d0610727565b005b3480156101de57600080fd5b5061020b600480360360208110156101f557600080fd5b8101908080359060200190929190505050610818565b005b34801561021957600080fd5b506102226108d4565b604051808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018363ffffffff1663ffffffff16815260200182815260200194505050505060405180910390f35b3480156102bd57600080fd5b506102c661094d565b6040518083606460200280838360005b838110156102f15780820151818401526020810190506102d6565b5050505090500182606460200280838360005b8381101561031f578082015181840152602081019050610304565b505050509050019250505060405180910390f35b34801561033f57600080fd5b50610348610a8d565b005b34801561035657600080fd5b5061035f610bc2565b005b34801561036d57600080fd5b506103b06004803603602081101561038457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610c92565b005b3480156103be57600080fd5b506103c7610d32565b005b6103d1610e68565b005b3480156103df57600080fd5b506103e8610f7d565b005b6103f26110cc565b005b6103fc6110de565b005b34801561040a57600080fd5b5061041361125d565b604051808215151515815260200191505060405180910390f35b34801561043957600080fd5b506104426112f9565b005b34801561045057600080fd5b50610459611466565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156104a757600080fd5b506104b0611490565b005b3480156104be57600080fd5b506104c7611552565b005b3480156104d557600080fd5b5061051c600480360360608110156104ec57600080fd5b81019080803563ffffffff16906020019092919080359060200190929190803590602001909291905050506116ab565b005b610526611744565b005b34801561053457600080fd5b5061053d611777565b005b34801561054b57600080fd5b5061058e6004803603602081101561056257600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061188f565b005b33606960006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b606960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561062f57600080fd5b607160009054906101000a900463ffffffff16607560000160006101000a81548163ffffffff021916908363ffffffff1602179055508160756001018190555080607560020181905550600060756004018190555060008090505b606454811015610722576075600301600080836064811015156106a957fe5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81549060ff0219169055808060010191505061068a565b505050565b606760000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561078657600080fd5b600060676001015411151561079a57600080fd5b606760000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6067600101549081150290604051600060405180830381858888f1935050505015801561080a573d6000803e3d6000fd5b506000606760010181905550565b606660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561087457600080fd5b6000606e541415156108975762278d00606e5401421015151561089657600080fd5b5b80606a541115156108a757600080fd5b80606a600082825403925050819055508060676001016000828254019250508190555042606e8190555050565b600080600080606760000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16606960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16607160009054906101000a900463ffffffff16606a54839350829250935093509350935090919293565b610955611970565b61095d611994565b610965611994565b60008090505b606454811015610a0b5760656000808360648110151561098757fe5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000015482826064811015156109f557fe5b602002018181525050808060010191505061096b565b5060008181606480602002604051908101604052809291908260648015610a7d576020028201915b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311610a33575b5050505050915092509250509091565b60011515606560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff161515141515610aef57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff166108fc606560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001549081150290604051600060405180830381858888f19350505050158015610b77573d6000803e3d6000fd5b506000606560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000181905550565b6000606454606b54606c5401606a5403811515610bdb57fe5b0490506064548102606a6000828254039250508190555060008090505b606454811015610c8e5781606560008084606481101515610c1557fe5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001600082825401925050819055508080600101915050610bf8565b5050565b606660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610cee57600080fd5b80606960006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60011515606560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff161515141515610d9457600080fd5b60011515607560030160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1615151415610df557610e66565b6001607560030160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506075600401600081548092919060010191905055505b565b606960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610ec457600080fd5b6000426075600201540310151515610edb57600080fd5b6002606454811515610ee957fe5b0460756004015410151515610efd57600080fd5b60756001015434141515610f1057600080fd5b607560010154606a600082825401925050819055506000607160006101000a81548163ffffffff021916908363ffffffff1602179055506075600080820160006101000a81549063ffffffff02191690556001820160009055600282016000905560048201600090555050565b606660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610fd957600080fd5b6000606f54141515610ffc5762ed4e00606f54014211151515610ffb57600080fd5b5b6000606454606b54606c5401606a540381151561101557fe5b0490506064548102606a6000828254039250508190555060008090505b6064548110156110c8578160656000808460648110151561104f57fe5b0160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001600082825401925050819055508080600101915050611032565b5050565b34606a60008282540192505081905550565b60001515606560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff16151514151561114057600080fd5b606480541115151561115157600080fd5b606d543414151561116157600080fd5b33600060645460648110151561117357fe5b0160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408051908101604052806000815260200160011515815250606560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000820151816000015560208201518160010160006101000a81548160ff021916908315150217905550905050606460008154809291906001019190505550606d54606a60008282540192505081905550565b6000606c54606a54101561127457600090506112f6565b606c54606a60008282540392505081905550606960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc606c549081150290604051600060405180830381858888f193505050501580156112f0573d6000803e3d6000fd5b50600190505b90565b606660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561135557600080fd5b600060726002015411151561136957600080fd5b607260010154606a541015151561137f57600080fd5b607260010154606a60008282540392505081905550606960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6072600101549081150290604051600060405180830381858888f19350505050158015611401573d6000803e3d6000fd5b50607260000160009054906101000a900463ffffffff16607160006101000a81548163ffffffff021916908363ffffffff1602179055506072600080820160006101000a81549063ffffffff0219169055600182016000905560028201600090555050565b6000606660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b606760000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6067600101549081150290604051600060405180830381858888f19350505050158015611500573d6000803e3d6000fd5b50600060676001018190555033606760000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b60001515606560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff1615151415156115b457600080fd5b60648054111515156115c557600080fd5b33600060646000815480929190600101919050556064811015156115e557fe5b0160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408051908101604052806000815260200160011515815250606560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000820151816000015560208201518160010160006101000a81548160ff021916908315150217905550905050565b606960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561170757600080fd5b82607260000160006101000a81548163ffffffff021916908363ffffffff1602179055508160726001018190555080607260020181905550505050565b6801158e460913d00000341015151561175c57600080fd5b6801158e460913d00000606a60008282540192505081905550565b606660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156117d357600080fd5b606c54606a54101515156117e657600080fd5b60006070541415156118095762ed4e0060705401421115151561180857600080fd5b5b606c54606a60008282540392505081905550606960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc606c549081150290604051600060405180830381858888f19350505050158015611885573d6000803e3d6000fd5b5042607081905550565b606660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156118eb57600080fd5b60408051908101604052808273ffffffffffffffffffffffffffffffffffffffff1681526020016000815250606760008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015590505050565b610c8060405190810160405280606490602082028038833980820191505090505090565b610c806040519081016040528060649060208202803883398082019150509050509056fea165627a7a723058209c3c9a55d24cb43d59d82e81a34a64511f4611f6b75dc90c00361b4e71f79f950029";
var defaultContract = undefined;

// create new contract on button click and assign as default
$("#create-contract-button").click(function()
{
	if (web3.eth.defaultAccount == undefined)
	{
		logthis("You must select an account first!");
		return;
	}
	var new_contract = taxiContract.new(
		{
			from: web3.eth.defaultAccount,
			gas: '4700000',
			data: bytecode
		},
		function(e, contract)
		{
			if (contract.address != undefined)
			{
				$("#contract-selector").append(
					"<option>"+contract.address+"</option>"
				);

				// gas has been paid, update balance
				updateBalance();

				// log event
				logthis("A new contract has been created.");
			}
			else
			{
				console.log(e);
			}
		}
	);
});

// add an existing contract from address
$("#existing-contract-add").click(function(){
	let contract_address = $("#existing-contract-address").val();
	let existing_contract = taxiContract.at(contract_address);
	try
	{
		// check if manager exists, if not this will throw an exception
		existing_contract.getManager();

		$("#contract-selector").append(
			"<option>"+contract_address+"</option>"
		);

		// log event
		logthis("A contract has been added.");
	}
	catch(e)
	{
		console.log(e);
		logthis("No contract exists on that address.");
		return;
	}
})

function queryContractInfo()
{
	// clear contract details
	clearall();
	$("#joined-account-selector").html("");

	// change default contract
	defaultContract = taxiContract.at($("#contract-selector").val());

	// show manager
	let manager = defaultContract.getManager();
	$("#manager-address").val(manager);

	// update contract info fields
	let info = defaultContract.getInfo();
	$("#taxi-driver-address").val(info[0]);
	$("#car-dealer-address").val(info[1]);
	$("#car-id-input").val(info[2]);
	$("#contract-balance").val(wei(info[3]));

	// show participants 
	let joined_users = defaultContract.getParticipants();
	console.log(joined_users);
	for (let i = 0; i < joined_users[0].length; i++) {
		const participant_addr = joined_users[0][i];
		const participant_balance = joined_users[1][i].toNumber();
		
		// skip if user address is empty
		if (participant_addr == 0)
		{
			continue;
		}
		else
		{
			$("#joined-account-selector").append(
				"<option value="+participant_addr+">("+participant_balance+")"+participant_addr+"</option>"
			);
		}
	}
}

// event handler for contract selection
// load details of contract
$("#contract-selector").change(function(event)
{
	queryContractInfo();
	// log event
	logthis("Default contract changed.");
});

/* BUTTON EVENTS BELOW */

$("#join-fee-btn").click(function(e){
	if(web3.eth.defaultAccount == undefined)
	{
		logthis("Select an account first.");
		return;
	}
	defaultContract.join({
		from: web3.eth.defaultAccount,
		gas: 3000000,
		value: ether(50)
	}, function(e, res)
	{
		if (e == undefined)
		{
			queryContractInfo();
			updateBalance();
			logthis("A new participant joined to contract: "+web3.eth.defaultAccount);
		}
		else
		{
			logthis("Error! Do you have enough balance? Check the console.");
			console.log(e);
			return;
		}
	});
});

$("#join-all-nofee").click(function(){
	web3.eth.accounts.forEach(account => {
		defaultContract.joinNoFee({
			from: account,
			gas: 3000000,
			value: 0
		});
	});
	queryContractInfo();
	updateBalance();
	logthis("Added all accounts available (without paying fee).");
});

$("#join-all-fee").click(function(){
	let overflow_cap = false;
	web3.eth.accounts.forEach(account => {
		defaultContract.join({
			from: account,
			gas: 3000000,
			value: ether(50)
		}, function(e, res)
		{
			if (!overflow_cap) console.log(e);
			if (e != undefined) overflow_cap = true;
		});
	});
	queryContractInfo();
	updateBalance();
	logthis("Added all accounts available (without paying fee).");
});



/* BUTTON EVENTS END */