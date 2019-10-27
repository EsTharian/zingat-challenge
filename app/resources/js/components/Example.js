import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment'

export default class Example extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expires: '',
            token: '',
            documentArray: {},
            result: 'Waiting...'
        }
        this.onClick = this.onClick.bind(this)
        this.csrf = $('meta[name="csrf-token"]')
    }

    onClick() {
        clearInterval(this.interval)
        this.state.result = 'Waiting...'

        fetch('http://localhost/new-api-token', {
            method: 'post',
            headers: {
                'X-CSRF-TOKEN': this.csrf.attr('content')
            }
        })
            .then(res => res.text())
            .then((data) => {
                document.querySelector('#token').innerHTML = data
            })
            .catch(console.log)

        fetch('http://localhost/get-api-token-expires', {
            method: 'post',
            headers: {
                'X-CSRF-TOKEN': this.csrf.attr('content')
            }
        })
            .then(res => res.text())
            .then((data) => {
                this.setState({
                    ...this.state,
                    expires: data
                })
            }).then(this.interval = setInterval(() => {
            const then = moment(this.state.expires, 'YYYY-MM-DD h:mm:ss');
            const now = moment();
            const countdown = moment(then - now);
            const result = (then > now) ? countdown.format('mm')+':'+countdown.format('ss') : 'Expired'

            this.setState({ result });
        }, 1000))
            .catch(console.log)


    }

    componentDidMount() {
        fetch('http://localhost/get-api-token', {
            method: 'post',
            headers: {
                'X-CSRF-TOKEN': this.csrf.attr('content')
            }
        })
            .then(res => res.text())
            .then((data) => {
                this.setState({
                    ...this.state,
                    token: data
                })
            })
            .catch(console.log)

        fetch('http://localhost/get-api-token-expires', {
            method: 'post',
            headers: {
                'X-CSRF-TOKEN': this.csrf.attr('content')
            }
        })
            .then(res => res.text())
            .then((data) => {
                this.setState({
                    ...this.state,
                    expires: data
                })
            }).then(this.interval = setInterval(() => {
            const then = moment(this.state.expires, 'YYYY-MM-DD h:mm:ss');
            const now = moment();
            const countdown = moment(then - now);
            const result = (then > now) ? countdown.format('mm')+':'+countdown.format('ss') : 'Expired'

            this.setState({ result });
        }, 1000))
            .catch(console.log)

        fetch('http://localhost/document', {
            method: 'post',
            headers: {
                'X-CSRF-TOKEN': this.csrf.attr('content')
            }
        })
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    ...this.state,
                    documentArray: data
                })
                console.log(this.state.documentArray)
            })
            .catch(console.log)
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">API Token</div>

                            <div className="card-body">
                                <code className='d-block' id='token'>{this.state.token}</code>
                                <p>Expires-in: </p>
                                {
                                    this.state.result
                                }
                                <br /><br/>
                                <button onClick={this.onClick}>Token Refresh</button>
                                <br/><br/>
                                <p>Click to Open Document:</p>
                                <ul>
                                    {
                                        Object.keys(this.state.documentArray).map(k => {
                                            const val = this.state.documentArray[k]
                                            return (
                                                <li key={k}>
                                                    <a href={`http://localhost/document/${parseInt(k) + 1}`}>
                                                        {val.name}
                                                    </a>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.querySelector('#react')) {
    ReactDOM.render(<Example />, document.querySelector('#react'))
}
