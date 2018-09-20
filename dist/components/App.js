var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = {
            running: false,
            display: display
        };
        reset(false);
        print(_this.time);
        return _this;
    }

    _createClass(App, [{
        key: "reset",
        value: function reset(working) {
            //if (working) this.addResult();
            this.state.times = {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            };
            this.print();
        }
    }, {
        key: "print",
        value: function print() {
            this.state.display.innerText = this.format(this.state.times);
        }
    }, {
        key: "format",
        value: function format(times) {
            return pad0(times.minutes) + ":" + pad0(times.seconds) + ":" + pad0(Math.floor(times.miliseconds));
        }
    }, {
        key: "start",
        value: function start() {
            var _this2 = this;

            if (!this.state.running) {
                this.state.running = true;
                this.state.watch = setInterval(function () {
                    return _this2.step();
                }, 10);
            }
        }
    }, {
        key: "stop",
        value: function stop() {
            this.state.running = false;
            clearInterval(this.watch);
        }
    }, {
        key: "step",
        value: function step() {
            if (!this.state.running) return;

            this.calculate();
            this.print();
        }
    }, {
        key: "calculate",
        value: function calculate() {
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
    }, {
        key: "addResult",
        value: function addResult() {
            var li = document.createElement("li");

            console.log(this.format(this.times));

            li.innerHTML = this.format(this.times);
            resultList.appendChild(li);
        }
    }, {
        key: "pad0",
        value: function pad0(value) {
            var result = value.toString();

            return result.length < 2 ? '0' + result : result;
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "stoper-container" },
                React.createElement(
                    "div",
                    { "class": "controls" },
                    React.createElement(
                        "a",
                        { href: "#", className: "button", onClick: start },
                        "Start"
                    ),
                    React.createElement(
                        "a",
                        { href: "#", className: "button", onClick: stop },
                        "Stop"
                    ),
                    React.createElement(
                        "a",
                        { href: "#", className: "button", onClick: reset(true) },
                        "Reset"
                    )
                ),
                React.createElement("div", { className: "stop-watch" }),
                React.createElement("ul", { className: "results" })
            );
        }
    }]);

    return App;
}(React.Component);