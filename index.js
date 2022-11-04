const EventEmitter = require('events')
const { mainModule } = require('process')
const eventEmitter = new EventEmitter()
const util = require('util')

class A
{
    constructor()
    {
        this.callback = this.onEvent.bind(this)
        eventEmitter.on("event", this.callback)
    }

    onEvent(event)
    {
        console.log("Přišel event " + event)
        eventEmitter.off("event", this.callback)
    }
}

class B
{
    constructor()
    {
        this.TIMER = setInterval(this.onTimerTick, 3000, this)
    }

    onTimerTick(instance)
    {
        this.a = new A
        eventEmitter.emit("event", instance.EVENT_INDEX++)
    }

    EVENT_INDEX = 0
}

function main()
{
    b = new B
}

main()