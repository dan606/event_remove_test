const EventEmitter = require('events')
const { mainModule } = require('process')
const eventEmitter = new EventEmitter()
const util = require('util')

class A
{
    constructor()
    {
        //eventEmitter.on("event1", this.onEvent.bind(this))
    }

    onEvent(event)
    {
        console.log("Přišel event1 " + event)
        this.ID = event
        eventEmitter.emit("event2", event)
    }

    ID
}

class B
{
    constructor()
    {
        this.TIMER = setInterval(this.onTimerTick, 3000, this)
        eventEmitter.on("event2", this.onEvent2.bind(this))
    }

    onEvent2(event)
    {
        console.log("Přišel event2 " + event)
        //eventEmitter.off("event1", this.onEvent2.bind(this))
        this.OBJECTS.forEach(obj => {
            console.log(util.inspect(obj, {showHidden: false, depth: null, colors: true}))

            if(obj.obj.ID === event)
            {
                console.log("NALEZENO")
                eventEmitter.off("event1", obj.bind)
            }
        });
       
        this.OBJECTS = this.OBJECTS.filter(function(value, index, arr){ 
            return value.obj.ID != event
        })
        console.log(this.OBJECTS.length)
        //this.OBJECTS = []
    }

    onTimerTick(instance)
    {
        let a = new A
        let bind = a.onEvent.bind(a)
        eventEmitter.on("event1", bind)
        instance.OBJECTS.push({obj:a,bind:bind});
        eventEmitter.emit("event1", instance.EVENT_INDEX++)
    }

    OBJECTS = []
    EVENT_INDEX = 0
}

function main()
{
    b = new B
}

main()