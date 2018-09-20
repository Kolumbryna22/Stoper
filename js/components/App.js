class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            display: display,
        }
        reset(false);
        print(this.time);
    }

    reset(working) {
        //if (working) this.addResult();
        this.state.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0,            
        };
        this.print();
    }

    print() {
        this.state.display.innerText = this.format(this.state.times);
    }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
        if (!this.state.running) {
            this.state.running = true;
            this.state.watch = setInterval(() => this.step(), 10);
        }
    }

    stop() {
        this.state.running = false;
        clearInterval(this.watch);
    }

    step() {
        if (!this.state.running) return;

        this.calculate();
        this.print();
    }

    calculate() {
        this.state.times.miliseconds += 1;

        if (this.state.times.miliseconds >= 100) {
            this.state.times.miliseconds = 0;
            this.state.times.seconds += 1;
        }

        if (this.state.times.seconds >= 60) {
            this.state.times.seconds = 0;
            this.state.times.minutes += 1;
        }
    }

    addResult() {
        let li = document.createElement("li");

        console.log(this.format(this.times));
            
        li.innerHTML = this.format(this.times);
        resultList.appendChild(li);
    }
    
    pad0(value) {
        let result = value.toString();

        return result.length < 2 ? ('0' + result):result;
    }

    render() {
        return (
            <div className="stoper-container">
                <div class="controls">
                    <a href="#" className="button" onClick={start}>Start</a>
                    <a href="#" className="button" onClick={stop}>Stop</a>
                    <a href="#" className="button" onClick={reset(true)}>Reset</a>
                </div>
                <div className="stop-watch"></div>
                <ul className="results"></ul>
            </div>
        );
    }
}
