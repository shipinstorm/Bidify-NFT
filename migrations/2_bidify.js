const Bidify = artifacts.require("Bidify");


const ERC20 = artifacts.require("ERC20");
const ERC721 = artifacts.require("ERC721");


module.exports = function (deployer) {
  deployer.deploy(Bidify);


  deployer.deploy(ERC20, 0);
  deployer.deploy(ERC20, 2);
  deployer.deploy(ERC20, 4);
  deployer.deploy(ERC20, 8);
  deployer.deploy(ERC20, 18);
  deployer.deploy(ERC721, "", "");

};
