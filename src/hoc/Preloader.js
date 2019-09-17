import React from 'react';
import Preloader from '../common/Preloader'

const withPreloader = (propName) => (WrappedComponent) => {
    return class LoaderHOC extends React.Component {
      isEmpty(prop) {
        return (
          prop === null 
          || prop === false
          || prop === undefined 
          || (Array.isArray(prop) && prop.length === 0) 
          || (prop.constructor === Object && Object.keys(prop).length === 0)
        );
      }
      render() {
        return (
          this.isEmpty(this.props[propName]) 
          ? <Preloader />
          : <WrappedComponent {...this.props} />)
      }
    }
  }

export default withPreloader;