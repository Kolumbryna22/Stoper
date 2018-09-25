class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            display: '',
        }
        this.reset(false);
        this.print(this.time);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.reset = this.reset.bind(this);
    }

    reset(working) {
        if (working) this.addResult();
        this.state.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0,            
        };
        this.print();
    }

    print() {
        this.setState({display: this.format(this.state.times)});
    }

    format(times) {
        return `${this.pad0(times.minutes)}:${this.pad0(times.seconds)}:${this.pad0(Math.floor(times.miliseconds))}`;
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
        let resultList = document.getElementById("results");
            
        li.innerHTML = this.format(this.state.times);
        resultList.appendChild(li);
    }
    
    pad0(value) {
        let result = value.toString();

        return result.length < 2 ? ('0' + result):result;
    }

    render() {
        return (
            <div className="stoper-container">
                <div className="controls">
                    <a href="#" className="button" onClick={this.start}>Start</a>
                    <a href="#" className="button" onClick={this.stop}>Stop</a>
                    <a href="#" className="button" onClick={this.reset}>Reset</a>
                </div>
                <div className="stop-watch">{this.state.display}</div>
                <ul className="results" id="results"></ul>
            </div>
        );
    }
}
