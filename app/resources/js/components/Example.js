import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {fetchRefresh, expires, token, documentArray} from './fetches.js'

export default class Example extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expires: '',
            token: '',
            documentArray: {},
            result: 'Waiting...'
        }

        this.fetchRefresh = fetchRefresh.bind(this)
        this.expires = expires.bind(this)
        this.token = token.bind(this)
        this.documentArray = documentArray.bind(this)
        this.onClick = this.onClick.bind(this)
        this.csrf = $('meta[name="csrf-token"]')
    }

    onClick() {
        clearInterval(this.interval)
        this.state.result = 'Waiting...'

        this.fetchRefresh()
        this.expires()
    }

    componentDidMount() {
        this.token()
        this.expires()
        this.documentArray()
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
