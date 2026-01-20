// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title EventManager
 * @dev Manages registrations and attendance for academic conferences.
 * Inherits from OpenZeppelin's Ownable for secure access control.
 */
contract EventManager is Ownable {

    struct Event {
        string name;
        string description;
        uint256 date;
        uint256 maxCapacity;
        uint256 registeredCount;
        bool isActive;
    }

    uint256 public eventCount;
    mapping(uint256 => Event) public events;
    
    // mapping(eventId => mapping(userAddress => isRegistered))
    mapping(uint256 => mapping(address => bool)) public participantRegistry;
    
    // mapping(eventId => mapping(userAddress => attended))
    mapping(uint256 => mapping(address => bool)) public confirmedAttendance;

    // Events for Frontend/Indexing
    event EventCreated(uint256 indexed id, string name, uint256 capacity);
    event ParticipantRegistered(uint256 indexed eventId, address indexed participant);
    event AttendanceConfirmed(uint256 indexed eventId, address indexed participant);

    // Custom Errors (Gas efficient)
    error EventNotActive();
    error EventFull();
    error AlreadyRegistered();
    error NotRegistered();

    /**
     * @dev Constructor passes msg.sender to the Ownable parent contract.
     */
    constructor(address _owner) Ownable(_owner) {}

    /**
     * @dev Creates a new academic event. Only accessible by the contract owner.
     */
    function createEvent(
        string memory _name, 
        string memory _description,
        uint256 _date, 
        uint256 _capacity
    ) external onlyOwner {
        eventCount++;
        events[eventCount] = Event({
            name: _name,
            description: _description,
            date: _date,
            maxCapacity: _capacity,
            registeredCount: 0,
            isActive: true
        });

        emit EventCreated(eventCount, _name, _capacity);
    }

    /**
     * @dev Allows students to register for an event.
     */
    function register(uint256 _eventId) external {
        Event storage ev = events[_eventId];
        
        if (!ev.isActive) revert EventNotActive();
        if (ev.registeredCount >= ev.maxCapacity) revert EventFull();
        if (participantRegistry[_eventId][msg.sender]) revert AlreadyRegistered();

        participantRegistry[_eventId][msg.sender] = true;
        ev.registeredCount++;

        emit ParticipantRegistered(_eventId, msg.sender);
    }

    /**
     * @dev Admin confirms actual attendance to enable certificate eligibility.
     */
    function validateAttendance(uint256 _eventId, address _participant) external onlyOwner {
        if (!participantRegistry[_eventId][_participant]) revert NotRegistered();
        
        confirmedAttendance[_eventId][_participant] = true;
        
        emit AttendanceConfirmed(_eventId, _participant);
    }

    /**
     * @dev Checks if a student is eligible for a digital certificate.
     */
    function hasCertificate(uint256 _eventId, address _participant) external view returns (bool) {
        return confirmedAttendance[_eventId][_participant];
    }
}