class User {
  email: string;
  name: string;
  forname: string;
  favouriteAttractions: string[];
  comments: string[];
  groups: string[];
  managedGroups: string[];
}

class Manager extends User {
  attractionsManaged: string[];
  eventsCreated: string[];
}

class Admin {}

class Attractions {
  name: string;
  description: string;
  ticket: boolean;
  price?: number;
  images: [];
  creator: {
    type: "Schema.Types.ObjectId";
    ref: "User";
  }; // users id that created the locations
}

class Events extends Attractions {
  startTime: Date;
  endTime: Date;
  creator: {
    type: "Schema.Types.ObjectId";
    ref: "User";
  };
}

class Groups {
  creator: {
    type: "Schema.Types.ObjectId";
    ref: "User";
  };
  users: User[];
  chats: string[];
}

class Review {
  body: String;
  rating: Number;
  author: {
    type: "Schema.Types.ObjectId";
    ref: "User";
  };
}
