// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WhistleBlower {
    struct Report {
        address reporter;
        string ipfsHash;
        uint256 timestamp;
    }

    Report[] public reports;

    event ReportSubmitted(address indexed reporter, string ipfsHash, uint256 timestamp);

    function submitReport(string memory _ipfsHash) public {
        reports.push(Report(msg.sender, _ipfsHash, block.timestamp));
        emit ReportSubmitted(msg.sender, _ipfsHash, block.timestamp);
    }

    function getReportsCount() public view returns (uint) {
        return reports.length;
    }

    function getReport(uint index) public view returns (address, string memory, uint256) {
        require(index < reports.length, "Invalid index");
        Report memory r = reports[index];
        return (r.reporter, r.ipfsHash, r.timestamp);
    }
}
