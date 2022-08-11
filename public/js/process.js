const web3 = new Web3(window.ethereum);
var currentAccount = null;

const Fund_Address = "0xd00895Ad96DB62fC5988AEcb082eA671a4F7180F";
const Fund_Abi =[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"arrayStudents","outputs":[{"internalType":"address","name":"Account","type":"address"},{"internalType":"uint256","name":"Amount","type":"uint256"},{"internalType":"string","name":"Content","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"ordering","type":"uint256"}],"name":"get_1_student","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"content","type":"string"}],"name":"sendDonate","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"studenCounter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const Fund_Contract = new web3.eth.Contract(Fund_Abi,Fund_Address);
console.log(Fund_Contract);

$(document).ready(function(){
    checkMM();
    $("#btn_LoginMM").click(function(){
        connectMM().then((accounts)=> {
            currentAccount = accounts [0];
            $("#account").html(currentAccount);
        });
    });
    $("#btn_SendDonate").click( function () {
        if (currentAccount != null) {
            var content = $("#content_txt").val();
            var amount = $("#amount").val();
            Fund_Contract.methods.sendDonate(content).send({
                from: currentAccount,
                value: web3.utils.toWei(amount, "ether")
            });
        } else {
            alert ("Please connect metamask");
        }
    })
    $("#btn_Withdraw").click( function () {
        if (currentAccount != null) {
           
        } else {
            alert ("Please connect metamask");
        }
    })
});

async function connectMM() {
    return ethereum.request({method:"eth_requestAccounts"});
}

function checkMM () {
    if (typeof window.ethereum !== "undefined") {
        
    }else {
        $("body").html("<h2>Please install metamask</h2>")
    }
}