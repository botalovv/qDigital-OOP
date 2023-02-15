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
        this.onAir = !this.onAir
        this.landed = !this.landed
        Airport.freePlaces += 1
    }

    landing() {
        this.onAir = !this.onAir
        this.landed = !this.landed
        Airport.freePlaces -= 1
        this.fueled = false
    }
}

class Mig extends Airplane {
    constructor(name, maxSpeed){
        super(name, maxSpeed)
        this.damageDone = 0
        this.ammo = 10
    }

    attack() {
        if (this.ammo > 0) {
            this.ammo -= 1
            this.damageDone += 100
        } else alert("Необходимо пополнить боезапас")
    }
}


const mig = new Mig("Mig", 1500);

class Tu extends Airplane {
}

const tu154 = new Tu("tu-154", 950);

class Airport {
    mig = Mig;
    tu154 = Tu;
    constructor(mig, tu154) {
        this.mig = mig 
        this.tu154 = tu154
        this.freePlaces = 0
    }

    takePlane(plane) {
        if(this.freePlaces > 0) {
            this.freePlaces -= 1
            plane.onAir = false
            plane.landed = true
            plane.fueled = false
        }
        else if(this.freePlaces == 0) {
            alert("Аэропорт заполнен, необходимо освободить место")
        }
        
    }

    takeoff(plane) {
        if(this.freePlaces < 2 && plane.fueled) {
            this.freePlaces += 1
            plane.onAir = true
            plane.landed = false
        }

        if(this.freePlaces == 2) {
            alert("Самолётов не осталось")
        }

        if (!plane.fueled) {
            alert("Необходимо заправить самолёт")
        }
        
    }

    parking(plane) {
        if(plane.landed) {
            plane.onParking = true
            plane.readyToGo = false 
        }
        else alert("Самолет в воздухе, сперва нужно приземлиться")
      
    }

    planeIsReady(plane) {
        if(plane.landed && plane.fueled) {
            plane.onParking = false
            plane.readyToGo = true
        }
        else alert("Самолет в воздухе, сперва нужно приземлиться")
    }

    refuel(plane) {
        if (!plane.fueled && plane.landed) {
            plane.fueled = true
        } else alert("Самолёт не нуждается в дозаправке")
    }

    reload(plane) {
        if (plane.ammo < 10 && plane == mig) {
            plane.ammo = 10
        } else alert("Перезарядка не требуется")
    }
}

const pulkovo = new Airport(mig, tu154)
