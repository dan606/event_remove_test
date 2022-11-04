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
        setInterval(this.onTimerTick.bind(this), 3000)
    }

    onTimerTick()
    {
        let a = new A
        eventEmitter.emit("event", this.EVENT_INDEX++)
    }

    EVENT_INDEX = 0
}

function main()
{
    b = new B
}

main()