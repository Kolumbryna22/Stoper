{
    class StopWatch {
        constructor(display) {
            this.running = false;
            this.display = display;
            this.reset(false);
            this.print(this.time);
        }

        reset(working) {
            //if (working) this.addResult();
            this.times = {
                minutes: 0,
                seconds: 0,
                miliseconds: 0,
            };
            this.print();
        }

        print() {
            this.display.innerText = this.format(this.times);
        }

        format(times) {
            return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
        }

        start() {
            if (!this.running) {
                this.running = true;
                this.watch = setInterval(() => this.step(), 10);
            }
        }

        stop() {
            this.running = false;
            clearInterval(this.watch);
        }

        step() {
            if (!this.running) return;

            this.calculate();
            this.print();
        }

        calculate() {
            this.times.miliseconds += 1;

            if (this.times.miliseconds >= 100) {
                this.times.miliseconds = 0;
                this.times.seconds += 1;
            }

            if (this.times.seconds >= 60) {
                this.times.seconds = 0;
                this.times.minutes += 1;
            }
        }

        addResult() {
            let li = document.createElement("li");

            console.log(this.format(this.times));
            
            li.innerHTML = this.format(this.times);
            resultList.appendChild(li);
        }
    }

    const stopWatch = new StopWatch(document.getElementById('stoper'));
    let startButton = document.getElementById('start');
    let stopButton = document.getElementById('stop');
    let resetButton = document.getElementById('reset');
    let resultList = document.getElementById('result');

    startButton.addEventListener('click', () => stopWatch.start());
    stopButton.addEventListener('click', () => stopWatch.stop());
    resetButton.addEventListener('click', () => stopWatch.reset(true));

    function pad0(value) {
        let result = value.toString();

        return result.length < 2 ? ('0' + result):result;
    }
}
