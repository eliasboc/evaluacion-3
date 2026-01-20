// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract EventManager is Ownable {

    struct Event {
        uint256 id;
        string name;
        string description;
        uint256 date;
        uint256 maxCapacity;
        uint256 registeredCount;
        bool isActive;
    }

    uint256 public eventCount;
    mapping(uint256 => Event) public events;
    mapping(uint256 => mapping(address => bool)) public participantRegistry;
    mapping(uint256 => mapping(address => bool)) public confirmedAttendance;

    event EventCreated(uint256 indexed id, string name, uint256 capacity);
    event ParticipantRegistered(uint256 indexed eventId, address indexed participant);
    event AttendanceConfirmed(uint256 indexed eventId, address indexed participant);

    error EventNotActive();
    error EventFull();
    error AlreadyRegistered();
    error NotRegistered();
    error OwnerCannotRegister(); // Nuevo error

    constructor(address _owner) Ownable(_owner) {}

    function createEvent(
        string memory _name, 
        string memory _description,
        uint256 _date, 
        uint256 _capacity
    ) external onlyOwner {
        eventCount++;
        events[eventCount] = Event(eventCount, _name, _description, _date, _capacity, 0, true);
        emit EventCreated(eventCount, _name, _capacity);
    }

    function register(uint256 _eventId) external {
        // Corrección: El dueño no puede ser participante
        if (msg.sender == owner()) revert OwnerCannotRegister();
        
        Event storage ev = events[_eventId];
        if (!ev.isActive) revert EventNotActive();
        if (ev.registeredCount >= ev.maxCapacity) revert EventFull();
        if (participantRegistry[_eventId][msg.sender]) revert AlreadyRegistered();

        participantRegistry[_eventId][msg.sender] = true;
        ev.registeredCount++;

        emit ParticipantRegistered(_eventId, msg.sender);
    }

    function validateAttendance(uint256 _eventId, address _participant) external onlyOwner {
        if (!participantRegistry[_eventId][_participant]) revert NotRegistered();
        confirmedAttendance[_eventId][_participant] = true;
        emit AttendanceConfirmed(_eventId, _participant);
    }

    function hasCertificate(uint256 _eventId, address _participant) external view returns (bool) {
        return confirmedAttendance[_eventId][_participant];
    }

    function getAllEvents() external view returns (Event[] memory) {
        Event[] memory allEvents = new Event[](eventCount);
        for (uint256 i = 1; i <= eventCount; i++) {
            allEvents[i - 1] = events[i];
        }
        return allEvents;
    }
}