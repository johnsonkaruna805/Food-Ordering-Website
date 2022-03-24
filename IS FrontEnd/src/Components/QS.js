import React from 'react';
import '../Styles/Home.css';
import QSItems from './QSItems';

class QS extends React.Component {
    render() {
        const { QuickSearchData } = this.props;
        return (
            <div>
                <div className="quicksearch">
                    <p className="quicksearchHeading">
                        Quick Searches
                    </p>
                    <p className="quicksearchSubHeading">
                        Discover restaurants by type of meal
                    </p>

                    <div className="container-fluid">

                        <div className="row">

                            {QuickSearchData.map((item) => {
                                return <QSItems item={item} />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default QS;