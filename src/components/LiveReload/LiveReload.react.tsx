/*
 * Copyright (c) 2016-present, Parse, LLC
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */
import React            from 'react';
import { abortableGet } from 'lib/AJAX';

interface Props {
	/** Initial data to seed the component before any request has been made. If this is not passed, then your render function must be prepared to handle being called with "undefined" instead of data. Passing this will also cause the first load to happen after refreshIntervalMillis, while not passing it will cause it the first load to happen immediately. */
	initialData: any;

	/** Either a URL to fetch updates from, or a function that returns a promise that fetches update, or a function that returns { promise, xhr }. */
	source: any;

	/** How often to refresh the data, in milliseconds. Defaults to 1s. */
	refreshIntervalMillis?: any;

	/** Receives the data from the URL or promise and returns the component to be rendered. */
	render: any;
}

interface State {
	currentData: any;
}

export default class LiveReload extends React.Component<Props, State> {
	refreshIntervalMillis: number;
	timer: number;
	abortXHR: () => void;
	shouldContinueReloading = false;

  constructor(props: Props) {
    super(props);
    this.abortXHR = () => {};
    this.timer = null;
    this.refreshIntervalMillis = props.refreshIntervalMillis || 1000;
    this.state = {
			currentData: props.initialData,
		};
  }

  fetchNewData() {
		clearTimeout(this.timer);
		let promise = null;
		let xhr = null;
		if (typeof(this.props.source) === 'function') {
			let obj = this.props.source();
			if (obj.promise && obj.xhr) {
				promise = obj.promise;
				xhr = obj.xhr;
			} else {
				promise = obj;
			}
		} else {
			let obj = abortableGet(this.props.source);
			promise = obj.promise;
			xhr = obj.xhr;
		}
		this.abortXHR = () => {
			if (xhr) {
				xhr.abort();
			}
			clearTimeout(this.timer);
		}
		promise.then(data => {
			this.setState({currentData: data});
		}).finally(() => {
			if (this.shouldContinueReloading) {
				this.timer = setTimeout(this.fetchNewData.bind(this), this.refreshIntervalMillis);
			}
		});
		return promise;
	}

  componentWillMount() {
		this.shouldContinueReloading = true;
		if (!this.state.currentData) {
			this.fetchNewData();
		} else {
			this.timer = setTimeout(this.fetchNewData.bind(this), this.refreshIntervalMillis);
		}
	}

	componentWillUnmount() {
		this.abortXHR();
		this.shouldContinueReloading = false;
		clearTimeout(this.timer);
	}

  render() {
		return this.props.render(this.state.currentData);
  }
}
