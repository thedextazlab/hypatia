import React, { Component, PropTypes } from 'react';
import { setLoading } from '../../../actions/actions';
import {connect} from 'react-redux';
import { firebase, helpers } from 'redux-react-firebase';
import classNames from 'classnames';
import * as CONSTANTS from '../../../constants/constants';
import showdown from 'showdown';
import $ from 'jquery';
import Edit from '../lib/edit/edit';
import Icon from '../lib/icon/icon';

const defaultProps = {
	
};

const propTypes = {
	
};

const {isLoaded, isEmpty, dataToJS} = helpers;

@connect(
  	(state, props) => ({
    	page: dataToJS(state.firebase, 'pages'),
		userID: state.mainReducer.user ? state.mainReducer.user.uid : '',
		userData: dataToJS(state.firebase, `users/${state.mainReducer.user ? state.mainReducer.user.uid : ''}`),
  	})
)
@firebase(
  	props => ([
    	`pages#orderByChild=slug&equalTo=${window.location.href.substr(window.location.href.lastIndexOf('/') + 1)}`,
		`users/${props.userID}`
  	])
)
class Page extends Component {
    
	constructor(props) {
		super(props);
	}
	
	componentDidMount() {
		this.props.setLoading(false);
		$('.js-main').removeClass().addClass('main js-main detail-page');
	}
	
	render() {
		let page = null;
			
		if (isLoaded(this.props.page) && !isEmpty(this.props.page)) {	
			Object.keys(this.props.page).map(function(key) {
				page = this.props.page[key];
			}.bind(this));
		}
		
		return (
            <section className="page static-page"> 
            	{page ? <div className="page-wrapper">
					<h1 className="title">{page.title}</h1>
					{isLoaded(this.props.userData) && !isEmpty(this.props.userData) && this.props.userData.info.level >= CONSTANTS.ADMIN_LEVEL ? <div className="meta">
						<Edit editLink={`/admin/pages/edit/${page.slug}`} newLink="/admin/pages/new" />
					</div> : null}
					<div className={classNames('columns', {'single-column': (!page.content2 && !page.content3)})}>
						<div className="column page-content">
							<div className="content" dangerouslySetInnerHTML={{__html: CONSTANTS.converter.makeHtml(page.content1)}}></div>
						</div>
						{page.content2 ? <div className="column page-sidebar">
							<div className="content" dangerouslySetInnerHTML={{__html: CONSTANTS.converter.makeHtml(page.content2)}}></div>
						</div> : ''}
						{page.content3 ? <div className="column page-sidebar">
							<div className="content" dangerouslySetInnerHTML={{__html: CONSTANTS.converter.makeHtml(page.content3)}}></div>
						</div> : ''}
					</div>
          		</div> : <div className="loader-small"></div>}
            </section>
		)
	}
}

Page.propTypes = propTypes;
Page.defaultProps = defaultProps;

const mapDispatchToProps = {
	setLoading
}

const mapStateToProps = ({ mainReducer: { isDesktop } }) => ({ isDesktop });

export default connect(mapStateToProps, mapDispatchToProps)(Page);