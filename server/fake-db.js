const Rental = require("./models/rental"),
      User = require("./models/user"),
      Booking = require("./models/booking"),
      fakeDbData = require("./data.json");

class FakeDB{
  constructor(){
    this.rentals = fakeDbData.rentals;
    this.users = fakeDbData.users;
  }

  async cleanDb(){
    await User.remove({});
    await Rental.remove({});
    await Booking.remove({});
  }

  pushDataToDb(){
    const user = new User(this.users[0]);
    const user2 = new User(this.users[1]);

    this.rentals.forEach((rental) => {
      const newRental = new Rental(rental);
      newRental.user = user;

      user.rentals.push(newRental);

      newRental.save();
    });

    user.save();
    user2.save();
  }

  async seedDb(){
    await this.cleanDb();
    this.pushDataToDb();
  }
}

module.exports = FakeDB;
