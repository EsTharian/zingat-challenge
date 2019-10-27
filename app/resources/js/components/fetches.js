import moment from 'moment'

export const fetchRefresh = function fetchRefresh() {
    const _this = this
    fetch('http://localhost/new-api-token', {
        method: 'post',
        headers: {
            'X-CSRF-TOKEN': _this.csrf.attr('content')
        }
    })
        .then(res => res.text())
        .then((data) => {
            document.querySelector('#token').innerHTML = data
        })
        .catch(console.log)
}

export const expires = function expires() {
    const _this = this
    fetch('http://localhost/get-api-token-expires', {
        method: 'post',
        headers: {
            'X-CSRF-TOKEN': _this.csrf.attr('content')
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
        const result = (then > now) ? countdown.format('mm') + ':' + countdown.format('ss') : 'Expired'

        this.setState({result});
    }, 1000))
        .catch(console.log)
}

export const token = function token() {
    const _this = this
    fetch('http://localhost/get-api-token', {
        method: 'post',
        headers: {
            'X-CSRF-TOKEN': _this.csrf.attr('content')
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
}

export const documentArray = function documentArray() {
    const _this = this
    fetch('http://localhost/document', {
        method: 'post',
        headers: {
            'X-CSRF-TOKEN': _this.csrf.attr('content')
        }
    })
        .then(res => res.json())
        .then((data) => {
            this.setState({
                ...this.state,
                documentArray: data
            })
        })
        .catch(console.log)
}
