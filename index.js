class Airplane {
    constructor(name, maxSpeed) {
        this.name = name
        this.maxSpeed = maxSpeed
        this.onAir = false
        this.landed = true
        this.onParking = false
        this.readyToGo = true
        this.fueled = true
    }

    takeoff() {
        this.onAir = true
        this.landed = false
    }

    landing() {
        this.onAir = false
        this.landed = true
        this.fueled = false
        this.readyToGo = false
    }
}

class Mig extends Airplane {
    constructor(name, maxSpeed){
        super(name, maxSpeed);
        this.damageDone = 0
        this.ammo = 10
    }

    attack() {
        if (this.ammo > 0 && this.onAir == true) {
            this.ammo -= 1
            this.damageDone += 100
        } else if (this.onAir == false) {
            alert("Нельзя стрелять в аэропорте");
        }
         else alert("Необходимо пополнить боезапас");
    }
}


const mig = new Mig("Mig", 1500);

class Tu extends Airplane {}

const tu154 = new Tu("tu-154", 950);

class Airport {
    constructor() {
        this.freePlaces = 10
    }
    
    //   Агрегация   //

    takePlane(plane) {
        if(this.freePlaces > 0) {
            this.freePlaces -= 1
            plane.landing()
        }
        else if(this.freePlaces == 0) {
            alert("Аэропорт заполнен, необходимо освободить место");
        }
        
    }

    takeoff(plane) {
        if(this.freePlaces < 10 && plane.readyToGo) {
            this.freePlaces += 1
            plane.takeoff()
        }
        else if (!plane.readyToGo) {
            alert("Необходимо проверить самолёт перед взлетом");
        }
    }

    parking(plane) {
        if(plane.landed) {
            plane.onParking = true
            plane.readyToGo = false 
        }
        else alert("Самолет в воздухе, сперва нужно приземлиться");
      
    }

    planeIsReady(plane) {
        if(plane.landed && plane.fueled) {
            plane.onParking = false
            plane.readyToGo = true
        }
        else if (!plane.landed) {
            alert("Самолет в воздухе, сперва нужно приземлиться");
        } 
        else alert("Самолет необходимо заправить");
    }

    refuel(plane) {
        if (!plane.fueled && plane.landed) {
            plane.fueled = true
        } else alert("Самолёт не нуждается в дозаправке");
    }

    reload(plane) {
        if (plane.ammo < 10 && plane == mig) {
            plane.ammo = 10
        } else alert("Перезарядка не требуется");
    }
}

const pulkovo = new Airport();
