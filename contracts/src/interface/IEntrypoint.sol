// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

interface IEntrypointV1 {
    function getSVaults() external view returns (address[] memory);

    function getLVaults() external view returns (address[] memory);

    function addNewSVault(address newVaultAddress) external;

    function addNewLVault(address newVaultAddress) external;

    function updateSVaultAtIndex(address updatedVaultAddress, uint256 index) external;

    function updateLVaultAtIndex(address updatedVaultAddress, uint256 index) external;

    function setPriceFeedForVault(uint256 index, address priceFeed) external;

    function setStrategyContract(address strategy) external;

    function deleteSVaultAtIndex(uint256 index) external;

    function deleteLVaultAtIndex(uint256 index) external;

    function changeEditor(address newEditor) external;

    function deposit(uint256 assets, address receiver, uint8 choice, bool stable) external;

    function mint(address receiver, uint256 shares, uint8 choice, bool stable) external;

    function withdraw(uint256 assets, address receiver, address owner, uint8 choice, bool stable) external;

    function redeem(uint256 shares, address receiver, address owner, uint8 choice, bool stable) external;

    function permit(uint256 amount, address receiver, uint8 choice, bool stable) external;

    function changeSVaultController(uint256 index, address newController) external;

    function changeLVaultController(uint256 index, address newController) external;
}
