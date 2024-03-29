-include .env

.PHONY: all test clean deploy-anvil

all: clean remove install update build

# Clean the repo
clean  :; forge clean

# Remove modules
remove :; rm -rf lib

install :; forge install smartcontractkit/chainlink-brownie-contracts rari-capital/solmate foundry-rs/forge-std openzeppelin/openzeppelin-contracts uniswap/v2-core uniswap/v2-periphery --no-commit

# Update Dependencies
update:; forge update

build:; forge build

test :; forge test 

snapshot :; forge snapshot

slither :; slither ./src/Strategy.sol

myth :; myth analyze ./src/Strategy.sol --solc-json mythril.config.json --solv 0.8.13 --max-depth 20

format :; prettier --write src/**/*.sol && prettier --write src/*.sol

# solhint should be installed globally
lint :; solhint src/**/*.sol && solhint src/*.sol

anvil :; anvil -m 'test test test test test test test test test test test junk'

anvil-fork :; anvil --fork-url ${EVMOS_RPC_URL} -m 'test test test test test test test test test test test junk'

# use the "@" to hide the command from your shell 
deploy-goerli :; @forge script script/${contract}.s.sol:Deploy${contract} --rpc-url ${GOERLI_RPC_URL}  --private-key ${PRIVATE_KEY} --broadcast --verify --etherscan-api-key ${ETHERSCAN_API_KEY}  -vvvv

deploy-spoiler :; @forge script script/${contract}.s.sol:Deploy${contract} --rpc-url ${SEPOLIA_RPC_URL}  --private-key ${PRIVATE_KEY} --broadcast --verify --etherscan-api-key ${ETHERSCAN_API_KEY}  -vvvv

# use the "@" to hide the command from your shell 
deploy-ftm-testnet :; @forge script script/${contract}.s.sol:Deploy${contract} --rpc-url ${FANTOM_TESTNET_RPC_URL}  --private-key ${PRIVATE_KEY} --broadcast --verify --etherscan-api-key ${FANTOMSCAN_API_KEY}  -vvvv

# use the "@" to hide the command from your shell 
deploy-evmos :; @forge script script/${contract}.s.sol:Deploy${contract} --rpc-url ${EVMOS_RPC_URL}  --private-key ${PRIVATE_KEY} --broadcast  -vvvv

# use the "@" to hide the command from your shell 
deploy-evmos-fork :; @forge script script/${contract}.s.sol:Deploy${contract} --rpc-url http://localhost:8545  --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast

# This is the private key of account from the mnemonic from the "make anvil" command
deploy-anvil :; @forge script script/${contract}.s.sol:Deploy${contract} --rpc-url http://localhost:8545  --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast 

deploy-all :; make deploy-${network} contract=APIConsumer && make deploy-${network} contract=KeepersCounter && make deploy-${network} contract=PriceFeedConsumer && make deploy-${network} contract=VRFConsumerV2

