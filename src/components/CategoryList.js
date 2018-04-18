import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class CategoryList extends Component {
  render() {
    return (
      <div>
      {
        this.props.categories.map((category) => (
          <div key={category.name}>
            <Link
            to={"/" + category.name}
            >
              {category.name}
            </Link>
          </div>
        ))
      }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.categories;
}

export default connect(mapStateToProps)(CategoryList);
