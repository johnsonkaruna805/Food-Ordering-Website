import React from 'react';
import axios from 'axios';
import Wallpaper from './Wallpaper';
import QS from './QS';


class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            Locations: [],
            Mealtypes: []
        }
    }

    componentDidMount() {
        sessionStorage.clear();
        axios({
            url: 'http://localhost:2020/locations',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(respone => {
                this.setState({ Locations: respone.data.locations })
            })
            .catch()

        axios({
            url: 'http://localhost:2020/mealtypes',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(respone => {
                this.setState({ Mealtypes: respone.data.mealtypes })
            })
            .catch()
    }

    render() {
        const { Locations, Mealtypes } = this.state;
        return (
            <div>
                <Wallpaper locationsData={Locations} />
                <QS QuickSearchData={Mealtypes} />
            </div>
        )
    }
}

export default Home;