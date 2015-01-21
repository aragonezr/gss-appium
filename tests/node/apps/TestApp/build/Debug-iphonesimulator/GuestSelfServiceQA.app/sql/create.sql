CREATE TABLE IF NOT EXISTS property (
  spiritCode CHAR(5) NOT NULL PRIMARY KEY,
  name TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  brandName TEXT,
  defaultCheckInTime TEXT,
  defaultCheckOutTime TEXT,
  isOrderMealEnabled INTEGER,
  isRequestAnItemEnabled INTEGER,
  isTransportationEnabled INTEGER,
  isValetServiceEnabled INTEGER,
  isHotelInformationEnabled INTEGER,
  isContactHotelEnabled INTEGER,
  isLuggageAssistanceEnabled INTEGER,
  isUberEnabled INTEGER,
  email TEXT,
  smsPhoneNumber TEXT,
  phoneNumber TEXT,
  regionalPhoneNumber TEXT,
  latitude TEXT,
  longitude TEXT,
  valetResponseTimeMinutes INTEGER,
  luggageResponseTimeMinutes INTEGER,
  checkOutTimeIncrementMinutes INTEGER,
  hotelWebsiteURL TEXT
);

CREATE TABLE IF NOT EXISTS pointOfInterest (
  spiritCode CHAR(5) NOT NULL,
  name TEXT NOT NULL,
  latitude TEXT,
  longitude TEXT,
  radiusMeters INTEGER
);

CREATE TABLE IF NOT EXISTS reservation (
  spiritCode CHAR(5) NOT NULL,
  reservationId TEXT,
  reservationNameId TEXT,
  checkInDateRaw TEXT,
  checkOutDateRaw TEXT,
  cancellationPolicy TEXT,
  confirmationNumber TEXT,
  nightsCount INTEGER,
  guestsCount INTEGER,
  roomsCount INTEGER,
  guestName TEXT,
  roomPreferences TEXT,
  propertyImageURL TEXT,
  status TEXT,
  roomNumber TEXT,
  isMultipage INTEGER,
  checkinEligible DATETIME,
  checkoutEligible DATETIME,
  doNotMove INTEGER,
  isCheckedIn INTEGER
);

CREATE TABLE IF NOT EXISTS category (
  spiritCode CHAR(5) NOT NULL,
  name VARCHAR(45) NOT NULL,
  displayOrder INTEGER,
  PRIMARY KEY (spiritCode, displayOrder)
);

CREATE TABLE IF NOT EXISTS item (
  spiritCode CHAR(5) NOT NULL,
  code VARCHAR(45) NOT NULL,
  name VARCHAR(45) NOT NULL COLLATE NOCASE,
  itemDescription VARCHAR(255),
  popularityRank INTEGER,
  purchaseType CHAR(45) NOT NULL,
  maxOrder INTEGER,
  PRIMARY KEY (spiritCode, popularityRank, name)
);
CREATE INDEX IF NOT EXISTS spiritCode_popularityRank_name_idx ON item(spiritCode, code, purchaseType, name);

CREATE TABLE IF NOT EXISTS itemToCategory (
  spiritCode CHAR(5) NOT NULL,
  categoryDisplayOrder INTEGER NOT NULL,
  itemCode VARCHAR(45) NOT NULL,
  PRIMARY KEY (spiritCode, categoryDisplayOrder, itemCode)
);

CREATE TABLE IF NOT EXISTS itemRequest (
  spiritCode CHAR(5) NOT NULL,
  reservationNameId VARCHAR(45) NOT NULL,
  itemCode VARCHAR(45) NOT NULL,
  quantity INTEGER NOT NULL,
  status VARCHAR(45) NOT NULL,
  displayOrder INTEGER,
  PRIMARY KEY (spiritCode, itemCode, reservationNameId)
);

CREATE TABLE IF NOT EXISTS room (
  roomNumber TEXT NULL,
  type TEXT NOT NULL,
  roomDescription TEXT NOT NULL,
  imageUrl TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS roomAttribute (
  spiritCode CHAR(5) NOT NULL,
  roomAttributeId TEXT NOT NULL,
  name TEXT NOT NULL,
  displayOrder INTEGER
);

CREATE TABLE IF NOT EXISTS roomToRoomAttribute (
  roomNumber TEXT NOT NULL,
  roomAttributeId TEXT NOT NULL
);
