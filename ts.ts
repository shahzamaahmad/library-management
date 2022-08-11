interface Driving {
  run(): void;
  speedCheck(curSpeed: number): void;
  stop(): void;
}

class BikeRide implements Driving {
  run(): void {
    console.log("[+] Started the Bike, a nightrider");
  }

  speedCheck(curSpeed: number): void {
    if (curSpeed <= 20) console.log("[+] going slow, go faster");
    else if (curSpeed >= 80) console.log("[+] going fast, go slower");
    else console.log("[+] riding like a pro");
  }

  stop(): void {
    console.log("[+] Stopping Bike, ride's over");
  }
}

abstract class CarRide implements Driving {
  run(): void {
    console.log("[+] Started the Car, a nightrider");
  }

  speedCheck(curSpeed: number): void {
    if (curSpeed <= 20) console.log("[+] going slow, go faster");
    else if (curSpeed >= 80) console.log("[+] going fast, go slower");
    else console.log("[+] riding like a pro");
  }

  abstract stop(): void;
}

class Benz extends CarRide {
  stop(): void {
    console.log("[+] Stopping Benz, ride's over");
  }
}

class Audi extends CarRide {
  stop(): void {
    console.log("[+] Stopping Audi, ride's over");
  }
}

const bike = new BikeRide();
bike.run();
bike.speedCheck(40);
bike.stop();

console.log("[+] -------------------------------------------- [+]");

const benz = new Benz();
const audi = new Audi();

benz.run();
benz.speedCheck(20);
benz.stop();

audi.run();
audi.speedCheck(20);
audi.stop();